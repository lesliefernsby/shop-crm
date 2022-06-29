import { authHeader } from "./authHeader";


export const getPostRequestOptions = (body, method = "POST") => ({
  method,
  headers: { ...authHeader(), "Content-Type": "application/json" },
  // withCredentials: true,
  body: JSON.stringify(body),
});

export const requestGetOptions = {
  method: "GET",
  headers: authHeader(),
  // withCredentials: true,
};
