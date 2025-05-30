import React from 'react';

interface VotersListProps {
  voters: string[];
}

// VotersList displays the list of voters for an image, shown on hover.
const VotersList: React.FC<VotersListProps> = ({ voters }) => {
  if (!voters.length) return null;
  return (
    <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 rounded-lg p-2 opacity-0 hover:opacity-100 transition-opacity duration-200 backdrop-blur-sm">
      <div className="text-white text-xs">
        <div className="font-semibold mb-1">Voters:</div>
        {voters.slice(0, 5).map((voter, idx) => (
          <div key={idx} className="text-gray-300">{voter}</div>
        ))}
        {voters.length > 5 && (
          <div className="text-gray-400">
            +{voters.length - 5} more...
          </div>
        )}
      </div>
    </div>
  );
};

export default VotersList;
