Meteor.startup(function() {
  Tracker.autorun(function() {
      var boosters = Boosters.find().fetch(),
          optionBuy = Session.get("optionBuy"),
          optionAmount = Session.get("optionAmount");

      boosters.forEach((booster) => {
          var currentPrice = booster.currentPrice, //buy or sell?
              percentagePrice = booster.percentagePrice,
              newPrice = currentPrice;

          for (var i = 1; i < optionAmount; i++) //more than 1?
          {
              if(optionBuy) {
                  newPrice = newPrice + (newPrice * percentagePrice);
              }
              else
              {
                  newPrice = newPrice - (newPrice * percentagePrice);
              }
          }

          var roundedPrice = Math.ceil(newPrice);
          Session.set(booster.name, roundedPrice);
      });
  });
});

Template.boosterOptions.events({
    "click .boosterOptionBuy"() { Session.set("optionBuy", true);},
    "click .boosterOptionSell"() { Session.set("optionBuy", false);},
    "click .boosterOption1"() { Session.set("optionAmount", 1);},
    "click .boosterOption10"() { Session.set("optionAmount", 10);},
    "click .boosterOption100"() { Session.set("optionAmount", 100);}
});
