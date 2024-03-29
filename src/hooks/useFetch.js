import {
  useEffect,
  useState
} from "react";

export function useFetch(fetchFn,initialValue) {

  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);

  useEffect(() => {
    setIsFetching(true);
    async function fetchData() {
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({
          message: error.message || 'Please try again later'
        });
        setIsFetching(false);
      }
      setIsFetching(false);
    }
    fetchData();
  }, [fetchFn]);

  return {
    isFetching,
    error,
    fetchedData,
    setFetchedData
  }
}