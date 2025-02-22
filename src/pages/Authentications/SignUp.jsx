import { FaFacebook, FaGithub } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/GetAuthInfo/useAuth";
import { useState } from "react";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router";
import ContinueGoogle from "./../../components/shared/GoogleSignUp/ContinueGoogle";
import useAxiosPublic from "../../hooks/AxiosPublic/useAxiosPublic";
import toast from "react-hot-toast";

const SignUp = () => {
  const axiosPublic = useAxiosPublic()
  const [err, setErr] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const targetPath = location?.state ? `${location.state}` : "/";

  const onSubmit = async (data) => {
    const { name, email, password } = data;

    try {
      const result = await createUser(email, password);
      await updateUserProfile(name, "");
      if (result?.user) {
        const userInfo = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        const { data } = await axiosPublic.post(`/users`, userInfo);
        if (data.insertedId) {
          toast.success("Account created successfully");
          reset();
          navigate(targetPath);
        }
      }
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Task Management | SignUp</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full flex flex-col md:flex-row-reverse overflow-hidden">
          {/* Illustration Section */}
          <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6">
            <div className="text-white text-center">
              <h2 className="text-3xl font-bold">Join Us Today!</h2>
              <p className="mt-2">Create an account to manage your tasks</p>
            </div>
          </div>
          {/* Form Section */}
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6 text-center md:text-left text-gray-800">
              Sign Up
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: true })}
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {errors.name && <span className="text-red-500">Name is required</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", { required: true })}
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {errors.email && <span className="text-red-500">Email is required</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password", { required: "Password is required" })}
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                {err && <span className="text-red-500">{err}</span>}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-all duration-200"
              >
                Sign Up
              </button>
            </form>
            <p className="text-sm text-gray-600 mt-4 text-center md:text-left">
              Already have an account? {" "}
              <Link to="/signIn" className="text-blue-500 font-medium">
                Login
              </Link>
            </p>
            <div className="flex items-center justify-center mt-6">
              <p className="text-sm text-gray-600">Or sign up with</p>
            </div>
            <div className="flex justify-center mt-4 space-x-4">
              <button className="p-3 bg-gray-100 rounded-full shadow-lg hover:bg-gray-200 transition-all">
                <FaFacebook className="text-blue-600 cursor-not-allowed" size={24} />
              </button>
              <ContinueGoogle></ContinueGoogle>
              <button className="p-3 cursor-not-allowed bg-gray-100 rounded-full shadow-lg hover:bg-gray-200 transition-all">
                <FaGithub className="text-gray-800" size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
