// AngularJS Weather App using OpenWeather Data

var weatherCtrlDef = function($scope, $http, getWeather) {

	var openWeatherApiKey = getParamValue('openWeatherApiKey');
	var latitudeLongitude = getParamValue('latitudeLongitude');

	// init using global variables
	getWeather.initWeather(openWeatherApiKey, latitudeLongitude);

	// wrap load function to be called repeatedly
	var load = function(){
		getWeather.load(function (data){
			$scope.weather = data;
		});
	}

	load();

	// refresh data every 15 minutes
	setInterval(load, 15 * 60 * 1000);

};

function getParamValue(paramName) {
    var url = window.location.search.substring(1); //get rid of "?" in querystring
    var qArray = url.split('&'); //get key-value pairs
    for (var i = 0; i < qArray.length; i++)
    {
        var pArr = qArray[i].split('='); //split key and value
        if (pArr[0] == paramName)
            return pArr[1]; //return value
    }
}

var getWeather = function ($http) {

	// view model
	var weatherService = {
		"openWeatherApiKey" : "",
		"latitudeLongitude" : "",
		"weather" : {
			"now" : { "temp" : "N/A", "icon" : "N/A" },
			"today" : { "min" : "N/A", "max" : "N/A" },
			"tomorrow" : { "min" : "N/A", "max" : "N/A" }
		}
	};

	weatherService.initWeather = function (openWeatherApiKey, latitudeLongitude) {

		weatherService.openWeatherApiKey = openWeatherApiKey;
		weatherService.latitudeLongitude = latitudeLongitude;

	};

	parseCurrentData = function (now, weatherService){

		if(typeof now !== 'undefined' && typeof now.temp !== 'undefined' && typeof now.weather[0].icon !== 'undefined'){
			weatherService.weather.now.temp = Math.round(now.temp);
			weatherService.weather.now.icon = 'img/VCloudsWeatherIcons/' + now.weather[0].icon + '.png';
		} else {
			console.log('Cannot parse current data as variable "now" is not defined:');
			console.log(now);
		}

	}

	parseForecastData = function (today, tomorrow, weatherService){

		weatherService.weather.today.min = Math.round(today.temp.min);
		weatherService.weather.today.max = Math.round(today.temp.max);
		weatherService.weather.tomorrow.min = Math.round(tomorrow.temp.min);
		weatherService.weather.tomorrow.max = Math.round(tomorrow.temp.max);

	}

	plot24HourForecast = function (data){

		var colorGrey = "#dcdcdc";

		// internal forecast structure
		var forecastData = {};

		// extract only relevant information
		for (var i in data) {

			var forecast = data[i];

			// TODO: check time zone offset
			forecastData[i] = {
				'hour': new Date(forecast.dt*1000).getHours(),
				'temp': forecast.temp,
				'pop': forecast.pop*100,
				'qpf': (forecast.rain && forecast.snow ? forecast.rain['1h'] + forecast.snow['1h'] : (forecast.rain ? forecast.rain['1h'] : (forecast.snow ? forecast.snow['1h'] : 0)))
			};

		}

		// data sets for graphs per hour (temp, POP, QPF)
		var hours = [];
		var temps = []
		var pops = [];
		var qpfs = [];

		var maxTempForecast = -100;
		var minTempForecast = 100;

		var maxQpfForecast = -100;

		// iterate through next 24 hours, extra data sets per graph and dynamic scale information
		for (var i = 0; i < 24; i++) {

			var forecast = forecastData[i];

			hours[i] = forecast.hour;
			temps[i] = forecast.temp;
			pops[i] = forecast.pop;
			qpfs[i] = forecast.qpf;

			// get max forecast temp value
			if (forecast.temp > maxTempForecast){
				maxTempForecast = forecast.temp;
			}

			// get min forecast temp value
			if (forecast.temp < minTempForecast){
				minTempForecast = forecast.temp;
			}

			// get max forecast qpf value
			if (forecast.qpf > maxQpfForecast){
				maxQpfForecast = forecast.qpf;
			}

		}

		// graphs' data, labels and colors

		// temp
		var dataTemp = {
			labels: hours,
			datasets: [
				{
					borderColor: colorGrey,
					data: temps,
					lineTension: 0
				}
			]
		};

		// POP
		var dataPop = {
			labels: hours,
			datasets: [
				{
					borderColor: colorGrey,
					data: pops,
					lineTension: 0
				}
			]
		};

		// QPF
		var dataQpf = {
			labels: hours,
			datasets: [
				{
					borderColor: colorGrey,
					data: qpfs,
					lineTension: 0
				}
			]
		};

		// graphs' scale and line options

		Chart.defaults.global.animation = false;
		Chart.defaults.global.scaleFontColor= "#fff";

		// temp
		var stepTemp  = (parseInt(maxTempForecast) - parseInt(minTempForecast)) > 6 ? 2 : 1;
		var maxTemp   = parseInt(maxTempForecast) + 2;
		var startTemp = parseInt(minTempForecast) - 2;

		var optionsTemp = {
			legend: {
        display: false
    	},
			scales: {
				yAxes: [{
          ticks: {
            max: maxTemp,
            min: startTemp,
            stepSize: stepTemp,
						fontColor: colorGrey
          }
        }],
				xAxes: [{
					ticks: {
						fontColor: colorGrey,
						maxTicksLimit: 24
					}
				}]
      }

		};

		// POP
		var stepPop  = 20;
		var maxPop   = 100;
		var startPop = 0;

		var optionsPop = {
			legend: {
        display: false
    	},
			scales: {
				yAxes: [{
          ticks: {
            max: maxPop,
            min: startPop,
            stepSize: stepPop,
						fontColor: colorGrey
		      }
		    }],
				xAxes: [{
					ticks: {
						fontColor: colorGrey,
						maxTicksLimit: 24
					}
				}]
      }
		};

		// QPF
		var stepQpf = 0.2;
		var maxQpf = maxQpfForecast + 1;
		var startQpf = 0;

		var optionsQpf = {
			legend: {
        display: false
    	},
			scales: {
				yAxes: [{
          ticks: {
            max: maxQpf,
            min: startQpf,
            stepSize: stepQpf,
						fontColor: colorGrey
		      }
		    }],
				xAxes: [{
					ticks: {
						fontColor: colorGrey,
						maxTicksLimit: 24
					}
				}]
      }
		};

		// canvas HTML elements to plot graphs
		var ctxTemp = document.getElementById("hourlyForecastTemp").getContext("2d");
		var ctxPop = document.getElementById("hourlyForecastPop").getContext("2d");
		var ctxQpf = document.getElementById("hourlyForecastQpf").getContext("2d");

		// plot graphs
		var chartTemp = new Chart(ctxTemp, {type: 'line', data: dataTemp, options: optionsTemp});
		var chartPop = new Chart(ctxPop, {type: 'line', data: dataPop, options: optionsPop});
		var chartQpf = new Chart(ctxQpf, {type: 'line', data: dataQpf, options: optionsQpf});

	}


	// get weather data from Dark Sky service
	weatherService.load = function (callback) {

		var weatherRequest = function() {

			var request = {
				method: 'GET',
				url: 'https://api.openweathermap.org/data/2.5/onecall?appid=' + weatherService.openWeatherApiKey +
					'&lat=' + weatherService.latitudeLongitude.split(',')[0] + '&lon=' + weatherService.latitudeLongitude.split(',')[1] + '&lang=de&exclude=minutely,alerts&units=metric'
			}

			return request;
		}

		var weatherRequestSuccess = function(response){

			var data = response.data;

			// current weather
			var now = data.current;
			parseCurrentData(now, weatherService);

			// weather forecast today and tomorrow
			var today = data.daily[0];
			var tomorrow = data.daily[1];
			parseForecastData(today, tomorrow, weatherService);

			// update user interface
			callback(weatherService.weather);

			// plot 24 hour forecast directly
			// 3 graphs (temperature, percentage of rain - pop, amount of rain - qpfs)
			plot24HourForecast(data.hourly);

		};

		var weatherRequestError = function(response){

			var data = response.data;
	    var status = response.status;

			weatherService.weather = {
				"today" : { "min" : "N/A", "max" : "N/A" },
				"tomorrow" : { "min" : "N/A", "max" : "N/A" }
			};
			console.log(status);
			console.log(data);

		}

		$http(weatherRequest()).
			then(function (response) { weatherRequestSuccess(response); },
			function (response) { weatherRequestError(response); }
		);

	};

	return weatherService;

};

angular.module('weather', []).controller('weatherCtrl', weatherCtrlDef).factory('getWeather', getWeather);
