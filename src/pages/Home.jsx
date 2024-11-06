import React from 'react';
import Navbar from '../components/Navbar';

export default function Home() {
  const userProfile = {
    name: "John Doe",
    age: 28,
    weight: "75kg",
    height: "180cm",
    goals: "Build muscle and improve endurance"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C9E4CA] via-[#87BBA2] to-[#55828B]">
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="bg-white/90 rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold text-[#364958] mb-4">Profile Dashboard</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-r from-[#55828B] to-[#3B6064] rounded-lg text-white">
              <h3 className="font-semibold mb-2">Personal Information</h3>
              <p>Name: {userProfile.name}</p>
              <p>Age: {userProfile.age}</p>
              <p>Weight: {userProfile.weight}</p>
              <p>Height: {userProfile.height}</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-[#55828B] to-[#3B6064] rounded-lg text-white">
              <h3 className="font-semibold mb-2">Fitness Goals</h3>
              <p>{userProfile.goals}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}