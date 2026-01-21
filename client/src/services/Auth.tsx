import api from "./Api";

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
}

export const loginUser = async (data: LoginData) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const signupUser = async (data: SignupData) => {
  const res = await api.post("/auth/signup", data);
  return res.data;
};
