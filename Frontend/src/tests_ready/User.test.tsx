import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import User from '../sites/User';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

jest.mock('../context/AuthContext');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));
jest.mock('axios');

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockAxios = axios as jest.Mocked<typeof axios>;
const mockNavigate = useNavigate as jest.MockedFunction<typeof useNavigate>;

describe('User Component', () => {
    const mockAuthContext = {
        isLoggedIn: true,
        userEmail: 'test@example.com',
        userFirstName: 'John',
        userLastName: 'Doe',
        userId: '1', // Changed from number to string
        checkAuth: jest.fn().mockResolvedValue(true),
        logout: jest.fn(),
        setUserFirstName: jest.fn(),
        setUserLastName: jest.fn(),
        setUserEmail: jest.fn(),
        login: jest.fn(),
    };

    const mockBookings = [
        {
            id: 1,
            bookingId: 101,
            PropertyName: 'Test Hotel',
            PropertyAddress: 'Test Address',
            CheckIn: '2023-01-01',
            CheckOut: '2023-01-07',
            ReferencePrice: 100,
            ReferencePriceCurrency: 'USD',
            MaxDiscountPercent: 10,
            created_at: '2023-01-01T00:00:00Z',
            PropertyId: 1,
        },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        mockUseAuth.mockReturnValue(mockAuthContext);
        mockNavigate.mockReturnValue(jest.fn());
        mockAxios.get.mockImplementation((url) => {
            if (url.includes('/api/bookings')) {
                return Promise.resolve({ data: mockBookings });
            }
            if (url.includes('/api/auth/user')) {
                return Promise.resolve({
                    data: {
                        newsletter: true,
                        firstName: 'John',
                        lastName: 'Doe'
                    }
                });
            }
            return Promise.reject(new Error('Not found'));
        });
        mockAxios.delete.mockResolvedValue({});
    });

    it('should render loading state initially', async () => {
        mockAuthContext.checkAuth.mockResolvedValueOnce(false);
        render(<User />);
        expect(screen.getByText('Weryfikacja sesji...')).toBeInTheDocument();
    });

    it('should redirect to login if not authenticated', async () => {
        mockAuthContext.checkAuth.mockResolvedValueOnce(false);
        const navigate = jest.fn();
        mockNavigate.mockReturnValueOnce(navigate);

        render(<User />);

        await waitFor(() => {
            expect(navigate).toHaveBeenCalledWith('/login');
        });
    });

    it('should display user information when authenticated', async () => {
        render(<User />);

        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByText('(test@example.com)')).toBeInTheDocument();
        });
    });

    it('should display newsletter', async () => {
        render(<User />);

        await waitFor(() => {
            expect(screen.getByText('Aktywny Newsletter')).toBeInTheDocument();
        });
    });

    it('should fetch and display bookings', async () => {
        render(<User />);

        await waitFor(() => {
            expect(screen.getByText('Test Hotel')).toBeInTheDocument();
            expect(screen.getByText('(Test Address)')).toBeInTheDocument();
            expect(screen.getByText('387.00 PLN')).toBeInTheDocument(); // 100 USD * 4.3 * 0.9
        });
    });

    it('should handle logout', async () => {
        render(<User />);

        await waitFor(() => {
            const logoutButton = screen.getByText('Wyloguj').closest('.setting-item');
            if (logoutButton) {
                fireEvent.click(logoutButton);
            }

            expect(mockAuthContext.logout).toHaveBeenCalled();
            expect(mockNavigate()).toHaveBeenCalledWith('/login');
        });
    });
});