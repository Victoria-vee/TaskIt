import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const supabaseUrl ='https://gvbjaellvuornwbavxmr.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2YmphZWxsdnVvcm53YmF2eG1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5OTI5MDksImV4cCI6MjA4NjU2ODkwOX0.A6pi5W1oAOxPYnxGMwWz8NwuFYYUbsZB4yrciKp7RnM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)