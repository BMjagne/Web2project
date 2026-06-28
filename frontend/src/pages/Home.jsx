import { useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { username, password });
      
      
      localStorage.setItem("token", response.data.token);
      
      
      localStorage.setItem("user", JSON.stringify(response.data.user)); 
      
      toast.success("Logged in successfully!");
      navigate("/notes"); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center font-mono text-primary">NoteTaker Login</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
            
            <input 
              type="text" 
              placeholder="Username" 
              className="input input-bordered w-full" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
            
            <input 
              type="password" 
              placeholder="Password" 
              className="input input-bordered w-full" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />

            <button type="submit" className="btn btn-primary w-full mt-2">Log In</button>
          </form>
          
          <p className="text-center mt-4 text-sm">
            Don't have an account? <Link to="/register" className="link link-primary">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}