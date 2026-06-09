# SciPaper AI

> Your AI Research Partner for Flawless Scientific Publications

A production-ready, modern AI SaaS platform that helps research teams detect LaTeX errors, automate journal formatting, validate citations, and generate submission-ready reports for high-stakes scientific publications.

## 🚀 Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 3.4+
- **Animations:** Framer Motion 11+
- **Auth:** Clerk
- **Database:** PostgreSQL with Prisma ORM
- **AI:** OpenAI API (GPT-4o)
- **State:** Zustand
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React
- **Charts:** Recharts
- **Deployment:** Vercel

## 📦 Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- pnpm (recommended) or npm

### Installation

1. **Install dependencies:**

```bash
npm install
# or
pnpm install
```

2. **Set up environment variables:**

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:
- `DATABASE_URL` - PostgreSQL connection string
- `CLERK_SECRET_KEY` - Clerk authentication
- `OPENAI_API_KEY` - OpenAI API key

3. **Set up the database:**

```bash
npx prisma generate
npx prisma db push
```

4. **Run the development server:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
scipaper-ai/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (marketing)/       # Landing pages
│   │   ├── (auth)/            # Authentication pages
│   │   ├── (dashboard)/       # Dashboard pages
│   │   └── api/               # API routes
│   ├── components/            # React components
│   │   ├── ui/               # Base UI primitives
│   │   ├── marketing/        # Landing page components
│   │   ├── dashboard/        # Dashboard components
│   │   └── shared/           # Shared components
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utilities and configurations
│   ├── store/                # Zustand stores
│   ├── types/                # TypeScript types
│   └── config/               # App configuration
├── prisma/                    # Database schema
└── public/                    # Static assets
```

## 🎨 Design System

### Colors

- **Primary:** Deep Scientific Blue (#3b82f6)
- **Accent:** Vibrant Indigo-Violet (#8b5cf6)
- **Success:** Scientific Green (#22c55e)
- **Warning:** Amber (#f59e0b)
- **Error:** Rose (#ef4444)

### Typography

- **Sans:** Inter (primary)
- **Mono:** JetBrains Mono (code)

### Key Features

1. **LaTeX Error Detection** - Real-time AI-powered error detection
2. **Journal Formatting** - 500+ journal format support
3. **Citation Validation** - DOI cross-reference validation
4. **AI Analysis** - Comprehensive document analysis
5. **Automated Reports** - Submission readiness reports
6. **Team Collaboration** - Real-time workspace

## 🔧 Development

### Building UI Components

This project uses Radix UI primitives with custom styling. All components follow the design system specification.

### Database Changes

After modifying `prisma/schema.prisma`:

```bash
npx prisma generate
npx prisma db push
```

### Code Quality

```bash
npm run lint
```

## 🚢 Deployment

This project is optimized for Vercel:

1. Push to GitHub
2. Import to Vercel
3. Set environment variables
4. Deploy

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Contributions welcome! Please read CONTRIBUTING.md first.

## 📧 Support

- Email: support@scipaper.ai
- Discord: https://discord.gg/scipaperai
- Docs: https://docs.scipaper.ai

---

Built with ❤️ for the research community
