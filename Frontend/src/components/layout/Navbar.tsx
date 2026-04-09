import { HardDrive, LogOut } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../ui/Button";

export function Navbar() {
  const { logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <HardDrive size={24} />
        <span>Apna Drive</span>
      </div>
      <div className="navbar-actions">
        <Button variant="icon" onClick={logout}>
          <LogOut size={20} />
        </Button>
      </div>
    </nav>
  );
}
