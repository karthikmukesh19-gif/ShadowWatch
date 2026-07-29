import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = async () => {
    try {
      setError("");

      const response = await api.post("/login", {
        username,
        password,
      });

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid username or password");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-3xl font-bold text-cyan-400 text-center mb-6">
          ShadowWatch Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-gray-700 text-white outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-gray-700 text-white outline-none"
        />
        {error && (
          <p className="text-red-400 text-sm mb-4">
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg font-semibold"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;