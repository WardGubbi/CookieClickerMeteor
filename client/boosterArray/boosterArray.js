Template.boosterArray.onCreated(() => {
	Meteor.subscribe('boosters');
});

Template.boosterArray.helpers({
	cursorBooster: function(event) {
		var numberOfBoosters = [];
		var booster = Boosters.find({'name': 'Cursor'}).fetch();
		for(var i = 0; i < booster.length; i++) {
			for(var j = 0; j < booster[i].count; j++) {
				numberOfBoosters.push({imgTag: booster[i].imgTag})
			}
		}
		return numberOfBoosters;
	},
	grandmaBooster: function(event) {
		var numberOfBoosters = [];
		var booster = Boosters.find({'name': 'Grandma'}).fetch();
		for(var i = 0; i < booster.length; i++) {
			for(var j = 0; j < booster[i].count; j++) {
				numberOfBoosters.push({imgTag: booster[i].imgTag})
			}
		}
		return numberOfBoosters;
	},
	farmBooster: function(event) {
		var numberOfBoosters = [];
		var booster = Boosters.find({'name': 'Farm'}).fetch();
		for(var i = 0; i < booster.length; i++) {
			for(var j = 0; j < booster[i].count; j++) {
				numberOfBoosters.push({imgTag: booster[i].imgTag})
			}
		}
		return numberOfBoosters;
	},
	mineBooster: function(event) {
		var numberOfBoosters = [];
		var booster = Boosters.find({'name': 'Mine'}).fetch();
		for(var i = 0; i < booster.length; i++) {
			for(var j = 0; j < booster[i].count; j++) {
				numberOfBoosters.push({imgTag: booster[i].imgTag})
			}
		}
		return numberOfBoosters;
	},
	bankBooster: function(event) {
		var numberOfBoosters = [];
		var booster = Boosters.find({'name': 'Bank'}).fetch();
		for(var i = 0; i < booster.length; i++) {
			for(var j = 0; j < booster[i].count; j++) {
				numberOfBoosters.push({imgTag: booster[i].imgTag})
			}
		}
		return numberOfBoosters;
	}
});
