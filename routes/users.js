const { response } = require("express");
const User = require("../models/User");

const router = require("express").Router();

//uppdatera user
router.put("/:id", async (request, response) => {
    if(request.body.userId === request.params.id || request.body.isAdmin) {
        try {
            const user = await User.findByIdAndUpdate(request.params.id, {$set: request.body});
            response.status(200).json("Account Updated")
        } catch(UpdateError) {
            return response.status(500).json(UpdateError);
        }
    } else {
        return response.status(403).json("Update error");
    }
})

//radera user
router.delete("/:id", async (request, response) => {
    if(request.body.userId === request.params.id || request.body.isAdmin) {
        try {
            await User.findByIdAndDelete(request.params.id);
            response.status(200).json("Account deleted")
        } catch(UpdateError) {
            return response.status(500).json(UpdateError);
        }
    } else {
        return response.status(403).json("Delete error");
    }
})

//hitta user
router.get("/:id", async (request, response) => {
    try{
        const user = await User.findById(request.params.id);
        const {password, updatedAt, ...other} = user._doc
        response.status(200).json(other);
    } catch (err) {
        response.status(500).json(err);
    }
})

//follow user
router.put("/:id/follow", async (request, response) => {
    if(request.body.userId !== request.params.id) {
        try {
            const user = await User.findById(request.params.id);
            const follow = await User.findById(request.body.userId);
            if(!user.followers.includes(request.body.userId)) {
                await user.updateOne({$push:{followers:request.body.userId}});
                await follow.updateOne({$push:{following:request.params.id}});
                res.status(200).json("following added");
            } else {
                response.status(401).json("error with following")
            }
        } catch(err) {
            response.status(500).json(err)
        }
    } else {
        response.status(403).json("error with following")
    }
})

//unfollow user
router.put("/:id/unfollow", async (request, response) => {
    if(request.body.userId !== request.params.id) {
        try {
            const user = await User.findById(request.params.id);
            const follow = await User.findById(request.body.userId);
            if(user.followers.includes(request.body.userId)) {
                await user.updateOne({$pull:{followers:request.body.userId}});
                await follow.updateOne({$pull:{following:request.params.id}});
                res.status(200).json("unfollowing added");
            } else {
                response.status(404).json("error with unfollowing")
            }
        } catch(err) {
            response.status(500).json(err)
        }
    } else {
        response.status(403).json("error with unfollowing")
    }
})

module.exports = router;