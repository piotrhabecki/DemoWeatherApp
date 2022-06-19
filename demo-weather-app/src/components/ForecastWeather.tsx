interface forecastWeather {
  weather: any[];
}

const ForecastWeather = (props: forecastWeather) => {
  return (
    <div className="weather__box__forecast">
      {props.weather.map((forecast, index) => {
        return (
          <div key={index} className="forecast__element">
            {Math.round(forecast.main["temp"])}
            <img
              src={`http://openweathermap.org/img/w/${props.weather[0].weather[0].icon}.png`}
              alt="weather"
              width={"25px"}
              height={"25px"}
              className="weather__symbol"
            />
          </div>
        );
      })}
    </div>
  );
};

export default ForecastWeather;
