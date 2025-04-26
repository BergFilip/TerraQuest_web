import { render, screen } from '@testing-library/react';
import Weather from '../sites/Weather.tsx';
import Button from '@components/Button.tsx';

jest.mock('@components/Button.tsx', () => ({
    __esModule: true,
    default: jest.fn(({ text, route }: { text: string; route: string }) => (
        <button data-testid="mock-button" data-route={route}>
            {text}
        </button>
    ))
}));

describe('Weather Component', () => {
    beforeEach(() => {
        (Button as jest.Mock).mockClear();
    });

    it('renders correctly', () => {
        render(<Weather />);

        expect(screen.getByText('Przepraszamy strona jeszcze niedostępna')).toBeInTheDocument();
        expect(screen.getByText('Wróć do strony głównej')).toBeInTheDocument();

        const button = screen.getByTestId('mock-button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent('Powrót');
        expect(button).toHaveAttribute('data-route', '/');
    });

    it('passes correct props to Button component', () => {
        render(<Weather />);

        const firstCall = (Button as jest.Mock).mock.calls[0];
        const buttonProps = firstCall[0];

        expect(buttonProps).toEqual({
            text: 'Powrót',
            route: '/'
        });
    });
});