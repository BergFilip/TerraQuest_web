import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from '../sites/Registration';
import { AuthProvider } from '../context/AuthContext';

jest.fn()

function renderWithRouterAndAuth(ui: React.ReactNode) {
    return render(
        <AuthProvider>
            <BrowserRouter>
                {ui}
            </BrowserRouter>
        </AuthProvider>
    );
}

describe('Register component', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
        jest.clearAllMocks()
    });

    it('should render inputs, checkbox and button', () => {
        renderWithRouterAndAuth(<Register />);

        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Hasło/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Zaloguj automatycznie/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Stwórz konto/i })).toBeInTheDocument();
    });

    it('should allow typing into email and password inputs', () => {
        renderWithRouterAndAuth(<Register />);

        const emailInput = screen.getByLabelText(/Email/i);
        const passwordInput = screen.getByLabelText(/Hasło/i);

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(emailInput).toHaveValue('test@example.com');
        expect(passwordInput).toHaveValue('password123');
    });

    it('should toggle checkbox state', () => {
        renderWithRouterAndAuth(<Register />);

        const checkbox = screen.getByLabelText(/Zaloguj automatycznie/i);

        expect(checkbox).not.toBeChecked();

        fireEvent.click(checkbox);

        expect(checkbox).toBeChecked();
    });
});
