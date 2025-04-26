import { render, screen } from '@testing-library/react';
import About from '../sites/About.tsx';
import Button from '@components/Button.tsx';

jest.mock('@components/Button.tsx', () => ({
    __esModule: true,
    default: jest.fn(({ text }) => <button data-testid="mock-button">{text}</button>)
}));

describe('About Component', () => {
    beforeEach(() => {
        (Button as jest.Mock).mockClear();
    });

    it('renders without errors', () => {
        expect(() => render(<About />)).not.toThrow();
    });

    it('renders main sections correctly', () => {
        render(<About />);

        expect(screen.getByText('Nasza misja')).toBeInTheDocument();
        expect(screen.getByText('O TerraQuest')).toBeInTheDocument();
        expect(screen.getByText('Nasza Historia')).toBeInTheDocument();
    });

    it('displays mission statement correctly', () => {
        render(<About />);

        const missionText = screen.getByText(/Kiedy podróżni szukają hotelu/i);
        expect(missionText).toBeInTheDocument();
    });

    it('renders TerraQuest description correctly', () => {
        render(<About />);

        expect(screen.getByText(/Profesjonalny i elegancki wydźwięk/i)).toBeInTheDocument();
        expect(screen.getByText(/Łatwość zapamiętania/i)).toBeInTheDocument();
        expect(screen.getByText(/Uniwersalność/i)).toBeInTheDocument();
    });

    it('renders statistics section correctly', () => {
        render(<About />);

        expect(screen.getByText('5 mil')).toBeInTheDocument();
        expect(screen.getByText(/hotele/i)).toBeInTheDocument();
        expect(screen.getByText('190')).toBeInTheDocument();
        expect(screen.getByText('kraje')).toBeInTheDocument();
        expect(screen.getByText('53')).toBeInTheDocument();
        expect(screen.getByText(/strony internetowe/i)).toBeInTheDocument();
        expect(screen.getByText('31')).toBeInTheDocument();
        expect(screen.getByText('języki')).toBeInTheDocument();
    });

    it('renders timeline with historical events', () => {
        render(<About />);

        expect(screen.getByText('Narodziny pomysłu TerraQuest')).toBeInTheDocument();
        expect(screen.getByText(/TerraQuest zostaje założony/i)).toBeInTheDocument();
        expect(screen.getByText('Przejęcie weekend.com')).toBeInTheDocument();
    });

    it('has proper CSS classes', () => {
        const { container } = render(<About />);

        expect(container.querySelector('.About_section')).toBeInTheDocument();
        expect(container.querySelector('.our_mission')).toBeInTheDocument();
        expect(container.querySelector('.about_terraquest')).toBeInTheDocument();
        expect(container.querySelector('.info')).toBeInTheDocument();
        expect(container.querySelector('.history')).toBeInTheDocument();
    });
});