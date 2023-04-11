import { useContext } from "react";
import { ThemeContext } from "../App";

const WeatherDetails = ({ data }) => {
  const theme = useContext(ThemeContext);

  if (!data) {
    return null;
  }

  const {
    name,
    main: { temp, temp_min, temp_max },
    weather: [{ description }],
  } = data ?? { name: "", main: {}, weather: [{}] };
  return (
    <>
      {data ? (
        <section
          className="flex flex-col justify-center items-center"
          style={{
            background: theme === "light" ? "white" : "black",
            color: theme === "light" ? "black" : "white",
          }}
        >
          <h1 className="city text-2xl">{name}</h1>
          <p className="temp text-3xl">{`${temp?.toFixed(1)}°`}</p>
          <p className="desc">{description}</p>
          <p className="min-max-temp ">{`${temp_max?.toFixed(
            1
          )}° ${temp_min?.toFixed(1)}°`}</p>
        </section>
      ) : null}
    </>
  );
};

export default WeatherDetails;
