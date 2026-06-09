export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
          Features
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Comprehensive tools for scientific paper preparation
        </p>
        <div className="prose dark:prose-invert max-w-none">
          <h2>LaTeX Error Detection</h2>
          <p>AI-powered real-time error detection for LaTeX documents.</p>
          
          <h2>Journal Formatting</h2>
          <p>One-click formatting for 500+ scientific journals.</p>
          
          <h2>Citation Validation</h2>
          <p>Automatic validation of citations against DOI databases.</p>
          
          <h2>AI Analysis</h2>
          <p>Comprehensive document analysis with actionable insights.</p>
          
          <h2>Team Collaboration</h2>
          <p>Real-time collaborative workspace for research teams.</p>
        </div>
      </div>
    </div>
  );
}
