import User from '../models/UserModel.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
export const signup = async (req,res,next)=>{
  const {username,email,password} = req.body;
  const hashedPassword = await bcryptjs.hashSync(password,10);
  const newUser = new UserModel({username,email,password:hashedPassword});
  try {
    await newUser.save();
  res.status(201).json('User created successfully');
  } catch (error) {
    next(error);
  }
  
}

export const signin = async (req,res,next)=>{
  const {email,password} = req.body;
  try {

    const validUser = await User.findOne({email:email});
    if(!validUser){
      return next(errorHandler(404,"User not found"));
    }
    const validPassword = await bcryptjs.compareSync(password,validUser.password);
    if(!validPassword){
      return next(errorHandler(401,"Incorrect Credentials"))
    }
    const{ password:pass, ...rest} = validUser._doc;
    const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
    res.cookie('access_token',token,{httpOnly: true}).status(200).json(rest);
    
  } catch (error) {
    next(error);
  }
}