import { FaSignOutAlt, FaTasks } from "react-icons/fa";
import logo from '../../assets/checklist.png';
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Toaster, toast } from "react-hot-toast"; // Import toast and Toaster
import { Link } from "react-router";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success('Logout Successfully'); // Show success toast
      })
      .catch(err => {
        toast.error('Failed to logout'); // Show error toast
        console.error(err);
      });
  };

  return (
    <>
      {/* Toast Container */}
      <Toaster position="top-right" reverseOrder={false} />

      <nav className="bg-gradient-to-r from-blue-700 to-purple-600 text-white p-4 flex justify-between items-center shadow-md">
        {/* Left Side - Logo */}
        <Link to='/'>
          <div className="text-xl font-bold flex justify-center items-center">
            <img className="h-12 w-12" src={logo} alt="To-Do Logo" />
            <span>To-Do</span>
          </div>
        </Link>

        {/* Right Side - User Info, Logout Button, and To-Do Icon */}
        <div className="flex items-center space-x-4">
          {user && <span className="hidden md:inline-block">Welcome, {user.displayName}</span>}
          <FaTasks className="text-2xl cursor-pointer" />
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 flex items-center"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
