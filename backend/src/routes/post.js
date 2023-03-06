const express = require('express');
const router = express.Router();

const Post = require('../app/model/Post');
const postController = require('../app/controller/postController');
const auth = require('../middleware/auth');

//@route GET api/post
//@desc Get all post
//access public
router.post('/create', auth.verifyToken, postController.createPost);





module.exports = router;