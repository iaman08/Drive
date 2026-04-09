import { useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Sidebar } from "../components/layout/Sidebar";
import { FolderGrid } from "../components/folder/FolderGrid";
import { CreateFolder } from "../components/folder/CreateFolder";
import { Loader } from "../components/common/Loader";
import { useFolder } from "../hooks/useFolder";

export function Dashboard() {
  const [showCreate, setShowCreate] = useState(false);
  const { folders, loading, refresh } = useFolder(null);

  return (
    <>
      <Navbar />
      <div className="app-layout">
        <Sidebar onCreateFolder={() => setShowCreate(true)} />
        <div className="main-content">
          <div className="page-content">
            <div className="page-header">
              <h1>My Drive</h1>
            </div>

            {loading ? (
              <Loader />
            ) : (
              <>
                <div className="section-label">Folders</div>
                <FolderGrid folders={folders} onRefresh={refresh} />
              </>
            )}
          </div>
        </div>
      </div>

      <CreateFolder
        open={showCreate}
        onClose={() => setShowCreate(false)}
        parentId={null}
        onCreated={refresh}
      />
    </>
  );
}
