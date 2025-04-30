import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import Home from '../sites/Home.tsx';
import React from 'react';
import { TextEncoder, TextDecoder } from 'util';
import { MemoryRouter } from 'react-router-dom';

Object.assign(globalThis, { TextEncoder, TextDecoder });

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Home page', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the initial elements correctly', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        expect(screen.getByText(/odkryj następną przygodę/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/miejsce docelowe/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/data wyjazdu i powrotu/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/ilość uczestników/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /wyszukaj/i })).toBeInTheDocument();
    });

    it('fetches and displays hotels', async () => {
        const hotels = [
            {
                PropertyId: 1,
                PropertyName: 'Hotel Testowy',
                ReferencePrice: 200,
                MaxDiscountPercent: 10,
                PropertyAddress: 'Testowa 123',
                PropertyImageUrl: '//test.com/image.jpg'
            }
        ];

        mockedAxios.get.mockResolvedValueOnce({ data: hotels });

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        expect(await screen.findByText('Hotel Testowy')).toBeInTheDocument();
        expect(screen.getByText('Testowa 123')).toBeInTheDocument();
    });

    it('shows loading message when no hotels yet', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        expect(screen.getByText(/ładowanie danych o hotelach/i)).toBeInTheDocument();
    });

    it('pagination buttons work', async () => {
        const hotels = Array.from({ length: 8 }, (_, index) => ({
            PropertyId: index,
            PropertyName: `Hotel ${index}`,
            ReferencePrice: 200,
            MaxDiscountPercent: 10,
            PropertyAddress: `Adres ${index}`,
            PropertyImageUrl: `//test.com/image${index}.jpg`
        }));

        mockedAxios.get.mockResolvedValueOnce({ data: hotels });

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Hotel 0')).toBeInTheDocument();
        });

        const nextButton = screen.getByRole('button', { name: /dalej/i });

        fireEvent.click(nextButton);

        await waitFor(() => {
            expect(screen.getByText('Hotel 4')).toBeInTheDocument();
        });
    });
});
