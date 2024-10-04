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
        const user = await User.findById(req.user.id)
        console.log(user);

        const filtered = user.filter(userdata);
        console.log(filtered);
        

        function userdata(firstname) {
            return firstname
        }
        




        // const query1 = User.findById(req.user.id)
        // query1.select("lastname")
        // const lastname = await query1.exec();
        // const query2 = User.findById(req.user.id)
        // // query2.select("profilePicture")
        // const profilePicture = await query2.exec();
        const raw = new Comment({
            text,
            creator,
            // filtered,
            // lastname,
            // profilePicture: profilePicture.profilePicture
        })
        console.log(raw);
        // const addedComment = await raw.save();
        // await Post.updateOne({ _id: req.params._id }, { $push: { comments: addedComment._id } });
        // res.send("Comment Added")
    } catch (error) {
        console.log(error);
    }
}

export const deleteComment = async (req, res) => {
    try {
        await Comment.findByIdAndDelete({
            _id: req.params._id,
            creator: req.user.id
        })
        await Post.updateOne({ _id: req.params._id }, { $set: {} })
        res.send("Comment Deleted")
    } catch (error) {
        console.log(error);
    }
}