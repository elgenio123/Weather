
import axios from 'axios';
import { useState } from 'react';
import './index';
import SearchIcon from './search.svg'
//lat=${lat}&lon=${lon}
function App() {

  const API_KEY = '54498badff0d51d4ac18e85a9d1a660d';
  const [location, setLocation] = useState("");
  const [data, setData] = useState({});
  const cor_url = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${API_KEY}`;
  


  function searchLocation(event){
    if(event.key ==='Enter')
      axios.get(cor_url).then((response1) =>{
      let lon=response1.data[0].lon;
      let lat=response1.data[0].lat;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&units=imperial&lon=${lon}&appid=${API_KEY}`
      axios.get(url).then((response) =>{
          setData(response.data);
          console.log(data);
      })
    })
  }
  return (
    <div className="app">
       <div className='search'>
        <input placeholder='Enter Location'
        value={location}
        onKeyPress={searchLocation}
        onChange={(event) => setLocation(event.target.value)}/>
        <img src={SearchIcon} alt='search'
        onClick={searchLocation}/>
       </div>
       <div className='container'>
          <div className='top'>
             {data.name ? 
                <div className='location'>
                 <p>{data.name}</p>
                </div>:null
             }
             { data.main ?
               <div className='temp'> 
                  <h1>{data.main.temp.toFixed()}°F</h1>
                </div>:null
             }
             {data.weather ?
                <div className='description'>
                   <p>{data.weather[0].main}</p>
               </div>:null
             } 
          </div> 
          <div className='buttom'>
          { 
            data.main ?
             <div className='feels'>
                <p className='bold'>{data.main.feels_like.toFixed()}°F</p>
                <p>Feels like</p>
             </div>:null
          }
          { 
             data.main ?
              <div className='humidity'>
               <p className='bold'>{data.main.humidity}%</p>
               <p>Humidity</p>
              </div>:null
          }
          {
            data.wind?
              <div className='wind'>
               <p className='bold'>{data.wind.speed} MPH</p>
               <p>Wind Speed</p>
            </div>:null
          }
          </div>
       </div>
    </div>
  );
}

export default App;
