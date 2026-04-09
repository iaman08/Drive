export interface FileItem {
  id: string;
  title: string;
  type: "Pdf" | "Video";
  url: string;
  parentFolderId: string;
  userId: string;
}
