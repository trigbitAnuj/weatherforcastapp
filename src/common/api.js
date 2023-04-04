export const  getCurrentWeatherData = async (city) => {
   
  
     let response = await fetch(
       `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric  `
     );
     return response.json();
   };