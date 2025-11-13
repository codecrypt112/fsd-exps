import React, { useState } from 'react';
import api from '../api/axios';

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      const response = await api.post('/posts', { content });
      setContent('');
      if (onPostCreated) {
        onPostCreated(response.data);
      }
    } catch (error) {
      console.error('Failed to create post:', error);
      alert('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  const charCount = content.length;
  const maxChars = 280;
  const isOverLimit = charCount > maxChars;

  return (
    <div className="create-post">
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          maxLength={maxChars}
        />
        <div className="create-post-footer">
          <span className={`char-count ${isOverLimit ? 'warning' : ''}`}>
            {charCount}/{maxChars}
          </span>
          <button
            type="submit"
            className="btn-post"
            disabled={loading || !content.trim() || isOverLimit}
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
