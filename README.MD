[![Total alerts](https://img.shields.io/lgtm/alerts/g/thobach/MMM-OpenWeather24Hours.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/thobach/MMM-OpenWeather24Hours/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/thobach/MMM-OpenWeather24Hours.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/thobach/MMM-OpenWeather24Hours/context:javascript)

# MMM-OpenWeather24Hours
MMM-OpenWeather24Hours is a 3rd party module for [MagicMirror](https://github.com/MichMich/MagicMirror) that shows weather information for the next 24 hours. The weather data is retrieved from the OpenWeather API.

The idea of this module is to give you confidence on what to wear when you go outside / to work, or what transport mode you should take (in case you are a good weather-only biker like me) ;) The hourly forecast gives you a good decision basis based on the weather condition at the times you go to work and return home.

## Functionality
* Current temperature and cloudiness
* Temperature forecast for next 24 hours
* Precipitation (rain, snow) forecast for next 24 hours
 * Chance of rain / snow
 * Amount of rain / snow

## Installation
1. Navigate into your MagicMirror's `modules` folder and execute `git clone https://github.com/thobach/MMM-OpenWeather24Hours.git`.
2. In order to load the MMM-OpenWeather24Hours module you will need to add the following configuration to your `config/config.js` file. As `appid` you need to provide an API secret key from OpenWeather API which you can get from [OpenWeather Developer Portal](https://home.openweathermap.org/api_keysv). As `location` you can specify your GPS location in the format [latitude],[longitude], e.g. `37.8267,-122.4233`.
````javascript
modules: [
	{
		module: 'MMM-OpenWeather24Hours',
		position: 'top_right',
		config: {
			appid: '',
			location: '',
		}
	},
]
````
3. Disable CORS
In order to load the OpenWeather API from the browser without the need of a Node_Helper you will need to allow Electron to ignore the CORS rules. Add the following configuration to your `config/config.js` file, e.g. below the `modules` property..
````javascript
electronOptions: {
    webPreferences: {
        webSecurity: false
    }
}
````
See also https://forum.magicmirror.builders/topic/9222/mmm-nest-status-new-module-for-your-nest-thermostats-and-protect-smoke-detectors/23 for an example.

## Migration from MMM-DarkSky24Hours
1. Move folder
````bash
cd ~/MagicMirror/modules/
mv MMM-DarkSky24Hours/ MMM-OpenWeather24Hours/
````
2. Update to latest version
````bash
git pull
````
3. Adjust config file (see above)
