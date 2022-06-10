import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import useGeoLocation from "./hooks/useGeoLocation";
import { useEffect, useState } from "react";
import LoadingAnimation from "./components/Loading/loadingAnimation";

const weather_api_key = "7d2b0196a91d8549991cb66ad004cd9a";
const base_weather_url =
  "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}";

function App() {
  const [weather, setweather] = useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  // console.log("🚀 ~ file: App.js ~ line 55 ~ getPokemon ~ res", weather.wind? alert("wind hai"):alert("wind nahi hai"));
  // const location = useGeoLocation();

  // const getLocation = () => {
  //   const latitude = location.loaded
  //     ? JSON.stringify(location.coordinates.lat)
  //     : "Location data not available yet.";
  //     setLat(latitude)

  //     const longitude = location.loaded
  //     ? JSON.stringify(location.coordinates.lng)
  //     : "Location data not available yet.";
  //     setLng(longitude)

  // };

  const getLocation = () => {
    try {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus("hogya");
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    } catch {
      setStatus("Geolocation is not supported by your browser");
    }
    // }
  };

  useEffect(() => {
    const fetchPokemon = async () => {
        getLocation();
        // const url = `https://api.openweathermap.org/data/2.5/weather?lat=24.8686444&lon=67.0821597&appid=7d2b0196a91d8549991cb66ad004cd9a`;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=7d2b0196a91d8549991cb66ad004cd9a&units=metric`;
        const data = await fetch(url);
        const res = await data.json();
        setweather(res);
        console.log(
          "🚀 ~ file: App.js ~ line 107 ~ getPokemon ~ getLocation",
         res
        );
    };
    // fetchPokemon();
  }, [lng && lat && status === "hogya"]);


  // useEffect(() => {
  //   const fetchPokemon = () => {
  //     const getPokemon = async () => {
  //       getLocation();
  //       // const url = `https://api.openweathermap.org/data/2.5/weather?lat=24.8686444&lon=67.0821597&appid=7d2b0196a91d8549991cb66ad004cd9a`;
  //       const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=7d2b0196a91d8549991cb66ad004cd9a&units=metric`;
  //       const data = await fetch(url);
  //       const res = await data.json();
  //       setweather(res);
  //       console.log(
  //         "🚀 ~ file: App.js ~ line 107 ~ getPokemon ~ getLocation",
  //        res
  //       );
  //     };
  //     getPokemon();
  //   };
  //   fetchPokemon();
  // }, [lng && lat && status === "hogya"]);

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

          {weather && weather.name ? (<div className="tempdiv">
            <p> {weather.name}</p>
            <h1>{weather.main.temp}&#176;</h1>
          </div>)
          :
          (<div className="tempdiv">
          <p>City</p>
          <h1><LoadingAnimation/></h1>
        </div>)}

          {weather && weather.coord ? (
            <div className="message ">
              <p>
                Latitude: {weather.coord.lat}
                <br />
                Longitude: {weather.coord.lon}
              </p>
            </div>
          ) : (
            <div className="message ">
              <p>
               Loading data
              </p>
               <LoadingAnimation/>
            </div>
          ) }

          {weather && weather.wind ? (
            <div className="prop-cont">
              <div className="tempdiv2">
                <h1>{weather.main.feels_like}&#176;</h1>
                <p>Feels Like</p>
              </div>
              <div className="tempdiv2">
                <h1>{weather.main.humidity}%</h1>
                <p>Humidity</p>
              </div>
              <div className="tempdiv2">
                <h1>{`${weather.wind.speed} m/s`}</h1>
                <p>Wind Speed</p>
              </div>
              <div className="tempdiv2">
                <h1>{weather.main.pressure} mb</h1>
                <p>Pressure</p>
              </div>
            </div>
          ) : (
            <div className="prop-cont">
              <div className="tempdiv2">
                <h1><LoadingAnimation/></h1>
                <p>Feels Like</p>
              </div>
              <div className="tempdiv2">
                <h1><LoadingAnimation/></h1>
                <p>Humidity</p>
              </div>
              <div className="tempdiv2">
                <h1><LoadingAnimation/></h1>
                <p>Wind Speed</p>
              </div>
              <div className="tempdiv2">
                <h1><LoadingAnimation/></h1>
                <p>Pressure</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
