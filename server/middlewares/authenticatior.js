import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const authenticator = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const verified =jwt.verify(token, process.env.SECRET);
        const user = await User.findOne({email:verified.email});
        req.user = {}
        req.user.id = `${user._id}`
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send("Token Sahi Daal 😂")
    }
}