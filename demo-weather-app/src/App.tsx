import { useState } from "react";
import CurrentWeather from "./components/CurrentWeather";
import ForecastWeather from "./components/ForecastWeather";

const api = {
  key: "2810649b03b996895b1905ff6b123c96",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState<any>();
  const [forecast, setForecast] = useState<any[]>();
  const [iconCode, setIconCode] = useState("");
  const [conditions, setConditions] = useState("");

  const fetchWeather = () => {
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("Something went wrong");
    })
    .then((result) => {
      setWeather(result);
      setIconCode(result.weather[0].icon);
      if (result.weather[0].main === "Rain") {
        setConditions("rain");
      } else if (result.main.temp > 10) {
        setConditions("warm");
      } else {
        setConditions("cold");
      }

      setQuery("");
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
  }

  const fetchForecast = () => {
    fetch(`${api.base}forecast?q=${query}&units=metric&appid=${api.key}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("Something went wrong");
    })
    .then((result) => {
      setForecast(result.list.slice(0, 6));
      console.log(result.list.slice(0, 6))
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
  }

  const search = (event: any) => {
    if (event.key === "Enter") {
      fetchWeather()
      fetchForecast()
    }
  };

  return (
    <div className={`app ${conditions}`}>
      <main>
        <div className="search__box">
          <input
            type="text"
            className="saerchbar"
            placeholder="Search for city..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather != "undefined" && typeof forecast != "undefined" ? (
          <>
          <CurrentWeather weather={weather} iconCode={iconCode} />

          <div className="next__day__info">Next days: </div>
          
          <ForecastWeather weather={forecast}/>
          </>
        ) : (
          <></>
        )}
        <a href="https://testquest.vercel.app/" className="scrool__down">
          Test Quest
        </a>
      </main>
    </div>
  );
}

/* add attribut: <a href='https://www.freepik.com/vectors/mountain-river'>Mountain river vector created by jcomp - www.freepik.com</a> */
/* <a href='https://www.freepik.com/vectors/iceland'>Iceland vector created by upklyak - www.freepik.com</a> */
/* <a href='https://www.freepik.com/vectors/parallax'>Parallax vector created by upklyak - www.freepik.com</a> */

export default App;
