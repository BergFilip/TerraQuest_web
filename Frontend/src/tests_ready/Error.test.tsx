import { render, screen } from '@testing-library/react';
import Error from '../sites/Error.tsx';
import Button from '@components/Button.tsx';

jest.mock('@components/Button.tsx', () => ({
    __esModule: true,
    default: jest.fn(({ text, route }) => (
        <button data-testid="mock-button" data-route={route}>
            {text}
        </button>
    ))
}));

describe('Error Component', () => {
    beforeEach(() => {
        (Button as jest.Mock).mockClear();
    });

    it('renders correctly with error message', () => {
        render(<Error />);

        expect(screen.getByText('Nie znaleziono strony')).toBeInTheDocument();
        expect(screen.getByText('Wróć do strony głównej')).toBeInTheDocument();

        const button = screen.getByTestId('mock-button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent('Powrót');
        expect(button).toHaveAttribute('data-route', '/');
    });

    it('passes correct props to Button component', () => {
        render(<Error />);

        const buttonProps = (Button as jest.Mock).mock.calls[0][0];
        expect(buttonProps).toEqual({
            text: 'Powrót',
            route: '/'
        });
    });

    it('has proper CSS classes', () => {
        const { container } = render(<Error />);

        expect(container.querySelector('.error')).toBeInTheDocument();
        expect(container.querySelector('.back')).toBeInTheDocument();
    });
});