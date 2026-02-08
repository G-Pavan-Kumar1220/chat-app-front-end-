import React, { useEffect, useState } from "react";
import { BASE_URL } from "../api/Api";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const ChatHeader = ({setCurrentUser,setSenderId}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const getUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`${BASE_URL}/user/info`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) return;

      const data = await response.json();
      setUser(data.user);
      setCurrentUser(data.user.name)
      setSenderId(data.user._id)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <header className="w-full bg-white border-b shadow-sm px-3 sm:px-6 py-3 flex items-center justify-between">
      
      {/* LEFT */}
      <div className="flex flex-col">
        <h1 className="text-sm sm:text-lg lg:text-xl font-semibold text-gray-800">
          Chat with Friends
        </h1>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="text-xs text-green-600">Online</span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 sm:gap-4">
        
        {/* USER INFO → hidden on mobile */}
        <div className="hidden sm:flex flex-col text-right">
          <span className="text-sm font-medium text-gray-700 max-w-40 truncate">
            {user?.name || "User_Name"}
          </span>
          <span className="text-xs text-gray-500 max-w-40 truncate">
            {user?.email || "User_email"}
          </span>
        </div>

        {/* AVATAR */}
        <img
          src={user?.avatar || "https://th.bing.com/th/id/OIP.mQPzC1-bAatVFBAjvsQJeAHaE8?w=278&h=185&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"}
          alt="User"
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-blue-500"
        />

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="
            flex items-center gap-1
            bg-red-500 hover:bg-red-600
            text-white
            px-2 sm:px-3 py-1.5
            rounded-md
            text-xs sm:text-sm
            transition
          "
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;
