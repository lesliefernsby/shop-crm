/* eslint-disable default-param-last */
import { productsListConstants } from "../constants/productsListConstants";

export const initialState = {
  error: false,
  pending: false,
  isProductListPage: false,
  pageNumber: 1,
  query: "",
  products: [],
  perPage: 15,
  filterCategoryOptions: [],
  filters: {
    categories: [],
  },
  likes: [],
};

export function productsList(state = initialState, action) {

  switch (action.type) {
    case productsListConstants.SET_IS_LIST_PAGE:
      return {
        ...state,
        isProductListPage: action.payload,
      };
    case productsListConstants.GET_FILTER_CATEGORY_OPTIONS:
      return {
        ...state,
        filterCategoryOptions: action.payload,
      };
    case productsListConstants.SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    case productsListConstants.SET_PAGE_NUMBER:
      return {
        ...state,
        pageNumber: action.payload,
      };
    case productsListConstants.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case productsListConstants.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case productsListConstants.SET_PENDING:
      return {
        ...state,
        pending: action.payload,
      };
    case productsListConstants.ADD_CATEGORIES_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          categories: action.payload || [],
        },
      };
    case productsListConstants.SET_LIKE:
      // eslint-disable-next-line no-case-declarations
      let newArray = [];
      if (state.likes.includes(action.payload)) {
        newArray = newArray.filter((item) => item.id !== action.payload)
      } else {
        newArray = [...state.likes, action.payload]
      }
      return {
        ...state,
        likes: newArray
      };

    case productsListConstants.SET_INITIAL_LIKES:
      return {
        ...state,
        likes: action.payload
      };

    default:
      return state;
  }
};


