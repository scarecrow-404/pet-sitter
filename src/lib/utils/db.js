import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://twbnpazhgudgqhmulgru.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3Ym5wYXpoZ3VkZ3FobXVsZ3J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY2ODcxMzksImV4cCI6MjAyMjI2MzEzOX0.3qfJONY-4AOwe619DNyAopkYgNA93ehJiO8PFcyjCNQ';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;