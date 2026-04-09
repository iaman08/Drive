import { useState } from "react";
import { createFolder } from "../../api/folder.api";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  onClose: () => void;
  parentId?: string | null;
  onCreated: () => void;
}

export function CreateFolder({ open, onClose, parentId, onCreated }: Props) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setLoading(true);
      await createFolder(title.trim(), parentId);
      toast.success("Folder created!");
      setTitle("");
      onCreated();
      onClose();
    } catch {
      toast.error("Failed to create folder");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="New Folder">
      <form onSubmit={handleSubmit}>
        <Input
          label="Folder name"
          placeholder="Enter folder name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <div className="modal-actions">
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
}
