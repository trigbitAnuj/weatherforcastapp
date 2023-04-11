import { useEffect, useState } from "react";

const UseFetch = (city) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log(data);
  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);
    //   fetch(
    //     `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
    //   )
    //     .then((response) => {
    //       console.log(response);
    //       if (!response.ok) {
    //         throw Error("could not fetch data for the  city");
    //       }

    //       return response.json();
    //     })
    //     .then((result) => {
    //       console.log(result, "line 23");
    //       setData(result);
    //       setError(null);
    //     })
    //     .catch((err) => {
    //       console.log(err.message, "line 28");
    //       setError(err);
    //     })
    //     .finally(() => {
    //       setLoading(false);
    //     });
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
        );

        if (!response.ok) {
          throw new Error("could not fetch city");
        }

        const resData = await response.json();
        setData(resData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [city]);

  return { data, loading, error };
};
export default UseFetch;
