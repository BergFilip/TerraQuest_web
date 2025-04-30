import React, { ReactNode } from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../context/AuthContext.tsx';
import '@testing-library/jest-dom';

global.fetch = jest.fn() as jest.Mock;

const TestComponent = () => {
    const {
        isLoggedIn,
        userEmail,
        userFirstName,
        userLastName,
        login,
        logout,
        checkAuth,
        setUserEmail,
        setUserFirstName,
        setUserLastName,
    } = useAuth();

    return (
        <div>
            <div data-testid="isLoggedIn">{isLoggedIn.toString()}</div>
            <div data-testid="userEmail">{userEmail}</div>
            <div data-testid="userFirstName">{userFirstName}</div>
            <div data-testid="userLastName">{userLastName}</div>
            <button onClick={() => login('test@example.com')}>Login</button>
            <button onClick={() => logout()}>Logout</button>
            <button onClick={() => checkAuth()}>Check Auth</button>
            <button onClick={() => setUserEmail('new@example.com')}>Set Email</button>
            <button onClick={() => setUserFirstName('John')}>Set First Name</button>
            <button onClick={() => setUserLastName('Doe')}>Set Last Name</button>
        </div>
    );
};

const renderAuthProvider = () => {
    return render(
        <AuthProvider>
            <TestComponent />
        </AuthProvider>
    );
};

describe('AuthContext', () => {
    beforeEach(() => {
        (fetch as jest.Mock).mockClear();
    });

    it('should provide initial auth state', () => {
        renderAuthProvider();

        expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('false');
        expect(screen.getByTestId('userEmail')).toHaveTextContent('');
        expect(screen.getByTestId('userFirstName')).toHaveTextContent('');
        expect(screen.getByTestId('userLastName')).toHaveTextContent('');
    });

    it('should throw error when useAuth is used outside AuthProvider', () => {
        expect(() => render(<TestComponent />)).toThrow(
            'useAuth must be used within an AuthProvider'
        );
    });

    it('should login and update state', () => {
        renderAuthProvider();

        act(() => {
            screen.getByText('Login').click();
        });

        expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('true');
        expect(screen.getByTestId('userEmail')).toHaveTextContent('test@example.com');
    });

    it('should logout and reset state', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

        renderAuthProvider();

        act(() => {
            screen.getByText('Login').click();
        });

        await act(async () => {
            screen.getByText('Logout').click();
        });

        expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('false');
        expect(screen.getByTestId('userEmail')).toHaveTextContent('');
        expect(screen.getByTestId('userFirstName')).toHaveTextContent('');
        expect(screen.getByTestId('userLastName')).toHaveTextContent('');
    });

    it('should check auth and update state if authenticated', async () => {
        const mockUser = {
            email: 'auth@example.com',
            firstName: 'Auth',
            lastName: 'User',
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockUser),
        });

        renderAuthProvider();

        await act(async () => {
            screen.getByText('Check Auth').click();
        });

        expect(fetch).toHaveBeenCalledWith('http://localhost:5000/api/auth/user', {
            method: 'GET',
            credentials: 'include',
        });

        await waitFor(() => {
            expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('true');
            expect(screen.getByTestId('userEmail')).toHaveTextContent(mockUser.email);
            expect(screen.getByTestId('userFirstName')).toHaveTextContent(mockUser.firstName);
            expect(screen.getByTestId('userLastName')).toHaveTextContent(mockUser.lastName);
        });
    });

    it('should check auth and not update state if not authenticated', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
        });

        renderAuthProvider();

        await act(async () => {
            screen.getByText('Check Auth').click();
        });

        expect(fetch).toHaveBeenCalledWith('http://localhost:5000/api/auth/user', {
            method: 'GET',
            credentials: 'include',
        });

        await waitFor(() => {
            expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('false');
            expect(screen.getByTestId('userEmail')).toHaveTextContent('');
        });
    });

    it('should handle check auth error', async () => {
        (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

        renderAuthProvider();

        await act(async () => {
            screen.getByText('Check Auth').click();
        });

        expect(fetch).toHaveBeenCalledWith('http://localhost:5000/api/auth/user', {
            method: 'GET',
            credentials: 'include',
        });

        await waitFor(() => {
            expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('false');
        });
    });

    it('should set user email', () => {
        renderAuthProvider();

        act(() => {
            screen.getByText('Set Email').click();
        });

        expect(screen.getByTestId('userEmail')).toHaveTextContent('new@example.com');
    });

    it('should set user first name', () => {
        renderAuthProvider();

        act(() => {
            screen.getByText('Set First Name').click();
        });

        expect(screen.getByTestId('userFirstName')).toHaveTextContent('John');
    });

    it('should set user last name', () => {
        renderAuthProvider();

        act(() => {
            screen.getByText('Set Last Name').click();
        });

        expect(screen.getByTestId('userLastName')).toHaveTextContent('Doe');
    });

    it('should perform auth check on mount', async () => {
        const mockUser = {
            email: 'mount@example.com',
            firstName: 'Mount',
            lastName: 'Test',
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockUser),
        });

        renderAuthProvider();

        expect(fetch).toHaveBeenCalledWith('http://localhost:5000/api/auth/user', {
            method: 'GET',
            credentials: 'include',
        });

        await waitFor(() => {
            expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('true');
            expect(screen.getByTestId('userEmail')).toHaveTextContent(mockUser.email);
        });
    });
});