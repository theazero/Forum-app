
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!userName.trim() || !password.trim()) {
      setError("Username and password are required");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    const ok = await register(userName.trim(), password);
    if (!ok) {
      setError("That username is already taken");
      return;
    }

    navigate("/");
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm">Username</span>
          <input
            className="w-full border p-2 rounded"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            autoComplete="username"
          />
        </label>

        <label className="block">
          <span className="text-sm">Password</span>
          <input
            type="password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </label>

        <label className="block">
          <span className="text-sm">Confirm password</span>
          <input
            type="password"
            className="w-full border p-2 rounded"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            autoComplete="new-password"
          />
        </label>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Create account
        </button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/signin" className="underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
