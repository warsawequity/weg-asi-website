# Warsaw Equity ASI Website

Statyczna wersja strony <https://warsawequityasi.pl/> — bez WordPressa, bez PHP,
bez bazy danych. Same pliki `.html`, arkusz stylów motywu, skrypty, fonty
i pliki PDF. Repozytorium jest jednocześnie katalogiem strony: to, co tu leży,
można wgrać bez żadnego kroku budowania na GitHub Pages, Netlify, S3 albo
zwykły serwer www.

Stan skopiowany: **19.08.2026**, z publicznie dostępnych stron produkcyjnych
(bez logowania do panelu WordPressa).

Treść należy do Warsaw Equity Group; repozytorium jest publiczne po to, żeby
GitHub Pages mógł je serwować, a nie po to, żeby udostępniać materiały do
ponownego użycia.

## Co tu jest

```
index.html                       Strona główna
ogloszenia/                      Ogłoszenia (lista wpisów z rozwijanym „Więcej”)
ujawnienia-esg/                  Ujawnienia ESG
kontakt/                         Kontakt
polityka-prywatnosci/            Polityka prywatności
category/bez-kategorii/          Archiwum kategorii
<slug>/                          Sześć wpisów w wersji pojedynczej:
                                 informacja-o-stronie-internetowej-asi
                                 ogloszenie-warsaw-equity-asi
                                 informacja-o-zmianach-w-regulacjach-…
                                 plan-przeksztalcenia-…
                                 opinia-bieglego-rewidenta-…
                                 ogloszenie-warsaw-equity-alternatywna-…
pliki/RRRR/MM/*.pdf              Załączniki PDF (dawne wp-content/uploads)
assets/weg/style.css             Arkusz motywu „weg”, bajt w bajt jak na produkcji
assets/weg/fonts/                Neurial Grotesk (light / regular / medium, woff+woff2)
assets/weg/js/scripts.js         Skrypty motywu (menu, animacje liter, slider)
assets/wp/block-library.css      Arkusz bloków WordPressa (używany przez treść wpisów)
assets/js/jquery.min.js          jQuery 3.7.1
assets/js/slick.min.js           slick-carousel 1.8.1 (wcześniej z CDN jsDelivr)
assets/js/aos.js                 AOS + wywołanie init (wcześniej wklejone w każdą stronę)
assets/img/weg.jpg, favicon.ico  Ikony
```

Treść, klasy CSS i kolejność elementów są takie same jak na produkcji —
sprawdzone porównaniem tekstu widocznego i drzewa znaczników strona po stronie.

## Uruchomienie lokalnie

```bash
python3 -m http.server 8000
# http://localhost:8000/
```

Linki wewnętrzne są relatywne i wskazują wprost na `index.html`
(np. `ogloszenia/index.html`), więc strona działa też z podkatalogu
(`https://konto.github.io/repo/`) i z dysku, bez konfiguracji serwera.

## Publikacja na GitHub Pages

Settings → Pages → Source: **Deploy from a branch**, gałąź `main`, katalog
**`/ (root)`**. Plik `.nojekyll` jest już na miejscu, więc Pages nie przepuści
plików przez Jekylla. Adres wyjdzie
`https://warsawequity.github.io/weg-asi-website/` — i tam strona
działa poprawnie, bo odnośniki są relatywne.

Przy podpięciu własnej domeny (Settings → Pages → Custom domain) potrzebny jest
plik `CNAME` z jej adresem; GitHub dodaje go sam po zapisaniu domeny w panelu.

## Czego nie przeniesiono i dlaczego

Usunięte zostały wyłącznie elementy infrastruktury WordPressa, które w
statycznej kopii nie mają czego obsługiwać:

- `wp-json` / oEmbed (`<link rel="alternate">`) — brak API,
- `speculationrules` — reguły prefetch dla adresów `/wp-*`,
- skrypt Polylanga ustawiający ciasteczko `pll_language` — brak wersji obcojęzycznych,
- `shield-silentcaptcha` z wtyczki WP Simple Firewall — odwoływał się do
  `wp-admin/admin-ajax.php` z jednorazowym nonce,
- `picturefill` z WebP Express oraz `BPLG_DATA` z PDF Embed Block — na stronach
  nie ma ani jednego obrazka ani osadzonego PDF-a,
- `dns-prefetch` do jsDelivr — slick leży teraz lokalnie.

Zostawione świadomie, bo to zawartość, nie infrastruktura:

- **Piwik PRO** (kontener `d491f00b-…`) — kopia liczy odsłony do tego samego
  konta co produkcja. Jeśli ma być testowa, wykasuj oba bloki `<script>`
  z Piwikiem w każdym pliku `index.html` (są na końcu `<head>` i na początku
  `<body>`) razem z `<noscript>`.
- **Formularz GetResponse** w stopce (`view_webform_v2.js`, `webforms_id=Gcp0E`) —
  ładuje się z serwerów GetResponse i działa również tutaj.
- `<link rel="canonical">` nadal wskazuje adresy produkcyjne
  `warsawequityasi.pl` — kopia nie konkuruje w wyszukiwarce z oryginałem.
  Jeśli ta wersja ma **zastąpić** produkcję, podmień te adresy.

## Do decyzji

- **Ogłoszenie z 12.08.2026** obiecywało „link poniżej”, którego na produkcji
  nie było. Plik `pliki/2026/08/WAS_260812_S_Strategia_inwestycyjna.pdf` został
  dołożony w tej wersji — odnośnik jest w `ogloszenia/index.html` (sekcja
  „Więcej”, ten sam blok `post-files` co przy pozostałych wpisach) oraz na
  stronie wpisu. Na produkcji tego linku nadal brak; jeśli WordPress ma zostać,
  trzeba go tam dodać osobno. Plik jest skanem bez warstwy tekstowej, więc treść
  nie jest wyszukiwalna — jeśli istnieje wersja cyfrowa, warto ją podmienić.
- **Fonty Neurial Grotesk** są komercyjne. W repozytorium leżą te same pliki,
  które serwuje produkcja; przy repozytorium publicznym warto sprawdzić, co
  mówi licencja.
- Wpis oznaczony na produkcji jako usunięty (`/__trashed/`) został pominięty.
- Strona 404 jest po stronie serwera (nie WordPressa), więc nie ma jej w kopii —
  GitHub Pages pokaże własną, dopóki nie dojdzie plik `404.html`.

## Aktualizacja treści

Nie ma tu generatora ani kroku budowania — pliki `index.html` edytuje się
wprost. Nagłówek, menu i stopka powtarzają się w każdym pliku (dokładnie tak,
jak wysyłał je WordPress), więc zmiana w menu to zmiana w każdym `index.html`.
