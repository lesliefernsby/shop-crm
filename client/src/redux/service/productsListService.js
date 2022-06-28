/* eslint-disable import/prefer-default-export */
import { config } from "../constants";
import { authHeader } from "../helpers/authHeader";

const getPostRequestOptions = (body, method = "POST") => ({
  method,
  headers: { ...authHeader(), "Content-Type": "application/json" },
  // withCredentials: true,
  body: JSON.stringify(body),
});
const requestGetOptions = {
  method: "GET",
  headers: authHeader(),
  // withCredentials: true,
};

function getFilterCategoryOptions() {
  return fetch(`${config.API_URL}/products/categoriesOptions`)
    .then((res) => res.json())
    .then((result) => result);
}

function toggleLike(id) {
  const options = getPostRequestOptions({productId: id})
  return fetch(`${config.API_URL}/products/like`, options)
    .then((res) => res.json())
    .then((result) => result);
}

function fetchUserLikeIds(userId) {
  return fetch(`${config.API_URL}/products/likes/${userId}`)
    .then((res) => res.json())
    .then((result) => result);
}

function getFavorites() {
  return fetch(`${config.API_URL}/products/favorites`, requestGetOptions)
    .then((res) => res.json())
    .then((result) => result);
}

function deleteProduct(id) {
  return fetch(`http://localhost:3001/products`, getPostRequestOptions({id}, "DELETE"))
    .then((res) => res.json())
    .then((result) => result);
}

export const productsListService = {
  getFilterCategoryOptions,
  toggleLike,
  fetchUserLikeIds,
  getFavorites,
  deleteProduct,
};
