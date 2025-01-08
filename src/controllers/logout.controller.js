import { ApiResponse } from "../utils/ApiResponse.js";

export const handleLogout = async(req,res) =>{
    return res.status(200).cookie('accessToken',"",{httpOnly: true,secure:true}).json(new ApiResponse('Logout Successfully',200,{}));
}