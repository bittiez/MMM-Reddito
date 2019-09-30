Module.register("MMM-Reddito",{
	// Default module config.
	defaults: {
		updateInterval: 120000,
		headerText: "Reddito"
	},

	requiresVersion: "2.1.0",

	start: function() {
		var self = this;
		var dataNotification = null;

		// Schedule update timer.
		this.getData();
		setInterval(function() {
			self.updateDom();
		}, this.config.updateInterval);
	},

	// getScripts: function() {
	// 	return [
	// 		'',
	// 	]
	// },

	getStyles: function() {
		return [
			this.file('style.css'), // this file will be loaded straight from the module folder.
		]
	},

	getData: function() {
		var self = this;
		this.sendSocketNotification("MMM-Reddito-DATA_CHANGE", null);
	},

	scheduleUpdate: function(delay) {
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}
		nextLoad = nextLoad ;
		var self = this;
		setTimeout(function() {
			self.getData();
		}, nextLoad);
	},

	socketNotificationReceived: function (notification, payload) {
		var self = this;
		if(notification === "MMM-Reddito-DATA_CHANGE") {
			self.updateDom(self.config.animationSpeed);
		}
	},

	// Override dom generator.
	getDom: function() {
		var self = this;
		var wrapper = document.createElement("div");
		var wotd = document.createElement("div");
		wotd.setAttribute('class', 'reddito-title');
		var headerLabel = document.createElement("header");
		headerLabel.setAttribute('class', 'reddito-header module-header');
		headerLabel.innerHTML = "<span style=\"text-decoration: underline;\">" + this.config.headerText + "</span>";
		var summary = document.createElement("span");
		summary.setAttribute('class', 'reddito-summary');
		if(this.dataNotification != null){

		}
		wrapper.appendChild(headerLabel);
		wrapper.appendChild(wotd);
		wrapper.appendChild(summary);
		return wrapper;
	},
});
