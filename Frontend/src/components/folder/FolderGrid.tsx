import { FolderOpen } from "lucide-react";
import { FolderCard } from "./FolderCard";
import type { Folder } from "../../types/folder";

interface Props {
  folders: Folder[];
  onRefresh: () => void;
}

export function FolderGrid({ folders, onRefresh }: Props) {
  if (folders.length === 0) {
    return (
      <div className="empty-state">
        <FolderOpen />
        <p>No folders yet</p>
      </div>
    );
  }

  return (
    <div className="grid">
      {folders.map((folder) => (
        <FolderCard key={folder.id} folder={folder} onDelete={onRefresh} />
      ))}
    </div>
  );
}
