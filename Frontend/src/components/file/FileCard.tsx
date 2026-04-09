import { FileText, Video, Trash2, ExternalLink } from "lucide-react";
import type { FileItem } from "../../types/file";
import api from "../../api/axios";
import toast from "react-hot-toast";

interface Props {
  file: FileItem;
  onDelete: () => void;
}

export function FileCard({ file, onDelete }: Props) {
  const isPdf = file.type === "Pdf";

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm(`Delete "${file.title}"?`)) return;

    try {
      await api.delete(`/files/delete/${file.id}`);
      toast.success("File deleted");
      onDelete();
    } catch {
      toast.error("Failed to delete file");
    }
  };

  const handleOpen = () => {
    if (file.url) {
      window.open(file.url, "_blank");
    }
  };

  return (
    <div className="file-card" onClick={handleOpen}>
      <div className="file-card-actions">
        <button className="btn btn-danger" onClick={handleDelete}>
          <Trash2 size={14} />
        </button>
      </div>
      <div className={`file-card-icon ${isPdf ? "pdf" : "video"}`}>
        {isPdf ? <FileText size={24} /> : <Video size={24} />}
      </div>
      <div className="file-card-title">{file.title}</div>
      <div className="file-card-type">{file.type}</div>
    </div>
  );
}
