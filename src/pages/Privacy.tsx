import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-700px mx-auto bg-purple-800/50 backdrop-blur-sm border border-purple-600/30 rounded-2xl p-6 sm:p-8">
        <h1 className="text-center text-2xl sm:text-3xl font-bold text-white mb-6">Privacy Policy</h1>
        <p className="text-pink-100 mb-6">
          This Privacy Policy describes how VISTAMURAD ("we", "us", or "our") collects, uses, and protects your information when you use our website and services.
        </p>

        <h2 className="text-xl font-bold text-pink-400 mt-8 mb-3">1. Information We Collect</h2>
        <p className="text-pink-100 mb-4">
          We do not collect personal information such as your name, address, or contact details unless you voluntarily provide them (for example, by emailing us). Our website may collect non-personal data such as browser type, operating system, and general usage statistics to improve our services.
        </p>

        <h2 className="text-xl font-bold text-pink-400 mt-8 mb-3">2. Use of Information</h2>
        <p className="text-pink-100 mb-4">
          Any information collected is used solely to enhance your experience on our website, respond to inquiries, and improve our services. We do not sell or share your personal information with third parties.
        </p>

        <h2 className="text-xl font-bold text-pink-400 mt-8 mb-3">3. Cookies</h2>
        <p className="text-pink-100 mb-4">
          Our website may use cookies or similar technologies to enhance user experience. You can choose to disable cookies in your browser settings, but some features of the site may not function properly.
        </p>

        <h2 className="text-xl font-bold text-pink-400 mt-8 mb-3">4. Third-Party Links</h2>
        <p className="text-pink-100 mb-4">
          Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. Please review their privacy policies before providing any information.
        </p>

        <h2 className="text-xl font-bold text-pink-400 mt-8 mb-3">5. Security</h2>
        <p className="text-pink-100 mb-4">
          We take reasonable measures to protect your information, but please be aware that no method of transmission over the internet or electronic storage is 100% secure.
        </p>

        <h2 className="text-xl font-bold text-pink-400 mt-8 mb-3">6. Changes to This Policy</h2>
        <p className="text-pink-100 mb-4">
          We may update this Privacy Policy from time to time. Any changes will be posted on this page, and your continued use of the website constitutes acceptance of those changes.
        </p>

        <h2 className="text-xl font-bold text-pink-400 mt-8 mb-3">7. Contact</h2>
        <p className="text-pink-100 mb-4">
          If you have any questions about this Privacy Policy, please contact us at <a href="https://discord.gg/HNWq88Dp" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300">Discord</a>.
        </p>

        <div className="text-center text-pink-400 mt-8 text-sm">
          Last updated: May 2025
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
