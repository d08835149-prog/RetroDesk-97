/* ========================================
   RETRODESK 97 WEATHER
   Powered by Open-Meteo
======================================== */


const cities = {

  seoul: {
    name: "Seoul",
    latitude: 37.5665,
    longitude: 126.9780
  },

  busan: {
    name: "Busan",
    latitude: 35.1796,
    longitude: 129.0756
  },

  incheon: {
    name: "Incheon",
    latitude: 37.4563,
    longitude: 126.7052
  },

  daegu: {
    name: "Daegu",
    latitude: 35.8714,
    longitude: 128.6014
  },

  jeju: {
    name: "Jeju",
    latitude: 33.4996,
    longitude: 126.5312
  }

};


const citySelect =
  document.getElementById(
    "weather-city"
  );

const loading =
  document.getElementById(
    "weather-loading"
  );

const display =
  document.getElementById(
    "weather-display"
  );

const errorMessage =
  document.getElementById(
    "weather-error"
  );

const cityName =
  document.getElementById(
    "weather-city-name"
  );

const temperature =
  document.getElementById(
    "weather-temperature"
  );

const description =
  document.getElementById(
    "weather-description"
  );

const humidity =
  document.getElementById(
    "weather-humidity"
  );

const wind =
  document.getElementById(
    "weather-wind"
  );

const weatherIcon =
  document.getElementById(
    "weather-icon"
  );

const refreshButton =
  document.getElementById(
    "weather-refresh"
  );


function getWeatherInfo(code) {

  if (code === 0) {
    return {
      text: "Clear",
      icon: "☀️"
    };
  }

  if ([1, 2].includes(code)) {
    return {
      text: "Partly Cloudy",
      icon: "🌤️"
    };
  }

  if (code === 3) {
    return {
      text: "Cloudy",
      icon: "☁️"
    };
  }

  if ([45, 48].includes(code)) {
    return {
      text: "Fog",
      icon: "🌫️"
    };
  }

  if (
    [51, 53, 55, 56, 57].includes(code)
  ) {
    return {
      text: "Drizzle",
      icon: "🌦️"
    };
  }

  if (
    [61, 63, 65, 66, 67, 80, 81, 82].includes(code)
  ) {
    return {
      text: "Rain",
      icon: "🌧️"
    };
  }

  if (
    [71, 73, 75, 77, 85, 86].includes(code)
  ) {
    return {
      text: "Snow",
      icon: "🌨️"
    };
  }

  if (
    [95, 96, 99].includes(code)
  ) {
    return {
      text: "Thunderstorm",
      icon: "⛈️"
    };
  }

  return {
    text: "Unknown",
    icon: "🌡️"
  };
}


async function loadWeather() {

  const city =
    cities[citySelect.value];

  if (!city) {
    return;
  }


  loading.hidden =
    false;

  display.hidden =
    true;

  errorMessage.hidden =
    true;


  const url =
    "https://api.open-meteo.com/v1/forecast" +
    `?latitude=${city.latitude}` +
    `&longitude=${city.longitude}` +
    "&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m" +
    "&timezone=Asia%2FSeoul";


  try {

    const response =
      await fetch(url);


    if (!response.ok) {
      throw new Error(
        "Weather request failed."
      );
    }


    const data =
      await response.json();


    const current =
      data.current;


    const info =
      getWeatherInfo(
        current.weather_code
      );


    cityName.textContent =
      city.name;


    temperature.textContent =
      `${Math.round(
        current.temperature_2m
      )}°C`;


    humidity.textContent =
      `${current.relative_humidity_2m}%`;


    wind.textContent =
      `${current.wind_speed_10m} km/h`;


    description.textContent =
      info.text;


    weatherIcon.textContent =
      info.icon;


    loading.hidden =
      true;

    display.hidden =
      false;


  } catch (error) {

    console.error(
      "Weather error:",
      error
    );


    loading.hidden =
      true;

    display.hidden =
      true;

    errorMessage.hidden =
      false;
  }

}


citySelect?.addEventListener(
  "change",
  loadWeather
);


refreshButton?.addEventListener(
  "click",
  loadWeather
);


loadWeather();