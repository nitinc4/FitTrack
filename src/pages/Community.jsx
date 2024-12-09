import React, { useState, useEffect } from 'react';
import { Camera, Plus } from 'lucide-react';
import TabButton from '../components/TabButton';
import StoryCard from '../components/StoryCard';
import ChallengeCard from '../components/ChallengeCard';
import ReviewCard from '../components/ReviewCard';
import Navbar from '../components/Navbar';
import CreateChallengeModal from '../components/CreateChallengeModal';
import { createPost, getPosts, toggleLike } from '../services/postService';
import { createReview, getReviews } from '../services/reviewService';
import { createChallenge, getChallenges, joinChallenge } from '../services/challengeService';

export default function Community() {
  const [activeTab, setActiveTab] = useState('stories');
  const [postContent, setPostContent] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [posts, setPosts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const userData = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    fetchPosts();
    fetchReviews();
    fetchChallenges();
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

  const fetchReviews = async () => {
    try {
      const fetchedReviews = await getReviews();
      setReviews(fetchedReviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const fetchChallenges = async () => {
    try {
      const fetchedChallenges = await getChallenges();
      setChallenges(fetchedChallenges);
    } catch (error) {
      console.error('Error fetching challenges:', error);
    }
  };

  const handleMediaUpload = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
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

  const handleCreateChallenge = async (challengeData) => {
    try {
      const newChallenge = {
        ...challengeData,
        creator: {
          googleId: userData.googleId,
          name: userData.name
        }
      };
      await createChallenge(newChallenge);
      await fetchChallenges();
      setShowChallengeModal(false);
    } catch (error) {
      console.error('Error creating challenge:', error);
    }
  };

  const handleJoinChallenge = async (challengeId) => {
    try {
      await joinChallenge(challengeId, {
        googleId: userData.googleId,
        name: userData.name
      });
      await fetchChallenges();
    } catch (error) {
      console.error('Error joining challenge:', error);
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

  const handleSubmitReview = async () => {
    if (reviewText.trim() && selectedRating > 0) {
      try {
        const newReview = {
          author: {
            googleId: userData.googleId,
            name: userData.name,
            picture: userData.picture
          },
          rating: selectedRating,
          content: reviewText
        };

        await createReview(newReview);
        await fetchReviews();
        setReviewText('');
        setSelectedRating(0);
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    }
  };

  const handleCommentAdded = async () => {
    await fetchPosts();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C9E4CA] via-[#87BBA2] to-[#55828B]">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <div className="bg-white/90 rounded-lg shadow-lg p-2 inline-flex gap-2">
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
          <div className="mx-[8%] space-y-4">
            <div className="bg-[#E3F2E4] rounded-xl shadow-lg p-6">
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
                    className="flex items-center gap-2 cursor-pointer bg-[#55828B] hover:bg-[#3B6064] text-white px-4 py-2 rounded-lg transition-colors"
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
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55828B]"
                />
                <button 
                  onClick={handlePost}
                  className="bg-[#55828B] text-white px-6 py-2 rounded-lg hover:bg-[#3B6064] transition-colors"
                >
                  Post
                </button>
              </div>

              {posts.map((post) => (
                <StoryCard 
                  key={post._id}
                  postId={post._id}
                  author={post.author.name}
                  content={post.content}
                  media={post.mediaUrl}
                  type={post.mediaType}
                  likes={post.likes.length}
                  comments={post.comments}
                  isLiked={post.likes.includes(userData.googleId)}
                  onLike={() => handleLike(post._id)}
                  onCommentAdded={handleCommentAdded}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="mx-[8%]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Active Challenges</h2>
              <button
                onClick={() => setShowChallengeModal(true)}
                className="flex items-center gap-2 bg-[#55828B] text-white px-4 py-2 rounded-lg hover:bg-[#3B6064] transition-colors"
              >
                <Plus className="w-5 h-5" />
                Create Challenge
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {challenges.map((challenge) => (
                <ChallengeCard
                  key={challenge._id}
                  title={challenge.title}
                  participants={challenge.participants.length}
                  difficulty={challenge.difficulty}
                  reward={challenge.reward}
                  daysLeft={Math.ceil((new Date(challenge.endDate) - new Date()) / (1000 * 60 * 60 * 24))}
                  joined={challenge.participants.some(p => p.googleId === userData.googleId)}
                  onJoin={() => handleJoinChallenge(challenge._id)}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="mx-[8%] space-y-6">
            <div className="bg-white/90 rounded-xl shadow-lg p-6 mb-6">
              <h3 className="font-bold text-xl mb-4 text-[#364958]">Share Your Experience</h3>
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
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55828B]"
                  rows={4}
                />
                <button 
                  onClick={handleSubmitReview}
                  className="bg-[#55828B] text-white px-6 py-2 rounded-lg hover:bg-[#3B6064] transition-colors"
                >
                  Submit Review
                </button>
              </div>
            </div>

            {reviews.map((review) => (
              <ReviewCard
                key={review._id}
                author={review.author.name}
                rating={review.rating}
                content={review.content}
                date={new Date(review.createdAt).toLocaleDateString()}
              />
            ))}
          </div>
        )}
      </div>
      
      {showChallengeModal && (
        <CreateChallengeModal
          onClose={() => setShowChallengeModal(false)}
          onSubmit={handleCreateChallenge}
        />
      )}
    </div>
  );
}