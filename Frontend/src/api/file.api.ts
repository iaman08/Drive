import api from "./axios";

export const getPresignedUrl = async(
    fileName:string,
    fileType:string,
    folderId:string
) => {
    const res = await api.post("/files/presigned-url",{
        fileName,
        fileType,
        folderId,
    });
    return res.data;
};

export const saveFile = async(
    title: string,
    key:string,
    folderId:string,
    type:string
) => {
    const res = await api.post("/files/save",{
        title, key, folderId, type,
    });
    return res.data;
};

export const getFiles = async(folderId: string) => {
    const res = await api.get("/files",{
        params: { folderId },
    });
    return res.data;
}