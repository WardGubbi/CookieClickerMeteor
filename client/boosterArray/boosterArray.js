Template.boosterArray.onCreated(() => {
	Meteor.subscribe('boosters');
});

Template.boosterArray.helpers({
	booster(boosterName) {
		const booster = Boosters.findOne({'name': boosterName}, {fields:{count:1, imgTag:1}});
		if (!booster) {
			//in case subscription isn't ready yet
			return [];
		}
		return _.times(booster.count, () => { return {imgTag: booster.imgTag}; });
	}
});