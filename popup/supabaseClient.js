import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

let supabaseUrl = "https://yjrdmpkrbgybnrfgklxa.supabase.co"
let supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqcmRtcGtyYmd5Ym5yZmdrbHhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc5Njg4MTQsImV4cCI6MjAzMzU0NDgxNH0.B-PeCWx6G3yM0sAPvEscMkpkeEd6UvFZHHMIAbcLLMw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
