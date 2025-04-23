import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Konfiguracja ścieżki do .env
const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

// Walidacja zmiennych środowiskowych
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase configuration: SUPABASE_URL and SUPABASE_ANON_KEY must be set');
}

// Eksport klienta Supabase
const supabase = createClient(supabaseUrl, supabaseKey);
export { supabase };