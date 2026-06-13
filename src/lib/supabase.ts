import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Validate URL format before initializing client
const isValidSupabaseUrl = (url: string): url is string => {
  if (!url) return false
  try {
    return /^https?:\/\/.*\.supabase\.co/.test(url)
  } catch {
    return false
  }
}

export const supabase = isValidSupabaseUrl(supabaseUrl) && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Server-side client with service role (for admin operations)
export const createServerClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!url || !key || !isValidSupabaseUrl(url)) {
    return null
  }
  
  return createClient(url, key)
}

export type Database = {
  public: {
    Tables: {
      appointments: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          service: string
          date: string
          time: string
          message: string | null
          status: 'pending' | 'confirmed' | 'cancelled'
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['appointments']['Row'], 'id' | 'created_at'>
      }
      leads: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          company: string | null
          message: string
          source: string
          status: 'new' | 'contacted' | 'qualified' | 'closed'
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['leads']['Row'], 'id' | 'created_at'>
      }
      projects: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          service: string
          description: string
          budget: string | null
          timeline: string | null
          files: string[]
          status: 'new' | 'in_review' | 'in_progress' | 'completed'
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['projects']['Row'], 'id' | 'created_at'>
      }
      portfolio: {
        Row: {
          id: string
          title: string
          category: string
          challenge: string
          strategy: string
          execution: string
          outcome: string
          tags: string[]
          image_url: string | null
          featured: boolean
          created_at: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string
          category: string
          published: boolean
          created_at: string
        }
      }
      testimonials: {
        Row: {
          id: string
          name: string
          company: string
          role: string
          content: string
          rating: number
          published: boolean
          created_at: string
        }
      }
    }
  }
}
