Module.register("MMM-WunderGround24Hours",{

    // Override dom generator.
    getDom: function() {
        var wrapper = document.createElement("iframe");
        // register function that adjusts size of iframe to content upload initial load
        wrapper.onload = function (obj){
        	obj.target.style.height = obj.target.contentWindow.document.body.scrollHeight + 'px';
        }
        wrapper.src = this.file('/public/weather.html?weatherUndergroundApiKey=' + this.config.appid + '&weatherStation=' + this.config.location);
        wrapper.style.border = 'none';
        return wrapper;
    }
});