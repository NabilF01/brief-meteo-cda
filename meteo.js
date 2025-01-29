// Configuration et variables globales
let config = null;
const API_KEY = "149a1d46d1ce59f27a14cef6aec07c9f"; // Clé API OpenWeatherMap

// Fonction pour charger la configuration depuis conf.json
async function loadConfig() {
  try {
    console.log("Chargement de la configuration...");
    const response = await fetch("./conf.json");
    config = await response.json();
    console.log("Configuration chargée:", config);
    return config;
  } catch (error) {
    console.error("Erreur lors du chargement de la configuration:", error);
  }
}

// Fonction pour mettre à jour l'affichage avec les données météo
function updateDisplay(weatherData) {
  console.log("Mise à jour de l'affichage avec les données:", weatherData);

  // Mise à jour de la ville
  document.querySelector(".city").textContent = "Laval";

  // Mise à jour de la température (déjà en Celsius grâce à units=metric)
  const tempCelsius = Math.round(weatherData.main.temp);
  document.querySelector(".temperature").textContent = `${tempCelsius}°`;

  // Mise à jour de la description
  document.querySelector(".description").textContent =
    weatherData.weather[0].description;

  // Mise à jour des détails
  const feelsLike = Math.round(weatherData.main.feels_like);
  document.querySelector(".feels-like").textContent = `${feelsLike}°`;
  document.querySelector(
    ".humidity"
  ).textContent = `${weatherData.main.humidity}%`;
  const windKmh = Math.round(weatherData.wind.speed * 3.6);
  document.querySelector(".wind").textContent = `${windKmh} km/h`;

  // Mise à jour de l'icône
  const iconCode = weatherData.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  const iconImg = document.createElement("img");
  iconImg.src = iconUrl;
  const weatherIcon = document.querySelector(".weather-icon");
  weatherIcon.innerHTML = "";
  weatherIcon.appendChild(iconImg);

  // Mise à jour de l'heure de dernière mise à jour
  const now = new Date();
  const timeString = now.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  document.querySelector(
    ".last-update"
  ).textContent = `Dernière mise à jour: ${timeString}`;
}

// Fonction pour récupérer les données météo
async function fetchWeatherData() {
  try {
    if (!config) {
      await loadConfig();
    }

    console.log("Récupération des données météo pour:", config.city);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      config.city
    )},${config.country}&appid=${API_KEY}&units=metric&lang=fr`;
    console.log("URL de l'API:", url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log("Données météo reçues:", data);
    updateDisplay(data);
  } catch (error) {
    console.error("Erreur lors de la récupération des données météo:", error);
    document.querySelector(".city").textContent = "Erreur de chargement";
  }
}

// Fonction d'initialisation
async function init() {
  console.log("Initialisation de l'application...");
  await loadConfig();
  await fetchWeatherData();

  // Mise à jour périodique
  setInterval(fetchWeatherData, config.updateInterval);
}

// Démarrage de l'application
init();
