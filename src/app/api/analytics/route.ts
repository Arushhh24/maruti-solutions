import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.ADMIN_API_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServerClient()

  const [
    { count: totalLeads },
    { count: totalAppointments },
    { count: totalProjects },
    { count: newLeads },
    { count: pendingAppointments },
    { count: newProjects },
  ] = await Promise.all([
    supabase.from('leads').select('*', { count: 'exact', head: true }),
    supabase.from('appointments').select('*', { count: 'exact', head: true }),
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('appointments').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('projects').select('*', { count: 'exact', head: true }).eq('status', 'new'),
  ])

  // Recent activity
  const { data: recentLeads } = await supabase
    .from('leads')
    .select('id, name, email, company, status, created_at')
    .order('created_at', { ascending: false })
    .limit(5)

  const { data: recentAppointments } = await supabase
    .from('appointments')
    .select('id, name, email, service, date, time, status, created_at')
    .order('created_at', { ascending: false })
    .limit(5)

  return NextResponse.json({
    stats: {
      totalLeads: totalLeads ?? 0,
      totalAppointments: totalAppointments ?? 0,
      totalProjects: totalProjects ?? 0,
      newLeads: newLeads ?? 0,
      pendingAppointments: pendingAppointments ?? 0,
      newProjects: newProjects ?? 0,
    },
    recentLeads: recentLeads ?? [],
    recentAppointments: recentAppointments ?? [],
  })
}
