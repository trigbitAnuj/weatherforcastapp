// import { useEffect } from "react";

// export const getCurrentWeatherData = async (city) => {
//   try {
//     let response = await fetch(
//       `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric  `
//     );
//     return response.json();
//   } catch (error) {
//     return error.message;
//   }
// };

//

export const getCity = () => {
  const city = localStorage.getItem("city") ?? "Chandigarh";
  console.log(city);
  return city;
};
