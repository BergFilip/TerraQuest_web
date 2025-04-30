import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Explore from '../sites/Explore.tsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate,
}));

const localStorageMock = (function() {
    let store: Record<string, string> = {};

    return {
        getItem: function(key: string) {
            return store[key] || null;
        },
        setItem: function(key: string, value: string) {
            store[key] = value;
        },
        clear: function() {
            store = {};
        }
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
});

describe('Explore Component', () => {
    const mockHotels = [
        {
            PropertyId: 1,
            PropertyName: 'Test Hotel 1',
            ReferencePrice: 100,
            MaxDiscountPercent: 20,
            PropertyAddress: 'Test Address 1',
            PropertyImageUrl: 'image1.jpg',
            ReferencePriceCurrency: 'USD',
        },
        {
            PropertyId: 2,
            PropertyName: 'Test Hotel 2',
            ReferencePrice: 200,
            MaxDiscountPercent: 30,
            PropertyAddress: 'Test Address 2',
            PropertyImageUrl: 'image2.jpg',
            ReferencePriceCurrency: 'EUR',
        },
        {
            PropertyId: 3,
            PropertyName: 'Test Hotel 3',
            ReferencePrice: 150,
            MaxDiscountPercent: 25,
            PropertyAddress: 'Test Address 3',
            PropertyImageUrl: 'image3.jpg',
            ReferencePriceCurrency: 'USD',
        },
        {
            PropertyId: 4,
            PropertyName: 'Test Hotel 4',
            ReferencePrice: 180,
            MaxDiscountPercent: 15,
            PropertyAddress: 'Test Address 4',
            PropertyImageUrl: 'image4.jpg',
            ReferencePriceCurrency: 'EUR',
        },
        {
            PropertyId: 5,
            PropertyName: 'Test Hotel 5',
            ReferencePrice: 220,
            MaxDiscountPercent: 10,
            PropertyAddress: 'Test Address 5',
            PropertyImageUrl: 'image5.jpg',
            ReferencePriceCurrency: 'USD',
        },
    ];

    const mockReviews = [
        {
            title: 'Great stay!',
            description: 'Wonderful experience',
            reviewer: 'John Doe',
            date: '2023-05-15',
            rating: 5,
            image: 'review1.jpg',
        },
        {
            title: 'Average',
            description: 'Could be better',
            reviewer: 'Jane Smith',
            date: '2023-04-10',
            rating: 3,
            image: 'review2.jpg',
        },
    ];

    beforeEach(() => {
        mockedAxios.get.mockClear();
        mockedNavigate.mockClear();
        window.localStorage.clear();
    });

    it('renders without crashing', () => {
        render(<Explore />);
        expect(screen.getByText('Zaoszczędzisz do 40% na następnym pobycie w hotelu')).toBeInTheDocument();
    });

    it('fetches hotels and reviews on mount', async () => {
        mockedAxios.get.mockImplementation((url) => {
            if (url.includes('/api/hotels')) {
                return Promise.resolve({ data: mockHotels });
            } else if (url.includes('/api/reviews')) {
                return Promise.resolve({ data: mockReviews });
            }
            return Promise.reject(new Error('Not found'));
        });

        await act(async () => {
            render(<Explore />);
        });

        expect(mockedAxios.get).toHaveBeenCalledWith('/api/hotels?city=paris');
        expect(mockedAxios.get).toHaveBeenCalledWith('/api/reviews');
    });

    it('handles form submission and navigation', async () => {
        render(<Explore />);

        fireEvent.change(screen.getByPlaceholderText('Miejsce docelowe'), {
            target: { value: 'Kraków' }
        });
        fireEvent.change(screen.getByPlaceholderText('Data wyjazdu'), {
            target: { value: '2023-07-15' }
        });
        fireEvent.change(screen.getByPlaceholderText('Ilość uczestników'), {
            target: { value: '4' }
        });

        await act(async () => {
            fireEvent.click(screen.getByText('Wyszukaj'));
        });

        expect(window.localStorage.getItem('destination')).toBe('Kraków');
        expect(window.localStorage.getItem('startDate')).toBe('2023-07-15');
        expect(window.localStorage.getItem('numUsers')).toBe('4');
        expect(mockedNavigate).toHaveBeenCalledWith('/search');
    });

    it('displays loading state for hotels', async () => {
        mockedAxios.get.mockImplementationOnce(() => new Promise(() => {}));
        mockedAxios.get.mockResolvedValueOnce({ data: mockReviews });

        render(<Explore />);

        expect(screen.getByText('Ładowanie danych o hotelach...')).toBeInTheDocument();
    });

    it('displays loading state for reviews', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockHotels });
        mockedAxios.get.mockImplementationOnce(() => new Promise(() => {}));

        render(<Explore />);

        expect(screen.getByText('Ładowanie recenzji...')).toBeInTheDocument();
    });

    it('handles hotel click navigation', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockHotels });
        mockedAxios.get.mockResolvedValueOnce({ data: mockReviews });

        await act(async () => {
            render(<Explore />);
        });

        const hotelCards = screen.getAllByText(mockHotels[0].PropertyName);
        fireEvent.click(hotelCards[0]);

        expect(window.localStorage.getItem('selectedHotel')).toBeTruthy();
        expect(mockedNavigate).toHaveBeenCalledWith(`/product/${mockHotels[0].PropertyId}`);
    });

    it('paginates through hotels correctly', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockHotels });
        mockedAxios.get.mockResolvedValueOnce({ data: mockReviews });

        await act(async () => {
            render(<Explore />);
        });

        expect(screen.getByText(mockHotels[0].PropertyName)).toBeInTheDocument();
        expect(screen.getByText(mockHotels[3].PropertyName)).toBeInTheDocument();
        expect(screen.queryByText(mockHotels[4].PropertyName)).not.toBeInTheDocument();

        const nextButton = screen.getByText('Dalej');
        await act(async () => {
            fireEvent.click(nextButton);
        });

        expect(screen.queryByText(mockHotels[0].PropertyName)).not.toBeInTheDocument();
        expect(screen.getByText(mockHotels[4].PropertyName)).toBeInTheDocument();

        const prevButton = screen.getByText('Wstecz');
        await act(async () => {
            fireEvent.click(prevButton);
        });

        expect(screen.getByText(mockHotels[0].PropertyName)).toBeInTheDocument();
        expect(screen.getByText(mockHotels[3].PropertyName)).toBeInTheDocument();
    });

    it('disables pagination buttons correctly', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockHotels });
        mockedAxios.get.mockResolvedValueOnce({ data: mockReviews });

        await act(async () => {
            render(<Explore />);
        });

        const prevButton = screen.getByText('Wstecz');
        const nextButton = screen.getByText('Dalej');

        // Initially prev button should be disabled
        expect(prevButton).toBeDisabled();
        expect(nextButton).not.toBeDisabled();

        await act(async () => {
            fireEvent.click(nextButton);
        });

        expect(prevButton).not.toBeDisabled();
        expect(nextButton).toBeDisabled();
    });

    it('handles API errors gracefully', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));
        mockedAxios.get.mockResolvedValueOnce({ data: mockReviews });

        await act(async () => {
            render(<Explore />);
        });

        expect(screen.getByText('Ładowanie danych o hotelach...')).toBeInTheDocument();
    });

    it('displays correct price conversion', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: [mockHotels[0]] });
        mockedAxios.get.mockResolvedValueOnce({ data: mockReviews });

        await act(async () => {
            render(<Explore />);
        });

        expect(screen.getByText('430.00 zł')).toBeInTheDocument();
        expect(screen.getByText('344.00 zł')).toBeInTheDocument();
    });

    it('displays correct date range in the heading', () => {
        render(<Explore />);

        const today = new Date();
        const endDate = new Date();
        endDate.setDate(today.getDate() + 7);

        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
        const formattedToday = new Intl.DateTimeFormat('pl-PL', options).format(today);
        const formattedEndDate = new Intl.DateTimeFormat('pl-PL', options).format(endDate);

        expect(screen.getByText(`Zaoszczędź na pobytach w okresie ${formattedToday} - ${formattedEndDate}`)).toBeInTheDocument();
    });
});