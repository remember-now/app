# RememberNow

An app to make remembering things really easy.

## Tech stack

- [React 18](https://react.dev/) - core UI library
- [TypeScript](https://www.typescriptlang.org/) - strongly typed language
- [Vite PWA](https://vite-pwa-org.netlify.app/) - PWA tooling powered by Vite
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) - uses [Babel](https://babeljs.io/) for Fast Refresh
- [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview) - powerful asynchronous state management
- [TailwindCSS](https://tailwindcss.com/) - plug and play styling
- [shadcn/ui](https://ui.shadcn.com/) - headless, customizable components
- [eslint](https://eslint.org/) - linting
- [prettier](https://prettier.io/) - automatic formatting
- [husky](https://github.com/typicode/husky) - pre-commit checks
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) - consistent commit messages

## Getting started

Set up:

```bash
git clone https://github.com/remember-now/app.git && \
cd app && \
npm install && \
cp .env.example .env && \
npx husky install
```

Run:

```bash
npm run dev
```
