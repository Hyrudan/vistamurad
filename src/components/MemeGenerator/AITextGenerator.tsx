import React, { useState } from 'react';
import { Sparkles, Wand2, RefreshCw } from 'lucide-react';

interface AITextGeneratorProps {
  onTextGenerated: (text: string) => void;
}

const AITextGenerator: React.FC<AITextGeneratorProps> = ({ onTextGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedTexts, setGeneratedTexts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('funny');

  const textStyles = [
    { value: 'funny', label: 'Funny' },
    { value: 'sarcastic', label: 'Sarcastic' },
    { value: 'wholesome', label: 'Wholesome' },
    { value: 'dramatic', label: 'Dramatic' },
    { value: 'random', label: 'Random' }
  ];

  const memeTemplates = [
    "When you realize...",
    "That moment when...",
    "Me trying to...",
    "Nobody: \nMe:",
    "Expectation vs Reality",
    "Me: *exists*\nLife:",
    "POV: You're...",
    "This is fine",
    "Change my mind",
    "Is this...?"
  ];

  // Simulate AI text generation (replace with actual API call)
  const generateAIText = async () => {
    setIsLoading(true);
    try {
      // This is a mock implementation. In a real app, you'd call an AI API
      // For example, OpenAI's API or a free alternative like Hugging Face
      
      const mockResponses = {
        funny: [
          "When you're an adult but still ask your mom where things are",
          "Me pretending to understand what's happening in the group chat",
          "That awkward moment when you wave back at someone who wasn't waving at you",
          "When you're home alone and hear a noise",
          "Me trying to be productive vs me actually being productive"
        ],
        sarcastic: [
          "Oh great, another Monday",
          "Because that's exactly what I needed today",
          "Wow, what a surprise",
          "This is going perfectly as planned",
          "Just living my best life over here"
        ],
        wholesome: [
          "You're doing great, keep going!",
          "Small steps are still progress",
          "You matter more than you know",
          "Today is a good day to be kind",
          "You've got this!"
        ],
        dramatic: [
          "This is the end of everything",
          "My life is a series of unfortunate events",
          "The universe has chosen violence today",
          "This is my villain origin story",
          "And thus, chaos ensued"
        ],
        random: [
          "Banana for scale",
          "Instructions unclear, got stuck in washing machine",
          "Error 404: Motivation not found",
          "Loading... Please wait",
          "Achievement unlocked: Confusion"
        ]
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const responses = mockResponses[selectedStyle as keyof typeof mockResponses] || mockResponses.funny;
      const randomTexts = responses.sort(() => 0.5 - Math.random()).slice(0, 3);
      
      setGeneratedTexts(randomTexts);
    } catch (error) {
      console.error('Error generating AI text:', error);
      setGeneratedTexts(['Error generating text. Please try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate text based on custom prompt
  const generateCustomText = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    try {
      // Mock custom text generation based on prompt
      const customResponses = [
        `${prompt}? More like ${prompt.toLowerCase()} but make it meme`,
        `When ${prompt.toLowerCase()} hits different`,
        `POV: You're dealing with ${prompt.toLowerCase()}`,
        `${prompt}: Exists\nMe: And I took that personally`,
        `Nobody:\nAbsolutely nobody:\n${prompt}: *happens*`
      ];

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const randomResponse = customResponses[Math.floor(Math.random() * customResponses.length)];
      setGeneratedTexts([randomResponse]);
    } catch (error) {
      console.error('Error generating custom text:', error);
      setGeneratedTexts(['Error generating text. Please try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <Sparkles size={18} />
        AI Text Generator
      </h3>

      <div className="space-y-4">
        {/* Style Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Text Style
          </label>
          <select
            value={selectedStyle}
            onChange={(e) => setSelectedStyle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {textStyles.map(style => (
              <option key={style.value} value={style.value}>
                {style.label}
              </option>
            ))}
          </select>
        </div>

        {/* Custom Prompt */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Custom Prompt (Optional)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., working from home, Monday morning..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={generateCustomText}
              disabled={isLoading || !prompt.trim()}
              className="px-3 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Wand2 size={16} />
            </button>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateAIText}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <RefreshCw size={16} className="animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles size={16} />
              Generate AI Text
            </>
          )}
        </button>

        {/* Generated Texts */}
        {generatedTexts.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Generated Suggestions
            </label>
            <div className="space-y-2">
              {generatedTexts.map((text, index) => (
                <button
                  key={index}
                  onClick={() => onTextGenerated(text)}
                  className="w-full p-3 text-left bg-white border border-gray-300 rounded-md hover:bg-blue-50 hover:border-blue-300 transition-colors"
                >
                  <span className="text-sm text-gray-800 whitespace-pre-line">
                    {text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quick Templates */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quick Templates
          </label>
          <div className="grid grid-cols-2 gap-2">
            {memeTemplates.slice(0, 6).map((template, index) => (
              <button
                key={index}
                onClick={() => onTextGenerated(template)}
                className="p-2 text-xs text-left bg-white border border-gray-300 rounded-md hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                {template}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITextGenerator;