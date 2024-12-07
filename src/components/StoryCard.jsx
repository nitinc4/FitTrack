import React from 'react';
import { ThumbsUp, MessageSquare, Share2 } from 'lucide-react';

export default function StoryCard({ 
  author, 
  content, 
  likes, 
  media, 
  type,
  isLiked,
  onLike 
}) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${author}'s Fitness Story`,
        text: content,
        url: window.location.href
      }).catch(console.error);
    } else {
      alert('Sharing is not supported on this device');
    }
  };

  return (
    <div className="bg-white/90 rounded-xl shadow-md mb-6 overflow-hidden max-w-md mx-auto">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#55828B] to-[#3B6064] flex items-center justify-center text-white font-semibold">
            {author[0]}
          </div>
          <div>
            <h3 className="font-semibold">{author}</h3>
            <p className="text-sm text-gray-500">2 hours ago</p>
          </div>
        </div>
        <p className="mb-4 text-sm text-gray-700">{content}</p>
        {media && (
          <div className="flex justify-center rounded-lg overflow-hidden mb-4">
            {type === 'image' ? (
              <img
                src={media}
                alt="Post media"
                className="max-w-full max-h-80 object-cover rounded-lg"
              />
            ) : (
              <video
                controls
                className="max-w-full max-h-80 object-cover rounded-lg"
                src={media}
              />
            )}
          </div>
        )}
        <div className="flex items-center gap-6">
          <button 
            onClick={onLike}
            className={`flex items-center gap-2 ${
              isLiked ? 'text-blue-500' : 'text-gray-600'
            } hover:text-blue-500 transition-colors`}
          >
            <ThumbsUp className="w-5 h-5" />
            <span>{likes}</span>
          </button>
          <button 
            onClick={() => alert('Comments feature coming soon!')}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Comment</span>
          </button>
          <button 
            onClick={handleShare}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
          >
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}
