'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import CreatePost from '@/components/CreatePost';
import Post from '@/components/Post';

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

export default function Home() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
      return;
    }
    
    if (user) {
      fetchPosts();
    }
  }, [user, authLoading, router]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      const data = await response.json();
      
      if (response.ok) {
        setPosts(data.posts);
      } else {
        setError('Failed to fetch posts');
      }
    } catch {
      setError('Something went wrong while fetching posts');
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = () => {
    fetchPosts();
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="flex justify-center items-center pt-20">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-2xl mx-auto pt-8 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Home Feed</h1>
        
        <CreatePost onPostCreated={handlePostCreated} />
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {posts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">No posts yet. Be the first to share something!</p>
          </div>
        ) : (
          <div>
            {posts.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
