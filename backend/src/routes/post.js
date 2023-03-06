const express = require('express');
const router = express.Router();

const Post = require('../app/model/Post');
const postController = require('../app/controller/postController');
const auth = require('../middleware/auth');
const { verify } = require('jsonwebtoken');

//@route GET api/post
//@desc Get all post
//access public
router.post('/create', auth.verifyToken, postController.createPost);


// route GET api/posts
// desc Get all posts
// access  private
router.get('/', auth.verifyToken, postController.getAllPosts);

// route PUT api/posts
// desc update posts with id
// access  private
router.put('/update/:id', auth.verifyToken, postController.updatePost);



module.exports = router;