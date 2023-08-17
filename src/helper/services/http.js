import axios from "axios";

export const http = () => {
  const options = {
    baseURL: `https://api.imgbb.com/1/`,
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_KEY_API}`,
      "Access-Control-Allow-Origin": "*",
      'Content-Type': 'multipart/form-data',
    },
  };

  const http = axios.create(options);
  return http;
};
