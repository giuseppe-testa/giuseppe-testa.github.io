# Design system: giuseppe-testa.github.io

Riferimento interno per palette, font e componenti del sito. **Non pubblicato sul sito**: il file sta in `_design/`, che Quarto ignora (cartella con `_` e fuori dalla lista `render` di `_quarto.yml`). È versionato nel repository, quindi è visibile su GitHub.

Implementazione: `styles.scss` (variabili e regole) + `_quarto.yml` (`theme: [cosmo, styles.scss]`, `highlight-style: github`).
Ultimo aggiornamento: 13/11/2026 (aggiunti CV, footer e scaffali).

## Idea

"Carta e inchiostro" con un richiamo al coding anni '90: fondo crema come carta, testo nero inchiostro, verde bosco come unico colore d'accento; titoli in un monospace da terminale, testo lungo in un sans leggibile.

## Palette

| Ruolo | Nome SCSS | Hex | Uso |
|---|---|---|---|
| Sfondo | `$cream` | `#f3ecda` | Sfondo di pagina, navbar, footer |
| Superficie | `$cream-dark` | `#e9e0c8` | Code block, codice inline |
| Card | — | `#f8f3e6` | Sfondo delle card (focus, progetti) |
| Linee | `$line` | `#d6cbb0` | Bordi, separatori, categorie |
| Testo | `$ink` | `#15180f` | Testo principale e titoli |
| Testo secondario (lungo) | — | `#3a3d31` | Lead della home, testo nelle card, output notebook |
| Secondario | `$muted` | `#5d5f52` | Date, metadati, footer, prefisso `>` |
| Accento | `$green` | `#1f6b45` | Link, pulsanti, riga terminale, cursore, titoli delle card, hover |

Contrasto su `#f3ecda`: testo 15.2:1, verde 5.5:1, secondario 5.5:1 (tutti sopra WCAG AA 4.5:1).

Regole:

- Un solo colore d'accento: il verde. Niente altri colori saturi (eccetto la sintassi del codice).
- Testo su pulsante verde: crema `#f3ecda`.
- Niente sfondi scuri né gradienti: il sito è chiaro.

## Font

| Ruolo | Font | Pesi | Dove |
|---|---|---|---|
| Titoli e dettagli | **Share Tech Mono** | solo 400 | h1–h6, nome nella hero, navbar, pulsanti, riga terminale, titoli di card e listing |
| Testo | **IBM Plex Sans** | 400, 500, 600, 400 italic | Paragrafi, liste, descrizioni |
| Codice | **IBM Plex Mono** | 400, 500 | Code block, codice inline, output dei notebook |

Caricati da Google Fonts con `@import` in testa a `styles.scss`.

Regole:

- Share Tech Mono ha un solo peso: mai grassetto (in CSS `font-weight: 400 !important; font-synthesis: none`), altrimenti il browser lo simula e si deforma.
- Share Tech Mono solo per testi brevi; i testi lunghi sempre in Plex Sans.
- Dimensione base del testo: `1.05rem`.

## Forme e componenti

- **Angoli squadrati**: pulsanti, card e code block senza border-radius.
- **Bordi** sottili da 1px in `$line`; al passaggio del mouse il bordo diventa verde e la card sale di 2px.
- **Hero della home**: riga da terminale `~/giuseppe $ ...` in verde con cursore a blocco lampeggiante (`::after` + animazione `blink`), nome grande `clamp(2.8rem, 7vw, 4.8rem)`, frase di posizionamento, pulsanti primario (pieno verde) + outline + link al CV.
- **Card focus**: titolo verde in Share Tech Mono con prefisso `> ` in `$muted`.
- **Code block**: sfondo `$cream-dark`, bordo `$line`, sintassi `highlight-style: github`.
- **Larghezza contenuti in home**: colonna da 740px.
- **CV**: esperienze come timeline verticale (bordo sinistro `$line`, quadratino verde per azienda), date e sede allineate a destra in `$muted`, risultati con etichetta in grassetto; competenze come etichette in Share Tech Mono verde su card. Dati in `data/cv/*.yml`, aspetto in `templates/cv-*.ejs`.
- **Scaffali** (Bookshelf, Audioshelf, Films & TV): griglia di copertine (`minmax(150px, 1fr)`, 2 colonne su mobile), proporzione 2:3 per libri e film e 1:1 per podcast e musica, bordo `$line` che diventa verde al passaggio se c'è un link. Senza immagine, la copertina è tipografica: fondo card, filetto verde in alto, titolo e autore in Share Tech Mono. Dati in `data/shelf/*.yml`, un solo template `templates/shelf.ejs`, immagini in `images/shelf/<books|audio|screen>/`.
- **Footer** (classico minimale, tre parti, bordo superiore `$line`):
  - sinistra: `© 2026 Giuseppe Testa`, in Plex Sans `$muted`;
  - centro: "Finally I did it. Thanks, Claudio.", in Share Tech Mono verde;
  - destra: `last build: YYYY-MM-DD`, in Plex Mono. La data è scritta a ogni render da `scripts/build-date.ts` (pre-render, gira con il Deno di Quarto) in `_variables.yml`, che è in `.gitignore`, e letta con `{{< var build_date >}}`.

## Da valutare

- Colori della sintassi del codice ridipinti con la palette (oggi blu/rosso del tema "github").
- Favicon e immagine di anteprima social (Open Graph) coerenti con palette e font.
