import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
try {
    const { username, password, role } = req.body;

    // basic validation 

    if (!username || !password || !role) {
        return res.status(400).json({ message: "All fields are important!"})
    }

    // check if user exists already

    const existingUser = await User.findOne({ username: username});
    if (existingUser) {
        return res.status(400).json({ message: "user already exists!" });
    }

    const hashedPassword =  await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        password: hashedPassword,
        role
    });

    res.status(201).json({
        message: "User registered!",
        user: { id: user._id, username: user.username, role: user.role}
    });

} catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
}
};

const login = async (req, res) => {
    try {
        
        // checking if the user already exists
        const { username, password } = req.body;
       
        const user = await User.findOne({
            username: username
        });

        if(!user) return res.status(400).json({
             message: "User not found"
        });

       
        // compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch) return res.status(400).json({
            message: "Invalid credentials"

        })
        console.log("SECRET KEY IS:", process.env.JWT_SECRET);
        const token = jwt.sign({id: user._id, role: user.role},process.env.JWT_SECRET,{expiresIn: "7d"})

        res.status(200).json({token: token, user: {
        id: user._id,
        username: user.username,
        role: user.role}})

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const logout = async (req, res) => {
    try {
        const { username } = req.body;

        const user = await User.findOne({
            username
        });

        if(!user) return res.status(404).json({
            message: "User not found"
        });
         
        res.status(200).json({
            message: "Logout successful"
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error", error
        });
    }
}
export {
    register,
    login,
    logout
};