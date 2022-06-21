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
    axios({
      method: 'GET',
      url: 'http://localhost:3001/products/search',
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
    .then(res => {
      console.log(res);
      setProducts(prevProducts => {
        return [...new Set([...prevProducts, ...res.data.result.map(b => b)])]
      })
      setHasMore(res.data.result.length > 0)
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
