/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

const useFetch = (searchUrl: string) => {
  const [status, setStatus] = useState<{ loading: boolean; data: any; error: any }>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  async function fetchNow(url: string) {
    setStatus({ loading: true, data: undefined, error: undefined });
    try {
      const response = await fetch(url);
      const result = await response.json();
      setStatus({ loading: false, data: result.data, error: undefined });
    } catch (error) {
      setStatus({ loading: false, data: undefined, error });
    }
  }
  useEffect(() => {
    if (searchUrl) {
      fetchNow(searchUrl);
    }
  }, [searchUrl]);
  return { ...status, fetchNow };
};
export default useFetch;
