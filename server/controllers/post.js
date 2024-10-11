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

// async function commentDetailsFormatter(reqArray) {
//     let user = {}
//     for await (let id of reqArray) {
//         const returnValue = await retriveUser(id);
//         console.log(returnValue);

//         // users.push(returnValue)
//     }
//     return user;
// }

// async function retriveUser(id) {
//     try {
//         const query = User.findById(id);
//         query.select("firstname lastname profilePicture")
//         const user = await query.exec();
//         return user;
//     } catch (error) {
//         console.log(error);
//     }
// }


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

export const removeLike = async (req, res) => {
    try {
        const likedBy = req.user.id
        await Post.updateOne({ _id: req.params._id }, { $pull: { likes: likedBy } });
        res.send("Like Removed")
    } catch (error) {
        console.log(error);
    }
}

export const addComments = async (req, res) => {
    try {
        const { text } = req.body;
        const creator = req.user.id;
        const raw = new Comment({ text, creator })
        const addedComment = await raw.save();
        await Post.updateOne({ _id: req.params._id }, { $push: { comments: `${addedComment._id}` } });
        res.send("Comment Added")
    } catch (error) {
        console.log(error);
    }x
}

export const deleteComment = async (req, res) => {
    try {
        const commentId = req.query.commentId;
        const postId = req.query.postId;
        await Comment.findByIdAndDelete({ _id: commentId })
        const post = await Post.findOne({ _id: postId })
        const { comments } = post;
        await Post.updateOne({ _id: postId }, { $pull: { comments: commentId } })
        res.send("Comment Deleted")
    } catch (error) {
        console.log(error);
    }
}