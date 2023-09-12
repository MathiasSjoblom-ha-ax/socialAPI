const mongoose = require("mongoose");

//Post infomation blueprint
const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    likes: {
        type: Array,
        default: []
    },
    description: {
        type: String,
        max: 100
    }
},
{timestamps: true}
);

module.exports = mongoose.model("Post", PostSchema);