const mongoose = require("mongoose");

//Post infomation blueprint
const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    likes: {
        type: Array,
        default: []
    },
    description: {
        type: String,
        max: 100
    },
    duration: {
        type: Number,
        //required: true
    }
},
{timestamps: true}
);

module.exports = mongoose.model("Post", PostSchema);