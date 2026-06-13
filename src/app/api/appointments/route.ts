import { NextRequest, NextResponse } from 'next/server'
import { appointmentSchema } from '@/lib/validations'
import { createServerClient } from '@/lib/supabase'
import { sendAppointmentEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = appointmentSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const data = parsed.data
    const supabase = createServerClient()

    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
    }

    // Store in Supabase
    const { error: dbError } = await supabase.from('appointments').insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      service: data.service,
      date: data.date,
      time: data.time,
      message: data.message || null,
      status: 'pending',
    })

    if (dbError) {
      console.error('Supabase error:', dbError)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    // Send emails (non-blocking)
    try {
      await sendAppointmentEmail(data)
    } catch (emailErr) {
      console.error('Email error (non-fatal):', emailErr)
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error('Appointment API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  // Admin-only: fetch all appointments
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.ADMIN_API_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServerClient()
  
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  }

  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}
