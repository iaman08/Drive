import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { getPresignedUrl, saveFile } from "../../api/file.api";
import { Button } from "../ui/Button";
import toast from "react-hot-toast";

interface Props {
  folderId: string;
  onUploadSuccess: () => void;
}

export default function UploadFile({ folderId, onUploadSuccess }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return toast.error("Select a file");

    try {
      setLoading(true);

      const { uploadUrl, key } = await getPresignedUrl(
        file.name,
        file.type,
        folderId
      );

      await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      const fileType = file.type.includes("video") ? "Video" : "Pdf";
      await saveFile(file.name, key, folderId, fileType);

      toast.success("Uploaded 🚀");
      setFile(null);
      onUploadSuccess();
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-area">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <Button onClick={handleUpload} loading={loading}>
        <UploadCloud size={18} />
        {loading ? "Uploading..." : "Upload"}
      </Button>
    </div>
  );
}