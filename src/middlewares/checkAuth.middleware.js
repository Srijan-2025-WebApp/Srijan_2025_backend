import {HttpError} from "../utils/HttpError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = async(req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        
        if(!token){
            return res.status(401).json(new HttpError("Unauthorised",401));
        }
        const decodedToken=jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user=await User.findById(decodedToken?._id ).select("-Password -createdAt -updatedAt")
        if(!user){
            return res.status(400).json(new HttpError('Invalid Token',400));
        }
        req.user=user;
        next()
    } catch (error) {
        return res.json(new HttpError(error?.message || "Invalid access token",500));
    }
}