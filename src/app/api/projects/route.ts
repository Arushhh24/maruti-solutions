import { NextRequest, NextResponse } from 'next/server'
import { projectSchema } from '@/lib/validations'
import { createServerClient } from '@/lib/supabase'
import { sendProjectEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const rawData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: (formData.get('phone') as string) || undefined,
      service: formData.get('service') as string,
      description: formData.get('description') as string,
      budget: (formData.get('budget') as string) || undefined,
      timeline: (formData.get('timeline') as string) || undefined,
    }

    const parsed = projectSchema.safeParse(rawData)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const data = parsed.data
    const supabase = createServerClient()
    const fileUrls: string[] = []

    // Upload files to Supabase Storage
    const files = formData.getAll('files') as File[]
    for (const file of files) {
      if (file.size === 0) continue
      const ext = file.name.split('.').pop()
      const path = `projects/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('project-files')
        .upload(path, file, { contentType: file.type })

      if (!uploadError) {
        const { data: urlData } = supabase.storage.from('project-files').getPublicUrl(path)
        fileUrls.push(urlData.publicUrl)
      }
    }

    // Insert to DB
    const { error: dbError } = await supabase.from('projects').insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      service: data.service,
      description: data.description,
      budget: data.budget || null,
      timeline: data.timeline || null,
      files: fileUrls,
      status: 'new',
    })

    if (dbError) {
      console.error('DB error:', dbError)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    try {
      await sendProjectEmail({ name: data.name, email: data.email, service: data.service, description: data.description })
    } catch (e) {
      console.error('Email error (non-fatal):', e)
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error('Projects API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.ADMIN_API_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}
