const express = require('express');
const Post = require('../model/Post');
const router = express.Router();

const postController = {

    // @route POST api/post/create
    // desc Create a post 
    // @access private

    createPost: async (req, res) => {
        console.log(req.body);
        const {title, description, url, status} = req.body;
        if(!title){
            return res.status(400).json({
                success: false,
                message: 'Missing title'
            });
        }
        try {
            console.log(req.user);
            const newPost = new Post({
                title, 
                description,
                url: url.startsWith('https://') ? url : `https://${url}`,
                status: status || 'TO LEARN',
                user: req.user.userId
            });
            await newPost.save();
            return res.status(200).json({
                success: true, 
                message: 'Create post successfully',
                post: newPost

            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },


    getAllPosts: async (req, res) => {
        try {
            const posts = await Post.find({user: req.user.userId}).populate('user', ['usename']);
            return res.status(200).json({
                success: true,
                posts
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }, 

    updatePost: async (req, res)=> {
        try {
            const {title, description, url, status} = req.body;
            if(!title) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing title'
                });
            }
            let updatePost = {
                title, 
                description: description || '',
                url: (url.startsWith('https://')? url : `https://${url}`),
                status: status || 'TO LEARN',
            };

            updatePost = await Post.findOneAndUpdate({_id: req.params.id, user: req.user.userId}, updatePost, {new: true});;

            return res.status(200).json({
                success: true,
                message: 'Update post successfully',
                post: updatePost
            })

            
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },
    
    deletePost: async(req, res) =>{
        try {
            const post = await Post.findByIdAndDelete({_id: req.params.id, user: req/user.userId});
            return res.status(200).json({
                success: true,
                message: 'Delete post successfuylly',
                post 
            })
        } catch (error) {
             console.log(error);
             res.status(500).json({
                success: false,
                massage: 'Internal server error'
             })
        }
    }, 
    
    




};

module.exports = postController;