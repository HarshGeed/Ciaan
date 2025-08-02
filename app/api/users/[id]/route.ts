import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Post from '@/models/Post';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const { id } = params;

    // Find user
    const user = await User.findById(id).select('-password');
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Find user's posts
    const posts = await Post.find({ author: id })
      .populate('author', 'name email')
      .sort({ createdAt: -1 });

    return NextResponse.json({
      user,
      posts,
    });
  } catch (error) {
    console.error('Fetch user profile error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 }
    );
  }
}
