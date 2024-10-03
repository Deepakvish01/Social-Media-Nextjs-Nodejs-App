import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    profilePicture: {
        type: String
    },
    text: {
        type: String
    },
    date: {
        type: String,
        default: new Date()
    },
    creator: {
        type: String
    }
})

const Comment = mongoose.model("Comment", commentSchema);

export default Comment