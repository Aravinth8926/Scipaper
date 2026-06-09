export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "Introducing SciPaper AI: Your Research Partner",
      excerpt: "We're excited to announce the launch of SciPaper AI, a comprehensive platform for scientific manuscript preparation.",
      date: "June 1, 2026",
      author: "SciPaper Team",
    },
    {
      id: 2,
      title: "500+ Journal Formats Now Supported",
      excerpt: "We've expanded our journal formatting support to include over 500 scientific journals across all disciplines.",
      date: "May 15, 2026",
      author: "Product Team",
    },
    {
      id: 3,
      title: "AI-Powered Citation Validation Explained",
      excerpt: "Learn how our AI system validates citations and catches errors that traditional tools miss.",
      date: "May 1, 2026",
      author: "Engineering Team",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
          Blog
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
          Latest updates, guides, and insights from the SciPaper team.
        </p>
        
        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="border-b border-gray-200 dark:border-gray-800 pb-8 last:border-0"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 hover:text-primary-500 transition-colors">
                {post.title}
              </h2>
              <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.author}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {post.excerpt}
              </p>
              <a
                href="#"
                className="text-primary-500 hover:text-primary-600 font-medium text-sm"
              >
                Read more →
              </a>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
