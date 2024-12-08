import React, { useState } from 'react';
import { ThumbsUp, MessageSquare, Share2, Send, Trash2 } from 'lucide-react';

export default function StoryCard({
  author,
  content,
  likes,
  media,
  type,
  isLiked,
  onLike
}) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([
    { id: 1, user: 'Jane Doe', text: 'Great post! Very inspiring.', timestamp: '1h ago', currentUser: false },
    { id: 2, user: 'John Smith', text: 'This really motivates me to stay fit.', timestamp: '30m ago', currentUser: false }
  ]);
  const [newComment, setNewComment] = useState('');

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

  const addComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        user: 'Current User',
        text: newComment,
        timestamp: 'Just now',
        currentUser: true
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  const deleteComment = (id) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-lg mb-8 overflow-hidden max-w-[462px] mx-auto transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      <div className="p-6">
        {/* Author and content section */}
        <div className="flex items-center gap-4 mb-5">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#55828B] to-[#3B6064] flex items-center justify-center text-white text-lg font-bold shadow-md">
            {author[0]}
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800">{author}</h3>
            <p className="text-sm text-gray-500">2 hours ago</p>
          </div>
        </div>
        <p className="mb-5 text-gray-700 leading-relaxed">{content}</p>

        {/* Media section */}
        {media && (
          <div className="flex justify-center rounded-xl overflow-hidden mb-5 shadow-md">
            {type === 'image' ? (
              <img
                src={media}
                alt="Post media"
                className="w-full h-auto max-h-96 object-cover"
              />
            ) : (
              <video
                controls
                className="w-full h-auto max-h-96 object-cover"
                src={media}
              />
            )}
          </div>
        )}

        {/* Interaction buttons */}
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

        {/* Comments Section */}
        {showComments && (
          <div className="mt-5 border-t pt-5 space-y-5">
            {/* Comment Input */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#55828B] to-[#3B6064] flex items-center justify-center text-white font-bold text-lg shadow-md">
                U
              </div>
              <div className="flex-grow relative">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full pl-4 pr-12 py-3 border-2 border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#3B6064] focus:border-transparent transition-all duration-300"
                />
                {newComment && (
                  <button
                    onClick={addComment}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#3B6064] hover:text-[#55828B] transition-colors"
                  >
                    <Send className="w-6 h-6" />
                  </button>
                )}
              </div>
            </div>

            {/* Comments List */}
            {comments.map((comment) => (
              <div 
                key={comment.id} 
                className="flex items-start space-x-4 group relative"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#55828B] to-[#3B6064] flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {comment.user[0]}
                </div>
                <div className="flex-grow relative">
                  <div className="bg-white rounded-2xl p-3 shadow-sm pr-8">
                    <p className="text-sm font-semibold text-gray-800">{comment.user}</p>
                    <p className="text-sm text-gray-700 mt-1">{comment.text}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{comment.timestamp}</p>
                  {comment.currentUser && (
                    <button
                      onClick={() => deleteComment(comment.id)}
                      className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

