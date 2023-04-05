import './App.css';
import React, { useEffect, useState } from 'react'

import WeatherDetails from './components/WeatherDetails';
import { getCurrentWeatherData } from './common/api';
import { useCallback } from 'react';
import { createContext } from 'react';
import { useContext } from 'react';




export const ThemeContext= createContext("dark");

// export const useTheme=()=>{
//   useContext(ThemeContext)
// }

function App() {


  const [forcast,setForcast]=useState(null);
   const[city, setCity] = useState("Chandigarh");
   const [changecity,setChangecity]=useState("");
   const [theme, setTheme] = useState('light')
   console.log(city);
   console.log(forcast)

 

 const onHandleClick=useCallback((city)=>{
  console.log("handle Clicked")
      fetchData(changecity)
      setCity(city)
      setChangecity("")
  },[changecity])
  
  
  
  async function fetchData(city){
    const data= await getCurrentWeatherData(city);
    
    
    setForcast(data)
    console.log(data);
    
  }
  const changeTheme=()=>{
    setTheme(prev=>prev==="light"?"dark":"light")

console.log(theme)}
  
  
  useEffect(() => {
    fetchData(city)
    
  },[city])

  if(!forcast){
    return 
  }
  
  
  
  
  
  return (
    <>
    <ThemeContext.Provider value={theme}>
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
      <WeatherDetails forcast={forcast}/>
      <div className='  flex justify-center my-4 '>
      <button className='w-1/5 border border-1 border-blue-500 p-2 ' onClick={changeTheme}>Toggle Theme</button>
      </div>
      
      </>:null}
    </ThemeContext.Provider>
   
    
      
     
    
    </>


  





  )
}

export default App;

