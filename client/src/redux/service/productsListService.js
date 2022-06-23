import { config } from '../constants';

export const productsListService = {
  getFilterCategoryOptions
};

function getFilterCategoryOptions() {
    

    return fetch(`${config.API_URL}/products/categoriesOptions`)
        .then((res) => res.json())
        .then(result => result);
}
