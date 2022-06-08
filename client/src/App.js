import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import useGeoLocation from "./hooks/useGeoLocation";
import { useEffect,useState } from "react";

const weather_api_key = "7d2b0196a91d8549991cb66ad004cd9a";
const base_weather_url ="https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}";
function App() {
  const [long1, setLong1] = useState("");
  const [lat1, setLat1] = useState("");
  const [weather, setweather] = useState(null);


  const location = useGeoLocation();
  
  const latitude = location.loaded
    ? JSON.stringify(location.coordinates.lat)
    : "Location data not available yet.";
  const longitude = location.loaded
    ? JSON.stringify(location.coordinates.lng)
    : "Location data not available yet.";
  
  
  
  useEffect(() => {
    const fetchAPI = async () => {
      try {
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weather_api_key}`;
          const response = await fetch(url);
          const responseJSON = await response.json();
          if(response.ok){
            setweather(responseJSON);
            console.log(weather)
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchAPI();
    }, [longitude]);

  return (
    <div>
      <div className="col-md-12">
        <div className="weatherBg">
          <div className="head">
            <h1 className="heading">SENSE</h1>
            <h1>
              <span className="heading-span">&#176;</span>
            </h1>
          </div>

          <div className="tempdiv">
            <p>City</p>
            <h1>30 C</h1>
          </div>

          {/* <div className="message ">
            <p>
              {latitude}
              <br />
              {longitude}
            </p>
          </div> */}

          <div className="prop-cont">
            <div className="tempdiv2">
              <h1>...</h1>
              <p>Feels Like</p>
            </div>
            <div className="tempdiv2">
              <h1>...</h1>
              <p>Humidity</p>
            </div>
            <div className="tempdiv2">
              <h1>...</h1>
              <p>Wind Speed</p>
            </div>
            <div className="tempdiv2">
              <h1>...</h1>
              <p>Pressure</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
