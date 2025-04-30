import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../sites/Login';
import { MemoryRouter } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

jest.mock('../context/AuthContext', () => ({
    useAuth: jest.fn(),
}));

const mockLogin = jest.fn();
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ login: mockLogin });
});

describe('Login', () => {
    it('renders inputs and button', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Hasło/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Zaloguj się/i })).toBeInTheDocument();
        expect(screen.getByText(/Stwórz konto/i)).toBeInTheDocument();
    });

    it('lets user type email and password', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        const emailInput = screen.getByLabelText(/Email/i) as HTMLInputElement;
        const passwordInput = screen.getByLabelText(/Hasło/i) as HTMLInputElement;

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(emailInput.value).toBe('test@example.com');
        expect(passwordInput.value).toBe('password123');
    });

    it('successful login redirects user', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({}),
            })
        ) as jest.Mock;

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/Hasło/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /Zaloguj się/i }));

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith('test@example.com');
            expect(mockNavigate).toHaveBeenCalledWith('/user');
        });
    });

    it('shows error on failed login', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ message: 'Niepoprawne dane' }),
            })
        ) as jest.Mock;

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'wrong@example.com' } });
        fireEvent.change(screen.getByLabelText(/Hasło/i), { target: { value: 'wrongpassword' } });
        fireEvent.click(screen.getByRole('button', { name: /Zaloguj się/i }));

        expect(await screen.findByText('Niepoprawne dane')).toBeInTheDocument();
    });

    it('shows generic error if fetch throws', async () => {
        global.fetch = jest.fn(() => Promise.reject(new Error('Network Error'))) as jest.Mock;

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/Hasło/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /Zaloguj się/i }));

        expect(await screen.findByText('Błędne logowanie')).toBeInTheDocument();
    });
});
