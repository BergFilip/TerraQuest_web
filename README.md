<div style="display: flex; align-items: center; gap: 10px;">
  <img src="./src/assets/terraquest.webp" alt="Mapa strony" width="100">
  <h1 style="color:gold; margin: 0;">TerraQuest</h1>
</div>

TerraQuest to platforma rezerwacyjna, która umożliwia użytkownikom łatwe wyszukiwanie, rezerwowanie oraz ocenianie obiektów noclegowych takich jak hotele, apartamenty, hostele i inne. Dzięki TerraQuest użytkownicy mogą szybko i wygodnie znaleźć idealne miejsce na wypoczynek, a także zarządzać swoimi rezerwacjami w jednym miejscu.

Nasza platforma oferuje intuicyjny interfejs, system oceny obiektów oraz filtry wyszukiwania, wszystko po to, aby ułatwić użytkownikom planowanie podróży i rezerwację noclegów.

---

# 🔧 Technologie

- **Frontend:** React.js, SCSS
- **Backend:** Node.js, Express.js
- **Baza danych:** 

---

# 🧑‍💻 Funkcjonalności

- ✅ **Rejestracja i logowanie użytkownika**  
  Użytkownicy mogą się zarejestrować, zalogować i zarządzać swoimi danymi.

- ✅ **Wyszukiwanie dostępnych obiektów**  
  Użytkownicy mogą wyszukiwać dostępne hotele, apartamenty i inne obiekty według daty, lokalizacji, ceny i oceny.

- ✅ **Rezerwacja obiektów**  
  Użytkownicy mogą dokonywać rezerwacji obiektów na określony czas.

- ✅ **Zarządzanie rezerwacjami**  
  Użytkownicy mogą przeglądać, edytować lub anulować swoje rezerwacje.

- ✅ **Ocenianie i recenzowanie obiektów**  
  Po zakończeniu pobytu użytkownicy mogą oceniać obiekty oraz zostawiać opinie.

- ✅ **Filtrowanie obiektów po różnych kryteriach**  
  Możliwość filtrowania obiektów np. po cenie, ocenie, dostępności, rodzaju obiektu (hotel, apartament, hostel).

- ✅ **Bezpieczne przechowywanie haseł (bcrypt)**  
  Hasła użytkowników są bezpiecznie przechowywane przy pomocy algorytmu `????`.

- ✅ **Podstawowa administracja**  
  Administratorzy mogą zarządzać obiektami (dodawanie nowych, edytowanie, usuwanie).

---

# ⚙️ Instalacja
**📥 Krok 1 – Klonowanie repozytorium**
   ```bash
      git clone https://github.com/BergFilip/TerraQuest_web.git
   ```
**⬇️ Krok 2 – Przejście do projektu**
   ```bash
      cd TerraQuest
   ```
**📦 Krok 3 – Instalacja zależności**
   ```bash
      npm install
   ```
**▶️ Krok 4 – Uruchomienie aplikacji**
   ```bash
      npm run dev
   ```
**🌐 Po chwili aplikacja będzie dostępna pod adresem:**
   ```bash
      http://localhost:5173
   ```

---

# Podział pracy w projekcie TerraQuest

## Frontend

### `src`

- **App.scss**: [Każdy]
- **App.tsx**: [Każdy]
- **index.scss**: [Każdy]
- **main.tsx**: [Każdy]

#### `sites`
- **About.tsx**: [Filip]
- **Contact.tsx**: [Filip]
- **Error.tsx**: [Filip]
- **Explore.tsx**: [Wiktor]
- **Help.tsx**: [Filip]
- **Home.tsx**: [Wiktor]
- **Login.tsx**: [Wiktor]
- **Newsletter.tsx**: [Filip]
- **Privacy_policy.tsx**: [Wiktor]
- **Product.tsx**: [Jacek]
- **Registration.tsx**: [Wiktor]
- **Search.tsx**: [Imię]
- **User.tsx**: [Jacek]
- **Weather.tsx**: [Filip]

#### `styles`
- **About.scss**: [Filip]
- **Contact.scss**: [Filip]
- **Error.scss**: [Filip]
- **Help.scss**: [Filip]
- **Home.scss**: [Wiktor]
- **Login.scss**: [Wiktor]
- **Newsletter.scss**: [Filip]
- **Privacy_policy.scss**: [Wiktor]
- **Product.scss**: [Jacek]
- **Register.scss**: [Wiktor]
- **User.scss**: [Jacek]

---

## Backend



---

## Baza danych



---

## Testowanie



---

## Dokumentacja

- **Przygotowanie dokumentacji technicznej**: [Każdy]

---

# 🌐 Opis podstron

### 🧩 `App.tsx` – [Każdy]
- **Opis**:  
  Główny komponent aplikacji. Odpowiada za strukturę routingu i layout globalny.
- **Funkcje**:
  - Ustawienie tras (React Router)
  - Globalne komponenty (np. Header, Footer)
- **Zależności**: `main.tsx`, `routes`, `components`

---

### 🌐 `main.tsx` – [Każdy]
- **Opis**:  
  Punkt wejściowy aplikacji. Renderuje aplikację do DOM.
- **Funkcje**:
  - Montowanie `<App />`
  - Konfiguracja `React.StrictMode`

---

### 📘 `About.tsx` – [Filip]
- **Opis**:  
  Strona informacyjna o projekcie lub firmie.
- **Zawiera**: tekst + ilustracje

---

### 📩 `Contact.tsx` – [Filip]
- **Opis**:  
  Formularz kontaktowy + dane kontaktowe
- **Funkcje**:
  - Walidacja formularza
  - Możliwość wysłania wiadomości

