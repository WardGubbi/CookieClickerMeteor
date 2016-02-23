Meteor.methods({
	insert: function(object) {
		return Boosters.insert(object);
	},
	updateCountAndPrice: function(id, count, currentPrice, currentSelPrice, percentagePrice, optionBuy, optionAmount) {
        //var currentPrice = optionBuy ? currentPrice : currentSellPrice;

        var newPrice = currentPrice + (currentPrice * percentagePrice);

        for(var i = 1; i < optionAmount; i++) //more than 1?
        {
            newPrice = newPrice + (newPrice * percentagePrice);
        }

        roundedPrice = Math.ceil(newPrice);

        return Boosters.update(id, {$set: {count: count, currentPrice: roundedPrice}});
	},
	updateState: function(id, state) {
		return Boosters.update(id, {$set: {state: state}});
	},
	updateNumberOfCookies: function(name, numberOfCookies) {
		return Boosters.update({name: name}, {$set: {numberOfCookies: numberOfCookies}});
	}
});
