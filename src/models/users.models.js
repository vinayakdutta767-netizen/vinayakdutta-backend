import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
    },
    fullName:{
        type:String,
        required:true,
        index:true
    },
    avatar:{
        type:String, // cloudinary url
        required:true
    },
    coverImage:{
        type:String, // cloudinary url
    },
   watchHistory:[
       {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"
       }
   ],
   password:{
        type:String,
        required:[true,"Password is required"],
   },
   refreshToken:{
        type:String
   }
},{
    timestamps:true
})

userSchema.pre("save",async function(next){
    if(!this.modified("password")){
        return next()
    }
    this.password=await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isValidPassword=async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken=function(){
    return jwt.sign({
        _id:this._id,
        username:this.username,
        email:this.email,
        fullName:this.fullName,
    },
    process.env.AccessTokenSecret,
    {
        expiresIn:process.env.AccessTokenExpiry
    }
)
}

 userSchema.methods.generateRefreshToken=function(){
    return jwt.sign({
        _id:this._id
    },
    process.env.RefreshTokenSecret,
    {
        expiresIn:process.env.RefreshTokenExpiry
    }
)}

export const User=mongoose.model("User",userSchema)