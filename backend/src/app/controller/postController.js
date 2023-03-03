const express = require('express');
const router = express.Router();

const postController = {
    createPost: async (req, res) => {
        const {title, description, url, status, userId} = req.body;
        if(!title){
            return res.status(400).json({
                success: false,
                message: 'Missing title'
            });
        }
        try {
            const newPost = new Post(title, description, url, status, userId);
            await newPost.save();
            return res.status(200).json({
                success: true, 
                message: 'Create post successfully',
                post: newPost
            });
        } catch (error) {
            console.log(error);
            return res.status(500),json({
                success: false,
                message: 'Internal server error'
            });
        }
    },

};

module.exports = postController;