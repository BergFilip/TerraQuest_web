import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Newsletter from '../sites/Newsletter';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('../context/AuthContext');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockNavigate = useNavigate as jest.MockedFunction<typeof useNavigate>;
const mockFetch = jest.fn();

describe('Newsletter Component', () => {
    const completeAuthContext = {
        isLoggedIn: true,
        userEmail: 'test@example.com',
        userFirstName: 'John',
        userLastName: 'Doe',
        userId: '1',
        checkAuth: jest.fn().mockResolvedValue(true),
        logout: jest.fn(),
        setUserFirstName: jest.fn(),
        setUserLastName: jest.fn(),
        setUserEmail: jest.fn(),
        login: jest.fn()
    };

    beforeEach(() => {
        global.fetch = mockFetch;
        mockUseAuth.mockReturnValue(completeAuthContext);
        mockNavigate.mockReturnValue(jest.fn());
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render the newsletter form', () => {
        render(<Newsletter />);
        expect(screen.getByText('Zapisz się do Newslettera')).toBeInTheDocument();
        expect(screen.getByText('nie pozwól, aby ominęły cię promocje i nowe atrakcje')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('jan.kowalski@wp.pl')).toBeInTheDocument();
        expect(screen.getByText('Zapisz się')).toBeInTheDocument();
    });

    it('should pre-fill email if user is logged in', async () => {
        render(<Newsletter />);
        expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
    });
    it('should render the email input with correct attributes', () => {
        render(<Newsletter />);
        const emailInput = screen.getByPlaceholderText('jan.kowalski@wp.pl');
        expect(emailInput).toHaveAttribute('type', 'email');
        expect(emailInput).toHaveAttribute('placeholder', 'jan.kowalski@wp.pl');
    });

    it('should render the submit button with correct attributes', () => {
        render(<Newsletter />);
        const submitButton = screen.getByText('Zapisz się');
        expect(submitButton).toHaveAttribute('type', 'submit');
        expect(submitButton).toHaveClass('alert-button');
    });

    it('should render the main container with correct classes', () => {
        render(<Newsletter />);
        const mainContainer = screen.getByRole('main');
        expect(mainContainer).toHaveClass('Main_Newsletter');
    });

    it('should render the input wrapper with correct styling', () => {
        render(<Newsletter />);
        const inputWrapper = screen.getByTestId('input-wrapper');
        expect(inputWrapper).toHaveClass('input-wrapper');
    });

    it('should not show alert by default', () => {
        render(<Newsletter />);
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('should render the form with proper accessibility attributes', () => {
        render(<Newsletter />);
        const form = screen.getByTestId('newsletter-form');
        expect(form).toHaveAttribute('aria-label', 'Newsletter subscription form');
    });
});