/* eslint-disable no-return-assign */
/* eslint-disable no-shadow */
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
// import { config } from "../../redux/constants";
import { productsListActions } from '../../redux/actions/productsListActions';

export const useProductSearch = (query, pageNumber) => {
  const loading = useSelector((state) => state.productsList.pending)
  const error = useSelector((state) => state.productsList.error)
  const [hasMore, setHasMore] = useState(false)
  const filtersCategories = useSelector((state) => state.productsList.filters.categories)
  const perPage = useSelector((state) => state.productsList.perPage)
  const products = useSelector((state) => state.productsList.products)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productsListActions.setProducts([]))
  }, [filtersCategories, query])

  useEffect(() => {
    //dispatch(productsListActions.setProducts([]))
    dispatch(productsListActions.setPending(true));
    dispatch(productsListActions.setError(false));
    let cancel
    axios({
      method: 'GET',
      // url: `${config.API_URL}/products`,
      url: '/products',
      params: { q: query, page: pageNumber, filters: { categories: filtersCategories }, perPage },
      // eslint-disable-next-line no-return-assign
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
      .then(res => {
        const newData = res?.data || [];
       
        const map = new Map([...products, ...newData].map(item => [item.id, item]));
        dispatch(productsListActions.setProducts([...map.values()]));
        setHasMore(newData.length > 0)
        dispatch(productsListActions.setPending(false));
      }).catch(e => {
        if (axios.isCancel(e)) return
        dispatch(productsListActions.setError(true));

      })
    return () => cancel()
  }, [query, pageNumber, filtersCategories])

  return { loading, error, products, hasMore }
}

export default useProductSearch;
