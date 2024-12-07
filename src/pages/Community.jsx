import React, { useState, useEffect } from 'react';
import { Camera, Video } from 'lucide-react';
import TabButton from '../components/TabButton';
import StoryCard from '../components/StoryCard';
import ChallengeCard from '../components/ChallengeCard';
import ReviewCard from '../components/ReviewCard';
import Navbar from '../components/Navbar';
import { createPost, getPosts, toggleLike } from '../services/postService';

const initialChallenges = [
  {
    id: 1,
    title: "30-Day Plank Challenge",
    participants: 0,
    difficulty: "Intermediate",
    reward: "Gold Badge",
    daysLeft: 15,
    joined: false
  },
  {
    id: 2,
    title: "10K Steps Daily",
    participants: 0,
    difficulty: "Beginner",
    reward: "Silver Badge",
    daysLeft: 20,
    joined: false
  }
];

const initialReviews = [
  {
    id: 1,
    author: "Emma L.",
    rating: 5,
    content: "This community has transformed my fitness journey!",
    date: "2024-03-15"
  },
  {
    id: 2,
    author: "John D.",
    rating: 4,
    content: "Great support system and motivation.",
    date: "2024-03-14"
  }
];

export default function Community() {
  const [activeTab, setActiveTab] = useState('stories');
  const [postContent, setPostContent] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [posts, setPosts] = useState([]);
  const [challenges] = useState(initialChallenges);
  const [reviews, setReviews] = useState(initialReviews);
  const [loading, setLoading] = useState(true);

  const userData = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMediaUpload = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real application, you would upload this to a storage service
      // For now, we'll use local URL
      setSelectedMedia({
        url: URL.createObjectURL(file),
        type: file.type.startsWith('image/') ? 'image' : 'video'
      });
    }
  };

  const handlePost = async () => {
    if (postContent.trim() || selectedMedia) {
      try {
        const newPost = {
          content: postContent,
          author: {
            googleId: userData.googleId,
            name: userData.name,
            picture: userData.picture
          },
          ...(selectedMedia && {
            mediaUrl: selectedMedia.url,
            mediaType: selectedMedia.type
          })
        };

        await createPost(newPost);
        await fetchPosts();
        setPostContent('');
        setSelectedMedia(null);
      } catch (error) {
        console.error('Error creating post:', error);
      }
    }
  };

  const handleLike = async (postId) => {
    try {
      await toggleLike(postId, userData.googleId);
      await fetchPosts();
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleSubmitReview = () => {
    if (reviewText.trim() && selectedRating > 0) {
      const newReview = {
        id: reviews.length + 1,
        author: userData.name,
        rating: selectedRating,
        content: reviewText,
        date: new Date().toISOString().split('T')[0]
      };
      setReviews([newReview, ...reviews]);
      setReviewText('');
      setSelectedRating(0);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#C9E4CA] via-[#87BBA2] to-[#55828B] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C9E4CA] via-[#87BBA2] to-[#55828B]">
      <Navbar/>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-lg p-2 inline-flex gap-2">
            <TabButton
              active={activeTab === 'stories'}
              onClick={() => setActiveTab('stories')}
            >
              Stories
            </TabButton>
            <TabButton
              active={activeTab === 'challenges'}
              onClick={() => setActiveTab('challenges')}
            >
              Challenges
            </TabButton>
            <TabButton
              active={activeTab === 'reviews'}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </TabButton>
          </div>
        </div>

        {activeTab === 'stories' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#C9E4CA] via-[#87BBA2] to-[#55828B] rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative group">
                  <input
                    type="file"
                    className="hidden"
                    id="media-upload"
                    accept="image/*,video/*"
                    onChange={handleMediaUpload}
                  />
                  <label
                    htmlFor="media-upload"
                    className="flex items-center gap-2 cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg transition-colors"
                  >
                    <Camera className="w-5 h-5" />
                    <span>Photo/Video</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Share your fitness journey..."
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  onClick={handlePost}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Post
                </button>
              </div>

              {posts.map((post) => (
                <StoryCard 
                  key={post._id}
                  author={post.author.name}
                  content={post.content}
                  media={post.mediaUrl}
                  type={post.mediaType}
                  likes={post.likes.length}
                  isLiked={post.likes.includes(userData.googleId)}
                  onLike={() => handleLike(post._id)}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {challenges.map((challenge) => (
              <ChallengeCard key={challenge.id} {...challenge} />
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="font-bold text-xl mb-4">Share Your Experience</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setSelectedRating(star)}
                      className={`text-2xl ${
                        star <= selectedRating ? 'text-yellow-400' : 'text-gray-300'
                      } hover:text-yellow-500 transition-colors`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Write your review..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={4}
                />
                <button 
                  onClick={handleSubmitReview}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Review
                </button>
              </div>
            </div>

            {reviews.map((review) => (
              <ReviewCard key={review.id} {...review} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}