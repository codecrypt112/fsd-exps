import React from 'react';
import { Heart, MessageCircle, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const Post = ({ post, onUpdate, onDelete }) => {
  const { user } = useAuth();

  const handleLike = async () => {
    try {
      const response = await api.post(`/posts/${post._id}/like`);
      if (onUpdate) {
        onUpdate(response.data);
      }
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await api.delete(`/posts/${post._id}`);
        if (onDelete) {
          onDelete(post._id);
        }
      } catch (error) {
        console.error('Failed to delete post:', error);
      }
    }
  };

  const formatDate = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffMs = now - postDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return postDate.toLocaleDateString();
  };

  const isLiked = post.likes?.includes(user?.id);
  const isAuthor = post.author?._id === user?.id;

  return (
    <div className="post">
      <div className="post-header">
        <div className="avatar">
          {post.author?.username?.[0]?.toUpperCase() || '?'}
        </div>
        <div className="post-author">
          <h3>{post.author?.username || 'Unknown'}</h3>
          <span className="post-time">{formatDate(post.createdAt)}</span>
        </div>
      </div>
      <div className="post-content">{post.content}</div>
      <div className="post-actions">
        <button
          className={`action-btn ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
          <span>{post.likes?.length || 0}</span>
        </button>
        <button className="action-btn">
          <MessageCircle size={18} />
          <span>{post.replies?.length || 0}</span>
        </button>
        {isAuthor && (
          <button className="action-btn delete-btn" onClick={handleDelete}>
            <Trash2 size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Post;
