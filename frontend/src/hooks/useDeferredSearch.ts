import { useDeferredValue, useState, useEffect } from "react";

const useDeferredSearch = (query: string, delay = 200) => {
  const deferredQuery = useDeferredValue(query);
  const [debouncedQuery, setDebouncedQuery] = useState(deferredQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(deferredQuery);
    }, delay);

    return () => clearTimeout(handler);
  }, [deferredQuery, delay]);

  return debouncedQuery;
};

export default useDeferredSearch;
