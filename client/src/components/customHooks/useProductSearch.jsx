import { useEffect, useState } from 'react'
import axios from 'axios';


export const  useProductSearch = (query, pageNumber) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [products, setProducts] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setProducts([])
  }, [query])

  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel
    // axios({
    //   method: 'GET',
    //   url: 'http://localhost:3001/products/search',
    //   params: { q: query, page: pageNumber },
    //   cancelToken: new axios.CancelToken(c => cancel = c)
    // })
    axios({
      method: 'POST',
      url: 'http://localhost:3001/products',
        data: { q: query, page: 1, filters: {categories: [1,2]}, perPage: 15 },
        cancelToken: new axios.CancelToken(c => cancel = c)
    })
    .then(res => {
      console.log(res, 'res');
      const products = res?.data || [];
      setProducts(prevProducts => {
        return [...new Set([...prevProducts, ...products.map(b => b)])]
      })
      setHasMore(products.length > 0)
      setLoading(false)
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
    })
    return () => cancel()
  }, [query, pageNumber])

  return { loading, error, products, hasMore }
}

export default useProductSearch;
