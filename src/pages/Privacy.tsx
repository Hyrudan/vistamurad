import React from 'react';
import BackToHomeButton from '../components/BackToHomeButton';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 py-16 px-4">
      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-white/20">
        <BackToHomeButton />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 text-center">
          Privacy Policy
        </h1>
        <div className="mb-8 text-pink-100 text-base space-y-4">
          <p>
            Your privacy is important to <span className="text-yellow-300 font-bold">VISTAMURAD</span>. This policy explains how we collect, use, and protect your information.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <span className="font-bold text-yellow-300">Information Collection:</span> We may collect basic information such as your email address and wallet address when you interact with our platform or participate in promotions.
            </li>
            <li>
              <span className="font-bold text-yellow-300">Use of Information:</span> Your information is used solely for communication, eligibility verification, and prize distribution related to our ecosystem.
            </li>
            <li>
              <span className="font-bold text-yellow-300">No Sharing:</span> We do not sell or share your personal information with third parties except as required by law.
            </li>
            <li>
              <span className="font-bold text-yellow-300">Security:</span> We implement reasonable security measures to protect your data, but cannot guarantee absolute security.
            </li>
            <li>
              <span className="font-bold text-yellow-300">Cookies:</span> Our site may use cookies to enhance user experience.
            </li>
            <li>
              <span className="font-bold text-yellow-300">Policy Updates:</span> We may update this policy from time to time. Continued use of our site constitutes acceptance of the new policy.
            </li>
          </ul>
          <p>
            For questions or concerns, please contact us via our official channels.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicyPage;
