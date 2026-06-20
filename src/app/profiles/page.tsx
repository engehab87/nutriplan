'use client';

import Link from 'next/link';
import { getUserProfiles, deleteUserProfile, setActiveProfile, getActiveProfileId, generateId } from '@/lib/storage';
import { UserProfile } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProfilesPage() {
  const router = useRouter();
  const [profiles, setProfiles] = useState<UserProfile[]>([]);

  useEffect(() => {
    setProfiles(getUserProfiles());
  }, []);

  const handleSelectProfile = (id: string) => {
    setActiveProfile(id);
    router.push('/dashboard');
  };

  const handleDeleteProfile = (id: string) => {
    deleteUserProfile(id);
    setProfiles(getUserProfiles());
  };

  const handleCreateNew = () => {
    router.push('/profile');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="text-primary-600 hover:text-primary-700 font-medium">
            ← Back to Home
          </Link>
          <button
            onClick={() => document.documentElement.classList.toggle('dark')}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow"
          >
            🌙
          </button>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Profiles</h2>
          <button onClick={handleCreateNew} className="btn-primary">
            + Create New Profile
          </button>
        </div>

        {profiles.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-600 dark:text-gray-300 mb-4">No profiles found</p>
            <button onClick={handleCreateNew} className="btn-primary">
              Create Your First Profile
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {profiles.map(profile => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                isActive={getActiveProfileId() === profile.id}
                onSelect={() => handleSelectProfile(profile.id)}
                onDelete={() => handleDeleteProfile(profile.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProfileCard({
  profile,
  isActive,
  onSelect,
  onDelete,
}: {
  profile: UserProfile;
  isActive: boolean;
  onSelect: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="card flex justify-between items-center">
      <div>
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{profile.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {profile.age} years • {profile.height} {profile.heightUnit} • {profile.weight} {profile.weightUnit}
        </p>
        <p className="text-sm text-gray-500">
          Goal: <span className="capitalize">{profile.goal.replace('_', ' ')}</span> • {profile.dietaryPreference}
        </p>
      </div>
      <div className="flex space-x-2">
        {isActive && (
          <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm">
            Active
          </span>
        )}
        <button
          onClick={onSelect}
          className="btn-primary"
          disabled={isActive}
        >
          {isActive ? 'Viewing' : 'Select'}
        </button>
        <button
          onClick={onDelete}
          className="bg-danger-500 hover:bg-danger-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}