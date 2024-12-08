import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { addComment } from '../services/postService';

export default function CommentSection({ postId, comments, onCommentAdded }) {
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userData = JSON.parse(localStorage.getItem('userData'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const comment = {
        author: {
          googleId: userData.googleId,
          name: userData.name
        },
        content: commentText
      };

      const updatedPost = await addComment(postId, comment);
      onCommentAdded(updatedPost);
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
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
          disabled={isSubmitting}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>

      <div className="space-y-3">
        {comments.map((comment, index) => (
          <div key={index} className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold">{comment.author.name}</span>
              <span className="text-sm text-gray-700">
              {new Date(comment.createdAt).toLocaleDateString()} {' '}
              {new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}

              </span>
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}