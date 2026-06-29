import { useEffect, useState } from 'react';
import { Link, } from "react-router";
import api from "../lib/axios";
import { ShieldAlert, Users, Trash2, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
      
        const token = localStorage.getItem('token'); 
        const response = await api.get('/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(response.data);
      } catch (error) {
        
        toast.error(error.response?.data?.message || "Unauthorized access!");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

    const handleDeleteUser = async (userId) => {
    
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/users/${userId}`,{headers : { Authorization: `Bearer ${token}` }});
      
      // Filter out the deleted user from the current state to update the UI instantly
      setUsers(users.filter((user) => user._id !== userId));
      
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert("Error deleting user. Please try again.");
    }
  };

    if (loading) return <div className="text-center mt-10"><span className="loading loading-spinner loading-lg"></span></div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">

      <div className="mb-6">
        <Link to="/notes" className="btn btn-ghost btn-sm gap-2 pl-0 hover:bg-transparent hover:text-primary">
          <ArrowLeft className="size-4" />
          <span>Back to Notes</span>
        </Link>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <ShieldAlert className="text-primary w-8 h-8" />
        <h1 className="text-3xl font-bold">Admin Management Console</h1>
      </div>

      <div className="overflow-x-auto bg-base-100 rounded-box shadow-md border border-base-200">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="font-medium">{user.username}</td>
                <td>
                  <span className={`badge ${user.role === 'admin' ? 'badge-secondary' : 'badge-accent'} gap-1`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className="badge badge-success badge-sm">Active</span>
                </td>
                <td>
                
                <button 
                  onClick={() => handleDeleteUser(user._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}