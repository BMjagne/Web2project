import { useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
    
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      await api.post("/auth/register", {
        name: formData.username,
        password: formData.password,
        role: 'user'});
      toast.success("Account created! Please log in.");
      navigate("/"); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating account");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center font-mono text-primary">Sign Up</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
            
            <input 
              type="text" 
              placeholder="Username" 
              className="input input-bordered w-full" 
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required 
            />
            
            <input 
              type="password" 
              placeholder="Password" 
              className="input input-bordered w-full" 
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required 
            />

            
            <button type="submit" className="btn btn-primary w-full mt-2">Create Account</button>
          </form>
          
          <p className="text-center mt-4 text-sm">
            Already have an account? <Link to="/" className="link link-primary">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}