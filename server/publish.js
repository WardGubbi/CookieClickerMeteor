Meteor.publish('games', function(){
	return Games.find();
});

Meteor.publish('boosters', function(){
	return Boosters.find();
});

Meteor.publish('upgrades', function(){
    return Upgrades.find();
});