import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://zfzkhboipzpruvihwybm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmemtoYm9pcHpwcnV2aWh3eWJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzNzU2ODQsImV4cCI6MjA1OTk1MTY4NH0.Z1-7rCE5d9CY08wRcqFsm5scfuQucOj0_Kg8zYz2Z6Y';

export const supabase= createClient(supabaseUrl, supabaseKey);
