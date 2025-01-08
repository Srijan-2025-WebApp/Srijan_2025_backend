import {User} from "../models/user.model.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {HttpError} from "../utils/HttpError.js"

const handleRegister = async (req, res) => {
  const {Name,Email,PhoneNumber,Password} = req.body;

  const validationRules = [
    { field: 'Name', value: Name, message: 'Name is Required' },
    { field: 'Email', value: Email, message: 'Email is Required' },
    { field: 'Password', value: Password, message: 'Password is required field' },
    { field: 'PhoneNumber', value: PhoneNumber, message: 'PhoneNumber is required field'},
  ];

  for(const rule of validationRules){
      if(!rule.value){
          return res.status(400).json(new HttpError(rule.message, 400));
      }
  }

  const existingUser = await User.findOne({Email: Email});

  if(existingUser)return res.status(404).json(new HttpError("User Already Exist!!", 404));

  const createUser = new User({
    Name: Name,
    Email: Email,
    PhoneNumber: PhoneNumber,
    Password: Password,
  });

  let user;
  try {
    user = await createUser.save();
    return res.status(200).json(new ApiResponse('Registration Successfull',true,{name: user?.Name,email: user?.Email}));
  } catch (error) {
    return res.status(500).json(new HttpError("Signing up failed ", 500));
  }
};

export {handleRegister};
