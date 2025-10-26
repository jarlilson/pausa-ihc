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

src/
 ├── components/   → elementos reutilizáveis da interface
 │    ├── ui/      → componentes de interface genéricos (botões, modais, toasts)
 │    └── mural/   → componentes específicos do mural de desabafos
 ├── context/      → contextos globais (autenticação, tema, etc.)
 ├── hooks/        → hooks personalizados para lógica reutilizável
 ├── routes/       → configuração e controle das rotas
 ├── services/     → integrações e funções simuladas de API
 ├── types/        → tipagens globais (TypeScript)
 ├── App.tsx       → componente raiz da aplicação e roteamento
 └── main.tsx      → ponto de entrada, inicializando o React e a navegação



Observações:
- Logo em `public/PAUSA LOGO.png` e referenciado via `import.meta.env.BASE_URL`.
- Tailwind já configurado.
- Para ver o *mini test runner*, abra com `?dev=1`.
