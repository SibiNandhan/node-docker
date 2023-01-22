const Post = require("./../models/postModel");

const getAllPost = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};
const getPostById = async (req, res, next) => {
  try {
    const posts = await Post.findById(req.params.id);
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};
const createPost = async (req, res, next) => {
  try {
    const posts = await Post.create(req.body);
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const posts = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};
const deletePost = async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllPost,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
