import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import Search from '../sites/Search.tsx';
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

describe('Search Component', () => {
    const mockHotels: Hotel[] = [
        {
            PropertyId: 1,
            PropertyName: 'Test Hotel 1',
            ReferencePrice: 100,
            MaxDiscountPercent: 20,
            PropertyAddress: 'Test Address 1',
            PropertyImageUrl: 'image1.jpg',
            PropertyRating: '4-star',
            TripAdvisorRating: 4.5,
            ReferencePriceCurrency: 'USD',
            DealsFound: 5,
            DealWeight: 10,
            AvgDiscountPercent: 15,
            LocationId: 1,
            PropertyLatitude: 52.52,
            PropertyLongitude: 13.41,
            PropertyImageUrlHighRes: 'image1-high.jpg',
            RatingImageUrl: 'rating1.jpg',
            CheckIn: null,
            CheckOut: null,
        },
        {
            PropertyId: 2,
            PropertyName: 'Test Hotel 2',
            ReferencePrice: 200,
            MaxDiscountPercent: 30,
            PropertyAddress: 'Test Address 2',
            PropertyImageUrl: 'image2.jpg',
            PropertyRating: '5-star',
            TripAdvisorRating: 4.8,
            ReferencePriceCurrency: 'EUR',
            DealsFound: 3,
            DealWeight: 8,
            AvgDiscountPercent: 25,
            LocationId: 2,
            PropertyLatitude: 52.53,
            PropertyLongitude: 13.42,
            PropertyImageUrlHighRes: 'image2-high.jpg',
            RatingImageUrl: 'rating2.jpg',
            CheckIn: null,
            CheckOut: null,
        },
    ];

    beforeEach(() => {
        mockedAxios.get.mockClear();
        mockedNavigate.mockClear();
        window.localStorage.clear();
    });

    it('renders without crashing', () => {
        render(<Search />);
        expect(screen.getByText('Oto wyniki twojego wyszukiwania')).toBeInTheDocument();
    });

    it('loads saved search parameters from localStorage', () => {
        window.localStorage.setItem('destination', 'Warsaw');
        window.localStorage.setItem('startDate', '2023-06-01');
        window.localStorage.setItem('numUsers', '2');

        render(<Search />);

        expect(screen.getByDisplayValue('Warsaw')).toBeInTheDocument();
        expect(screen.getByDisplayValue('2023-06-01')).toBeInTheDocument();
        expect(screen.getByDisplayValue('2')).toBeInTheDocument();
    });

    it('submits search form and fetches hotels', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockHotels });

        render(<Search />);

        fireEvent.change(screen.getByPlaceholderText('Miejsce docelowe'), {
            target: { value: 'Berlin' }
        });
        fireEvent.change(screen.getByDisplayValue(''), {
            target: { value: '2023-06-15' }
        });
        fireEvent.change(screen.getByDisplayValue('1'), {
            target: { value: '3' }
        });

        await act(async () => {
            fireEvent.click(screen.getByText('Wyszukaj'));
        });

        expect(mockedAxios.get).toHaveBeenCalledWith('/api/hotels?city=Berlin');
        expect(window.localStorage.getItem('destination')).toBe('Berlin');
        expect(window.localStorage.getItem('startDate')).toBe('2023-06-15');
        expect(window.localStorage.getItem('numUsers')).toBe('3');
    });

    it('handles hotel fetch error', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

        render(<Search />);

        fireEvent.change(screen.getByPlaceholderText('Miejsce docelowe'), {
            target: { value: 'Paris' }
        });

        await act(async () => {
            fireEvent.click(screen.getByText('Wyszukaj'));
        });

        expect(mockedAxios.get).toHaveBeenCalledWith('/api/hotels?city=Paris');
        expect(screen.queryByText('Test Hotel 1')).not.toBeInTheDocument();
    });

    it('filters hotels by price range', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockHotels });
        render(<Search />);

        await act(async () => {
            fireEvent.change(screen.getByPlaceholderText('Miejsce docelowe'), {
                target: { value: 'Berlin' }
            });
            fireEvent.click(screen.getByText('Wyszukaj'));
        });

        fireEvent.change(screen.getByRole('slider'), {
            target: { value: '500' }
        });

        await waitFor(() => {
            expect(screen.getByText('Test Hotel 1')).toBeInTheDocument();
            expect(screen.queryByText('Test Hotel 2')).not.toBeInTheDocument();
        });
    });

    it('filters hotels by star rating', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockHotels });
        render(<Search />);

        await act(async () => {
            fireEvent.change(screen.getByPlaceholderText('Miejsce docelowe'), {
                target: { value: 'Berlin' }
            });
            fireEvent.click(screen.getByText('Wyszukaj'));
        });

        fireEvent.click(screen.getByLabelText('5 gwiazdek'));

        await waitFor(() => {
            expect(screen.queryByText('Test Hotel 1')).not.toBeInTheDocument();
            expect(screen.getByText('Test Hotel 2')).toBeInTheDocument();
        });
    });

    it('filters hotels by discount range', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockHotels });
        render(<Search />);

        await act(async () => {
            fireEvent.change(screen.getByPlaceholderText('Miejsce docelowe'), {
                target: { value: 'Berlin' }
            });
            fireEvent.click(screen.getByText('Wyszukaj'));
        });

        const discountFilter = screen.getAllByText('21-50%')[0];
        fireEvent.click(discountFilter);

        await waitFor(() => {
            expect(screen.queryByText('Test Hotel 1')).not.toBeInTheDocument();
            expect(screen.getByText('Test Hotel 2')).toBeInTheDocument();
        });
    });

    it('sorts hotels by price ascending', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockHotels });
        render(<Search />);

        await act(async () => {
            fireEvent.change(screen.getByPlaceholderText('Miejsce docelowe'), {
                target: { value: 'Berlin' }
            });
            fireEvent.click(screen.getByText('Wyszukaj'));
        });

        fireEvent.click(screen.getByText('Cena rosnąco'));

        const hotelNames = screen.getAllByText(/Test Hotel/);
        expect(hotelNames[0]).toHaveTextContent('Test Hotel 1');
        expect(hotelNames[1]).toHaveTextContent('Test Hotel 2');
    });

    it('sorts hotels by price descending', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockHotels });
        render(<Search />);

        await act(async () => {
            fireEvent.change(screen.getByPlaceholderText('Miejsce docelowe'), {
                target: { value: 'Berlin' }
            });
            fireEvent.click(screen.getByText('Wyszukaj'));
        });

        fireEvent.click(screen.getByText('Cena malejąco'));

        const hotelNames = screen.getAllByText(/Test Hotel/);
        expect(hotelNames[0]).toHaveTextContent('Test Hotel 2');
        expect(hotelNames[1]).toHaveTextContent('Test Hotel 1');
    });

    it('sorts hotels by rating', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockHotels });
        render(<Search />);

        await act(async () => {
            fireEvent.change(screen.getByPlaceholderText('Miejsce docelowe'), {
                target: { value: 'Berlin' }
            });
            fireEvent.click(screen.getByText('Wyszukaj'));
        });

        fireEvent.click(screen.getByText('Najlepsze'));

        const hotelNames = screen.getAllByText(/Test Hotel/);
        expect(hotelNames[0]).toHaveTextContent('Test Hotel 2');
        expect(hotelNames[1]).toHaveTextContent('Test Hotel 1');
    });

    it('navigates to hotel details when "See Offer" is clicked', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockHotels });
        render(<Search />);

        await act(async () => {
            fireEvent.change(screen.getByPlaceholderText('Miejsce docelowe'), {
                target: { value: 'Berlin' }
            });
            fireEvent.click(screen.getByText('Wyszukaj'));
        });

        fireEvent.click(screen.getAllByText('Zobacz ofertę')[0]);

        expect(mockedNavigate).toHaveBeenCalledWith('/product/1');
        expect(window.localStorage.getItem('selectedHotel')).toBeTruthy();
    });

    it('toggles filters visibility', () => {
        render(<Search />);

        const toggleButton = screen.getByText('Pokaż filtry');
        fireEvent.click(toggleButton);

        expect(screen.getByText('Ukryj filtry')).toBeInTheDocument();
        expect(screen.getByText('Skala rabatu')).toBeVisible();

        fireEvent.click(toggleButton);
        expect(screen.getByText('Pokaż filtry')).toBeInTheDocument();
    });

    it('displays loading state', async () => {
        mockedAxios.get.mockImplementationOnce(() => new Promise(() => {}));

        render(<Search />);

        fireEvent.change(screen.getByPlaceholderText('Miejsce docelowe'), {
            target: { value: 'Berlin' }
        });

        fireEvent.click(screen.getByText('Wyszukaj'));

        expect(screen.getByText('Ładowanie hoteli...')).toBeInTheDocument();
    });

    it('displays no results message', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: [] });

        render(<Search />);

        await act(async () => {
            fireEvent.change(screen.getByPlaceholderText('Miejsce docelowe'), {
                target: { value: 'Unknown' }
            });
            fireEvent.click(screen.getByText('Wyszukaj'));
        });

        expect(screen.getByText('Brak wyników dla: Unknown')).toBeInTheDocument();
    });
});

type Hotel = {
    PropertyId: number;
    PropertyName: string;
    ReferencePrice: number;
    MaxDiscountPercent: number;
    PropertyAddress: string;
    PropertyImageUrl: string;
    PropertyRating: string;
    TripAdvisorRating: number;
    ReferencePriceCurrency: string;
    DealsFound: number;
    DealWeight: number;
    AvgDiscountPercent: number;
    LocationId: number;
    PropertyLatitude: number;
    PropertyLongitude: number;
    PropertyImageUrlHighRes: string;
    RatingImageUrl: string;
    CheckIn: string | null;
    CheckOut: string | null;
};