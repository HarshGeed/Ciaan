'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface User {
  _id: string;
  name: string;
  email: string;
  bio: string;
}

interface SearchBarProps {
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className = '' }) => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Search users with debouncing
  useEffect(() => {
    const searchUsers = async () => {
      if (!query.trim()) return;

      setLoading(true);
      try {
        const response = await fetch(`/api/search/users?q=${encodeURIComponent(query.trim())}`);
        const data = await response.json();

        if (response.ok) {
          setUsers(data.users);
          setShowResults(true);
        } else {
          console.error('Search failed:', data.error);
          setUsers([]);
          setShowResults(false);
        }
      } catch (error) {
        console.error('Search error:', error);
        setUsers([]);
        setShowResults(false);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      if (query.trim().length > 0) {
        searchUsers();
      } else {
        setUsers([]);
        setShowResults(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleUserClick = () => {
    setQuery('');
    setShowResults(false);
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search users by name or email..."
          className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onFocus={() => {
            if (users.length > 0) setShowResults(true);
          }}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        {loading && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
          {users.length === 0 ? (
            <div className="px-4 py-3 text-gray-500 text-center">
              {query.trim() ? 'No users found' : 'Start typing to search users'}
            </div>
          ) : (
            <div>
              {users.map((user) => (
                <Link
                  key={user._id}
                  href={`/profile/${user._id}`}
                  onClick={handleUserClick}
                  className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {user.email}
                      </div>
                      {user.bio && (
                        <div className="text-xs text-gray-400 truncate mt-1">
                          {user.bio}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
