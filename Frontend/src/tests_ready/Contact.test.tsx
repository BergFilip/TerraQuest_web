import { render, screen } from '@testing-library/react';
import Contact from '../sites/Contact.tsx';
import ContactForm from '@components/ContactForm.tsx';

jest.mock('@components/ContactForm.tsx', () => ({
    __esModule: true,
    default: jest.fn(() => <div data-testid="contact-form-mock" />)
}));

describe('Contact Component', () => {
    beforeEach(() => {
        (ContactForm as jest.Mock).mockClear();
    });

    it('renders without errors', () => {
        expect(() => render(<Contact />)).not.toThrow();
    });

    it('renders main structure correctly', () => {
        const { container } = render(<Contact />);

        expect(container.querySelector('.contact_site')).toBeInTheDocument();
        expect(container.querySelector('.background')).toBeInTheDocument();
    });

    it('renders ContactForm component', () => {
        render(<Contact />);

        const contactForm = screen.getByTestId('contact-form-mock');
        expect(contactForm).toBeInTheDocument();
    });

    it('passes no props to ContactForm', () => {
        render(<Contact />);

        expect((ContactForm as jest.Mock).mock.calls[0][0]).toEqual({});
    });
});