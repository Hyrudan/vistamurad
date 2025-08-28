import React from "react";
import { CheckCircle, Circle } from "lucide-react";

type Milestone = {
  title: string;
  date: string;
  completed: boolean;
  description: string;
};


const roadmap: Milestone[] = [
  // 2025
  {
    title: "Social Media Presence",
    date: "May 2025",
    completed: true,
    description: "Launch official Twitter, Telegram, and Discord channels for the community.",
  },
  {
    title: "Website Launch",
    date: "May 2025",
    completed: true,
    description: "Release the official project website with whitepaper and token information.",
  },
  {
    title: "Token Launch",
    date: "May 2025",
    completed: true,
    description: "Deploy the token contract and initiate fair launch.",
  },
  {
    title: "Liquidity Pool Creation",
    date: "May 2025",
    completed: true,
    description: "Establish liquidity pools on major decentralized exchanges.",
  },
  {
    title: "First Listing",
    date: "June 2025",
    completed: true,
    description: "Maded our very first listing on CEX",
  },
  {
    title: "First Meme Contest",
    date: "November 2025",
    completed: false,
    description: "Host the first community meme contest with rewards for top entries.",
  },
  // 2026
  {
    title: "NFT Meme Collection",
    date: "February 2026",
    completed: false,
    description: "Launch limited edition NFT meme collection for holders.",
  },
  {
    title: "DAO Proposal System",
    date: "May 2026",
    completed: false,
    description: "Introduce community governance for project decisions.",
  },
  {
    title: "Mobile App Beta",
    date: "August 2026",
    completed: false,
    description: "Release beta version of the mobile wallet and meme generator app.",
  },
  {
    title: "First Charity Campaign",
    date: "November 2026",
    completed: false,
    description: "Organize a charity event funded by a portion of transaction fees.",
  },
  // 2027
  {
    title: "Staking Platform",
    date: "February 2027",
    completed: false,
    description: "Allow holders to stake tokens for rewards and special NFTs.",
  },
  {
    title: "Major Exchange Listing",
    date: "May 2027",
    completed: false,
    description: "Apply for listing on top-tier centralized exchanges.",
  },
  {
    title: "Merchandise Store",
    date: "August 2027",
    completed: false,
    description: "Open an online store for meme coin branded merchandise.",
  },
  {
    title: "Quarterly Community Voting",
    date: "November 2027",
    completed: false,
    description: "Implement regular community votes for roadmap updates.",
  },
  // 2028
  {
    title: "Cross-Chain Bridge",
    date: "February 2028",
    completed: false,
    description: "Enable token transfers between BSC and other major blockchains.",
  },
  {
    title: "Second Meme NFT Series",
    date: "May 2028",
    completed: false,
    description: "Release a new series of NFTs featuring community-created memes.",
  },
  {
    title: "Charity DAO Launch",
    date: "August 2028",
    completed: false,
    description: "Establish a DAO for ongoing charity and social impact initiatives.",
  },
  {
    title: "AR Meme Filters",
    date: "November 2028",
    completed: false,
    description: "Launch augmented reality meme filters for social media.",
  },
  // 2029
  {
    title: "Metaverse Integration",
    date: "February 2029",
    completed: false,
    description: "Integrate meme coin assets into popular metaverse platforms.",
  },
  {
    title: "Global Meme Festival",
    date: "May 2029",
    completed: false,
    description: "Host the first global online meme festival with prizes.",
  },
  {
    title: "Third Meme NFT Series",
    date: "August 2029",
    completed: false,
    description: "Launch a third NFT series, curated by community votes.",
  },
  {
    title: "Mobile App Full Release",
    date: "November 2029",
    completed: false,
    description: "Release the full-featured mobile app for memes, wallet, and voting.",
  },
  // 2030
  {
    title: "Meme Coin Ecosystem Expansion",
    date: "February 2030",
    completed: false,
    description: "Expand partnerships and integrations with other meme projects.",
  },
  {
    title: "Decentralized Meme Marketplace",
    date: "May 2030",
    completed: false,
    description: "Launch a marketplace for trading meme NFTs and digital collectibles.",
  },
  {
    title: "Annual Meme Awards",
    date: "August 2030",
    completed: false,
    description: "Establish annual awards for top meme creators and contributors.",
  },
  {
    title: "Roadmap Review & Future Planning",
    date: "November 2030",
    completed: false,
    description: "Review achievements and gather community input for the next 5 years.",
  },
];

const Roadmap: React.FC = () => (
  <section id="roadmap" className="max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto px-2 sm:px-4 py-8 sm:py-12">
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center text-white">
      5-Year Roadmap
    </h1>
    <div className="grid grid-cols-1 gap-4 sm:gap-6">
      {roadmap.map((milestone, idx) => (
        <div
          key={idx}
          className={`flex items-start gap-3 sm:gap-4 bg-purple-800/40 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow transition ${
            milestone.completed ? "opacity-80" : ""
          }`}
        >
          <div className="mt-1 flex-shrink-0">
            {milestone.completed ? (
              <CheckCircle className="text-green-400" size={22} />
            ) : (
              <Circle className="text-pink-300" size={22} />
            )}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <h2 className="text-base sm:text-lg font-semibold text-white">{milestone.title}</h2>
              <span className="text-xs text-pink-200">{milestone.date}</span>
              {milestone.completed && (
                <span className="px-2 py-0.5 bg-green-500/20 text-green-300 text-xs rounded">
                  Completed
                </span>
              )}
            </div>
            <p className="text-pink-100 mt-1 text-sm sm:text-base">{milestone.description}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Roadmap;