import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, FolderPlus } from "lucide-react";

interface SidebarProps {
  onCreateFolder: () => void;
}

export function Sidebar({ onCreateFolder }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="sidebar">
      <button className="btn btn-primary btn-full" onClick={onCreateFolder}>
        <FolderPlus size={18} />
        New Folder
      </button>

      <div className="sidebar-divider" />

      <button
        className={`sidebar-link ${location.pathname === "/dashboard" ? "active" : ""}`}
        onClick={() => navigate("/dashboard")}
      >
        <LayoutDashboard size={20} />
        My Drive
      </button>
    </aside>
  );
}
