// Updated Newsletter.ZROBIC.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Newsletter from '../sites/Newsletter';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';

// Mock the AuthContext and react-router-dom
jest.mock('../context/AuthContext');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

// Mock the Alert component
jest.mock('../components/Alert', () => (props: any) => (
    <div data-testid="alert-mock">
        <h3>{props.title}</h3>
        <p>{props.message}</p>
        <button onClick={props.onClose}>Close</button>
    </div>
));

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockNavigate = jest.fn();

describe('Newsletter Component', () => {
    beforeEach(() => {
        mockUseAuth.mockReturnValue({
            isLoggedIn: false,
            checkAuth: jest.fn().mockResolvedValue(false),
            userEmail: null,
            userFirstName: '',
            userLastName: '',
            login: jest.fn(),
            logout: jest.fn(),
            setUserEmail: jest.fn(),
            setUserFirstName: jest.fn(),
            setUserLastName: jest.fn(),
        });

        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        render(<Newsletter />);
        expect(screen.getByText('Zapisz się do Newslettera')).toBeInTheDocument();
    });

    it('displays email input and submit button', () => {
        render(<Newsletter />);
        expect(screen.getByPlaceholderText('jan.kowalski@wp.pl')).toBeInTheDocument();
        expect(screen.getByText('Zapisz się')).toBeInTheDocument();
    });

    it('shows error when submitting empty form', async () => {
        render(<Newsletter />);

        // Get the form by its class or test id instead of role
        const form = screen.getByTestId('newsletter-form') ||
            document.querySelector('form') as HTMLFormElement;

        fireEvent.submit(form);

        await waitFor(() => {
            expect(screen.getByText('Email jest wymagany')).toBeInTheDocument();
        });
    });

    it('shows error for invalid email format', async () => {
        render(<Newsletter />);
        const emailInput = screen.getByPlaceholderText('jan.kowalski@wp.pl');
        const form = screen.getByTestId('newsletter-form') ||
            document.querySelector('form') as HTMLFormElement;

        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
        fireEvent.submit(form);

        await waitFor(() => {
            expect(screen.getByText('Proszę podać poprawny adres email')).toBeInTheDocument();
        });
    });

    it('shows login alert when not authenticated', async () => {
        render(<Newsletter />);
        const emailInput = screen.getByPlaceholderText('jan.kowalski@wp.pl');
        const form = screen.getByTestId('newsletter-form') ||
            document.querySelector('form') as HTMLFormElement;

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.submit(form);

        await waitFor(() => {
            expect(screen.getByText('Wymagane logowanie')).toBeInTheDocument();
        });
    });

    it('shows success message when authenticated', async () => {
        mockUseAuth.mockReturnValue({
            isLoggedIn: true,
            checkAuth: jest.fn().mockResolvedValue(true),
            userEmail: 'test@example.com',
            userFirstName: 'Test',
            userLastName: 'User',
            login: jest.fn(),
            logout: jest.fn(),
            setUserEmail: jest.fn(),
            setUserFirstName: jest.fn(),
            setUserLastName: jest.fn(),
        });

        render(<Newsletter />);
        const emailInput = screen.getByPlaceholderText('jan.kowalski@wp.pl');
        const form = screen.getByTestId('newsletter-form') ||
            document.querySelector('form') as HTMLFormElement;

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.submit(form);

        await waitFor(() => {
            expect(screen.getByText('Zapisano pomyślnie!')).toBeInTheDocument();
        });
    });

    it('navigates to login when clicking close on auth required alert', async () => {
        render(<Newsletter />);
        const emailInput = screen.getByPlaceholderText('jan.kowalski@wp.pl');
        const form = screen.getByTestId('newsletter-form') ||
            document.querySelector('form') as HTMLFormElement;

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.submit(form);

        await waitFor(() => {
            const closeButton = screen.getByText('Close');
            fireEvent.click(closeButton);
            expect(mockNavigate).toHaveBeenCalledWith('/login');
        });
    });

    it('disables submit button while submitting', async () => {
        mockUseAuth.mockReturnValue({
            isLoggedIn: true,
            checkAuth: jest.fn().mockImplementation(() => new Promise(() => {})),
            userEmail: 'test@example.com',
            userFirstName: 'Test',
            userLastName: 'User',
            login: jest.fn(),
            logout: jest.fn(),
            setUserEmail: jest.fn(),
            setUserFirstName: jest.fn(),
            setUserLastName: jest.fn(),
        });

        render(<Newsletter />);
        const emailInput = screen.getByPlaceholderText('jan.kowalski@wp.pl');
        const submitButton = screen.getByText('Zapisz się');
        const form = screen.getByTestId('newsletter-form') ||
            document.querySelector('form') as HTMLFormElement;

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.submit(form);

        expect(submitButton).toBeDisabled();
        expect(submitButton).toHaveTextContent('Wysyłanie...');
    });

    it('shows error alert when submission fails', async () => {
        mockUseAuth.mockReturnValue({
            isLoggedIn: true,
            checkAuth: jest.fn().mockRejectedValue(new Error('API error')),
            userEmail: 'test@example.com',
            userFirstName: 'Test',
            userLastName: 'User',
            login: jest.fn(),
            logout: jest.fn(),
            setUserEmail: jest.fn(),
            setUserFirstName: jest.fn(),
            setUserLastName: jest.fn(),
        });

        render(<Newsletter />);
        const emailInput = screen.getByPlaceholderText('jan.kowalski@wp.pl');
        const form = screen.getByTestId('newsletter-form') ||
            document.querySelector('form') as HTMLFormElement;

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.submit(form);

        await waitFor(() => {
            expect(screen.getByText('Błąd!')).toBeInTheDocument();
        });
    });

    it('clears email after successful submission', async () => {
        mockUseAuth.mockReturnValue({
            isLoggedIn: true,
            checkAuth: jest.fn().mockResolvedValue(true),
            userEmail: 'test@example.com',
            userFirstName: 'Test',
            userLastName: 'User',
            login: jest.fn(),
            logout: jest.fn(),
            setUserEmail: jest.fn(),
            setUserFirstName: jest.fn(),
            setUserLastName: jest.fn(),
        });

        render(<Newsletter />);
        const emailInput = screen.getByPlaceholderText('jan.kowalski@wp.pl') as HTMLInputElement;
        const form = screen.getByTestId('newsletter-form') ||
            document.querySelector('form') as HTMLFormElement;

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.submit(form);

        await waitFor(() => {
            expect(emailInput.value).toBe('');
        });
    });
});