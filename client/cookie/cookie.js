Meteor.subscribe('games');

Template.cookie.helpers({
	game: function() {
		var gameObject = Games.findOne();
		Session.set('game', gameObject);
		return gameObject;
	}
});

Template.cookie.events({
	'click .cookieButton': function() {
		var game = Session.get('game');
		var gameCookiesTotal = game.cookiesTotal + 1;
		var gameCookieBalance = game.cookieBalance + 1;

		Meteor.call('updateTotalCookies', game._id, gameCookiesTotal, gameCookieBalance, function(error, response) {
			if(error) {
				console.log(error.message);
			} else if(response === 1) {
				console.log('added 1 cookie');
			}
		});
	}
});

setInterval(function() {
	var game = Session.get('game');
	game.cookiesTotal += game.cookiesPerSecond;
	game.cookieBalance += game.cookiesPerSecond;
	Meteor.call('updateTotalCookies', game._id, game.cookiesTotal, game.cookieBalance, function(error, response) {
		if(error) {
			console.log(error.message);
		} else if(response === 1) {
			// console.log('Success');
		}
	});
}, 1000);
