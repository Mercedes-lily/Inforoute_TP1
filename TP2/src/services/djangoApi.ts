import axios from "axios";

const djangoApi = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchUserProfile = async (token: string) => {
  const response = await djangoApi.get("/api/profile/", {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data;
};
export default djangoApi;
