import React from 'react';
import Navbar from '../components/Navbar';

export default function Community() {
  const posts = [
    {
      id: 1,
      author: "Sarah M.",
      content: "Just completed my first 5K! Thanks for all the support!",
      likes: 24
    },
    {
      id: 2,
      author: "Mike R.",
      content: "Anyone want to join my virtual workout group?",
      likes: 15
    },
    {
      id: 3,
      author: "Emma L.",
      content: "New personal record on deadlifts today! 💪",
      likes: 32
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C9E4CA] via-[#87BBA2] to-[#55828B]">
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="bg-white/90 rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold text-[#364958] mb-4">Community Feed</h2>
          <div className="space-y-4">
            {posts.map(post => (
              <div key={post.id} className="p-4 bg-gradient-to-r from-[#55828B] to-[#3B6064] rounded-lg text-white">
                <p className="font-semibold">{post.author}</p>
                <p className="my-2">{post.content}</p>
                <div className="flex items-center gap-2">
                  <span>❤️ {post.likes}</span>
                  <button className="text-sm bg-white/20 px-2 py-1 rounded">Like</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}