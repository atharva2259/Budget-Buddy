# Budget Buddy 💰

> Your money. Your buddy. Your future.

[![CI](https://github.com/YOUR_ORG/budget-buddy/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_ORG/budget-buddy/actions/workflows/ci.yml)
[![Deploy](https://github.com/YOUR_ORG/budget-buddy/actions/workflows/deploy.yml/badge.svg)](https://github.com/YOUR_ORG/budget-buddy/actions/workflows/deploy.yml)

A mobile-first PWA for student expense tracking with auto-savings, loan management, and parental budget alerts.

---

## Tech Stack

| Layer     | Technology                                                      |
|-----------|-----------------------------------------------------------------|
| Frontend  | React 18, TypeScript, Vite, Tailwind CSS, React Query, Zustand |
| Backend   | Node.js, Express, TypeScript, Drizzle ORM                      |
| Database  | PostgreSQL 16                                                   |
| Auth      | JWT (access + httpOnly refresh cookie), bcrypt, OTP via email  |
| PWA       | vite-plugin-pwa, Workbox                                        |
| CI/CD     | GitHub Actions → Vercel (web) + Railway (API)                  |
| Testing   | Vitest + React Testing Library (frontend) · Jest + Supertest (API) |

---

## Project Structure

```
budget-buddy/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml          # Lint + test + build on every push
│   │   └── deploy.yml      # Deploy to Vercel + Railway on main
│   ├── SECRETS.md          # Required GitHub secrets documentation
│   └── pull_request_template.md
├── apps/
│   ├── web/                # React PWA frontend
│   │   ├── src/
│   │   │   ├── api/        # Typed API client + functions
│   │   │   ├── components/ # Shared UI components
│   │   │   ├── features/   # Route-level screens
│   │   │   ├── lib/        # Utils, schemas, helpers
│   │   │   ├── store/      # Zustand stores
│   │   │   ├── styles/     # CSS tokens
│   │   │   └── test/       # Unit tests
│   │   ├── .eslintrc.cjs
│   │   ├── tailwind.config.js
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   └── api/                # Express REST API
│       ├── src/
│       │   ├── __tests__/  # Integration tests
│       │   ├── db/         # Drizzle schema + seed
│       │   ├── jobs/       # Savings cron job
│       │   ├── middleware/  # Auth, error handler, validation
│       │   └── routes/     # All REST routes
│       ├── .eslintrc.cjs
│       ├── jest.config.ts
│       ├── nodemon.json
│       └── tsconfig.json
├── packages/
│   └── types/              # Shared TypeScript types
├── .husky/                 # Git hooks (pre-commit, commit-msg)
├── .prettierrc             # Prettier config
├── .vscode/                # VS Code settings + recommended extensions
├── commitlint.config.cjs   # Conventional commit enforcement
├── vercel.json             # Vercel deployment config
└── railway.toml            # Railway deployment config
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 20
- PostgreSQL 16 running locally
- npm ≥ 10

### 1. Clone & install

```bash
git clone https://github.com/YOUR_ORG/budget-buddy.git
cd budget-buddy
npm install   # installs all workspaces
```

### 2. Configure the API

```bash
cd apps/api
cp .env.example .env
# Edit .env — at minimum set:
#   DATABASE_URL
#   JWT_SECRET  (64+ random chars)
#   COOKIE_SECRET (64+ random chars)
```

Generate secrets:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 3. Push database schema

```bash
cd apps/api
npm run db:push
```

### 4. Seed with demo data (optional)

```bash
cd apps/api
npm run db:seed
# Login: demo@budgetbuddy.in / password123
# Savings PIN: 1234
```

### 5. Start development servers

**Terminal 1 — API** (port 3000):
```bash
cd apps/api && npm run dev
```

**Terminal 2 — Frontend** (port 5173):
```bash
cd apps/web && npm run dev
```

Open: http://localhost:5173

---

## Available Scripts (root)

| Script | Description |
|--------|-------------|
| `npm run dev:web` | Start frontend dev server |
| `npm run dev:api` | Start API dev server |
| `npm run lint` | Lint all workspaces |
| `npm run format` | Format all files with Prettier |
| `npm run format:check` | Check formatting (used in CI) |
| `npm test` | Run all tests |
| `npm run typecheck` | TypeScript check all workspaces |
| `npm run build` | Production build all workspaces |

---

## Git Conventions

This project uses **conventional commits** enforced by commitlint + Husky:

```
feat: add expense category filter
fix: correct budget pct calculation
chore: update drizzle-orm to v0.34
test: add loan summary integration test
```

Pre-commit hooks run **lint-staged** (ESLint + Prettier on staged files only).

---

## CI/CD

### CI Pipeline (`ci.yml`)
Runs on every push to any branch:
1. **Lint + Typecheck** — ESLint + `tsc --noEmit` for both apps
2. **API Tests** — Jest integration tests (requires PostgreSQL service)
3. **Frontend Tests** — Vitest unit tests with coverage
4. **Build** — Production build both apps

### Deploy Pipeline (`deploy.yml`)
Runs on push to `main` only (after CI passes):
1. Deploy frontend → **Vercel**
2. Deploy API → **Railway**
3. Run DB migrations
4. Smoke test health endpoints

See [.github/SECRETS.md](.github/SECRETS.md) for required GitHub secrets.

---

## API Reference

Base URL: `http://localhost:3000/api/v1`

### Auth
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/auth/register` | ✗ | Register new user |
| POST | `/auth/verify-email` | JWT | Verify email OTP |
| POST | `/auth/login` | ✗ | Login |
| POST | `/auth/refresh` | Cookie | Refresh access token |
| POST | `/auth/logout` | JWT | Logout current session |
| POST | `/auth/logout-all` | JWT | Logout all sessions |
| POST | `/auth/forgot-password` | ✗ | Request password reset |
| POST | `/auth/reset-password` | ✗ | Reset password with OTP |
| POST | `/auth/resend-otp` | JWT | Resend OTP code |

### User
| Method | Path | Description |
|--------|------|-------------|
| GET | `/user/profile` | Get profile |
| PATCH | `/user/profile` | Update name / parent phone |
| PATCH | `/user/change-password` | Change password |
| DELETE | `/user/account` | Delete account (permanent) |

### Expenses
| Method | Path | Description |
|--------|------|-------------|
| GET | `/expenses?month=YYYY-MM` | List expenses |
| GET | `/expenses/summary?month=YYYY-MM` | Category breakdown |
| POST | `/expenses` | Add expense |
| PATCH | `/expenses/:id` | Edit expense |
| DELETE | `/expenses/:id` | Delete expense (soft) |

### Budget
| Method | Path | Description |
|--------|------|-------------|
| GET | `/budget?month=YYYY-MM` | Get budget status + pct |
| POST | `/budget` | Set / update monthly limit |
| GET | `/budget/history` | Past 12 months |

### Loans
| Method | Path | Description |
|--------|------|-------------|
| GET | `/loans` | List loans |
| GET | `/loans/summary` | Outstanding total |
| POST | `/loans` | Record a loan |
| PATCH | `/loans/:id` | Update status / details |
| DELETE | `/loans/:id` | Delete loan (soft) |

### Savings
| Method | Path | Description |
|--------|------|-------------|
| GET | `/savings/status` | Savings config + next deduction |
| POST | `/savings/setup` | Configure amount + PIN |
| POST | `/savings/verify-pin` | Verify PIN → get balance |
| GET | `/savings/ledger` | Deposit history |
| PATCH | `/savings/pause` | Pause / resume |

### Alerts
| Method | Path | Description |
|--------|------|-------------|
| GET | `/alerts` | Alert log |

---

## Phase 1 Checklist ✅

- [x] Monorepo (`/apps/web`, `/apps/api`, `/packages/types`)
- [x] React PWA scaffold (Vite, Tailwind, TypeScript, all deps)
- [x] Express API scaffold (TypeScript, Drizzle, all deps)
- [x] CSS design tokens (`:root` + Tailwind config)
- [x] Shared TypeScript types (`@budget-buddy/types`)
- [x] Database schema (7 tables, enums, indexes)
- [x] GitHub Actions CI (lint → test → build)
- [x] GitHub Actions deploy (Vercel + Railway + migrations + smoke test)
- [x] ESLint configs (frontend + API)
- [x] Prettier config (root)
- [x] Husky pre-commit (lint-staged)
- [x] Husky commit-msg (commitlint)
- [x] commitlint config (conventional commits)
- [x] VS Code settings + recommended extensions
- [x] nodemon.json for API hot-reload
- [x] `.env.example` with all required variables
- [x] `vercel.json` deployment config
- [x] `railway.toml` deployment config
- [x] `.gitignore`
- [x] DB seed script with realistic demo data
- [x] API integration tests (auth, expenses, budget, loans, savings)
- [x] Frontend unit tests (utils, schemas)
- [x] README with CI badge, full setup, API reference
