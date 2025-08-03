'use client';

import Link from 'next/link';

interface PostProps {
  post: {
    _id: string;
    content: string;
    author: {
      _id: string;
      name: string;
      email: string;
    };
    createdAt: string;
  };
}

const Post: React.FC<PostProps> = ({ post }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="rounded-lg shadow-lg p-6 mb-4 bg-[#c7ccd8]">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
            {post.author.name.charAt(0).toUpperCase()}
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Link
              href={`/profile/${post.author._id}`}
              className="font-semibold text-gray-900 hover:text-blue-600"
            >
              {post.author.name}
            </Link>
            <span className="text-gray-500 text-sm">
              {formatDate(post.createdAt)}
            </span>
          </div>
          
          <div className="text-gray-800 whitespace-pre-wrap">
            {post.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
