export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
          Get in Touch
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
          Have questions? We'd love to hear from you.
        </p>
        
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Contact Information
            </h2>
            <div className="space-y-3">
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Email:</strong> support@scipaper.ai
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Sales:</strong> sales@scipaper.ai
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Discord:</strong> discord.gg/scipaperai
              </p>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Business Hours
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Monday - Friday: 9:00 AM - 6:00 PM EST<br />
              Saturday - Sunday: Closed
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Enterprise Inquiries
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              For institutional licenses, custom integrations, or enterprise plans,
              please contact our sales team at sales@scipaper.ai
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
