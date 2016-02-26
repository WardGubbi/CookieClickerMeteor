Template.boosterStore.onCreated(() => {
	Meteor.subscribe('boosters');
});

$('.product').tooltip({html: true});

Template.boosterStore.helpers({
	boosters: function() {
        var boosters = Boosters.find(),
            boostersArray = boosters.fetch();

        for (i = 0; i < boostersArray.length; i++)
        {
            Session.set(boostersArray[i].name, boostersArray[i].currentPrice);
        }

		return boosters;
	},
    getSessionCurrentPrice: function(boosterName)
    {
       return Session.get(boosterName);
    }
});

Template.boosterStore.events({
	'click .product': function(event) {
		var counter = this.count,
            optionAmount = Session.get("optionAmount"),
            optionBuy = Session.get("optionBuy"),
            gameObject = Session.get('game');

		if((optionBuy && gameObject.cookieBalance - this.currentPrice >= 0) || (!optionBuy && counter - optionAmount >= 0)) { //buy and enough money or sell and enough boosters?



            if(optionBuy) { //buy or sell?
                gameObject.cookiesPerSecond += this.numberOfCookies * optionAmount;
                gameObject.cookieBalance -= this.currentPrice;
                counter += optionAmount;
            } else {
                gameObject.cookiesPerSecond -= this.numberOfCookies * optionAmount;
                gameObject.cookieBalance += this.currentPrice;
                counter -= optionAmount;
            }

			Meteor.call('updateCountAndPrice', this._id, counter, this.currentPrice, this.currentSellPrice, this.percentagePrice, optionBuy, optionAmount, function(error, response) {
				if(error) {
					console.log(error.message);
				} else if(response === 1){
					console.log('Success updating the count and price of a booster');


					Meteor.call('updateGameCookiesPerSecond', gameObject._id, gameObject.cookiesPerSecond, function(error, response) {
						if(error) {
							console.log(error.message);
						} else if(response === 1) {
							console.log('Success updating the cookies per second');
						} else {
							console.log('Failed');
						}
					});

					Meteor.call('reduceBalanceCookies', gameObject._id, gameObject.cookieBalance, function(error, response) {
						if(error) {
							console.log(error.message);
						} else if(response === 1) {
							console.log('Success updating the balance');
						}
					});
				} else {
					console.log('Failed');
				}
			});
		} else {
			console.log('Not enough COOKIES!');
		}
	}
});
