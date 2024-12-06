import axios from "@/services/axios.customize";

export const loginAPI = (username: string, password: string) => {
  const URL = "/api/v1/auth/login";
  return axios.post<IBackendRes<ILogin>>(URL, { username, password });
};
