/* eslint-disable import/prefer-default-export */
import { productsListConstants } from "../constants/productsListConstants";
import { productsListService } from "../service/productsListService";

function setIsListPage(bool) {
  return (dispatch) => {
    dispatch({ type: productsListConstants.SET_IS_LIST_PAGE, payload: bool });
  };
}

function setQuery(value) {
  return (dispatch) => {
    dispatch({ type: productsListConstants.SET_QUERY, payload: value });
  };
}

function setPageNumber(value) {
  return (dispatch) => {
    dispatch({ type: productsListConstants.SET_PAGE_NUMBER, payload: value });
  };
}

function setProducts(array) {
  return (dispatch) => {
    dispatch({ type: productsListConstants.SET_PRODUCTS, payload: array });
  };
}
function setError(value) {
  return (dispatch) => {
    dispatch({ type: productsListConstants.SET_ERROR, payload: value });
  };
}
function setPending(value) {
  return (dispatch) => {
    dispatch({ type: productsListConstants.SET_PENDING, payload: value });
  };
}

function addCategoriesFilter(value) {
  return (dispatch) => {
    try {
      dispatch({
        type: productsListConstants.ADD_CATEGORIES_FILTER,
        payload: value,
      });
      dispatch(setPageNumber(1));
      dispatch(setProducts([]));
    } catch (error) {
      dispatch(setError(true));
    }

  };
}

function getFilterCategoryOptions() {
  return (dispatch) => {
    dispatch(setPending(true));
    dispatch(setError(false));
    productsListService.getFilterCategoryOptions().then(
      (options) => {
        dispatch({
          type: productsListConstants.GET_FILTER_CATEGORY_OPTIONS,
          payload: options,
        });
        dispatch(setPending(false));
      },
      () => {
        dispatch(setError(true));
      }
    );
  };
}

function toggleLike(id) {
  return (dispatch, getState) => {
    const userId = getState().authentication.user.sub
    dispatch(setPending(true));
    dispatch(setError(false));
    productsListService.fetchLike(id, userId)
      .then(() => {
        dispatch({ type: productsListConstants.SET_LIKE, payload: id });
        dispatch(setPending(false));
      },
        () => {
          dispatch(setError(true));
        }
      );
  };
}

function fetchUserLikeIds() {
  return (dispatch, getState) => {
    const userId = getState().authentication?.user?.sub
    if (!userId) {
      dispatch({ type: productsListConstants.SET_INITIAL_LIKES, payload: [] });
    } else {
      dispatch(setPending(true));
      dispatch(setError(false));
      productsListService.fetchUserLikeIds(userId)
        .then((likes) => {
          dispatch({ type: productsListConstants.SET_INITIAL_LIKES, payload: likes });
          dispatch(setPending(false));
        },
          () => {
            dispatch(setError(true));
          }
        );
    }

  };
}



export const productsListActions = {
  setIsListPage,
  getFilterCategoryOptions,
  addCategoriesFilter,
  setQuery,
  setPageNumber,
  setProducts,
  setError,
  setPending,
  toggleLike,
  fetchUserLikeIds,
};
