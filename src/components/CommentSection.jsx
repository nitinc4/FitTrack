import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';

export default function CommentSection({ comments, onAddComment }) {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onAddComment(commentText);
      setCommentText('');
    }
  };

  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center gap-2 text-gray-600">
        <MessageSquare className="w-5 h-5" />
        <span>{comments.length} Comments</span>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>

      <div className="space-y-3">
        {comments.map((comment, index) => (
          <div key={index} className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold">{comment.author.name}</span>
              <span className="text-sm text-gray-500">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}