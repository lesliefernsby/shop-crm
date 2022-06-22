import { productsListConstants } from '../constants/productsListConstants';

export const initialState = {
  pageNumber: 1,
  query: '',
  products: [],
}

export function productsList(state = initialState, action) {
  console.log(state, "state productsList" );
  switch (action.type) {
    case productsListConstants.TEST: // TODO: заменить
      return {
        
      };
    default:
      return state
  }
}
