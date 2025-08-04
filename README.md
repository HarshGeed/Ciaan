# Ciaan - Mini LinkedIn Community Platform

A mini LinkedIn-like community platform built with Next.js, TypeScript, MongoDB, and Tailwind CSS.

You can visit this at [ciaan-nnad.vercel.app](ciaan-nnad.vercel.app)

## Features

### 1. User Authentication
- Register with name, email, password, and optional bio
- Login/logout functionality
- JWT-based authentication with secure HTTP-only cookies
- Protected routes that redirect to login when not authenticated

### 2. Public Post Feed
- Create text-only posts (up to 1000 characters)
- View home feed with all posts from all users
- Posts display author name and timestamp
- Real-time character counter when creating posts

### 3. Profile Pages
- View any user's profile and their posts
- Display user information (name, email, bio, join date)
- Show all posts by that user
- Profile avatar with user's initial

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcryptjs for password hashing
- **State Management**: React Context API

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- MongoDB installed and running locally, or MongoDB Atlas account

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd ciaan
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - The `.env.local` file has been created with default values
   - For local MongoDB: Keep `MONGODB_URI=mongodb://localhost:27017/ciaan`
   - For MongoDB Atlas: Replace with your connection string
   - Change the `JWT_SECRET` to a strong secret key in production

4. **Start MongoDB** (if using local installation):
   ```bash
   mongod
   ```

5. **Run the development server**:
   ```bash
   npm run dev
   ```

6. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Register**: Create a new account with your name, email, password, and optional bio
2. **Login**: Sign in with your email and password
3. **Create Posts**: Share your thoughts with the community (up to 1000 characters)
4. **Browse Feed**: View posts from all users on the home page
5. **View Profiles**: Click on any user's name to view their profile and posts
6. **Logout**: Use the logout button in the navigation

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user info

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post

### Users
- `GET /api/users/[id]` - Get user profile and their posts

## Security Features

- Passwords are hashed using bcryptjs
- JWT tokens are stored in secure HTTP-only cookies
- Input validation on both client and server
- Protected API routes that require authentication
- XSS protection through proper data sanitization

## Deployment

This project is deployment-ready for platforms like Vercel, Netlify, and Railway.

### Quick Deployment Steps:

1. **Set Environment Variables**:
   ```bash
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=production
   ```

2. **Deploy to Vercel** (Recommended):
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically on push

3. **MongoDB Setup**:
   - Use MongoDB Atlas for cloud database
   - Allow network access from `0.0.0.0/0`
   - Use the connection string in `MONGODB_URI`

## Future Enhancements

Potential features that could be added:
- User profile editing
- Post likes and comments
- Follow/unfollow users
- Private messaging
- Image uploads
- Search functionality
- Email verification
- Password reset functionality
- Admin panel
