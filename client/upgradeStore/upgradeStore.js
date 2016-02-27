Template.upgradeStore.onCreated(() => {
	Meteor.subscribe('upgrades');
	Meteor.subscribe('boosters');
});

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
			// this query is being run every second :S
			const game = Session.get('game');
			const bought = game && game.upgrades;
			const boosters = Boosters.find({},{fields:{name:1,count:1,numberOfCookies:1}}).fetch();
			return Upgrades.find().fetch()
				// don't return the upgrades that have been bought
				.filter((upgrade) => !bought || !bought.indexOf(upgrade._id))
				// only return the upgrades that are available based on the amount of boosters you have
				.filter((upgrade) => upgrade.prereq < _.find(boosters, (b) => b.name == upgrade.booster).count);
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
