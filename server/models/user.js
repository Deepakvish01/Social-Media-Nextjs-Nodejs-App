import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String
    },
    gender:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number
    },
    age:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String
    },
    friends:{
        type:Array
    },
    requestsReceived:{
        type:Array,
        default:[]
    },
    requestSent:{
        type:Array,
        default:[]
    },
    otp:{
        type:String
    }
})

const User = mongoose.model("user",userSchema);

export default User;