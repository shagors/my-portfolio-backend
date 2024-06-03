const express = require("express");
const router = express.Router();
const Post = require("../models/post");

// GET all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one post
router.get("/:id", getPost, (req, res) => {
  res.json(res.post);
});

// CREATE a post
router.post("/", async (req, res) => {
  const post = new Post({
    image: req.body.image,
    title: req.body.title,
    subtitle: req.body.subtitle,
    description: req.body.description,
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a post
router.patch("/:id", getPost, async (req, res) => {
  if (req.body.image != null) {
    res.post.image = req.body.image;
  }
  if (req.body.title != null) {
    res.post.title = req.body.title;
  }
  if (req.body.subtitle != null) {
    res.post.subtitle = req.body.subtitle;
  }
  if (req.body.description != null) {
    res.post.description = req.body.description;
  }

  try {
    const updatedPost = await res.post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a post
router.delete("/:id", getPost, async (req, res) => {
  try {
    await res.post.deleteOne();
    res.json({ message: "Deleted Post" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getPost(req, res, next) {
  let post;
  try {
    post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: "Cannot find post" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.post = post;
  next();
}

module.exports = router;
