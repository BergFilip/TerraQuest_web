jest.mock('@supabase/supabase-js', () => ({
    createClient: jest.fn(() => ({ mocked: true })),
}));

jest.mock('dotenv', () => ({
    config: jest.fn()
}));

describe('supabase client', () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...OLD_ENV };
    });

    afterEach(() => {
        process.env = OLD_ENV;
    });

    it('should throw error when env variables are missing', () => {
        delete process.env.SUPABASE_URL;
        delete process.env.SUPABASE_ANON_KEY;

        expect(() => {

            require('../utils/supabase');
        }).toThrow(
            'Missing Supabase configuration: SUPABASE_URL and SUPABASE_ANON_KEY must be set'
        );
    });

    it('should create and export supabase client when env variables are set', () => {
        process.env.SUPABASE_URL = 'https://example.supabase.co';
        process.env.SUPABASE_ANON_KEY = 'anon-key';

        const { createClient } = require('@supabase/supabase-js');

        const { supabase } = require('../utils/supabase');

        expect(createClient).toHaveBeenCalledWith(
            'https://example.supabase.co',
            'anon-key'
        );
        expect(supabase).toEqual({ mocked: true });
    });
});
