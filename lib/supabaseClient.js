import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://amptgnfgfzoyuoigeess.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtcHRnbmZnZnpveXVvaWdlZXNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI0ODA2ODAsImV4cCI6MjA0ODA1NjY4MH0.9jL4X6FM5Awq-rLl6SXg6y5LDUeUctTlp9CKxUSMPuU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
