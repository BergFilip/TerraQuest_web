import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Help from '../sites/Help';
import '@testing-library/jest-dom';

jest.mock('../components/help_section.tsx', () => {
    return function MockFaqSection(props: { searchTerm: string }) {
        return <div data-testid="faq-section">Mock FAQ Section - Search Term: {props.searchTerm}</div>;
    };
});

describe('Help Component', () => {
    it('renders without crashing', () => {
        render(<Help />);
        expect(screen.getByText('Cześć, jak możemy ci pomóc?')).toBeInTheDocument();
    });

    it('displays the search input with correct placeholder', () => {
        render(<Help />);
        const input = screen.getByPlaceholderText('Wyszukaj pytanie?');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('type', 'text');
    });

    it('updates input value when typing', () => {
        render(<Help />);
        const input = screen.getByPlaceholderText('Wyszukaj pytanie?') as HTMLInputElement;

        fireEvent.change(input, { target: { value: 'płatność' } });
        expect(input.value).toBe('płatność');
    });

    it('passes the search term to FaqSection component', () => {
        render(<Help />);
        const input = screen.getByPlaceholderText('Wyszukaj pytanie?');

        fireEvent.change(input, { target: { value: 'anulowanie' } });

        const faqSection = screen.getByTestId('faq-section');
        expect(faqSection).toHaveTextContent('Mock FAQ Section - Search Term: anulowanie');
    });

    it('displays the search icon', () => {
        render(<Help />);
        const searchIcon = document.querySelector('.fa-magnifying-glass');
        expect(searchIcon).toBeInTheDocument();
    });

    it('maintains proper structure and class names', () => {
        const { container } = render(<Help />);

        expect(container.querySelector('.help_site')).toBeInTheDocument();
        expect(container.querySelector('.section9')).toBeInTheDocument();
        expect(container.querySelector('article')).toBeInTheDocument();
        expect(container.querySelector('.form-row-wrapper')).toBeInTheDocument();
        expect(container.querySelector('.places_section_8')).toBeInTheDocument();
    });
});