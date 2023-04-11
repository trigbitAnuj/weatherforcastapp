import { useEffect, useState } from "react";

const UseFetch = (city) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setData(null);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
    )
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw Error("could not fetch data for the  city");
        }

        return response.json();
      })
      .then((result) => {
        console.log(result, "line 23");
        setData(result);
        setError(null);
      })
      .catch((err) => {
        console.log(err.message, "line 28");
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [city]);

  return { data, loading, error };
};
export default UseFetch;
