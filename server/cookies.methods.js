Meteor.methods({
	updateGameCookiesPerSecond: function(id, cookiesPerSecond) {
		return Games.update(id, {$set: {cookiesPerSecond: cookiesPerSecond}});
	},
	updateTotalCookies: function(id, cookiesTotal, cookieBalance) {
		return Games.update(id, {$set: {cookiesTotal: cookiesTotal, cookieBalance: cookieBalance}});
	},
	reduceBalanceCookies: function(id, cookieBalance) {
		return Games.update(id, {$set: {cookieBalance: cookieBalance}});
	},
	updateBoughtUpgrades: function(id, upgrade) {
		return Games.update(id, {$push: {upgrades: upgrade}});
	}
});
