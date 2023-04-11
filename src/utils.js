export const getCity = () => {
  const city = localStorage.getItem("city") ?? "Chandigarh";
  console.log(city);
  return city;
};

export const getCitiesFromLocalStorage = () => {
  const lists = localStorage.getItem("favouriteCity");
  if (lists) {
    return JSON.parse(localStorage.getItem("favouriteCity"));
  } else {
    return [];
  }
};
