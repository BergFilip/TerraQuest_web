import { supabase } from '../utils/supabase'; // Ścieżka do Twojego pliku supabase.ts
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Mockowanie dotenv.config, aby zwróciło odpowiednie wartości
jest.mock('dotenv', () => ({
    config: jest.fn().mockReturnValue({
        parsed: {
            SUPABASE_URL: 'http://localhost',
            SUPABASE_ANON_KEY: 'anon-key'
        }
    })
}));

// Mockowanie createClient
jest.mock('@supabase/supabase-js', () => ({
    createClient: jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
            select: jest.fn().mockResolvedValue({ data: null, error: null })
        })
    })
}));

describe('supabase.ts', () => {
    it('should initialize supabase client correctly', () => {
        // Sprawdzamy, czy dotenv.config() zostało wywołane
        expect(dotenv.config).toHaveBeenCalled();

        // Sprawdzamy, czy createClient zostało wywołane z odpowiednimi parametrami
        expect(createClient).toHaveBeenCalledWith('http://localhost', 'anon-key');

        // Sprawdzamy, czy instancja `supabase` jest poprawnie inicjalizowana
        const supabaseClient = require('../path/to/supabase').supabase; // To nasz zmockowany klient
        expect(supabaseClient).toBeDefined();
        expect(supabaseClient.from).toBeDefined();
    });
});
