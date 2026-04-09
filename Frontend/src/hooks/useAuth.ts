import { useNavigate } from "react-router-dom";

export function useAuth() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  function saveToken(t: string) {
    localStorage.setItem("token", t);
  }

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return { token, isLoggedIn, saveToken, logout };
}
