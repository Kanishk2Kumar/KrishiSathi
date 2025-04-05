import { createClient } from '@supabase/supabase-js'

// Import keys from .env and ensure they are set
const SUPABASE_URL = "https://tberfxdhhauhrxqztved.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiZXJmeGRoaGF1aHJ4cXp0dmVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyMTA2MjUsImV4cCI6MjA1NTc4NjYyNX0.usQKwUDrxvfwvNjhp2wJP7ytLTuz9QBAMRc8mlO1xO0"
const SUPABASE_SERVICE_ROLE = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiZXJmeGRoaGF1aHJ4cXp0dmVkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MDIxMDYyNSwiZXhwIjoyMDU1Nzg2NjI1fQ.X7sVnC7BBLqIYOAlv3IxJN01SgimwLEwwJQR-cGRHQs"

if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE) {
  throw new Error('Missing necessary environment variables');
}

// Initialize Supabase clients
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
export const supabaseAdminRole = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);
