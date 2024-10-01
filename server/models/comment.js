import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
    text: {
        type: String
    },
    date: {
        type: String,
        default: new Date().getSeconds()
    },
    creator: {
        type: String
    }
})

const Comment = mongoose.model("Comment", commentSchema);

export default Comment