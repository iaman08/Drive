import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HardDrive } from "lucide-react";
import { signup } from "../api/auth.api";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import toast from "react-hot-toast";

export function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      return toast.error("Fill in all fields");
    }
    if (username.length < 3) {
      return toast.error("Username must be at least 3 characters");
    }
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      setLoading(true);
      const { token } = await signup(username, password);
      localStorage.setItem("token", token);
      toast.success("Account created!");
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <HardDrive size={28} />
          Apna Drive
        </div>
        <h1>Create account</h1>
        <p className="subtitle">Start storing your files in the cloud</p>

        <form onSubmit={handleSubmit}>
          <Input
            label="Username"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <Input
            label="Password"
            type="password"
            placeholder="Create a password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" full loading={loading}>
            Sign Up
          </Button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
