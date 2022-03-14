import apiClient from "../client/apiClient";

async function saveUserData(apiKey, data) {
  const res = await apiClient
    .post("/user/data", {
      data: data,
      api_key: apiKey,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
  return res;
}

export default saveUserData;
