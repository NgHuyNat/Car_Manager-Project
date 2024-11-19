import { get, post } from "../ultils/request";

export const login = async (email, password) => {
  const result = await get(`usersprofile?email=${email}&password=${password}`);
  return result;
};
export const register = async (options) => {
  const result = await post("usersprofile", options);
  return result;
};

export const checkExit = async (key, value) => {
  const result = await get(`usersprofile?${key}=${value}`);
  return result;
};
