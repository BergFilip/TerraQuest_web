import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Product from '../sites/Product';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import '@testing-library/jest-dom';

jest.mock('../context/AuthContext');
jest.mock('axios');

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('Product Component', () => {
    const mockHotel = {
        PropertyName: 'Test Hotel',
        PropertyAddress: 'Test Address',
        PropertyRating: 4.5,
        PropertyImageUrlHighRes: 'test-image.jpg',
        ReferencePrice: 100,
        ReferencePriceCurrency: 'USD',
        MaxDiscountPercent: 10
    };

    const mockReviews = [
        {
            title: 'Great stay',
            description: 'Excellent service',
            reviewer: 'John Doe',
            date: '2023-01-01',
            rating: 5,
            image: 'reviewer1.jpg'
        }
    ];

    beforeEach(() => {
        Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockHotel));

        mockUseAuth.mockReturnValue({
            isLoggedIn: true,
            userEmail: 'test@example.com',
            userFirstName: 'John',
            userLastName: 'Doe',
            userId: '1',
            checkAuth: jest.fn(),
            logout: jest.fn(),
            setUserFirstName: jest.fn(),
            setUserLastName: jest.fn(),
            setUserEmail: jest.fn(),
            login: jest.fn()
        });

        mockAxios.get.mockImplementation((url) => {
            if (url.includes('/api/reviews')) {
                return Promise.resolve({ data: mockReviews });
            }
            return Promise.reject(new Error('Not found'));
        });

        mockAxios.post.mockResolvedValue({ data: {} });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render loading state initially', async () => {
        Storage.prototype.getItem = jest.fn(() => null);
        render(<Product />);
        expect(screen.getByText('Ładowanie danych hotelu...')).toBeInTheDocument();
    });

    it('should display hotel information when loaded', async () => {
        render(<Product />);

        await waitFor(() => {
            expect(screen.getByText(mockHotel.PropertyName)).toBeInTheDocument();
            expect(screen.getByText(`(${mockHotel.PropertyAddress})`)).toBeInTheDocument();
            expect(screen.getByText('za 1 noc')).toBeInTheDocument();
            expect(screen.getByText('387.00 PLN')).toBeInTheDocument(); // Discounted price
            expect(screen.getByText('430.00 PLN')).toBeInTheDocument(); // Original price
        });
    });

    it('should display amenities section', async () => {
        render(<Product />);

        await waitFor(() => {
            expect(screen.getByText('Najlepsze udogodnienia')).toBeInTheDocument();
            expect(screen.getByText('Wi-Fi w lobby')).toBeInTheDocument();
            expect(screen.getByText('Restauracja')).toBeInTheDocument();
        });
    });

    it('should display hotel description', async () => {
        render(<Product />);

        await waitFor(() => {
            const description = `${mockHotel.PropertyName} to ${mockHotel.PropertyAddress}. Posiada ${mockHotel.PropertyRating} gwiazdek i oferuje wyjątkowe udogodnienia, takie jak basen, restauracja i wiele innych. Idealne miejsce na odpoczynek.`;
            expect(screen.getByText(description)).toBeInTheDocument();
        });
    });

    it('should fetch and display reviews', async () => {
        render(<Product />);

        await waitFor(() => {
            expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:5000/api/reviews');
            expect(screen.getByText('Oceny klientów')).toBeInTheDocument();
            expect(screen.getByText('Statystyki mówią same za siebie')).toBeInTheDocument();
        });
    });

    it('should show loading state for reviews', async () => {
        mockAxios.get.mockImplementationOnce(() => new Promise(() => {}));
        render(<Product />);

        await waitFor(() => {
            expect(screen.getByText('Ładowanie recenzji...')).toBeInTheDocument();
        });
    });

    describe('Reservation functionality', () => {
        it('should allow reservation when logged in', async () => {
            render(<Product />);

            await waitFor(() => {
                fireEvent.click(screen.getByText('Zarezerwuj'));
            });

            expect(mockAxios.post).toHaveBeenCalledWith(
                'http://localhost:5000/api/reservations',
                expect.objectContaining({
                    userEmail: 'test@example.com',
                    hotel: mockHotel
                }),
                { withCredentials: true }
            );
        });

        it('should handle reservation error', async () => {
            const errorMessage = 'Reservation failed';
            mockAxios.post.mockRejectedValueOnce({
                response: { data: { message: errorMessage } }
            });

            window.alert = jest.fn();
            render(<Product />);

            await waitFor(() => {
                fireEvent.click(screen.getByText('Zarezerwuj'));
            });

            expect(window.alert).toHaveBeenCalledWith(expect.stringContaining(errorMessage));
        });
    });

    it('should calculate prices correctly', async () => {
        render(<Product />);

        await waitFor(() => {
            expect(screen.getByText('430.00 PLN')).toBeInTheDocument();
            expect(screen.getByText('387.00 PLN')).toBeInTheDocument();
        });
    });
});