---

### 🚧 `Error.tsx` – [Filip]
- **Opis**:  
  Strona błędu 404 lub innego – wyświetlana gdy trasa nie istnieje
- **Funkcje**:
  - Przekierowanie do Home
  - Komunikat dla użytkownika

---

### 🔍 `Explore.tsx` – [Wiktor]
- **Opis**:  
  Strona eksploracji miejsc – propozycje podróży, ciekawe lokalizacje
- **Funkcje**:
  - Interaktywne kafelki
  - Dynamiczne generowanie treści

---

### ❓ `Help.tsx` – [Filip]
- **Opis**:  
  FAQ lub sekcja z pomocą dla użytkownika
- **Funkcje**:
  - Rozwijane pytania
  - Stylowanie UX-friendly

---

### 🏠 `Home.tsx` – [Wiktor]
- **Opis**:  
  Strona główna, landing page projektu
- **Zawiera**:
  - Banery
  - Sekcje promujące funkcje
  - Nawigacja do reszty podstron

---

### 🔐 `Login.tsx` – [Wiktor]
- **Opis**:  
  Formularz logowania
- **Funkcje**:
  - Walidacja danych
  - Obsługa błędów

---

### 📬 `Newsletter.tsx` – [Filip]
- **Opis**:  
  Subskrypcja newslettera
- **Funkcje**:
  - Walidacja e-mail
  - Obsługa potwierdzeń

---

### 🛡️ `Privacy_policy.tsx` – [Wiktor]
- **Opis**:  
  Polityka prywatności
- **Zawiera**:
  - Tekst statyczny
  - Linki do zewnętrznych dokumentów

---

### 📦 `Product.tsx` – [Jacek]
- **Opis**:  
  Widok konkretnego produktu/oferty
- **Funkcje**:
  - Pobieranie danych z API
  - Wyświetlanie szczegółów

---

### 📝 `Registration.tsx` – [Wiktor]
- **Opis**:  
  Rejestracja nowego użytkownika
- **Funkcje**:
  - Walidacja formularza
  - Hashowanie hasła (back-end)

---

### 🔎 `Search.tsx` – [Imię]
- **Opis**:  
  Strona wyszukiwania miejsc/ofert
- **Funkcje**:
  - Filtry
  - Sortowanie
  - Integracja z back-endem

---

### 👤 `User.tsx` – [Jacek]
- **Opis**:  
  Profil użytkownika
- **Funkcje**:
  - Edycja danych
  - Historia rezerwacji

---

### ☀️ `Weather.tsx` – [Filip]
- **Opis**:  
  Praca wtoku

---

## 📂 Struktura projektu

<pre>
TerraQuest
├── eslint.config.js
├── index.html
├── node_modules
├── package-lock.json
├── package.json
├── public
├── README.md
├── src
│     ├── App.scss
│     ├── App.tsx
│     ├── assets
│     │       ├── 404_error.webp
│     │       ├── about.webp
│     │       ├── baner_explore.webp
│     │       ├── baner_search.webp
│     │       ├── baner_weather.webp
│     │       ├── home.webp
│     │       ├── kompas.webp
│     │       ├── kontakt.webp
│     │       ├── logowanie.webp
│     │       ├── miesiace.webp
│     │       ├── newsletter.webp
│     │       ├── react.svg
│     │       ├── rejestracja.webp
│     │       ├── terraquest.webp
│     │       └── terraquest_baner_promocja.webp
│     ├── components
│     │       ├── Alert.tsx
│     │       ├── Button.tsx
│     │       ├── card.tsx
│     │       ├── Communicats.tsx
│     │       ├── ContactForm.tsx
│     │       ├── Footer.tsx
│     │       ├── h-section.tsx
│     │       ├── Header.tsx
│     │       ├── help_section.tsx
│     │       ├── logo.tsx
│     │       ├── Nav.tsx
│     │       ├── places_section_1.tsx
│     │       ├── places_section_2.tsx
│     │       ├── places_section_3.tsx
│     │       ├── places_section_4.tsx
│     │       ├── places_section_5.tsx
│     │       ├── places_section_6.tsx
│     │       ├── places_section_7.tsx
│     │       └── regis_log_btn.tsx
│     ├── index.scss
│     ├── main.tsx
│     ├── sites
│     │    ├── About.tsx
│     │    ├── Contact.tsx
│     │    ├── Error.tsx
│     │    ├── Explore.tsx
│     │    ├── Help.tsx
│     │    ├── Home.tsx
│     │    ├── Login.tsx
│     │    ├── Newsletter.tsx
│     │    ├── Privacy_policy.tsx
│     │    ├── Product.tsx
│     │    ├── Registration.tsx
│     │    ├── Search.tsx
│     │    ├── User.tsx
│     │    └── Weather.tsx
│     ├── styles
│     │    ├── components
│     │    │      ├── Alert.scss
│     │    │      ├── button.scss
│     │    │      ├── card.scss
│     │    │      ├── ContactForm.module.scss
│     │    │      ├── footer.scss
│     │    │      ├── h-section.scss
│     │    │      ├── header.scss
│     │    │      ├── help_section.scss
│     │    │      └── places_section.scss
│     │    └── sites
│     │          ├── About.scss
│     │          ├── Contact.scss
│     │          ├── Error.scss
│     │          ├── Help.scss
│     │          ├── Home.scss
│     │          ├── Login.scss
│     │          ├── Newsletter.scss
│     │          ├── Privacy_policy.scss
│     │          ├── Product.scss
│     │          ├── Register.scss
│     │          └── User.scss
│     └── vite-env.d.ts
├── structure.txt
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

</pre>

---

