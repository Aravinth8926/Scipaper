# SciPaper AI 

> Your AI Research Partner for Flawless Scientific Publications

A full-stack AI-powered SaaS platform that helps researchers and academics perfect their scientific papers by detecting LaTeX errors, validating citations, auto-formatting for journals, and generating submission-ready reports.

[![Next.js](https://img.shields.io/badge/Next.js-14.2.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4.2-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22.0-2D3748)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC)](https://tailwindcss.com/)

##  Features

### Intelligent Document Analysis
- **LaTeX Error Detection**: Automatically identify and fix syntax errors, undefined control sequences, and environment issues
- **Citation Validation**: Verify references, check citation keys, and ensure bibliography consistency
- **Format Checking**: Validate compliance with journal-specific formatting requirements
- **Readability Analysis**: Get AI-powered suggestions to improve scientific writing clarity

### Smart Dashboard
- Real-time document analysis with detailed issue breakdowns
- Interactive issue fixing with visual feedback
- Document history and tracking
- Performance metrics and quality scores

### Professional UI/UX
- Modern glassmorphism design
- Full dark mode support
- Responsive across all devices
- Smooth animations with Framer Motion
- Drag & drop file uploads

### Authentication & Security
- Secure user authentication
- Private document storage per user
- SQLite database with Prisma ORM
- Session management with localStorage

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Radix UI** - Accessible component primitives
- **Sonner** - Toast notifications

### Backend
- **Next.js API Routes** - RESTful API endpoints
- **Prisma** - Type-safe database ORM
- **SQLite** - Embedded database (dev)
- **OpenAI API** - AI-powered analysis (ready to integrate)

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Aravinth8926/Scipaper.git
cd Scipaper
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

The `.env` file should contain:
```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="SciPaper AI"
```

4. **Initialize the database**
```bash
npx prisma generate
npx prisma db push
```

5. **Start the development server**
```bash
npm run dev
```

6. **Open your browser**
```
http://localhost:3000
```

## Usage

### Creating an Account
1. Navigate to `/sign-up`
2. Enter your email, name, and password
3. Click "Create account"
4. You'll be redirected to the dashboard with sample documents

### Uploading Documents
1. Click "Upload Document" in the dashboard
2. Drag and drop your LaTeX file (or click to browse)
3. Select analysis options
4. Click "Start Analysis"
5. View results after 2-second analysis

### Analyzing Documents
- View detailed error and warning reports
- Click "Fix" on any issue to apply suggested corrections
- Track your document's quality score
- Download or share your analyzed documents

## Project Structure

```
scipaper-ai/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/
│   │   ├── (auth)/            # Authentication pages
│   │   ├── (dashboard)/       # Dashboard pages
│   │   ├── (marketing)/       # Marketing pages
│   │   └── api/               # API routes
│   ├── components/
│   │   ├── marketing/         # Landing page components
│   │   ├── shared/            # Reusable components
│   │   └── ui/                # UI primitives
│   ├── lib/
│   │   ├── auth-store.ts      # Authentication logic
│   │   ├── document-store.ts  # Document management
│   │   ├── db.ts              # Prisma client
│   │   └── utils.ts           # Utility functions
│   └── types/                 # TypeScript types
├── .env.example               # Environment variables template
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/signin` - Sign in user

### Documents
- `GET /api/documents?userId={id}` - Get all user documents
- `GET /api/documents/[id]?userId={id}` - Get single document
- `POST /api/documents` - Create new document
- `POST /api/documents/[id]/analyze` - Analyze document

## Database Schema

### Users
- id, email, password, name
- Authentication and profile data

### Documents
- id, userId, title, fileName, fileUrl
- status, scores, file metadata

### LatexErrors
- id, documentId, userId
- severity, category, message
- line number, suggested fix

## Roadmap

- [ ] Real AI integration with OpenAI GPT-4
- [ ] Multiple LaTeX compiler support
- [ ] Journal template library
- [ ] Collaborative document editing
- [ ] Export to multiple formats (PDF, DOCX)
- [ ] Citation manager integration
- [ ] Real-time LaTeX preview
- [ ] Team workspace features
- [ ] Stripe payment integration
- [ ] Advanced analytics dashboard

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Aravinth**
- GitHub: [@Aravinth8926](https://github.com/Aravinth8926)
- Email: aravinth8926@gmail.com

## Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting platform
- Radix UI for accessible components
- Tailwind CSS for utility-first styling
- Prisma for the excellent ORM

## Support

If you have any questions or run into issues, please open an issue on GitHub.

---

**Built with ❤️ for the research community**
