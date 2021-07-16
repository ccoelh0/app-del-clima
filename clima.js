//api del clima

const API_KEY = "7d22f4bccec5751aace886d1d8c02ba1";

//fetchData recibe la ubicacion del usuario
const fetchData = (position) => {
  // latitud y longitud, la info que nos da el navegador, va a ser igual a las cordenadas de la posicion
  const { latitude, longitude } = position.coords;
  //en fetch vamos a reemplazar los valores que quiero utilizar
  fetch(
    `    http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
  )
    //then es lo que va a pasar cuando tenemos la respuesta

    //response se pasa como json para pasarlo a data y que nos de la info del usuario
    .then((response) => response.json())

    //vamos a mostrarle la info al usuario con la funcion setWeatherData(data a mostrar)
    .then((data) => setWeatherData(data));
};

//funcion para mostrar la data al usuario

const setWeatherData = (data) => {
  console.log(data);
  //se junta toda la info en una variable
  const weatherData = {
    location: data.name,
    //en description va como esta el clima entonces elegir el primer objeto del array weather
    description: data.weather[0].main,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    temperature: data.main.temp,
    date: getDate(),
  };

  //ahora se coneccta las keys (o sea la info) con el html

  Object.keys(weatherData).forEach((key) => {
    document.getElementById(key).textContent = weatherData[key];
  });

  cleanUp();
};

//funcion del coso para esperar

const cleanUp = () => {
  let container = document.getElementById("container");
  let loader = document.getElementById("loader");

  loader.style.display = "none";
  container.style.display = "flex";
};

//obtener informacion acerca del dia (date)
const getDate = () => {
  let date = new Date();

  // 0 + (date + 1). slice es para que si tiene un solo caracter le sume un 1, y si tiene 2 le reste 1
  return `${date.getDate()}/${("0" + (date.getMonth() + 1)).slice(
    -2
  )}/${date.getFullYear()}`;
};

//funcion onload que va traer la ubicacion del usuario
const onLoad = () => {
  //
  navigator.geolocation.getCurrentPosition(fetchData);
};
