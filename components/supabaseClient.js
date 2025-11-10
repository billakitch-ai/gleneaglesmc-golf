import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Replace with your actual Supabase project URL and anon public key
const SUPABASE_URL = 'https://ekevotcpnrzncxigemnp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrZXZvdGNwbnJ6bmN4aWdlbW5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NDkwMTAsImV4cCI6MjA3NjAyNTAxMH0.D6iIHHlfGfpuh0NkUTVMWOWE7Vepw9GlJn_OcfRxg6E';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);