import axios from "axios";

import { serverLink } from "./serverlink";

export const GET = (path: string, body?: { [key: string]: string }) => {
  return axios.get(
    `${serverLink}/${path}?${
      body ? Object.keys(body).map((key) => `${key}=${body[key] || ""}&`) : ""
    }`,
    {
      headers: {
        Authorization: localStorage.getItem("jwtToken"),
      },
    }
  );
};

export const POST = (path: string, body?: Object) => {
  return axios.post(`${serverLink}/${path}`, body, {
    headers: {
      Authorization: localStorage.getItem("jwtToken"),
    },
  });
};
