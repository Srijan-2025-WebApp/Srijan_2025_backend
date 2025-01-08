import { User } from "../models/user.model.js";
import { HttpError } from "../utils/HttpError.js";

export const handleLogin = async (req, res) => {
    const {Email, Password} = req.body;

    const validationRules = [
      { field: 'Email', value: Email, message: 'Email is Required' },
      { field: 'Password', value: Password, message: 'Password is required field' }
    ];

    for(const rule of validationRules){
        if(!rule.value){
            return res.status(400).json(new HttpError(rule.message, 400));
        }
    }

    let existingUser;
    try {
      existingUser = await User.findOne({ Email: Email });
    } catch (error) {
      console.log(error);
      return res.status(500).json(new HttpError("Logging up failed try agin later ", 500));
    }
  
    if (!existingUser) {
      return res.status(422).json(new HttpError("wrong credentials", 422));
    }
  
    let isValidPassword;
    try {
      isValidPassword = await existingUser.isPasswordCorrect(Password);
    } catch (err) {
      console.log(err)
      return res.status(500).json(new HttpError("Login up Failed", 500));
    }
  
    if (!isValidPassword) {
      return res.status(403).json(new HttpError("Worng Password", 403));
    }
  
    let token;
    try {
      token = existingUser.generateAccessToken();
    } catch (err) {
      return next(new HttpError("signing up failed try again later ", 500));
    }

    return res
          .cookie('accessToken',token,{httpOnly: true, secure: true})
          .status(200)
          .json({
              UserId: existingUser._id,
              Token: token,
              User: {
                _id: existingUser._id,
                Name: existingUser.Name,
                Email: existingUser.Email,
                PhoneNumber: existingUser.PhoneNumber
              }
            });
  };
  