import Comment from "../models/comment.js";
import Post from "../models/post.js";
import User from "../models/user.js";

async function commentFormatter(comments) {
    let returnObj = []
    for await (let item of comments) {
        let comment = await Comment.findById(item);
        returnObj.push(comment);
    }
    return returnObj;
}

export const createPost = async (req, res) => {
    try {
        const { id } = req.user
        const { title, image, caption, tags } = req.body
        const blob = new Post({ title, image, caption, tags, creator: id });
        const createdPost = await blob.save()
        res.send({ createdPost, msg: "Post Created" })
    } catch (error) {
        console.log(error);
    }
}

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.send({ posts, msg: "All Post" })
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate({
            _id: req.params._id,
            creator: req.user.id
        }, req.body);
        res.send({ updatedPost, msg: "Post Updated" })
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete({
            _id: req.params._id,
            creator: req.user.id
        })
        res.send({ deletedPost, msg: "Delete" })
    } catch (error) {
        console.log(error);
    }
}

export const getPostById = async (req, res) => {
    try {
        const post = await Post.findOne({
            _id: req.params._id,
        })
        const comments = await commentFormatter(post?.comments);
        post.comments = comments;
        res.send({ post, comments, msg: "Get Post By Id" })
    } catch (error) {
        console.log(error);
    }
}

export const likePost = async (req, res) => {
    try {
        const likedBy = req.user.id;
        await Post.updateOne({ _id: req.params._id }, { $push: { likes: likedBy } });
        res.send("Liked");
    } catch (error) {
        console.log(error);
    }
}

export const addComments = async (req, res) => {
    try {
        const { text } = req.body;
        const creator = req.user.id;
        const { _id } = req.params;
        const query = User.findById({ _id: _id });
        query.select("firstname lastname profilePicture");
        const commentsDetails = await query.exec();
        console.log(commentsDetails);

        const raw = new Comment({ text, creator })
        const addedComment = await raw.save();
        await Post.updateOne({ _id: req.params._id }, { $push: { comments: addedComment._id } });
        // const shivam = await Comment.updateOne({ _id: addedComment._id }, { $set: { firstname: User.firstname } });
        // console.log(shivam);

        res.send("Comment Added")
    } catch (error) {
        console.log(error);
    }
}

export const commentDetails = async (req, res) => {
    try {
        const { _id } = req.params;
        const query = User.findById({ _id: _id });
        query.select("firstname lastname profilePicture");
        const commentsDetails = await query.exec();
        console.log(commentsDetails);

        await Comment.updateOne({ id: req.user.id }, { $push: { comments: commentsDetails._id } })
        res.send("Comment Details Added")
    } catch (error) {
        console.log(error);
    }
}

export const deleteComment = async (req, res) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete({
            _id: req.params._id,
            creator: req.user.id
        })
        console.log(deletedComment);

    } catch (error) {
        console.log(error);
    }
}