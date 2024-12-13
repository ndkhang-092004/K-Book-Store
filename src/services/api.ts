import axios from "@/services/axios.customize";

type RegisterProps = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
};

export const loginAPI = (username: string, password: string) => {
  const URL = "/api/v1/auth/login";
  return axios.post<IBackendRes<ILogin>>(URL, { username, password });
};

export const registerAPI = (registerValues: RegisterProps) => {
  const URL = "/api/v1/user/register";
  return axios.post<IBackendRes<IRegister>>(URL, registerValues);
};

export const fetchAccountAPI = () => {
  const URL = "/api/v1/auth/account";
  return axios.get<IBackendRes<IFetchAccount>>(URL);
};

export const logoutAPI = () => {
  const URL = "/api/v1/auth/logout";
  return axios.post<IBackendRes<IFetchAccount>>(URL);
};
