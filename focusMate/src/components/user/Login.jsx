import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../layout/Layout";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { logUser } from "../../features/authSlice";

const Login = () => {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/users/login", {
        username,
        password,
      });

      if (res && res.data.success) {
        dispatch(logUser(res.data.data.user));
        navigate("/home");
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div
        className="flex justify-center items-center min-h-screen relative overflow-hidden
                      bg-gradient-to-b from-[#0F1B41] via-[#0D1329] to-[#0A0F2C]"
      >
        <div
          className="absolute inset-0 
                        bg-[radial-gradient(circle,rgba(255,255,255,0.07)_1px,transparent_1px)] 
                        [background-size:24px_24px] opacity-30"
        ></div>

        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative bg-white rounded-2xl shadow-lg w-full max-w-md p-8 z-10 mt-[-150px]"
        >
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl text-center text-gray-900 mb-6 font-extrabold"
          >
            Welcome to Focusmate
          </motion.h2>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            <input
              type="text"
              value={username}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your username"
              required
              autoFocus
              className="w-full px-4 py-3 border border-gray-400 rounded-xl bg-gray-100 "
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 border border-gray-400 rounded-xl bg-gray-100 "
            />
            <button
              type="submit"
              className="w-full py-2.5 mt-2 bg-blue-900 text-white font-semibold 
                         rounded-xl shadow-md transition-all duration-300 
                         hover:bg-blue-800 hover:shadow-lg"
            >
              Login
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center my-6"
          >
            <div className="flex-grow h-px bg-gray-300"></div>
            <div className="flex-grow h-px bg-gray-300"></div>
          </motion.div>

          <motion.button
            onClick={() => navigate("/register")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="py-2.5 px-10 bg-green-600 text-white font-semibold 
             rounded-xl shadow-md transition-all duration-300 
             hover:bg-green-700 hover:shadow-lg mx-auto block"
          >
            Create new account
          </motion.button>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Login;
