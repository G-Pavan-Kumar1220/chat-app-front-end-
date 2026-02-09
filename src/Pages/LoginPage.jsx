import React, { useState } from "react";
import { BASE_URL } from "../api/Api";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${BASE_URL}/user/${isLogin ? "login" : "registration"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      if (!response.ok) throw new Error("Auth failed");

      const data = await response.json();
      localStorage.setItem("token", data.token);

      if (isLogin) {
        alert("Login Success");
        navigate("/home");
      } else {
        alert("Registration success, please login");
        setIsLogin(true);
      }
    } catch (err) {
      alert("try to ");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full h-12 px-4 border rounded-md bg-gray-500 text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500";

  return (
    <div className="relative min-h-screen">

      {/* 🔹 BLUR + LOADER OVERLAY */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

          <div className="relative z-10 bg-white p-6 rounded-lg shadow-lg flex flex-col items-center gap-3 animate-pulse">
            <div className="h-3 w-32 bg-gray-300 rounded" />
            <div className="h-2 w-20 bg-gray-200 rounded" />
            <div className="w-10 h-10 bg-gray-300 rounded-full" />
            <span className="text-sm text-gray-600 font-medium">
              Authenticating...
            </span>
          </div>
        </div>
      )}

  
      <div className="flex justify-center items-center min-h-screen bg-linear-to-r from-blue-500 to-indigo-600 p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            {isLogin ? "Login Page" : "Sign Up Page"}
          </h2>

          <form className="space-y-4" onSubmit={submitLogin}>
            {!isLogin && (
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={inputStyle}
              />
            )}

            <input
              type="email"
              placeholder="ex@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputStyle}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={inputStyle}
            />

            {isLogin && (
              <span className="text-violet-700 text-sm flex justify-end cursor-pointer">
                Forgot password?
              </span>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <div className="text-center mt-4 text-gray-600">
            {isLogin ? (
              <p>
                Create an Account{" "}
                <span
                  onClick={() => setIsLogin(false)}
                  className="text-indigo-600 font-semibold cursor-pointer hover:underline"
                >
                  Sign Up
                </span>
              </p>
            ) : (
              <p>
                Login to your Account{" "}
                <span
                  onClick={() => setIsLogin(true)}
                  className="text-indigo-600 font-semibold cursor-pointer hover:underline"
                >
                  Login
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
