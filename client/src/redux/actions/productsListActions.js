import { productsListConstants } from '../constants/productsListConstants';
import { productsListService } from '../service/productsListService';

export const productsListActions = {
  setIsListPage,
  getFilterCategoryOptions,
  addCategoriesFilter
};


function setIsListPage(bool) {
  return dispatch => {
      dispatch({type: productsListConstants.SET_IS_LIST_PAGE, payload: bool})
  };
}
function addCategoriesFilter(value) {
  return dispatch => {
      dispatch({type: productsListConstants.ADD_CATEGORIES_FILTER, payload: value})
  };
}

function getFilterCategoryOptions() {
  return dispatch => {

    productsListService.getFilterCategoryOptions()
    .then(
        options => { 
            dispatch({type: productsListConstants.GET_FILTER_CATEGORY_OPTIONS, payload: options})
        },
        error => {
            console.log(error);
        }
    );

      
  };
}
