import React from "react";
import { Link } from "react-router-dom";

const Governance: React.FC = () => (
  <section
    id="governance"
    className="max-w-2xl md:max-w-3xl mx-auto px-3 sm:px-4 py-12 sm:py-20"
    // No background color: fully transparent
  >
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 text-center">
      Governance
    </h1>
    <p className="text-pink-200 text-center max-w-xl mx-auto mb-8 sm:mb-12 text-sm sm:text-base">
      VISTAMURAD is built by the community, for the community. We believe in decentralized governance where every holder has a voice in shaping the future of our project.
    </p>

    <div className="bg-purple-800/40 backdrop-blur-sm border border-purple-600/30 rounded-2xl p-5 sm:p-8 mb-8">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">Our Governance Philosophy</h2>
      <p className="text-pink-100 text-sm sm:text-base mb-2">
        At VISTAMURAD, we are committed to true decentralization. Every major decision—from tokenomics to marketing, partnerships, and feature development—is made with input from our holders.
      </p>
      <p className="text-pink-100 text-sm sm:text-base">
        We use open community polls, transparent discussions, and on-chain voting to ensure that everyone’s voice is heard and respected.
      </p>
    </div>

    <div className="bg-purple-800/30 backdrop-blur-sm border border-purple-600/20 rounded-2xl p-5 sm:p-8 mb-8">
      <h2 className="text-lg sm:text-xl font-bold text-white mb-2">How Can You Participate?</h2>
      <ul className="list-disc list-inside text-pink-100 text-sm sm:text-base space-y-2">
        <li>
          <span className="text-pink-200 font-semibold">Join our community channels:</span> X, Telegram, and Discord are where proposals and discussions start.
        </li>
        <li>
          <span className="text-pink-200 font-semibold">Vote on proposals:</span> When major decisions arise, we organize transparent voting so every holder can participate.
        </li>
        <li>
          <span className="text-pink-200 font-semibold">Submit your ideas:</span> We encourage all holders to propose new features, partnerships, or improvements.
        </li>
      </ul>
    </div>

    <div className="bg-purple-800/20 backdrop-blur-sm border border-purple-600/10 rounded-2xl p-5 sm:p-8">
      <h2 className="text-lg sm:text-xl font-bold text-white mb-2">Upcoming: On-Chain Governance</h2>
      <p className="text-pink-100 text-sm sm:text-base">
        We are working towards implementing fully on-chain governance, where proposals and votes are recorded on the blockchain for maximum transparency and security. Stay tuned for updates!
      </p>
    </div>

    {/* Back to Home Button */}
    <div className="mt-10 text-center">
      <Link
        to="/"
        className="inline-block px-6 py-2 sm:px-8 sm:py-3 bg-white/10 hover:bg-pink-500/40 text-white font-bold rounded-full transition-all duration-300 border border-white/30 hover:border-pink-400/50 text-sm sm:text-base"
      >
        Back to Home
      </Link>
    </div>
  </section>
);

export default Governance;
