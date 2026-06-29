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

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    
    if (req.user.id === userId) {
      return res.status(400).json({ message: "You cannot delete your own admin account." });
    }

    const deletedUser = await User.findByIdAndDelete(userId);
    
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};

export {getAllUsers,deleteUser};