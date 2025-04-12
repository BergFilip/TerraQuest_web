import { render, screen, fireEvent } from '@testing-library/react';
import Newsletter from '../sites/Newsletter.tsx';
import Alert from '../components/Alert.tsx';
import { useState } from 'react';

jest.mock('../components/Alert.tsx', () => ({
    __esModule: true,
    default: jest.fn(() => null)
}));

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

describe('Newsletter Component', () => {
    const setShowAlertMock = jest.fn();

    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(init => [init, setShowAlertMock]);
        (Alert as jest.Mock).mockClear();
        setShowAlertMock.mockClear();
    });

    it('renders correctly', () => {
        render(<Newsletter />);

        expect(screen.getByRole('heading', { name: /Zapisz się do Newslettera/i })).toBeInTheDocument();
        expect(screen.getByText(/nie pozwól, aby ominęły cię promocje/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText('jan.kowalski@wp.pl')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Zapisz się/i })).toBeInTheDocument();
    });

    it('shows alert when submit button is clicked', () => {
        render(<Newsletter />);
        fireEvent.click(screen.getByRole('button', { name: /Zapisz się/i }));
        expect(setShowAlertMock).toHaveBeenCalledWith(true);
    });

    it('passes correct props to Alert when visible', () => {
        (useState as jest.Mock).mockImplementationOnce(() => [true, setShowAlertMock]);
        render(<Newsletter />);

        const alertProps = (Alert as jest.Mock).mock.calls[0][0];
        expect(alertProps.title).toBe('Zgłoszono pomyślnie');
        expect(alertProps.message).toMatch(/Dziękujemy za zapisanie się/);
        expect(alertProps.onClose).toEqual(expect.any(Function));
    });

    it('hides alert when onClose is called', () => {
        (useState as jest.Mock).mockImplementationOnce(() => [true, setShowAlertMock]);
        render(<Newsletter />);

        const alertProps = (Alert as jest.Mock).mock.calls[0][0];
        alertProps.onClose();
        expect(setShowAlertMock).toHaveBeenCalledWith(false);
    });
});