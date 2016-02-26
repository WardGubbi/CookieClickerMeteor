Template.boosterArray.onCreated(() => {
	Meteor.subscribe('boosters');
});

Template.boosterArray.helpers({
	boosters() {
		// TODO order on something
		return Boosters.find({}, {fields:{name:1, count:1, imgTag:1}});
	},
	count() {
		return _.times(this.count, () => {});
	}
});
