Template.boosterArray.onCreated(() => {
	Meteor.subscribe('boosters');
});

Template.boosterArray.helpers({
	booster(boosterName) {
		var numberOfBoosters = [];
		var booster = Boosters.find({'name': boosterName}).fetch();
		for(var i = 0; i < booster.length; i++) {
			for(var j = 0; j < booster[i].count; j++) {
				numberOfBoosters.push({imgTag: booster[i].imgTag})
			}
		}
		return numberOfBoosters;
	}
});