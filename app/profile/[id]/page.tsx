'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import Post from '@/components/Post';

interface User {
  _id: string;
  name: string;
  email: string;
  bio: string;
  createdAt: string;
}

interface PostType {
  _id: string;
  content: string;
  author: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}

interface ProfileData {
  user: User;
  posts: PostType[];
}

const ProfilePage = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { user: currentUser, loading: authLoading } = useAuth();
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;

  useEffect(() => {
    if (!authLoading && !currentUser) {
      router.push('/auth/login');
      return;
    }
    
    if (currentUser && userId) {
      const fetchProfile = async () => {
        try {
          const response = await fetch(`/api/users/${userId}`);
          const data = await response.json();
          
          if (response.ok) {
            setProfileData(data);
          } else {
            setError(data.error || 'Failed to fetch profile');
          }
        } catch {
          setError('Something went wrong while fetching profile');
        } finally {
          setLoading(false);
        }
      };
      
      fetchProfile();
    }
  }, [currentUser, authLoading, userId, router]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex justify-center items-center pt-20">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-2xl mx-auto pt-8 px-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-2xl mx-auto pt-8 px-4">
          <div className="text-center">User not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-2xl mx-auto pt-8 px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
              {profileData.user.name.charAt(0).toUpperCase()}
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {profileData.user.name}
              </h1>
              <p className="text-gray-600">{profileData.user.email}</p>
              <p className="text-gray-500 text-sm">
                Joined {formatDate(profileData.user.createdAt)}
              </p>
            </div>
          </div>
          
          {profileData.user.bio && (
            <div className="mt-4">
              <h3 className="font-semibold text-gray-900 mb-2">Bio</h3>
              <p className="text-gray-700 whitespace-pre-wrap">
                {profileData.user.bio}
              </p>
            </div>
          )}
        </div>

        {/* Posts Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Posts ({profileData.posts.length})
          </h2>
          
          {profileData.posts.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500">
                {currentUser?.id === userId 
                  ? "You haven't posted anything yet." 
                  : "This user hasn't posted anything yet."
                }
              </p>
            </div>
          ) : (
            <div>
              {profileData.posts.map((post) => (
                <Post key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
