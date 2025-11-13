const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');

// Get all posts (feed)
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find({ isReply: false })
      .populate('author', 'username avatar')
      .sort({ createdAt: -1 })
      .limit(50);
    
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single post
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username avatar')
      .populate({
        path: 'replies',
        populate: { path: 'author', select: 'username avatar' }
      });
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create post
router.post('/', auth, async (req, res) => {
  try {
    const { content, replyTo } = req.body;

    const post = new Post({
      content,
      author: req.userId,
      isReply: !!replyTo,
      replyTo: replyTo || null
    });

    await post.save();
    await post.populate('author', 'username avatar');

    // If it's a reply, add to parent post
    if (replyTo) {
      await Post.findByIdAndUpdate(replyTo, {
        $push: { replies: post._id }
      });
    }

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Like/Unlike post
router.post('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const likeIndex = post.likes.indexOf(req.userId);
    
    if (likeIndex > -1) {
      // Unlike
      post.likes.splice(likeIndex, 1);
    } else {
      // Like
      post.likes.push(req.userId);
    }

    await post.save();
    await post.populate('author', 'username avatar');

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
