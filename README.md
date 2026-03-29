# SmartClinity — Official Website

Public website for **SmartClinity**, a medtech company building connected intelligence for clinical fluid monitoring.

**Live site:** [www.smartclinity.com](https://www.smartclinity.com)

---

## Stack

- Plain static HTML5 / CSS3 / Vanilla JavaScript
- No framework, no build step
- Deployed via **Vercel** (static site)

## Pages

| File | Page |
|------|------|
| `index.html` | Home |
| `technology.html` | Technology |
| `applications.html` | Applications |
| `platform.html` | Platform / Business Model |
| `about.html` | About / Team |
| `contact.html` | Contact |

## Structure

```
/
├── index.html
├── technology.html
├── applications.html
├── platform.html
├── about.html
├── contact.html
├── css/
│   ├── tokens.css       ← design tokens (colours, typography, spacing)
│   ├── reset.css        ← base normalisation
│   ├── layout.css       ← grid & layout system
│   ├── animations.css   ← scroll reveals & transitions
│   └── components.css   ← full component library
├── js/
│   ├── nav.js           ← sticky nav + mobile menu
│   ├── scroll-reveal.js ← IntersectionObserver reveals
│   └── graph.js         ← animated fluid quality canvas graph
├── LogoSmartClinity.png
├── SímbolSmartClinity.png
└── [team photos .jpg/.jpeg]
```

## Local Development

Open any `.html` file directly in a browser, or run a local server:

```bash
python -m http.server 8080
# then visit http://localhost:8080
```

## Deployment

The site is automatically deployed on every push to `main` via **Vercel**.

To deploy manually:
1. Push changes to `main`
2. Vercel picks them up automatically (typically < 30 seconds)

## Updating Content

- **Copy / text:** edit the relevant `.html` file directly
- **Colours / fonts:** edit `css/tokens.css`
- **Components / layout:** edit `css/components.css`
- **Navigation:** the nav is duplicated in each `.html` file — update all 6 if nav items change

## Contact

francesc.carmona@outlook.com
