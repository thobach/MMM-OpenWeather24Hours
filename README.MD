# MMM-WunderGround24Hours 
MMM-WunderGround24Hours is a 3rd party module for [MagicMirror](https://github.com/MichMich/MagicMirror) that shows weather information for the next 24 hours. The weather data is mainly sourced private weather stations that are connected to Wunderground.

The idea of this module is to give you confidence on what to wear when you go outside / to work, or what transport mode you should take (in case you are a good weather-only biker like me) ;) The hourly forecast gives you a good decision basis based on the weather condition at the times you go to work and return home.

## Functionality
* Current temperature and cloudiness
* Temperature forecast for next 24 hours
* Precipitation (rain, snow) forecast for next 24 hours
 * Chance of rain / snow
 * Amount of rain / snow

## Installation
1. Navigate into your MagicMirror's `modules` folder and execute `git clone https://github.com/thobach/MMM-WunderGround24Hours.git`.
2. In order to load the MMM-WunderGround24Hours module you will need to add the following configuration to your `config/config.js` file. As `appid` you need to provide an API key from WunderGround which you can get from [WunderGround Developer Portal](https://www.wunderground.com/weather/api/). As `location` you can lookup a close by personal weather station at WeatherUnderground's [WunderMap](https://www.wunderground.com/wundermap) and copy the station ID, e.g. `IDRESDEN88`.
````javascript
modules: [
	{
		module: 'MMM-WunderGround24Hours',
		position: 'top_right',
		config: {
			appid: '',
			location: '',
		}
	},
]
````
