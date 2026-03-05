import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useFetch = (url, dep = null) => {
  const { user } = useAuthContext();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: user?.token ? `Bearer ${user.token}` : undefined,
        },
      });
      const result = await response.json();
      if (response.ok) {
        // Support various backend structures: { data: { packages: [] } }, { data: { pkg: {} } }, etc.
        const payload = result.data?.packages ??
          result.data?.pkg ??
          result.data?.hotels ??
          result.data?.comments ??
          result.data?.users ??
          result.data;
        setData(payload);
      } else {
        setError(result.message || "Something went wrong");
      }
    } catch (err) {
      setError("Network error");
      console.error("useFetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dep]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;
