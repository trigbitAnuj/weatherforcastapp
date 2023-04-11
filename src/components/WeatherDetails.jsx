import { useContext, useEffect } from "react";
import { ThemeContext } from "../App";

const WeatherDetails = ({ data, favouriteCity, setfavouriteCity }) => {
  const theme = useContext(ThemeContext);

  let iconUrl = (icon) => ` http://openweathermap.org/img/wn/${icon}@2x.png`;

  // const {
  //   name,
  //   id,

  //   main: { temp, temp_min, temp_max },
  //   weather: [{ description, icon }],
  // } = data ?? { name: "", main: {}, weather: [{}], id: "" };

  const { name, id, main, weather } = data ?? {
    name: "",
    main: {},
    weather: [{}],
    id: "",
  };
  const { temp, temp_min, temp_max } = main ?? {};
  const [{ description, icon }] = weather ?? [{}];

  useEffect(() => {
    console.log(favouriteCity, "useeffect");
    localStorage.setItem("favouriteCity", JSON.stringify(favouriteCity));
  }, [favouriteCity]);

  if (!data) {
    return null;
  }
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
          <button
            className="border p-1 bg-blue-400"
            onClick={() => {
              setfavouriteCity([
                ...favouriteCity,
                { name, id, temp, temp_max, temp_min },
              ]);
            }}
          >
            Add to favourite
          </button>
          <h1 className="city text-2xl">{name}</h1>
          <p className="temp text-3xl">{`${temp?.toFixed(1)}°`}</p>
          <img
            src={`${iconUrl(icon)}`}
            alt="icon"
            className="w-[100px] h-[100px]  "
          />
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
