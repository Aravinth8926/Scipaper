export const APP_NAME = "SciPaper AI";
export const APP_DESCRIPTION =
  "Your AI Research Partner for Flawless Scientific Publications";

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
export const ALLOWED_FILE_TYPES = [".tex", ".pdf", ".docx", ".bib"];

export const DOCUMENTS_PER_PAGE = 20;
export const MAX_FREE_DOCUMENTS = 5;
export const MAX_PRO_DOCUMENTS = Infinity;

export const STATS = {
  documentsAnalyzed: "2M+",
  journalFormats: "500+",
  errorDetectionRate: "99.7%",
  researchers: "50K+",
};

export const UNIVERSITIES = [
  { name: "MIT", logo: "/images/logos/mit.svg" },
  { name: "Stanford", logo: "/images/logos/stanford.svg" },
  { name: "Oxford", logo: "/images/logos/oxford.svg" },
  { name: "Nature", logo: "/images/logos/nature.svg" },
  { name: "IEEE", logo: "/images/logos/ieee.svg" },
  { name: "Springer", logo: "/images/logos/springer.svg" },
];

export const FEATURES = [
  {
    id: "latex-detection",
    icon: "Code",
    title: "LaTeX Error Detection",
    description:
      "Real-time LaTeX error detection with AI-powered suggestions. Catches syntax errors, missing brackets, undefined commands, and environment mismatches.",
    image: "/images/features/latex-detection.svg",
  },
  {
    id: "journal-formatting",
    icon: "Layout",
    title: "Journal Formatting",
    description:
      "One-click formatting for 500+ journals. IEEE, Nature, Springer, Elsevier, ACM, and more. Automatic margin, font, and structure adjustments.",
    image: "/images/features/journal-formatting.svg",
  },
  {
    id: "citation-validation",
    icon: "Link",
    title: "Citation Validation",
    description:
      "Cross-reference every citation against DOI databases. Detect missing references, incorrect formatting, and broken links automatically.",
    image: "/images/features/citation-validation.svg",
  },
  {
    id: "ai-analysis",
    icon: "Brain",
    title: "AI Analysis Dashboard",
    description:
      "Get a comprehensive readability score, structure analysis, and improvement suggestions powered by GPT-4.",
    image: "/images/features/ai-analysis.svg",
  },
  {
    id: "automated-reports",
    icon: "FileBarChart",
    title: "Automated Reports",
    description:
      "Generate detailed compliance reports for journal submission. Checklist format with pass/fail indicators.",
    image: "/images/features/report-generation.svg",
  },
  {
    id: "team-collaboration",
    icon: "Users",
    title: "Team Collaboration",
    description:
      "Real-time collaboration workspace. Share documents, assign reviews, track changes, and manage team workflows.",
    image: "/images/features/collaboration.svg",
  },
];

