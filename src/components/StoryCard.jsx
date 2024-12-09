import React, { useState } from 'react';
import { ThumbsUp, MessageSquare, Share2 } from 'lucide-react';
import CommentSection from './CommentSection';
import { formatDistanceToNow } from 'date-fns';

export default function StoryCard({
  postId,
  author,
  content,
  media,
  type,
  likes,
  comments,
  isLiked,
  createdAt,
  onLike,
  picture,
  onCommentAdded
}) {
  const [showComments, setShowComments] = useState(false);

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
    <div className="bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-lg mb-8 overflow-hidden max-w-[462px] mx-auto transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-5">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#C9E4CA] to-[#55828B] flex items-center justify-center text-white text-lg font-bold shadow-md">
            {author[0]}
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800">{author}</h3>
            <p className="text-sm text-gray-500">
              {createdAt ? formatDistanceToNow(new Date(createdAt), { addSuffix: true }) : 'Just now'}
            </p>
          </div>
        </div>
        <p className="mb-5 text-gray-700 leading-relaxed">{content}</p>

        {media && (
          <div className="flex justify-center rounded-xl overflow-hidden mb-5 shadow-md">
            {type === 'image' ? (
              <img
                src={media}
                alt="Post media"
                className="w-full h-auto max-h-96 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
                }}
              />
            ) : type === 'video' ? (
              <video
                controls
                className="w-full h-auto max-h-96 object-cover"
                src={media}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.parentElement.innerHTML = 'Video not available';
                }}
              />
            ) : null}
          </div>
        )}

        <div className="flex items-center justify-between mb-5">
          <button
            onClick={onLike}
            className={`flex items-center gap-2 ${
              isLiked ? 'text-blue-500' : 'text-gray-600'
            } hover:text-blue-500 transition-colors`}
          >
            <ThumbsUp className="w-6 h-6" />
            <span className="font-semibold">{likes}</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
          >
            <MessageSquare className="w-6 h-6" />
            <span className="font-semibold">{comments.length} Comments</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
          >
            <Share2 className="w-6 h-6" />
            <span className="font-semibold">Share</span>
          </button>
        </div>

        {showComments && (
          <CommentSection
            postId={postId}
            comments={comments}
            onCommentAdded={onCommentAdded}
          />
        )}
      </div>
    </div>
  );
}