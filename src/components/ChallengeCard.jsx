import React, {useState} from 'react';
import { Trophy } from 'lucide-react';

export default function ChallengeCard({ 
  title, 
  participants, 
  difficulty, 
  reward, 
  daysLeft,
  joined = false
}) {
  const [isJoined, setIsJoined] = useState(joined);
  const [participantCount, setParticipantCount] = useState(participants);

  const handleJoinChallenge = () => {
    setIsJoined(!isJoined);
    setParticipantCount(prev => isJoined ? prev - 1 : prev + 1);
  };

  return (
    <div className="p-6 bg-gradient-to-r from-[#55828B] to-[#3B6064] rounded-lg text-white shadow-lg transform transition-all hover:scale-[1.01]">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-yellow-100 rounded-lg">
          <Trophy className="w-6 h-6 text-yellow-600" />
        </div>
        <div>
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="text-sm text-white">{participantCount} participants</p>
        </div>
      </div>
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-white">Difficulty:</span>
          <span className="font-medium">{difficulty}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="test-white">Reward:</span>
          <span className="font-medium">{reward}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white">Days Left:</span>
          <span className="font-medium">{daysLeft} days</span>
        </div>
      </div>
      <button 
        onClick={handleJoinChallenge}
        className={`w-full py-2 rounded-lg transition-color ${
          isJoined 
            ? 'bg-gray-100 text-black hover:bg-gray-200' 
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        {isJoined ? 'Leave Challenge' : 'Join Challenge'}
      </button>
    </div>
  );
}