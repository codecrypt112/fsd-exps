import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';
import api from '../api/axios';
import { Loader } from 'lucide-react';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await api.get('/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to load posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostUpdate = (updatedPost) => {
    setPosts(posts.map(post => 
      post._id === updatedPost._id ? updatedPost : post
    ));
  };

  const handlePostDelete = (postId) => {
    setPosts(posts.filter(post => post._id !== postId));
  };

  if (loading) {
    return (
      <div className="app">
        <div className="container">
          <div className="loading">
            <Loader size={40} className="spinner" />
            <p>Loading posts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="container">
        <Header />
        <CreatePost onPostCreated={handlePostCreated} />
        <div className="posts-feed">
          {posts.length === 0 ? (
            <div className="empty-state">
              <h3>No posts yet</h3>
              <p>Be the first to share something!</p>
            </div>
          ) : (
            posts.map(post => (
              <Post
                key={post._id}
                post={post}
                onUpdate={handlePostUpdate}
                onDelete={handlePostDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
