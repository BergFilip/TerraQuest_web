import { render, screen, within } from '@testing-library/react';
import PrivacyPolicies from '../sites/Privacy_policy.tsx';

describe('PrivacyPolicies', () => {
    test('powinna renderować nagłówek "Polityka Prywatności"', () => {
        render(<PrivacyPolicies />);
        const title = screen.getByRole('heading', { name: /Polityka Prywatności/i });
        expect(title).toBeInTheDocument();
    });

    test('powinna renderować daty wejścia w życie i ostatniej aktualizacji', () => {
        render(<PrivacyPolicies />);
        const entryDate = screen.getByText(/01\.05\.2025/i);
        const lastUpdatedDate = screen.getByText(/30\.04\.2025/i);
        expect(entryDate).toBeInTheDocument();
        expect(lastUpdatedDate).toBeInTheDocument();
    });

    test('powinna renderować sekcję "Postanowienia ogólne"', () => {
        render(<PrivacyPolicies />);
        const generalSection = screen.getByText(/Postanowienia ogólne/i);
        expect(generalSection).toBeInTheDocument();
    });

    test('powinna renderować listę danych, które zbieramy', () => {
        render(<PrivacyPolicies />);
        const listItem = screen.getByText(/Dane identyfikacyjne: imię, nazwisko, nazwa firmy, e-mail, numer telefonu/i);
        expect(listItem).toBeInTheDocument();
    });

    test('powinna renderować e-mail kontaktowy', () => {
        render(<PrivacyPolicies />);
        const contactSection = within(screen.getByTestId('contact-section'));
        const emailLink = contactSection.getByRole('link', { name: /kontakt@travelquest.pl/i });
        expect(emailLink).toBeInTheDocument();
    });

    test('powinna renderować telefon kontaktowy', () => {
        render(<PrivacyPolicies />);
        const phoneNumber = screen.getByText(/📞 Telefon: \+48 123 456 789/i);
        expect(phoneNumber).toBeInTheDocument();
    });

    test('powinna renderować adres fizyczny firmy', () => {
        render(<PrivacyPolicies />);
        const address = screen.getByText(/🏢 Adres: TravelQuest Sp. z o.o., ul. Światowa 12, 00-123 Warszawa/i);
        expect(address).toBeInTheDocument();
    });

    test('powinna renderować sekcję dotyczącą plików cookies', () => {
        render(<PrivacyPolicies />);
        const cookiesSection = screen.getByText(/Pliki cookies/i);
        expect(cookiesSection).toBeInTheDocument();
    });
});
