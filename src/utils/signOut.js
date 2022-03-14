import { environment } from "./environment";

export const signOut = () => {
  localStorage.removeItem(environment + "_api_key");
  window.location.replace("/");
};
