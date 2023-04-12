import "./App.css";
import React, { useEffect, useState } from "react";

import WeatherDetails from "./components/WeatherDetails";

import { useCallback } from "react";
import { createContext } from "react";

import UseFetch from "./components/UseFetch";

// import FavouriteCities from "./components/FavouriteCities";
import { getCitiesFromLocalStorage, getCity } from "./utils";

export const ThemeContext = createContext("dark");

const App = () => {
  const [city, setCity] = useState(getCity());
  const [changecity, setChangecity] = useState("");
  const [theme, setTheme] = useState("light");
  const [favouriteCity, setfavouriteCity] = useState(
    getCitiesFromLocalStorage()
  );
  const { data, loading, error } = UseFetch(city);
  console.log(favouriteCity);

  const handleClick = useCallback(
    (changecity) => {
      window.localStorage.setItem("city", changecity);
      setCity(changecity);
      setChangecity("");
    },
    [changecity]
  );
  const handleChangeCity = (e) => {
    setChangecity(e.target.value);
  };

  //
  const changeTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleInvalidCity = () => {
    localStorage.removeItem("city");
    setCity(getCity);
  };
  const removefavouriteCity = (id) => {
    setfavouriteCity((favouriteCity) =>
      favouriteCity.filter((city) => city.id !== id)
    );
  };

  return (
    <>
      <ThemeContext.Provider value={theme}>
        <>
          {loading && (
            <div className=" flex justify-center items-center my-10">
              <svg
                className="animate-spin  h-1/5 w-1/5 text-red-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          )}
          {error && (
            <h1 className="text-center text-4xl my-9">
              {error.message}
              <div className="flex justify-center my-4">
                <button
                  className="border-2 p-1"
                  onClick={() => {
                    handleInvalidCity();
                  }}
                >
                  Back to home
                </button>
              </div>
            </h1>
          )}
          <div className="  flex justify-center my-4 ">
            <button
              className="w-1/5 border border-1 border-blue-500 p-2 "
              onClick={changeTheme}
            >
              Toggle Theme
            </button>
          </div>

          {data ? (
            <>
              <div className="flex justify-center my-8 ">
                <input
                  className="border p-1 border-black"
                  type="text"
                  placeholder="Search City"
                  value={changecity}
                  onChange={(e) => {
                    handleChangeCity(e);
                  }}
                />
                <button
                  onClick={() => {
                    handleClick(changecity);
                  }}
                  className="mx-2 border border-black p-1"
                >
                  Search
                </button>
              </div>
              <WeatherDetails
                data={data}
                error={error}
                favouriteCity={favouriteCity}
                setfavouriteCity={setfavouriteCity}
              />
              <div className="flex flex-col items-center">
                <h1 className="text-3xl my-2">Favourite Cities</h1>
                <ul>
                  {favouriteCity?.length
                    ? favouriteCity.map((city) => (
                        <li
                          key={city.id}
                          className=" grid grid-cols-[200px_auto_auto_auto] place-content-center place-items-center my-3 "
                        >
                          <span>{city.name}</span>
                          <span className="temp text-3xl mx-3">{`${city.temp?.toFixed(
                            1
                          )}°`}</span>
                          <span className="min-max-temp mx-3">{`${city.temp_max?.toFixed(
                            1
                          )}° ${city.temp_min?.toFixed(1)}°`}</span>

                          <button
                            className="mx-4 border bg-red-400 text-white rounded-md"
                            onClick={() => {
                              removefavouriteCity(city.id);
                            }}
                          >
                            remove
                          </button>
                        </li>
                      ))
                    : null}
                </ul>
              </div>
            </>
          ) : null}
        </>
      </ThemeContext.Provider>
    </>
  );
};

export default App;
