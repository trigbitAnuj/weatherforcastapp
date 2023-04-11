import { useEffect } from "react";

export const getCurrentWeatherData = async (city) => {
  try {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric  `
    );
    return response.json();
  } catch (error) {
    return error.message;
  }
};

//  export const Usefetch=(city)=>{
//   const

//   useEffect(()=>{

//      const fetchData= async()=>{
//       try {
//         const response = await fetch(
//           `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric  `
//         );
//         return response.json();

//       } catch (error) {
//         return error.message
//       }
//     };

//     fetchData()

//      },[city]
//   )
//   return { isLoading, apiData, serverError };
//  }
