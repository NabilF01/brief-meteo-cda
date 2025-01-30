# Application Météo Transport

Application web affichant en temps réel les conditions météorologiques pour la ville de Laval.

## Fonctionnalités

- Température actuelle
- Description des conditions météo
- Température ressentie
- Taux d'humidité
- Vitesse du vent
- Mise à jour automatique toutes les heures

## Installation

1. Clonez le repository
2. Configurez votre ville dans `conf.json`
3. Ouvrez `index.html` dans votre navigateur

## Configuration

Le fichier `conf.json` contient :

```json
{
  "city": "Laval,53000",
  "country": "FR",
  "updateInterval": 3600000
}
```

## Technologies utilisées

- HTML5
- CSS3
- JavaScript (ES6+)
- API OpenWeatherMap

## Structure du projet

```
├── index.html    # Structure de l'application
├── style.css     # Styles et mise en page
├── meteo.js      # Logique et appels API
├── conf.json     # Configuration
└── README.md     # Documentation
```
