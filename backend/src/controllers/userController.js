import { User } from "../models/User.js";


const getAllUsers = async function (_, res){
  try {
    const users = await User.find().sort({ createdAt: -1 }).select('-password'); 
    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getAllUsers controller", error);
    res.status(500).json({ message: "Internal server error" ,error: error.message});
  }
}

export default getAllUsers;