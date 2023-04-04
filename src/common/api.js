export const  getCurrentWeatherData = async (city) => {
   
    const  API_KEY = "9ded7be35af09496a8508071c3028121";
     let response = await fetch(
       `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric  `
     );
     return response.json();
   };