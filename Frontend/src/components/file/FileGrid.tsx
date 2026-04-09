import { FileX } from "lucide-react";
import { FileCard } from "./FileCard";
import type { FileItem } from "../../types/file";

interface Props {
  files: FileItem[];
  onRefresh: () => void;
}

export function FileGrid({ files, onRefresh }: Props) {
  if (files.length === 0) {
    return (
      <div className="empty-state">
        <FileX />
        <p>No files yet</p>
      </div>
    );
  }

  return (
    <div className="grid">
      {files.map((file) => (
        <FileCard key={file.id} file={file} onDelete={onRefresh} />
      ))}
    </div>
  );
}
