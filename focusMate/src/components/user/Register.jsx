import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../layout/Layout";
import { motion } from "framer-motion";

const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setfullName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/users/register", {
        username,
        email,
        fullName,
        password,
      });
      if (res && res.data.success) {
        navigate("/login");
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
        {/* Subtle radial grid background */}
        <div
          className="absolute inset-0 
                        bg-[radial-gradient(circle,rgba(255,255,255,0.07)_1px,transparent_1px)] 
                        [background-size:24px_24px] opacity-30"
        ></div>

        {/* Animated card */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative bg-white rounded-2xl shadow-lg w-full max-w-sm p-6 z-10 mt-[-150px]"
        >
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl font-semibold text-center text-gray-900"
          >
            Create a new account
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-600 text-sm text-center mb-6"
          >
            Sign up to get started
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-4"
          >
            <input
              type="text"
              value={fullName}
              onChange={(e) => setfullName(e.target.value)}
              placeholder="Enter your full name"
              required
              className="w-full border border-gray-400 rounded-lg px-4 py-2 bg-gray-100"
            />
            <input
              type="text"
              value={username}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your username"
              required
              className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-gray-100"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-gray-100"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-gray-100"
            />

            <button
              type="submit"
              className="w-full py-2.5 mt-2 bg-green-600 text-white font-semibold 
                         rounded-xl shadow-md transition-all duration-300 
                         hover:bg-green-700 hover:shadow-lg"
            >
              Sign Up
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center my-5"
          >
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-2 text-gray-500 text-sm">
              Already have an account?
            </span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </motion.div>

          <motion.button
            onClick={() => navigate("/login")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="w-full py-2.5 bg-blue-900 text-white font-semibold 
                       rounded-xl shadow-md transition-all duration-300 
                       hover:bg-blue-800 hover:shadow-lg"
          >
            Log in
          </motion.button>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Register;
