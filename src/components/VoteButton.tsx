import React from 'react';

interface VoteButtonProps {
  hasVoted: boolean;
  currentUser: string | null | undefined;
  onVote: () => void;
}

// VoteButton displays the vote button with correct label and state.
const VoteButton: React.FC<VoteButtonProps> = ({ hasVoted, currentUser, onVote }) => (
  <button
    onClick={onVote}
    className={`px-3 py-1 rounded-md transition-all duration-200 text-white text-sm font-medium ${
      !currentUser
        ? 'bg-gray-500 hover:bg-gray-400'
        : hasVoted
        ? 'bg-green-600 opacity-75 cursor-not-allowed'
        : 'bg-pink-500 hover:bg-pink-600 hover:scale-105'
    }`}
    disabled={hasVoted}
    title={
      !currentUser
        ? 'Login required to vote'
        : hasVoted
        ? 'You already voted'
        : 'Click to vote'
    }
  >
    {!currentUser ? 'Login to Vote' : hasVoted ? 'Voted ✓' : 'Vote'}
  </button>
);

export default VoteButton;
