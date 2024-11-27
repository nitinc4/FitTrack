import React, { useState } from 'react';
import { Camera, Video } from 'lucide-react';
import TabButton from '../components/TabButton';
import StoryCard from '../components/StoryCard';
import ChallengeCard from '../components/ChallengeCard';
import ReviewCard from '../components/ReviewCard';
import Navbar from '../components/Navbar';

const initialStories = [
  {
    id: 1,
    author: "Sarah M.",
    content: "Just completed my first 5K! Thanks for all the support!",
    likes: 24,
    media: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=800",
    type: "image",
    isLiked: false
  },
  {
    id: 2,
    author: "Mike R.",
    content: "Check out my new workout routine!",
    likes: 15,
    media: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&q=80&w=800",
    type: "video",
    isLiked: false
  }
];

const initialChallenges = [
  {
    id: 1,
    title: "30-Day Plank Challenge",
    participants: 1234,
    difficulty: "Intermediate",
    reward: "Gold Badge",
    daysLeft: 15,
    joined: false
  },
  {
    id: 2,
    title: "10K Steps Daily",
    participants: 2567,
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

  const [stories, setStories] = useState(initialStories);
  const [challenges] = useState(initialChallenges);
  const [reviews, setReviews] = useState(initialReviews);

  const handleMediaUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedMedia(file);
    }
  };

  const handlePost = () => {
    if (postContent.trim() || selectedMedia) {
      const newStory = {
        id: stories.length + 1,
        author: "You",
        content: postContent,
        likes: 0,
        isLiked: false,
        ...(selectedMedia && {
          media: URL.createObjectURL(selectedMedia),
          type: selectedMedia.type.startsWith('image/') ? 'image' : 'video'
        })
      };
      setStories([newStory, ...stories]);
      setPostContent('');
      setSelectedMedia(null);
    }
  };

  const handleLike = (storyId) => {
    setStories(stories.map(story => {
      if (story.id === storyId) {
        return {
          ...story,
          likes: story.isLiked ? story.likes - 1 : story.likes + 1,
          isLiked: !story.isLiked
        };
      }
      return story;
    }));
  };

  const handleSubmitReview = () => {
    if (reviewText.trim() && selectedRating > 0) {
      const newReview = {
        id: reviews.length + 1,
        author: "You",
        rating: selectedRating,
        content: reviewText,
        date: new Date().toISOString().split('T')[0]
      };
      setReviews([newReview, ...reviews]);
      setReviewText('');
      setSelectedRating(0);
    }
  };

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
                    <span>Photo</span>
                  </label>
                </div>
                <div className="relative group">
                  <input
                    type="file"
                    className="hidden"
                    id="video-upload"
                    accept="video/*"
                    onChange={handleMediaUpload}
                  />
                  <label
                    htmlFor="video-upload"
                    className="flex items-center gap-2 cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg transition-colors"
                  >
                    <Video className="w-5 h-5" />
                    <span>Video</span>
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

              {stories.map((story) => (
                <StoryCard 
                  key={story.id} 
                  {...story} 
                  onLike={() => handleLike(story.id)}
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
            <div className="p-6 bg-gradient-to-r from-[#55828B] to-[#3B6064] rounded-lg text-white shadow-lg transform transition-all hover:scale-[1.01]">
              <h3 className="font-bold text-xl mb-4">Create Your Own Challenge</h3>
              <p className="mb-6">Inspire others and create a custom fitness challenge for the community.</p>
              <button 
                onClick={() => alert('Create Challenge feature coming soon!')}
                className="flex items-center rounded-lg gap-2 px-4 py-2 bg-blue-500 text-white hover:bg-blue-700"
              >
                <p className='text-white'>Create Challenge</p>
              </button>
            </div>
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