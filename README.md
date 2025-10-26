# PAUSA — IHC (GitHub Pages Ready)

Projeto pronto para publicar no **GitHub Pages** com **Vite + React + Tailwind** e **Actions**.

## Publicar
1. Crie um repositório no GitHub (ex.: `pausa-ihc`).  
2. No terminal:
```bash
cd pausa-ihc-ghpages
npm i
git init
git add .
git commit -m "init pausa ihc"
git branch -M main
git remote add origin https://github.com/<seu-usuario>/<seu-repo>.git
git push -u origin main
```
3. No GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

URL final:
```
https://<seu-usuario>.github.io/<seu-repo>/
```

## Rodar localmente
```bash
npm i
npm run dev
```

A estrutura foi modularizada para favorecer reutilização, clareza e manutenção:

📦 pausa-ihc
 ┣ 📂 public/
 ┃ ┗ 📄 PAUSA LOGO.png
 ┣ 📂 src/
 ┃ ┣ 📂 components/
 ┃ ┃ ┣ 📂 mural/
 ┃ ┃ ┗ 📂 ui/
 ┃ ┣ 📂 context/
 ┃ ┣ 📂 hooks/
 ┃ ┣ 📂 routes/
 ┃ ┣ 📂 services/
 ┃ ┣ 📂 types/
 ┃ ┣ 📄 App.tsx
 ┃ ┗ 📄 main.tsx
 ┣ 📄 index.html
 ┣ 📄 package.json
 ┣ 📄 tailwind.config.js
 ┣ 📄 vite.config.ts
 ┗ 📄 README.md


Observações:
- Logo em `public/PAUSA LOGO.png` e referenciado via `import.meta.env.BASE_URL`.
- Tailwind já configurado.
- Para ver o *mini test runner*, abra com `?dev=1`.
