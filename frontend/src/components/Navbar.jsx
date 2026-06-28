import { Link ,useNavigate} from "react-router";
import { PlusIcon,LogOut , ShieldCheck} from "lucide-react";
import toast from "react-hot-toast";


const Navbar = () => {
  const navigate = useNavigate();

  // 1. Get the user string from localStorage and parse it safely
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  // 2. Check if the user exists and specifically has the 'admin' role
  const isAdmin = user && user.role === "admin";

  const handleLogout = () => {
    // 1. Clear the saved auth data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    // 2. Notify the user
    toast.success("Logged out successfully");
    
    // 3. Kick them back to the login page
    navigate("/");
  };


  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">NoteTaker</h1>
          <div className="flex items-center gap-4">
            {isAdmin && (
              <Link to="/admin" className="btn btn-secondary gap-2">
                <ShieldCheck className="size-5" />
                <span>Admin Panel</span>
              </Link>
            )}
            <Link to={"/create"} className="btn btn-primary">
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>
            <button onClick={handleLogout} className="btn btn-ghost btn-circle text-error">
              <LogOut className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;