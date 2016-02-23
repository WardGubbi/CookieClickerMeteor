Meteor.subscribe('upgrades');
Meteor.subscribe('boosters');
let bought = [];
let game = Session.get('game');
var boosters = {};
var numberOfCookies = {};

Template.upgradeStore.helpers({
		balance: function () {
			return Session.get('game').cookieBalance;
		},
		upgrades: function () {
			return Upgrades.find();
		},
		availableUpgrades: function () {
			game = Session.get('game');
			var bought = game.upgrades;

			boosters = {
				cursor: Boosters.findOne({'name': 'Cursor'}).count,
				grandma: Boosters.findOne({'name': 'Grandma'}).count,
				farm: Boosters.findOne({'name': 'Farm'}).count,
				mine: Boosters.findOne({'name': 'Mine'}).count,
				bank: Boosters.findOne({'name': 'Bank'}).count
			};

			numberOfCookies = {
				cursor: Boosters.findOne({'name': 'Cursor'}).numberOfCookies,
				grandma: Boosters.findOne({'name': 'Grandma'}).numberOfCookies
			};

			console.log(boosters);
			if (bought && bought.length)
				return Upgrades.find({
					"$and": [{
						"$or": [
							{"$and": [{"booster": "Cursor"}, {"prereq": {$lte: boosters.cursor}}]},
							{"$and": [{"booster": "Grandma"}, {"prereq": {$lte: boosters.grandma}}]},
							{"$and": [{"booster": "Farm"}, {"prereq": {$lte: boosters.farm}}]},
							{"$and": [{"booster": "Mine"}, {"prereq": {$lte: boosters.mine}}]},
							{"$and": [{"booster": "Bank"}, {"prereq": {$lte: boosters.bank}}]}


						]
					}, {"_id": {"$nin": game.upgrades}}
					]
				});
			else
				return Upgrades.find({
					"$or": [
						{"$and": [{"booster": "Cursor"}, {"prereq": {$lte: boosters.cursor}}]},
						{"$and": [{"booster": "Grandma"}, {"prereq": {$lte: boosters.grandma}}]},
						{"$and": [{"booster": "Farm"}, {"prereq": {$lte: boosters.farm}}]},
						{"$and": [{"booster": "Mine"}, {"prereq": {$lte: boosters.mine}}]},
						{"$and": [{"booster": "Bank"}, {"prereq": {$lte: boosters.bank}}]}
					]
				});
		}
});

Template.upgradeStore.events({
	'click img': function () {
		let balance = Session.get('game').cookieBalance;

		if (balance >= this.price) {

			Meteor.call('reduceBalanceCookies', game._id, balance - this.price, function (error, response) {
				if (error) {
					console.log(error.message);
				} else if (response === 1) {
					console.log('bought upgrade');
				}
			});

			switch (this.booster) {
				case 'Cursor':
					switch (this.type) {
						case 'multiplier':
							Cursorefficiency *= this.boost;
							var oldCookiesPerSecond = game.cookiesPerSecond - (boosters.cursor * numberOfCookies.cursor);
							var newCookiesPerSecond = oldCookiesPerSecond + (boosters.cursor * (numberOfCookies.cursor * this.boost));
							Meteor.call('updateGameCookiesPerSecond', game._id, newCookiesPerSecond, function (error, response) {
								if (error) {
									console.log(error.message);
								} else if (response === 1) {
									console.log('Double efficiency!');
								}
							});

							var newNumberOfCookies = numberOfCookies.cursor * this.boost;
							Meteor.call('updateNumberOfCookies', 'Cursor', newNumberOfCookies, function (error, response) {
								if (error) {
									console.log(error.message);
								} else if (response === 1) {
									console.log('Updated number of cookies!');
								}
							});
							break;
						case 'gain':
							Cursorefficiency += this.boost;
							var oldCookiesPerSecondGain = game.cookiesPerSecond - (boosters.cursor * numberOfCookies.cursor);
							var newCookiesPerSecondGain = oldCookiesPerSecondGain + (boosters.cursor * (numberOfCookies.cursor + this.boost));
							Meteor.call('updateGameCookiesPerSecond', game._id, newCookiesPerSecondGain, function (error, response) {
								if (error) {
									console.log(error.message);
								} else if (response === 1) {
									console.log('Boosted efficiency!');
								}
							});

							var newNumberOfCookiesGain = numberOfCookies.cursor + this.boost;
							Meteor.call('updateNumberOfCookies', 'Cursor', newNumberOfCookiesGain, function (error, response) {
								if (error) {
									console.log(error.message);
								} else if (response === 1) {
									console.log('Updated number of cookies!');
								}
							});
							break;
					}
					break;
				case 'Grandma':
					efficiency = GrandmaEfficiency;
					switch (this.type) {
						case 'multiplier':
							GrandmaEfficiency *= this.boost;
							var oldCookiesPerSecondGrandma = game.cookiesPerSecond - (boosters.grandma * numberOfCookies.grandma);
							var newCookiesPerSecondGrandma = oldCookiesPerSecondGrandma + (boosters.grandma * (numberOfCookies.grandma * this.boost));
							Meteor.call('updateGameCookiesPerSecond', game._id, newCookiesPerSecondGrandma, function (error, response) {
								if (error) {
									console.log(error.message);
								} else if (response === 1) {
									console.log('Double efficiency!');
								}
							});

							var newNumberOfCookiesGrandma = numberOfCookies.grandma * this.boost;
							Meteor.call('updateNumberOfCookies', 'Grandma', newNumberOfCookiesGrandma, function (error, response) {
								if (error) {
									console.log(error.message);
								} else if (response === 1) {
									console.log('Updated number of cookies!');
								}
							});
							break;
						case 'gain':
							GrandmaEfficiency += this.boost;
							var oldCookiesPerSecondGrandmaGain = game.cookiesPerSecond - (boosters.grandma * numberOfCookies.grandma);
							var newCookiesPerSecondGrandmaGain = oldCookiesPerSecondGrandmaGain + (boosters.grandma * (numberOfCookies.grandma + this.boost));
							Meteor.call('updateGameCookiesPerSecond', game._id, newCookiesPerSecondGrandmaGain, function (error, response) {
								if (error) {
									console.log(error.message);
								} else if (response === 1) {
									console.log('Boosted efficiency!');
								}
							});

							var newNumberOfCookiesGrandmaGain = numberOfCookies.grandma + this.boost;
							Meteor.call('updateNumberOfCookies', 'Cursor', newNumberOfCookiesGrandmaGain, function (error, response) {
								if (error) {
									console.log(error.message);
								} else if (response === 1) {
									console.log('Updated number of cookies!');
								}
							});
							break;
					}
					break;
			}

			Meteor.call('updateBoughtUpgrades', game._id, this._id, function (error, response) {
				if (error) {
					console.log(error.message);
				} else if (response === 1) {
					console.log('bought upgrade');
				}
			});
		}
		else {
			alert('Not enough cookies yet, keep clicking');
		}
	}
});
