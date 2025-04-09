# TerraQuest - System rezerwacji

TerraQuest to platforma rezerwacyjna, która umożliwia użytkownikom łatwe wyszukiwanie, rezerwowanie oraz ocenianie obiektów noclegowych takich jak hotele, apartamenty, hostele i inne. Dzięki TerraQuest użytkownicy mogą szybko i wygodnie znaleźć idealne miejsce na wypoczynek, a także zarządzać swoimi rezerwacjami w jednym miejscu.

Nasza platforma oferuje intuicyjny interfejs, system oceny obiektów, filtry wyszukiwania oraz możliwość płatności online, wszystko po to, aby ułatwić użytkownikom planowanie podróży i rezerwację noclegów.

---

## 🔧 Technologie

- **Frontend:** React.js, SCSS
- **Backend:** Node.js, Express.js
- **Baza danych:** 

---

## 🧑‍💻 Funkcjonalności

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

- ✅ **Integracja z systemem płatności**  
  Umożliwienie użytkownikom dokonywania płatności za rezerwacje online (opcjonalnie).

---

## ⚙️ Instalacja

1. **Sklonuj repozytorium:**
   ```bash
   git clone https://github.com/BergFilip/TerraQuest_web.git
   ```
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

