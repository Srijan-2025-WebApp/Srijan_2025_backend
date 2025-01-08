import { ApiResponse } from "../utils/ApiResponse.js";
import { HttpError } from "../utils/HttpError.js";

export const handleGetUser = async(req,res) =>{
    const user = req.user;
    if(!user)return res.status(400).json(new HttpError('Invalid Token',400));
    return res.status(200).json(new ApiResponse('User fetched Successfully',true,user))
}