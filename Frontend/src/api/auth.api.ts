import api from "./axios";

export const signup = async (username: string, password: string) => {
  const res = await api.post("/auth/signup", {
    username,
    password,
  });
  return res.data;
};

export const login = async (username: string, password: string) => {
  const res = await api.post("/auth/signin", {
    username,
    password,
  });
  return res.data;
};
