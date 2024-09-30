import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email })
        if (user) {
            const vaildPass = await bcrypt.compare(password, user.password);
            if (vaildPass) {
                const token = jwt.sign({ email: email, password: user.password }, process.env.SECRET,
                    { expiresIn: "1hr" });
                res.send({ token, userId: user._id, msg: "Authenticated!" })
            } else {
                res.status(401).send("Password Sahi Kar 😡")
            }
        } else {
            res.status(404).send("Pehli Fursat Main Nikal 🖕🏿")
        }
    } catch (error) {
        console.log(error);
    }
}

export const signup = async (req, res) => {
    try {
        const { firstname, lastname, password, email, age, gender, phone, profilePicture } = req.body
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        const toBeCreatedUser = new User({
            firstname,
            lastname,
            password: hashPassword,
            email,
            age,
            gender,
            phone,
            profilePicture
        });
        const user = await toBeCreatedUser.save();
        const token = jwt.sign({ email, hashPassword }, process.env.SECRET, { expiresIn: "1hr" });
        res.send({ userId: user._id, token, msg: "Created User" })
    } catch (error) {
        console.log(error);
    }
}

export const updatePassword = async (req, res) => {
    try {
        const { password } = req.body
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        await User.findByIdAndUpdate(req.params._id,{password:hashPassword})
        res.send("Password Updated");
    } catch (error) {
        console.log(error);
    }
}

export const checkLogin = async (req, res) => {
    try {
        const { token } = req.body;
        const verified = await jwt.verify(token, process.env.SECRET);
        res.send({ msg: "Token Valid" })
    } catch (error) {
        console.log(error);
        res.status(401).send({ msg: "Signin Again" });
    }
}
