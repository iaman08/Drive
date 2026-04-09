import { useNavigate } from "react-router-dom";
import { Folder as FolderIcon, Trash2 } from "lucide-react";
import { deleteFolder } from "../../api/folder.api";
import toast from "react-hot-toast";
import type { Folder } from "../../types/folder";

interface Props {
  folder: Folder;
  onDelete: () => void;
}

export function FolderCard({ folder, onDelete }: Props) {
  const navigate = useNavigate();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm(`Delete "${folder.title}"?`)) return;

    try {
      await deleteFolder(folder.id);
      toast.success("Folder deleted");
      onDelete();
    } catch {
      toast.error("Failed to delete folder");
    }
  };

  return (
    <div className="folder-card" onClick={() => navigate(`/folder/${folder.id}`)}>
      <div className="folder-card-icon">
        <FolderIcon size={24} />
      </div>
      <div className="folder-card-info">
        <div className="folder-card-title">{folder.title}</div>
      </div>
      <div className="folder-card-actions">
        <button className="btn btn-danger" onClick={handleDelete}>
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
