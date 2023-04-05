import './App.css';
import React, { useEffect, useState } from 'react'

import WeatherDetails from './components/WeatherDetails';
import { getCurrentWeatherData } from './common/api';







function App() {
  const [forcast,setForcast]=useState(null);
   const[city, setCity] = useState("Chandigarh");
   const [changecity,setChangecity]=useState("");

   console.log(city);
   console.log(forcast)

 

 function onHandleClick(city){
  console.log("handle Clicked")
      fetchData(city)
      setCity(city)
      setChangecity("")
  }
  
  
  
  async function fetchData(city){
    const data= await getCurrentWeatherData(city);
    
    
    setForcast(data)
    console.log(data);
    
  }
  
  
  
  useEffect(() => {
    fetchData(city)
    
  },[city])

  if(!forcast){
    return 
  }
  
  
  
  
  
  return (
    <>
    {forcast? <> <div className="flex justify-center my-8 ">
        <input
          className="border p-1 border-black"
          type="text"
          placeholder="Search City"
          value={changecity}
          onChange={(e)=>{setChangecity(e.target.value)
          }
}
        />
        <button
          onClick={()=>{onHandleClick(changecity)
          }}
          className="mx-2 border border-black p-1"
        >
          Search
        </button>
      </div>
      <WeatherDetails forcast={forcast}/></>:null}
    
      
     
    
    </>


  





  )
}

export default App;