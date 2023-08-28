const router = require("express").Router();
const { response } = require("express");
const Post = require("../models/Post");
const User = require("../models/User");

//Skapa post
router.post("/", async (request, response) => {
    const newPost = new Post(request.body);
    try{
        const savedPost = await newPost.save();
        response.status(200).json(savedPost);
    } catch(err) {
        response.status(500).json(err);
    }
});

//Uppdatera post
router.put("/:id", async(request, response) =>{
    try {
        const newPost = await Post.findById(request.params.id);
        if(newPost.userId === request.body.userId) {
            await newPost.updateOne({$set:request.body});
            response.status(200).json("Post updated")
        } else {
            request.status(404).json("Post error");
        }
    } catch(err) {
        response.status(500).json(err);
    }
});

//Radera post
router.delete("/:id", async(request, response) =>{
    try {
        const newPost = await Post.findById(request.params.id);
        if(newPost.userId === request.body.userId) {
            await newPost.deleteOne({$set:request.body});
            response.status(200).json("Post deleted")
        } else {
            request.status(404).json("Post error");
        }
    } catch(err) {
        response.status(500).json(err);
    }
});

//Gilla/ogilla post
router.put("/:id/like", async(request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        if(!post.likes.includes(request.body.userId)) {
            await post.updateOne({$push:{likes:request.body.userId}});
            response.status(200).json("Post liked")
        } else {
            await post.updateOne({$pull:{likes: request.body.userId}});
            response.status(200).json("Post disliked")
        }
    } catch (error) {
        response.status(500).json(err);
    }
});

//Hämta post
router.get("/:id", async(request, response) => {
    try {
        const post = await Post.findById(request.params.id)
        response.status(200).json(post);
    } catch (error) {
        response.status(500).json(err)
    }
});

//Hämta feed posts
router.get("/feed/:userId", async(request, response) => {
    try {
        const user = await User.findById(request.params.userId);
        const posts = await Post.find({userId: user._id});
        const followingPosts = await Promise.all(
            user.following.map(followeingID => {
                return Post.find({userId: followeingID});
            })
        );
        response.status(200).json(posts.concat(...followingPosts));
    } catch (error) {
        response.status(500).json(err)
    }
});

module.exports = router;