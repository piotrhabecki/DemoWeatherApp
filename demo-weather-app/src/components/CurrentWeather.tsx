interface currentWeather {
  weather: any;
  iconCode: string;
}

const CurrentWeather = (props: currentWeather) => {
  const dateBuilder = (date: Date) => {
    const day = date.toLocaleDateString("default", { weekday: "long" });
    const dayNumber = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.toLocaleString("default", { year: "numeric" });

    return `${day} ${dayNumber} ${month} ${year}`;
  };

  return (
    <>
      <div className="location__box">
        <div className="location">
          {props.weather.name}, {props.weather.sys.country}
        </div>
        <div className="date">{dateBuilder(new Date())}</div>
      </div>
      <div className="weather__box">
        <div className="temp">{Math.round(props.weather.main.temp)}°c</div>
        <div className="weather">
          {props.weather.weather[0].main}{" "}
          <img
            src={`http://openweathermap.org/img/w/${props.iconCode}.png`}
            alt="weather"
            width={"50px"}
            height={"50px"}
            className="weather__symbol"
          />
        </div>
      </div>
    </>
  );
};

export default CurrentWeather;
