/* eslint-disable import/prefer-default-export */
import { config } from "../constants";
import { authHeader } from "../helpers/authHeader";

const getRequestOptions = (body) => ({
  method: "POST",
  headers: { ...authHeader(), "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

function getFilterCategoryOptions() {
  return fetch(`${config.API_URL}/products/categoriesOptions`)
    .then((res) => res.json())
    .then((result) => result);
}

function toggleLike(id) {
  const options = getRequestOptions({productId: id})
  return fetch(`${config.API_URL}/products/like`, options)
    .then((res) => res.json())
    .then((result) => result);
}

function fetchUserLikeIds(userId) {
  
  return fetch(`${config.API_URL}/products/likes/${userId}`)
    .then((res) => res.json())
    .then((result) => result);


}

export const productsListService = {
  getFilterCategoryOptions,
  toggleLike,
  fetchUserLikeIds,
};
