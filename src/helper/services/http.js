import axios from "axios";

export const http = () => {
  const options = {
    baseURL: `https://api.imgbb.com/1/`,
  };

  const http = axios.create(options);
  return http;
};
