import api from "./axios";

export const getFolders = async (parentId?: string | null) => {
  const res = await api.get("/folders", {
    params: { parentId },
  });
  return res.data;
};

export const createFolder = async (
  title: string,
  parentId?: string | null
) => {
  const res = await api.post("/folders", {
    title,
    parentId,
  });
  return res.data;
};

export const deleteFolder = async (id: string) => {
  const res = await api.delete(`/folders/delete/${id}`);
  return res.data;
};

export const renameFolder = async (id: string, title: string) => {
  const res = await api.patch(`/folders/${id}`, { title });
  return res.data;
};