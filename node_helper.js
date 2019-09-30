/* Magic Mirror
 * Node Helper: MMM-Reddito
 *
 * By bittiez
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
var request = require('request');


module.exports = NodeHelper.create({

	// Override socketNotificationReceived method.

	/* socketNotificationReceived(notification, payload)
	 * This method is called when a socket notification arrives.
	 *
	 * argument notification string - The identifier of the noitication.
	 * argument payload mixed - The payload of the notification.
	 */
	socketNotificationReceived: function(notification, payload) {
		var self = this;
		if (notification === "MMM-Reddito-DATA_CHANGE") {
			var urlApi = "https://reddit.com/r/" + payload.subreddit + "/" + payload.sortby + "/.rss";

			request({ url: urlApi, method: 'GET' }, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					var result = body;
					self.sendNotificationUpdate(result);
				} else if (error) {
					console.log(error);
				}
			});
		}
	},

	// Example function send notification test
	sendNotificationUpdate: function(payload) {
		this.sendSocketNotification("MMM-Reddito-DATA_CHANGE", payload);
	},
});