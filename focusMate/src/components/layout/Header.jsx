"use client";

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logout } from "../../features/authSlice";

const navigation = [
  { name: "Home", to: "/" },
  { name: "Task Manager", to: "/taskmanager" },
  { name: "Pomodoro", to: "/pomodoro" },
  { name: "Contact", to: "/contact" },
];

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await axios.post("/api/v1/users/logout");
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const linkClasses = (path) =>
    `relative text-sm font-semibold leading-6 transition-colors duration-300 ${
      location.pathname === path
        ? "text-yellow-100 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-yellow-200 after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
        : "text-yellow-200 hover:text-yellow-100 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-yellow-200 after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300"
    }`;

  const mobileLinkClasses = (path) =>
    `block rounded-lg px-3 py-2 text-base font-semibold ${
      location.pathname === path
        ? "text-yellow-100 bg-white/10"
        : "text-yellow-200 hover:text-yellow-100"
    }`;

  return (
    <header className="bg-[#0F1B41] sticky top-0 z-50 shadow">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <Link to="/" className="text-2xl font-bold text-white lg:flex-1">
          Focusmate
        </Link>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden p-2.5 text-yellow-200 rounded-md hover:bg-white/10 transition"
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon aria-hidden="true" className="size-6" />
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link key={item.name} to={item.to} className={linkClasses(item.to)}>
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth */}
        {user ? (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link to="/login" className={linkClasses("/login")}>
              Login <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        )}
      </nav>

      {/* Mobile nav */}
      <Dialog
        as="div"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-40 bg-black/30" />

        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto bg-[#0F1B41] p-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-white">
              Focusmate
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 text-yellow-200 rounded-md hover:bg-white/10 transition"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>

          {/* Links */}
          <div className="mt-6 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={mobileLinkClasses(item.to)}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Auth */}
          <div className="mt-6 border-t border-yellow-200/30 pt-6">
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className={mobileLinkClasses("/login")}
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
