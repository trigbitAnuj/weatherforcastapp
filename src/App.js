import "./App.css";
import React, { useEffect, useState } from "react";

import WeatherDetails from "./components/WeatherDetails";

import { useCallback } from "react";
import { createContext } from "react";

import UseFetch from "./components/UseFetch";

export const ThemeContext = createContext("dark");

const App = () => {
  const [city, setCity] = useState("Chandigarh");
  const [changecity, setChangecity] = useState("");
  const [theme, setTheme] = useState("light");
  const { data, loading, error } = UseFetch(city);

  const handleClick = useCallback(
    (changecity) => {
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

  return (
    <>
      <ThemeContext.Provider value={theme}>
        <>
          {loading && (
            <div className=" flex justify-center items-center my-10">
              <svg
                class="animate-spin  h-1/5 w-1/5 text-red-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
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
                    window.location.reload();
                  }}
                >
                  Back to home
                </button>
              </div>
            </h1>
          )}

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
              <WeatherDetails data={data} error={error} />
              <div className="  flex justify-center my-4 ">
                <button
                  className="w-1/5 border border-1 border-blue-500 p-2 "
                  onClick={changeTheme}
                >
                  Toggle Theme
                </button>
              </div>
            </>
          ) : null}
        </>
      </ThemeContext.Provider>
    </>
  );
};

export default App;
