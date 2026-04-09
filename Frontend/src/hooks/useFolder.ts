import { useState, useEffect, useCallback } from "react";
import { getFolders } from "../api/folder.api";
import type { Folder } from "../types/folder";

export function useFolder(parentId?: string | null) {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getFolders(parentId);
      setFolders(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load folders");
    } finally {
      setLoading(false);
    }
  }, [parentId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { folders, loading, error, refresh };
}
