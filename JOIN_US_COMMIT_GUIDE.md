# Guia per pujar la pàgina **Join Us** al repositori

Repositori: <https://github.com/francesccarmona/smartclinity-website>

> Quan donis el visto bueno, executa les comandes d'aquesta guia des de PowerShell (o Git Bash) **dins** la carpeta `smartclinity-website-main\smartclinity-website-main`.

---

## 0) Fitxers afegits / modificats

**Afegits**
- `join-us.html`
- `css/join-us.css`
- `js/join-us.js`
- `data/phases.json`
- `assets/join-us/EMSA.png`
- `assets/join-us/HospitalJoanXXIII.png`
- `assets/join-us/OpenHPEcollective.png`
- `assets/join-us/knock.png`
- `assets/join-us/campaign-hospitals.jpeg`
- `assets/join-us/campaign-residencies.jpeg`
- `assets/join-us/campaign-homecare.jpeg`
- `JOIN_US_COMMIT_GUIDE.md` (aquest fitxer — pots no pujar-lo si vols)

**Modificats** (entrada Join Us al nav i al footer)
- `index.html`, `about.html`, `applications.html`, `canvas.html`, `contact.html`, `platform.html`, `technology.html`
- `.gitignore` (ignora la carpeta de snapshots `_backup_*`)

**Carpeta ignorada** (no es pujarà gràcies al `.gitignore`)
- `_backup_20260513-182527_v1-board+tabs/` (snapshot local previ als canvis del lightbox + diagrames)

---

## 1) Prova local final (recomanat abans del commit)

```powershell
cd "C:\Users\franc\Desktop\5e\Segon quatrimestre\Innovació i Emprenedoria\Carmona\smartclinity-website-main\smartclinity-website-main"
python -m http.server 8000
```

Obre <http://127.0.0.1:8000/join-us.html> i revisa:
- Mermaid renderitza els 3 diagrames (PERT, Gantt, Market entry)
- Clicar una campanya obre el lightbox
- El board de fases obre el panel lateral amb el detall
- El footer mostra `francesc.carmona@outlook.com`
- La pestanya "Join Us" apareix al menú de totes les altres pàgines

Para el servidor amb `Ctrl+C`.

---

## 2) Verificar l'estat del repositori

```powershell
cd "C:\Users\franc\Desktop\5e\Segon quatrimestre\Innovació i Emprenedoria\Carmona\smartclinity-website-main\smartclinity-website-main"
git status
```

Hauries de veure els fitxers afegits i modificats de l'apartat 0, **sense** la carpeta `_backup_*`.

---

## 3) Crear una branca dedicada (opcional però recomanat)

```powershell
git checkout -b feat/join-us-page
```

---

## 4) Afegir i fer commit

```powershell
git add .gitignore
git add join-us.html css/join-us.css js/join-us.js data/phases.json
git add assets/join-us/
git add index.html about.html applications.html canvas.html contact.html platform.html technology.html
git add JOIN_US_COMMIT_GUIDE.md

git commit -m "feat(join-us): investor-facing page with interactive PERT/Gantt and partner showcase

- New /join-us.html long-scroll page covering: how we work, marketing,
  regulatory, implementation board + PERT + Gantt + market entry,
  finances (Hardware deploys, Software retains, 30K€ ask) and results
- data/phases.json as single source of truth for the implementation board
- Mermaid 10 with SmartClinity-themed PERT & Gantt and status colors
- Clickable campaign cards with lightbox + keyboard navigation
- Brand identity mini-recap above the marketing channels
- Join Us entry added to nav (desktop + mobile) and footer of every page
- Contact email standardised to francesc.carmona@outlook.com"
```

---

## 5) Pujar a GitHub

```powershell
git push origin feat/join-us-page
```

Després obre <https://github.com/francesccarmona/smartclinity-website> i crea un Pull Request des de la branca `feat/join-us-page` cap a `main`.

Si prefereixes pujar directament a `main` (sense PR):

```powershell
git checkout main
git merge feat/join-us-page
git push origin main
```

---

## 6) Si el repo es desplega automàticament

Si la web està connectada a Vercel/Netlify/GitHub Pages, el push activarà el redeploy. En cas contrari, segueix el procés de desplegament habitual.

---

## 7) Si vols revertir

```powershell
git revert HEAD          # crea un commit que desfà l'últim push
# o per esborrar la branca local
git branch -D feat/join-us-page
```

El snapshot local (`_backup_20260513-182527_v1-board+tabs/`) queda a la teva carpeta com a còpia de seguretat — no es puja al repo.
