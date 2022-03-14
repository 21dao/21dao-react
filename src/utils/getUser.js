import { environment } from "../utils/environment";
import getUserFromApiKey from "../data/dashboard/getUserFromApiKey";

export const getUser = async () => {
  let apiKey = localStorage.getItem(environment + "_api_key");
  const res = await getUserFromApiKey(apiKey);
  return res.data;
};
