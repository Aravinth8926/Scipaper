export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
          About SciPaper AI
        </h1>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            We're on a mission to help researchers publish with confidence.
          </p>
          
          <h2>Our Story</h2>
          <p>
            SciPaper AI was founded by researchers who experienced the pain of manuscript preparation firsthand.
            After countless hours spent formatting papers, fixing LaTeX errors, and validating citations,
            we knew there had to be a better way.
          </p>
          
          <h2>Our Mission</h2>
          <p>
            To empower researchers worldwide with AI-powered tools that eliminate the tedious aspects of
            scientific publishing, allowing them to focus on what matters most: their research.
          </p>
          
          <h2>Our Values</h2>
          <ul>
            <li><strong>Accuracy:</strong> 99.7% error detection rate through continuous AI improvement</li>
            <li><strong>Privacy:</strong> Your research data is encrypted and never used for AI training</li>
            <li><strong>Accessibility:</strong> Free tier ensures every researcher has access to quality tools</li>
            <li><strong>Innovation:</strong> Constantly adding support for new journals and features</li>
          </ul>
          
          <h2>Trusted by Researchers</h2>
          <p>
            Over 50,000 researchers at leading institutions including MIT, Stanford, Oxford, and Cambridge
            use SciPaper AI to prepare their manuscripts for publication.
          </p>
        </div>
      </div>
    </div>
  );
}
