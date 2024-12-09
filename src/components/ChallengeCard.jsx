import React, { useState } from 'react';
import { Trophy } from 'lucide-react';

export default function ChallengeCard({ 
  title, 
  participants, 
  difficulty, 
  reward, 
  daysLeft,
  joined = false,
  onJoin
}) {
  const [isJoined, setIsJoined] = useState(joined);
  const [participantCount, setParticipantCount] = useState(participants);

  const handleJoinChallenge = () => {
    onJoin();
    setIsJoined(!isJoined);
    setParticipantCount(prev => isJoined ? prev - 1 : prev + 1);
  };

  return (
    <div className="p-6 bg-white/90 rounded-lg shadow-lg transform transition-all hover:scale-[1.01]">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-[#C9E4CA] rounded-lg">
          <Trophy className="w-6 h-6 text-[#364958]" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-[#364958]">{title}</h3>
          <p className="text-sm text-[#55828B]">{participantCount} participants</p>
        </div>
      </div>
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-[#364958]">Difficulty:</span>
          <span className="font-medium text-[#55828B]">{difficulty}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#364958]">Reward:</span>
          <span className="font-medium text-[#55828B]">{reward}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#364958]">Days Left:</span>
          <span className="font-medium text-[#55828B]">{daysLeft} days</span>
        </div>
      </div>
      <button 
        onClick={handleJoinChallenge}
        className={`w-full py-2 rounded-lg transition-colors ${
          isJoined 
            ? 'bg-[#364958] text-white hover:bg-[#2d3e4a]' 
            : 'bg-[#55828B] text-white hover:bg-[#3B6064]'
        }`}
      >
        {isJoined ? 'Leave Challenge' : 'Join Challenge'}
      </button>
    </div>
  );
}