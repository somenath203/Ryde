import { useState, useEffect, useCallback } from 'react';


// 1st function
export const fetchAPI = async (url, options) => {

  try {

    const response = await fetch(url, options);

    if (!response.ok) {

      new Error(`HTTP error! status: ${response.status}`);

    }

    return await response.json();

  } catch (error) {

    console.error('Fetch error:', error);
    
    throw error;

  }

};


// 2nd function
export const useFetch = (url, options) => {

  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);


  const fetchData = useCallback(async () => {

    setLoading(true);

    setError(null);


    try {

      const result = await fetchAPI(url, options);

      setData(result.data);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  }, [url, options]);


  useEffect(() => {

    fetchData();

  }, [fetchData]);



  return { data, loading, error, refetch: fetchData };

  
};
