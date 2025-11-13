import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Post from '../components/Post';
import api from '../api/axios';
import { Loader } from 'lucide-react';

const Profile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, [username]);

  const loadProfile = async () => {
    try {
      const response = await api.get(`/users/${username}`);
      setProfile(response.data.user);
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setLoading(false);
    }
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
            <Loader size={40} />
            <p>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="app">
        <div className="container">
          <Header />
          <div className="empty-state">
            <h3>User not found</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="container">
        <Header />
        <div className="profile-header">
          <div className="profile-avatar">
            {profile.username[0].toUpperCase()}
          </div>
          <h2>{profile.username}</h2>
          {profile.bio && <p className="profile-bio">{profile.bio}</p>}
          <div className="profile-stats">
            <div className="stat">
              <div className="stat-value">{posts.length}</div>
              <div className="stat-label">Posts</div>
            </div>
            <div className="stat">
              <div className="stat-value">{profile.followers?.length || 0}</div>
              <div className="stat-label">Followers</div>
            </div>
            <div className="stat">
              <div className="stat-value">{profile.following?.length || 0}</div>
              <div className="stat-label">Following</div>
            </div>
          </div>
        </div>
        <div className="posts-feed">
          {posts.length === 0 ? (
            <div className="empty-state">
              <h3>No posts yet</h3>
              <p>This user hasn't posted anything.</p>
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

export default Profile;
