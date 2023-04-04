function WeatherDetails({forcast}) {
    if(!forcast){
      return 
    }
    const {name,main:{temp,temp_min,temp_max},weather:[{description}]}=forcast??{};
  return(
    <>
       {forcast?<section className="flex flex-col justify-center items-center" >
       <h1 className="city text-2xl">{name}</h1>
              <p className="temp text-3xl">{`${temp?.toFixed(1)}°`}</p>
              <p className="desc">{description}</p>
              <p className="min-max-temp">{`${temp_max?.toFixed(1)}° ${temp_min?.toFixed(1)}°`}</p> 
         
     </section>:null} 
     
      
      </>
     
    )
  }
  
  
  
  
  export default WeatherDetails