import UserModel from '../models/UserModel.js';
import bcryptjs from 'bcryptjs';
export const signup = async (req,res)=>{
  const {username,email,password} = req.body;
  const hashedPassword = bcryptjs.hashSync(password,10);
  const newUser = new UserModel({username,email,password:hashedPassword});
  try {
    await newUser.save();
  res.status(201).json('User created successfully');
  } catch (error) {
    res.status(500).json(error.message);
  }
  
}