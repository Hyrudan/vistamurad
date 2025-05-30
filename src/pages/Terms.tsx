import React from 'react';
import BackToHomeButton from '../components/BackToHomeButton';

const TermsAndConditionsPage: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 py-16 px-4">
      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-white/20">
        <BackToHomeButton />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 text-center">
          Terms &amp; Conditions
        </h1>
        <div className="mb-8 text-pink-100 text-base space-y-4">
          <p>
            Welcome to <span className="text-yellow-300 font-bold">VISTAMURAD</span>! By accessing or using our website and services, you agree to comply with and be bound by the following terms and conditions.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <span className="font-bold text-yellow-300">Eligibility:</span> You must be at least 18 years old or of legal age in your jurisdiction to participate in any promotions or activities.
            </li>
            <li>
              <span className="font-bold text-yellow-300">No Financial Advice:</span> All content is for informational purposes only and should not be considered financial or investment advice.
            </li>
            <li>
              <span className="font-bold text-yellow-300">User Conduct:</span> You agree not to misuse the platform, attempt to hack, spam, or otherwise disrupt the experience for other users.
            </li>
            <li>
              <span className="font-bold text-yellow-300">Intellectual Property:</span> All content, logos, and materials are the property of VISTAMURAD unless otherwise stated.
            </li>
            <li>
              <span className="font-bold text-yellow-300">Liability:</span> VISTAMURAD is not responsible for any losses or damages resulting from the use of our platform or participation in our ecosystem.
            </li>
            <li>
              <span className="font-bold text-yellow-300">Changes:</span> We reserve the right to update these terms at any time. Continued use of the site constitutes acceptance of the new terms.
            </li>
          </ul>
          <p>
            For any questions, please contact us via our official channels.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditionsPage;
