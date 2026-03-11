# KSE Student Portal

> **⚠️ TODO (before production release):** Re-add a `.gitignore` file with the following entries:
>
> ```
> # Logs
> logs
> *.log
> npm-debug.log*
> yarn-debug.log*
> yarn-error.log*
> pnpm-debug.log*
> lerna-debug.log*
>
> node_modules
> dist
> dist-ssr
> *.local
>
> # Editor directories and files
> .vscode/*
> !.vscode/extensions.json
> .idea
> .DS_Store
> *.suo
> *.ntvs*
> *.njsproj
> *.sln
> *.sw?
>
> # Environment variables (API keys — never commit!)
> .env
> *.env
>
> # Python
> __pycache__/
> *.py[cod]
> db.sqlite3
> backend/venv/
> ```

---

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
