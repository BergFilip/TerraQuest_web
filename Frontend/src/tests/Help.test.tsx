import { render, screen, fireEvent } from '@testing-library/react';
import Help from '../sites/Help.tsx';
import FaqSection from '../components/help_section.tsx';
import Button from '../components/Button.tsx';

jest.mock('../components/help_section.tsx', () => ({
    __esModule: true,
    default: jest.fn(() => <div data-testid="faq-mock" />)
}));

jest.mock('../components/Button.tsx', () => ({
    __esModule: true,
    default: jest.fn(({ text }) => <button data-testid="mock-button">{text}</button>)
}));

describe('Help Component', () => {
    beforeEach(() => {
        (FaqSection as jest.Mock).mockClear();
        (Button as jest.Mock).mockClear();
    });

    it('renders correctly', () => {
        render(<Help />);

        expect(screen.getByRole('heading', { name: /Cześć, jak możemy ci pomóc\?/i })).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Zadaj nam pytanie\?/i)).toBeInTheDocument();
        expect(screen.getByTestId('mock-button')).toHaveTextContent('Szukaj');
        expect(screen.getByTestId('faq-mock')).toBeInTheDocument();
    });

    it('renders search form with correct elements', () => {
        render(<Help />);

        const form = screen.getByTestId('search-form');
        expect(form).toBeInTheDocument();

        const searchInput = screen.getByRole('textbox');
        expect(searchInput).toHaveAttribute('name', 'question');
        expect(searchInput).toHaveAttribute('id', 'question');

        const searchIcon = screen.getByTestId('search-icon');
        expect(searchIcon).toBeInTheDocument();
    });

    it('passes correct props to Button component', () => {
        render(<Help />);

        const buttonProps = (Button as jest.Mock).mock.calls[0][0];
        expect(buttonProps).toEqual({
            text: 'Szukaj'
        });
    });

    it('allows typing in search input', () => {
        render(<Help />);

        const input = screen.getByPlaceholderText(/Zadaj nam pytanie\?/i);
        fireEvent.change(input, { target: { value: 'Jak resetować hasło?' } });

        expect(input).toHaveValue('Jak resetować hasło?');
    });
});