/* eslint-disable import/prefer-default-export */
import { config } from "../constants";
import { getPostRequestOptions } from "../helpers/requestHelper" // requestGetOptions

function submitNewProduct() {
  return fetch(`${config.API_URL}/products/create`, getPostRequestOptions())
  .then((res) => res.json())
  .then((result) => result);
}

function editProduct() {
  return fetch(`${config.API_URL}/products/edit`, getPostRequestOptions())
  .then((res) => res.json())
  .then((result) => result);
}
function toggleHideStatus(id) {
  return fetch(`${config.API_URL}/products/toggleHideStatus`, getPostRequestOptions({id}, "POST"))
  .then((res) => res.json())
  .then((result) => result);
}

export const adminService = {
  submitNewProduct,
  editProduct,
  toggleHideStatus
};
