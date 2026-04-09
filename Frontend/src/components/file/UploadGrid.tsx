import UploadFile from "./UploadFile";

interface Props {
  folderId: string;
  onUploadSuccess: () => void;
}

export function UploadGrid({ folderId, onUploadSuccess }: Props) {
  return (
    <div>
      <div className="section-label">Upload Files</div>
      <UploadFile folderId={folderId} onUploadSuccess={onUploadSuccess} />
    </div>
  );
}
