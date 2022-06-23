/* eslint-disable import/prefer-default-export */
import { config } from "../constants";

function getFilterCategoryOptions() {
  return fetch(`${config.API_URL}/products/categoriesOptions`)
    .then((res) => res.json())
    .then((result) => result);
}

export const productsListService = {
  getFilterCategoryOptions,
};
