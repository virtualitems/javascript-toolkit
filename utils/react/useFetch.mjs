import { useState, useEffect } from 'react'

/**
 * @param {string | URL | globalThis.Request} input
 * @param {undefined | RequestInit} init
 */
export function useFetch(input, init = undefined) {
  /** @type {[unknown, React.Dispatch<React.SetStateAction<unknown>>]} */
  const [data, setData] = useState(undefined)

  /** @type {[null | string, React.Dispatch<React.SetStateAction<null | string>>]} */
  const [error, setError] = useState(null)

  /** @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} */
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setData(undefined)
    setError(null)
    setLoading(true)

    fetch(input, init)
      .then((response) => {
        if (response.ok === false) throw new Error(response.statusText)
        return response.json()
      })
      .then((result) => {
        setData(result)
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [input, init])

  return { data, error, loading }
}
