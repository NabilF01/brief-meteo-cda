// Configuration
const API_KEY = "149a1d46d1ce59f27a14cef6aec07c9f";
let config = null;

// Charge la configuration depuis conf.json
async function loadConfig() {
  const response = await fetch("./conf.json");
  config = await response.json();
}

// Met à jour l'affichage avec les données météo
function updateDisplay(data) {
  // Mise à jour des textes
  // On extrait juste le nom de la ville (avant la virgule)
  const cityName = config.city.split(",")[0];
  document.querySelector(".city").textContent = cityName;
  document.querySelector(".temperature").textContent = `${Math.round(
    data.main.temp
  )}°`;
  document.querySelector(".description").textContent =
    data.weather[0].description;
  document.querySelector(".feels-like").textContent = `${Math.round(
    data.main.feels_like
  )}°`;
  document.querySelector(".humidity").textContent = `${data.main.humidity}%`;
  document.querySelector(".wind").textContent = `${Math.round(
    data.wind.speed * 3.6
  )} km/h`;

  // Mise à jour de l'icône météo
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
  document.querySelector(".weather-icon").innerHTML = `<img src="${iconUrl}">`;

  // Mise à jour de l'heure
  const time = new Date().toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  document.querySelector(
    ".last-update"
  ).textContent = `Dernière mise à jour: ${time}`;
}

// Récupère les données météo depuis l'API
async function fetchWeatherData() {
  try {
    if (!config) await loadConfig();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${config.city},${config.country}&appid=${API_KEY}&units=metric&lang=fr`;
    const response = await fetch(url);
    const data = await response.json();
    updateDisplay(data);
  } catch (error) {
    document.querySelector(".city").textContent = "Erreur de chargement";
  }
}

// Initialisation
async function init() {
  await loadConfig();
  await fetchWeatherData();
  setInterval(fetchWeatherData, config.updateInterval);
}

init();
