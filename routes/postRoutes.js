const express = require("express");
const {
  getAllPost,
  createPost,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(getAllPost).post(protect, createPost);

router.route("/:id").get(getPostById).patch(updatePost).delete(deletePost);

module.exports = router;
