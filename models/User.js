const mongoose = require("mongoose");


//https://mongoosejs.com/docs/guide.html
//User infomation blueprint
const UserSchema = new mongoose.Schema({
    username: {
        required: true,
        unique: true,
        type: String,
        min: 3,
        max: 15
    },
    email:{
        required: true,
        unique: true,
        type: String,
        max: 60
    },
    password: {
        required: true,
        type: String,
        min: 7
    },
    description: {
        type: String,
        max: 200
    },
    avatar: {
        type: String,
        default:""
    },
    banner: {
        type: String,
        default:""
    },
    followers: {
        type: Array,
        default:[]
    },
    following: {
        type: Array,
        default:[]
    },
    admin: {
        type: Boolean,
        default:false
    }
},
{timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);