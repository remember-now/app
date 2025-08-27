# RememberNow

An offline-first app to make remembering things really easy.

## Tech stack

- [React 18](https://react.dev/) - core UI library
- [TypeScript](https://www.typescriptlang.org/) - strongly typed language
- [Vite PWA](https://vite-pwa-org.netlify.app/) - PWA tooling powered by Vite
- [React Router v6](https://reactrouter.com/6.30.0) - routing that is compatible with Vite PWA
- [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview) - powerful asynchronous state management
- [Axios](https://axios-http.com/docs/intro) - better HTTP client
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

## Mocks

Development mocks are available for testing the chat agent without a backend. Enable mocking by setting `VITE_USE_MOCK_API=true` in your `.env` file.

### Mock Commands

Send these messages in the chat to trigger mock responses:

#### Error Testing

- `mock error` - Triggers a 500 server error
- `mock error 404` - Triggers a 404 not found error
- `mock error 401 Unauthorized access` - Custom error with message

#### Navigation Testing

- `mock navigate` - Navigate to home page
- `mock navigate /dashboard` - Navigate to specific route

#### Predefined Scenarios

- `mock scenario navigate-success` - Successful navigation to dashboard
- `mock scenario navigate-fail` - Navigation to invalid route
- etc...

Use `mock scenario` without parameters to see all available scenarios.

Mock responses include realistic chat messages and action execution for testing the complete user flow.
