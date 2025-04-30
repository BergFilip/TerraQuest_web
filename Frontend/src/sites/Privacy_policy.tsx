import "../styles/sites/Privacy_policy.scss"

function PrivacyPolicies() {
    return(
        <div className="privacy">
            <h1>Polityka Prywatności</h1>
            <div className="container">

                <div className="update">
                    <p><strong>Data wejścia w życie:</strong> 01.05.2025</p>
                    <p><strong>Ostatnia aktualizacja:</strong> 30.04.2025</p>
                </div>


                <h2>1. Postanowienia ogólne</h2>
                <p>Niniejsza Polityka Prywatności określa zasady przetwarzania danych osobowych użytkowników
                    korzystających z usług TravelQuest.</p>
                <p><strong>Administrator danych:</strong> TravelQuest Sp. z o.o., ul. Światowa 12, 00-123 Warszawa,
                    kontakt@travelquest.pl, tel. +48 123 456 789.</p>

                <h2>2. Jakie dane zbieramy?</h2>
                <ul>
                    <li>Dane identyfikacyjne: imię, nazwisko, nazwa firmy, e-mail, numer telefonu.</li>
                    <li>Dane logowania: nazwa użytkownika, zaszyfrowane hasło.</li>
                    <li>Dane kontaktowe: adres zamieszkania, adres dostawy.</li>
                    <li>Dane płatnicze: numer konta bankowego, dane karty płatniczej (PayU, Stripe).</li>
                    <li>Dane techniczne: adres IP, pliki cookie, aktywność na stronie.</li>
                </ul>

                <h2>3. W jakim celu przetwarzamy Twoje dane?</h2>
                <ul>
                    <li>Świadczenie usług – rejestracja konta, realizacja rezerwacji.</li>
                    <li>Obsługa płatności – przetwarzanie transakcji.</li>
                    <li>Obsługa zapytań i reklamacji.</li>
                    <li>Marketing i newslettery – za zgodą użytkownika.</li>
                    <li>Personalizacja treści.</li>
                    <li>Analiza i statystyki.</li>
                    <li>Wypełnienie obowiązków prawnych.</li>
                </ul>

                <h2>4. Podstawa prawna przetwarzania danych</h2>
                <ul>
                    <li>Art. 6 ust. 1 lit. a RODO – zgoda użytkownika.</li>
                    <li>Art. 6 ust. 1 lit. b RODO – wykonanie umowy.</li>
                    <li>Art. 6 ust. 1 lit. c RODO – obowiązki prawne.</li>
                    <li>Art. 6 ust. 1 lit. f RODO – uzasadniony interes administratora.</li>
                </ul>

                <h2>5. Komu udostępniamy Twoje dane?</h2>
                <ul>
                    <li>Dostawcy usług IT – AWS, Cloudflare.</li>
                    <li>Dostawcy płatności – PayU, Stripe.</li>
                    <li>Firmy kurierskie – InPost, DHL.</li>
                    <li>Organy ścigania – na podstawie przepisów prawa.</li>
                </ul>

                <h2>6. Jak długo przechowujemy Twoje dane?</h2>
                <ul>
                    <li>Dane konta – do usunięcia konta lub 5 lat od ostatniej aktywności.</li>
                    <li>Dane transakcji – zgodnie z przepisami podatkowymi (5 lat).</li>
                    <li>Dane marketingowe – do wycofania zgody.</li>
                    <li>Logi serwera – do 12 miesięcy.</li>
                </ul>

                <h2>7. Jakie masz prawa?</h2>
                <ul>
                    <li>Dostęp do danych.</li>
                    <li>Sprostowanie danych.</li>
                    <li>Usunięcie danych („prawo do bycia zapomnianym”).</li>
                    <li>Ograniczenie przetwarzania.</li>
                    <li>Przenoszenie danych.</li>
                    <li>Sprzeciw wobec przetwarzania.</li>
                    <li>Wycofanie zgody.</li>
                </ul>

                <h2>8. Pliki cookies i technologie śledzące</h2>
                <p>Nasza strona korzysta z plików cookies do poprawnego działania, analizy ruchu i personalizacji
                    treści.</p>

                <h2>9. Zmiany w Polityce Prywatności</h2>
                <p>Możemy wprowadzać zmiany w Polityce Prywatności. Użytkownicy zostaną o nich poinformowani na stronie
                    lub e-mailem.</p>

                <h2>10. Kontakt</h2>
                <section data-testid="contact-section">
                    <p>📧 E-mail: <a href="mailto:kontakt@travelquest.pl">kontakt@travelquest.pl</a></p>
                    <p>📞 Telefon: +48 123 456 789</p>
                    <p>🏢 Adres: TravelQuest Sp. z o.o., ul. Światowa 12, 00-123 Warszawa</p>
                </section>
            </div>
        </div>
    );
}

export default PrivacyPolicies;