export const PRICING_TIERS = [
  {
    id: "free",
    name: "Free",
    price: { monthly: 0, annual: 0 },
    description: "Perfect for getting started",
    features: [
      "5 documents/month",
      "Basic LaTeX error detection",
      "3 journal formats",
      "Email support",
      "Community access",
    ],
    cta: "Start Free",
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: { monthly: 29, annual: 23 },
    description: "For serious researchers",
    features: [
      "Unlimited documents",
      "Advanced AI analysis",
      "500+ journal formats",
      "Citation validation",
      "Automated reports",
      "Priority support",
      "Export to all formats",
      "API access",
    ],
    cta: "Start Pro Trial",
    highlighted: true,
    badge: "POPULAR",
  },
  {
    id: "team",
    name: "Team",
    price: { monthly: 79, annual: 63 },
    description: "For research teams",
    features: [
      "Everything in Pro",
      "Team collaboration workspace",
      "Admin dashboard",
      "SSO integration",
      "Custom journal templates",
      "Dedicated account manager",
      "Priority API access",
      "Advanced analytics",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    title: "Associate Professor",
    institution: "MIT",
    avatar: "/images/testimonials/avatar-1.jpg",
    rating: 5,
    content:
      "SciPaper caught 23 LaTeX errors our team missed after weeks of review. The AI suggestions were spot-on and saved us from an embarrassing submission.",
  },
  {
    id: 2,
    name: "Prof. James Miller",
    title: "Professor of Physics",
    institution: "Stanford University",
    avatar: "/images/testimonials/avatar-2.jpg",
    rating: 5,
    content:
      "Formatting for Nature used to take days. With SciPaper, it's done in minutes with perfect accuracy. This tool has transformed our publication workflow.",
  },
  {
    id: 3,
    name: "Dr. Aisha Patel",
    title: "Research Scientist",
    institution: "Oxford",
    avatar: "/images/testimonials/avatar-3.jpg",
    rating: 5,
    content:
      "The citation validation alone saved our submission. It found 8 broken DOIs and formatting issues we would never have caught manually.",
  },
  {
    id: 4,
    name: "Dr. Marco Rossi",
    title: "Senior Researcher",
    institution: "ETH Zurich",
    avatar: "/images/testimonials/avatar-4.jpg",
    rating: 5,
    content:
      "Best investment for our lab. The automated reports give us confidence that every paper meets journal requirements before submission.",
  },
  {
    id: 5,
    name: "Prof. Lisa Wang",
    title: "Director of Research",
    institution: "Caltech",
    avatar: "/images/testimonials/avatar-3.jpg",
    rating: 5,
    content:
      "Collaboration features changed how our team writes papers. Real-time feedback and version control are game-changers for multi-author publications.",
  },
  {
    id: 6,
    name: "Dr. Ahmed Hassan",
    title: "Postdoctoral Fellow",
    institution: "Cambridge",
    avatar: "/images/testimonials/avatar-1.jpg",
    rating: 5,
    content:
      "The automated reports are incredibly detailed. Every aspect of our paper is checked against journal guidelines. It's like having a submission expert on our team.",
  },
];

export const FAQ_ITEMS = [
  {
    question: "What file formats do you support?",
    answer:
      "We support .tex (LaTeX), .pdf, .docx (Word), and .bib (BibTeX) files. You can upload any of these formats and our AI will analyze them for errors, formatting issues, and citation problems.",
  },
  {
    question: "How accurate is the LaTeX error detection?",
    answer:
      "Our AI-powered LaTeX error detection has a 99.7% accuracy rate, validated across millions of documents. It catches syntax errors, missing brackets, undefined commands, environment mismatches, and more complex issues that traditional linters miss.",
  },
  {
    question: "Which journals are supported for formatting?",
    answer:
      "We support 500+ journals including IEEE, Nature, Science, Springer, Elsevier, ACM, PNAS, Cell, The Lancet, and many more. New journals are added regularly based on user requests.",
  },
  {
    question: "How does citation validation work?",
    answer:
      "We cross-reference every citation in your document against DOI databases like CrossRef and check for formatting consistency. We detect missing references, incorrect years, broken DOIs, and formatting issues specific to your target journal's style.",
  },
  {
    question: "Can I collaborate with my research team?",
    answer:
      "Yes! Team and Enterprise plans include real-time collaboration features. Share documents, assign reviews, track changes, comment on specific sections, and manage your entire team's workflow in one place.",
  },
  {
    question: "Is my research data secure?",
    answer:
      "Absolutely. We use bank-level encryption (AES-256) for all data at rest and in transit. We're SOC 2 Type II certified and GDPR compliant. Your documents are never used to train AI models, and you maintain full ownership of your work.",
  },
  {
    question: "Do you offer institutional pricing?",
    answer:
      "Yes! We offer special pricing for universities, research institutions, and organizations. Contact our sales team for a custom quote based on your needs.",
  },
  {
    question: "Can I integrate SciPaper with Overleaf?",
    answer:
      "While we don't have a direct Overleaf integration yet, you can easily export your .tex files from Overleaf and upload them to SciPaper for analysis. Overleaf integration is on our roadmap for Q2 2024.",
  },
];
