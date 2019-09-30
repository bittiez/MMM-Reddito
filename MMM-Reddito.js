Module.register("MMM-Reddito",{
	// Default module config.
	defaults: {
		updateInterval: 120000,
		headerText: "Reddito",
		subreddit: "news",
		sortby: "hot", //hot, new, or top
		showCount: "5", //Max 25
		width: "700px",
	},

	requiresVersion: "2.1.0",

	start: function() {
		var self = this;
		var theData = null;
		this.uid = Math.floor((Math.random() * 10000) + 1);
		// Schedule update timer.
		this.getData();
		setInterval(function() {
			self.updateDom();
		}, this.config.updateInterval);
	},

	getScripts: function() {
		return [
			'xml2json.min.js',
		]
	},

	getStyles: function() {
		return [
			this.file('style.css'), // this file will be loaded straight from the module folder.
		]
	},

	getData: function() {
		this.sendSocketNotification("MMM-Reddito-DATA_CHANGE", {id: this.uid, config: this.config});
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

	socketNotificationReceived: function (notification, infoRecv) {
		var self = this;
		if(notification === "MMM-Reddito-DATA_CHANGE") {
			var payload = infoRecv.config;
			var id = infoRecv.id;
			if(id == this.uid){
				var x2js = new X2JS();
				var jsonObj = x2js.xml_str2json( payload );
				self.theData = jsonObj.feed;
				self.updateDom();
			}
		}
	},

	// Override dom generator.
	getDom: function() {
		var self = this;
		var wrapper = document.createElement("div");
		wrapper.style.minWidth = this.config.width;
		wrapper.style.maxWidth = this.config.width;

		var title = document.createElement("div");
		title.setAttribute('class', 'reddito-title');

		var headerLabel = document.createElement("header");
		headerLabel.setAttribute('class', 'reddito-header module-header');

		headerLabel.innerHTML = "<span style=\"text-decoration: underline;\">" + this.config.headerText + "</span>";

		var summary = document.createElement("span");
		summary.setAttribute('class', 'reddito-summary');

		if(this.theData != null){
			var entry;
			for (var i = 0; i < this.config.showCount; i++) {
				entry = document.createElement("span");
				entry.setAttribute('class', 'reddito-entry');
				entry.innerHTML = this.theData.entry[i].title;
				summary.appendChild(entry);
			}
		}
		wrapper.appendChild(headerLabel);
		wrapper.appendChild(title);
		wrapper.appendChild(summary);
		return wrapper;
	},
});
