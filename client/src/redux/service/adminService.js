/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { config } from "../constants";
import { getPostRequestOptions } from "../helpers/requestHelper" // requestGetOptions
import {authHeader} from '../helpers/authHeader'

function submitNewProduct(inputs) {
  const formData = new FormData();
  formData.append("file", inputs.productImageURL);
  const restInputs = {...inputs};
  delete restInputs.productImageURL;
  formData.append("document", JSON.stringify(restInputs));

  axios({
      method: 'post',
      url: `${config.API_URL}/products/create`,
      data: formData,
      headers: authHeader()
  })
  .then((result) => result);
  }
async function submitEditProduct(inputs, id) {
  const formData = new FormData();
  formData.append("file", inputs.productImageURL);
  const restInputs = {...inputs, id};
  delete restInputs.productImageURL;
  formData.append("document", JSON.stringify(restInputs));

  const result = await axios({
      method: 'post',
      url: `${config.API_URL}/products/edit`,
      data: formData,
      headers: authHeader()
  });
  return result.data;
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
  toggleHideStatus,
  submitEditProduct
};
