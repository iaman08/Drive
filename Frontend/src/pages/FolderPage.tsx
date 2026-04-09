import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, FolderPlus, ArrowLeft } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Sidebar } from "../components/layout/Sidebar";
import { FolderGrid } from "../components/folder/FolderGrid";
import { FileGrid } from "../components/file/FileGrid";
import { CreateFolder } from "../components/folder/CreateFolder";
import { UploadGrid } from "../components/file/UploadGrid";
import { Loader } from "../components/common/Loader";
import { Button } from "../components/ui/Button";
import { useFolder } from "../hooks/useFolder";
import { getFiles } from "../api/file.api";
import type { FileItem } from "../types/file";

export function FolderPage() {
  const { id } = useParams<{ id: string }>();
  const [showCreate, setShowCreate] = useState(false);
  const { folders, loading: foldersLoading, refresh: refreshFolders } = useFolder(id);

  const [files, setFiles] = useState<FileItem[]>([]);
  const [filesLoading, setFilesLoading] = useState(true);

  const fetchFiles = async () => {
    if (!id) return;
    try {
      setFilesLoading(true);
      const data = await getFiles(id);
      setFiles(data);
    } catch {
      setFiles([]);
    } finally {
      setFilesLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [id]);

  const refreshAll = () => {
    refreshFolders();
    fetchFiles();
  };

  const loading = foldersLoading || filesLoading;

  return (
    <>
      <Navbar />
      <div className="app-layout">
        <Sidebar onCreateFolder={() => setShowCreate(true)} />
        <div className="main-content">
          <div className="page-content">
            <div className="breadcrumb">
              <Link to="/dashboard">
                <ArrowLeft size={16} />
              </Link>
              <Link to="/dashboard">My Drive</Link>
              <ChevronRight size={14} className="breadcrumb-separator" />
              <span>Folder</span>
            </div>

            <div className="page-header">
              <h1>Folder Contents</h1>
              <div className="page-actions">
                <Button variant="secondary" onClick={() => setShowCreate(true)}>
                  <FolderPlus size={18} />
                  New Subfolder
                </Button>
              </div>
            </div>

            {loading ? (
              <Loader />
            ) : (
              <>
                {folders.length > 0 && (
                  <>
                    <div className="section-label">Subfolders</div>
                    <FolderGrid folders={folders} onRefresh={refreshFolders} />
                  </>
                )}

                <div className="section-label">Files</div>
                <FileGrid files={files} onRefresh={fetchFiles} />

                <UploadGrid folderId={id!} onUploadSuccess={fetchFiles} />
              </>
            )}
          </div>
        </div>
      </div>

      <CreateFolder
        open={showCreate}
        onClose={() => setShowCreate(false)}
        parentId={id}
        onCreated={refreshFolders}
      />
    </>
  );
}
