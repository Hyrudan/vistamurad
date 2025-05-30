import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Helper to calculate time left for a given UTC deadline
const calculateTimeLeft = (targetUTCString: string) => {
  const targetDate = new Date(targetUTCString);
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  let timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    completed: false,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      completed: false,
    };
  } else {
    timeLeft.completed = true;
  }

  return timeLeft;
};

// Deadlines as UTC strings
const deadlines = [
  {
    city: 'Brasília',
    localTime: 'June 22, 2025, 9:00 PM',
    utc: '2025-06-23T00:00:00Z',
    tz: 'GMT-3',
  },
  {
    city: 'Hong Kong',
    localTime: 'June 22, 2025, 9:00 PM',
    utc: '2025-06-22T13:00:00Z',
    tz: 'GMT+8',
  },
  {
    city: 'Washington DC',
    localTime: 'June 22, 2025, 9:00 PM',
    utc: '2025-06-23T01:00:00Z',
    tz: 'GMT-4',
  },
  {
    city: 'London',
    localTime: 'June 22, 2025, 9:00 PM',
    utc: '2025-06-22T20:00:00Z',
    tz: 'GMT+1',
  },
];

const Contest: React.FC = () => {
  // States for each countdown
  const [timeLefts, setTimeLefts] = useState(
    deadlines.map(dl => calculateTimeLeft(dl.utc))
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLefts(deadlines.map(dl => calculateTimeLeft(dl.utc)));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 py-16 px-4">
      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-white/20">
        {/* Contest Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 text-center">
          OFFICIAL CONTEST – “LET’S PIXELATE EVERYTHING!”
        </h1>
        <p className="text-lg text-pink-100 mb-8 text-center">
          Transform memes and images related to the $VMURAD universe into pixelated versions and compete for <span className="text-yellow-300 font-bold">5 MILLION tokens!</span>
        </p>

        {/* Multiple Deadlines Countdown */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-pink-200 mb-3 text-center">Contest ends in:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {deadlines.map((dl, i) => (
              <div key={dl.city} className="flex flex-col items-center bg-white/5 rounded-xl p-4 border border-white/10">
                <span className="text-pink-200 font-semibold">{dl.city} <span className="text-xs text-pink-100">({dl.tz})</span></span>
                <span className="text-pink-100 text-xs mb-1">{dl.localTime}</span>
                <div className="text-2xl font-extrabold text-yellow-300 drop-shadow mb-1">
                  {timeLefts[i].completed
                    ? "Contest ended!"
                    : `${timeLefts[i].days}d ${timeLefts[i].hours}h ${timeLefts[i].minutes}m ${timeLefts[i].seconds}s`}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Participation Rules */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-pink-200 mb-3">PARTICIPATION RULES</h2>
          <p className="text-pink-100 mb-3">Participants must complete the following 3 tasks:</p>
          <ol className="list-decimal list-inside text-pink-100 text-base space-y-4 font-medium">
            <li>
              <span className="font-bold text-yellow-300">Engage on X (Twitter):</span>
              <ul className="list-disc list-inside ml-5 mt-2 text-pink-100 text-sm space-y-1">
                <li>Post a pixelated image on X (Twitter) related to the $VMURAD project.</li>
                <li>Tag the profile <span className="text-yellow-300 font-bold">@VistaMurad</span> and at least 5 people or crypto community profiles.</li>
                <li>Use at least 5 hashtags related to the crypto market.</li>
              </ul>
            </li>
            <li>
              <span className="font-bold text-yellow-300">Help grow the @VistaMurad group on Telegram:</span>
              <ul className="list-disc list-inside ml-5 mt-2 text-pink-100 text-sm space-y-1">
                <li>Invite 1 new person to the official Telegram group: <span className="text-yellow-300 font-bold">@VistaMurad</span>.</li>
                <li>
                  The invited person must mention you in the group, e.g., <span className="italic">“@josesilva invited me.”</span>
                </li>
                <li>
                  The new member will also be eligible to participate and compete equally for the prize by following the rules.
                </li>
              </ul>
            </li>
            <li>
              <span className="font-bold text-yellow-300">Buy $VMURAD:</span>
              <ul className="list-disc list-inside ml-5 mt-2 text-pink-100 text-sm space-y-1">
                <li>Purchase at least 1 million $VMURAD during the contest period and send the transaction hash to the @VistaMurad group on Telegram.</li>
              </ul>
            </li>
          </ol>
        </div>

        {/* Evaluation Criteria */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-pink-200 mb-3">EVALUATION CRITERIA</h2>
          <ul className="list-disc list-inside text-pink-100 text-base space-y-1">
            <li>Creativity and originality of the pixel art.</li>
            <li>Relevance to the $VMURAD universe and contest theme.</li>
            <li>Reach and engagement of the post (likes, reposts, comments).</li>
            <li>Full compliance with the rules.</li>
            <li>Active participation in the community during the contest.</li>
          </ul>
        </div>

        {/* Pixel Art Tip */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-pink-200 mb-3">TIP FOR CREATING PIXEL ART</h2>
          <p className="text-pink-100 mb-2">
            You can use simple and free tools to pixelate any image, even without design skills. Several free apps are available in the Play Store. Or use ChatGPT (see instructions below).
          </p>
        </div>

        {/* Deadline and Announcement */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-pink-200 mb-3">DEADLINE AND WINNER ANNOUNCEMENT</h2>
          <p className="text-pink-100">
            The contest will be active until <span className="text-yellow-300 font-bold">June 22, 2025</span>. The winner will be selected by the VistaMurad team and announced on the official Telegram group and @VistaMurad profile on X the same day at <span className="text-yellow-300 font-bold">9 PM (local time in each city)</span>.
          </p>
        </div>

        {/* Prize */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-pink-200 mb-3">PRIZE</h2>
          <p className="text-pink-100">
            <span className="text-yellow-300 font-bold">5,000,000 (five million) $VMURAD tokens.</span>
          </p>
        </div>

        {/* How to Pixelate Using ChatGPT */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-pink-200 mb-3">HOW TO PIXELATE USING CHATGPT</h2>
          <ol className="list-decimal list-inside text-pink-100 text-base space-y-1 ml-4">
            <li>Visit <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer" className="text-yellow-300 underline hover:text-pink-400 transition">chat.openai.com</a> and log in.</li>
            <li>Click the paperclip icon (or upload button) and send the Murad image saved on your device + the official $VMURAD logo.</li>
            <li>Then type a command like: <span className="italic text-pink-200">“Please transform this image of Murad into pixelated cartoon art. Keep the official $VMURAD logo on his shirt.”</span></li>
            <li>Wait for the image to be generated and download the final file.</li>
            <li>Use the pixelated art to post on X following the contest rules.</li>
          </ol>
        </div>

        {/* Other Free Tools */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-pink-200 mb-3">OTHER FREE TOOLS TO CREATE PIXEL ART</h2>
          <ul className="list-disc list-inside text-pink-100 text-base space-y-1 ml-4">
            <li>
              <a href="https://www.pixilart.com/draw" target="_blank" rel="noopener noreferrer" className="text-yellow-300 underline hover:text-pink-400 transition">Pixilart</a>
            </li>
            <li>
              <a href="https://www.piskelapp.com/" target="_blank" rel="noopener noreferrer" className="text-yellow-300 underline hover:text-pink-400 transition">Piskel</a>
            </li>
            <li>
              <a href="https://giventofly.github.io/pixelit/" target="_blank" rel="noopener noreferrer" className="text-yellow-300 underline hover:text-pink-400 transition">Pixel It</a>
            </li>
            <li>
              <a href="https://www.fotor.com/features/pixel-art-generator/" target="_blank" rel="noopener noreferrer" className="text-yellow-300 underline hover:text-pink-400 transition">Fotor Pixel Art Generator</a>
            </li>
            <li>
              <a href="https://perchance.org/ai-pixel-art-generator" target="_blank" rel="noopener noreferrer" className="text-yellow-300 underline hover:text-pink-400 transition">AI Pixel Art Generator (Perchance)</a>
            </li>
          </ul>
        </div>

        {/* Good luck message */}
        <div className="mb-8 text-center">
          <span className="text-2xl font-extrabold text-yellow-300 drop-shadow">GOOD LUCK !!</span>
        </div>
        {/* Back button */}
        <div className="flex justify-center">
          <Link
            to="/"
            className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-pink-600 hover:from-yellow-500 hover:to-pink-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 text-base flex items-center gap-2 shadow-lg"
          >
            <ArrowRight size={16} className="rotate-180" /> Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Contest;
