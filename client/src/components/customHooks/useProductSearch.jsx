import { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { productsListActions } from '../../redux/actions/productsListActions';

export const  useProductSearch = (query, pageNumber) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  // const [products, setProducts] = useState([])
  const [hasMore, setHasMore] = useState(false)
  const filtersCategories = useSelector((state) => state.productsList.filters.categories)
  const perPage = useSelector((state) => state.productsList.perPage)
  const products = useSelector((state) => state.productsList.products)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productsListActions.setProducts([]))
    // setProducts([])
  }, [query, filtersCategories])

  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel
    axios({
      method: 'POST',
      url: 'http://localhost:3001/products',
        data: { q: query, page: pageNumber , filters: {categories: filtersCategories}, perPage },
        // eslint-disable-next-line no-return-assign
        cancelToken: new axios.CancelToken(c => cancel = c)
    })
    .then(res => {
      console.log(res, 'res');
      const newData = res?.data || [];
      // setProducts(prevProducts => {
      //   return [...new Set([...prevProducts, ...products.map(b => b)])]
      // })
      dispatch(productsListActions.setProducts([...new Set([...products, ...newData.map(b => b)])]))
      setHasMore(newData.length > 0)
      setLoading(false)
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
    })
    return () => cancel()
  }, [query, pageNumber, filtersCategories])

  return { loading, error, products, hasMore }
}

export default useProductSearch;
