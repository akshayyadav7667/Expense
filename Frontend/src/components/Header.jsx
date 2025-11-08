

import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChevronDown, LogOut } from "lucide-react";

const Header = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-5 py-3 flex justify-between items-center text-white">
        {/* ✅ App Title */}
        <h1 className="text-2xl font-bold tracking-wide flex items-center gap-2">
         <span>Finance Tracker</span>
        </h1>

        
        <div className="relative">
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full hover:bg-white/30 transition"
          >
            {/* Profile Image */}
            <img
              src={
                currentUser?.avatar ||
                "https://ui-avatars.com/api/?name=" + (currentUser?.name || "U")
              }
              alt="profile"
              className="w-8 h-8 rounded-full border border-white/40"
            />
            <span className="font-medium">{currentUser?.name || "User"}</span>
            <ChevronDown size={16} />
          </button>

         
          {openMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-gray-700 rounded-lg shadow-lg overflow-hidden animate-fadeIn">
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left text-sm"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
