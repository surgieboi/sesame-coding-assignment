import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase is incorrectly configured. Please check and update your Supabase API URL or Anon Key.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
