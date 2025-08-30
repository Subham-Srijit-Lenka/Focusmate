import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Layout from "../layout/Layout";
import { HiOutlineMail } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

const Contact = () => {
  const formRef = useRef();
  const [success, setSuccess] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_ex3f37f",
        "template_l3posua",
        formRef.current,
        "HScb6ZRMzLNBuOtdv"
      )
      .then(
        (result) => {
          console.log(result.text);
          setSuccess(true);
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
          setSuccess(false);
        }
      );
  };

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#0F1B41] via-[#0D1329] to-[#0A0F2C]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="relative bg-white border-2 border-cyan-400 rounded-2xl shadow-[0_0_20px_3px_rgba(0,200,255,0.4)] w-full max-w-3xl p-10 grid grid-cols-1 md:grid-cols-2 gap-8 mt-[-150px]"
        >
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-semibold mb-4 text-cyan-500">
              Contact Me
            </h2>
            <p className="text-gray-700 mb-6">
              Feel free to reach out for collaborations, opportunities, or just
              to say hello 👋
            </p>
            <div className="flex space-x-6">
              <a
                href="mailto:subhamsrijitlenka19@gmail.com"
                className="hover:scale-110 transition-transform"
              >
                <HiOutlineMail className="w-8 h-8 text-gray-700 hover:text-cyan-600" />
              </a>
              <a
                href="https://github.com/Subham-Srijit-Lenka"
                target="_blank"
                rel="noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <FaGithub className="w-8 h-8 text-gray-700 hover:text-cyan-600" />
              </a>
              <a
                href="https://www.linkedin.com/in/subham-srijit-lenka/"
                target="_blank"
                rel="noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <FaLinkedin className="w-8 h-8 text-gray-700 hover:text-cyan-600" />
              </a>
            </div>
          </div>

          <div>
            <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="user_email" // Must match {{user_email}} in your template
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Message
                </label>
                <textarea
                  name="message" // Must match {{message}} in your template
                  rows="4"
                  placeholder="Write your message..."
                  required
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 font-bold text-white bg-gradient-to-r from-[#081461] to-[#0A1A7E] rounded-xl shadow-lg hover:shadow-cyan-500/40 transition-all duration-300"
              >
                Send Message
              </button>

              {success && (
                <p className="text-green-600 text-center mt-2">
                  ✅ Message sent successfully!
                </p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Contact;
