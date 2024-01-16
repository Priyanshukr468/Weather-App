import './App.css';
import WeatherHeading from './WeatherHeading';
import Temperature from './Components/Temperature';
import Highlights from './Components/Highlights';
import  { useEffect, useState } from 'react';

function App() {

  
  const[city, setCity]=useState("New Delhi");
  const[weatherData,setWeatherData] = useState(null);

  const apiURL = `https://api.weatherapi.com/v1/current.json?key=0fb854ccaf724b8895a143213241401&q=${city}&aqi=no`;
  
  useEffect(()=> {
    fetch(apiURL)
  .then((Response)=>{
    if(!Response.ok){
      throw new Error("Didn't get data");
    }
    return Response.json();
  })
  .then((data)=>{
    console.log(data);
    setWeatherData(data);
  })
  .catch((e)=>{
    console.log(e);
  });  
  
  },[city]);
  
  return (
      <div className='text-black text-2xl bg-lime-400 '>    
        <WeatherHeading/>
      
      <div className="bg-teal-950 h-screen flex justify-center items-start">
      <div className=" w-1/5 h-1/3 mt-40">
     
      {weatherData && (
      <Temperature 
      setCity={setCity}
      stats={{
        temp:weatherData.current.temp_c,
        condition:weatherData.current.condition.text,
        isDay:weatherData.current.is_day,
        location:weatherData.location.name,
        time:weatherData.location.localtime
      }}
      />
    )}
      </div>
     

      <div className="w-1/3 h-1/3 mt= 30 p-10 grid grid-cols-2 gap-6 justify-right">
        <h1 className="text-gray-400 text-3xl cols-span-2">Today`s Highlights</h1>
        {
          weatherData &&
          (
            <>
              <Highlights
              stats={{
                title:"Wind Status",
                value:weatherData.current.wind_mph,
                unit:"mph",
                direction:weatherData.current.wind_dir
               }}
              />

              <Highlights
                stats={{
                  title:"Humidity",
                  value:weatherData.current.humidity,
                  unit:"%",
                 }}
              />
              <Highlights
                stats={{
                  title:"Visibility",
                  value:weatherData.current.vis_miles,
                  unit:"miles",
                 
                 }}
              />
              <Highlights
                stats={{
                  title:"Air Pressure",
                  value:weatherData.current.pressure_mb,
                  unit:"mb",
                  
                 }}
              />
            </>
          )
        }
        
        </div>

       </div>
     </div>
    
  );
}

export default App;
