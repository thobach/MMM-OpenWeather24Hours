# MMM-DarkSky24Hours 
MMM-DarkSky24Hours is a 3rd party module for [MagicMirror](https://github.com/MichMich/MagicMirror) that shows weather information for the next 24 hours. The weather data is retrieved from the Dark Sky API.

The idea of this module is to give you confidence on what to wear when you go outside / to work, or what transport mode you should take (in case you are a good weather-only biker like me) ;) The hourly forecast gives you a good decision basis based on the weather condition at the times you go to work and return home.

## Functionality
* Current temperature and cloudiness
* Temperature forecast for next 24 hours
* Precipitation (rain, snow) forecast for next 24 hours
 * Chance of rain / snow
 * Amount of rain / snow

## Installation
1. Navigate into your MagicMirror's `modules` folder and execute `git clone https://github.com/thobach/MMM-DarkSky24Hours.git`.
2. In order to load the MMM-DarkSky24Hours module you will need to add the following configuration to your `config/config.js` file. As `appid` you need to provide an API secret key from Dark Sky API which you can get from [Dark Sky Developer Portal](https://darksky.net/dev). As `location` you can specify your GPS location in the format [latitude],[longitude], e.g. `37.8267,-122.4233`.
````javascript
modules: [
	{
		module: 'MMM-DarkSky24Hours',
		position: 'top_right',
		config: {
			appid: '',
			location: '',
		}
	},
]
````

## Migration from MMM-WunderGround24Hours
1. Move folder
````bash
cd ~/MagicMirror/modules/
mv MMM-WunderGround24Hours/ MMM-DarkSky24Hours/
````
2. Update to latest version
````bash
git pull
````
3. Adjust config file (see above)