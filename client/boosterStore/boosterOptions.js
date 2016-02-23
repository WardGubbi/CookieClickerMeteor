
var setBoosterOptionBuy = function (event) {
    Session.set("optionBuy", true);
    calculateBoosterPrice();
};

var setBoosterOptionSell = function (event) {
    Session.set("optionBuy", false);
    calculateBoosterPrice();
};

var setBoosterOption1 = function (event) {
    Session.set("optionAmount", 1);
    calculateBoosterPrice();
};

var setBoosterOption10 = function (event) {
    Session.set("optionAmount", 10);
    calculateBoosterPrice();
};

var setBoosterOption100 = function (event) {
    Session.set("optionAmount", 100);
    calculateBoosterPrice();
};

var calculateBoosterPrice = function() { //global function
    var boosters = Boosters.find().fetch(),
        optionBuy = Session.get("optionBuy"),
        optionAmount = Session.get("optionAmount");

    for (var b = 0; b < boosters.length; b++) //loop boosters
    {
        var currentPrice = boosters[b].currentPrice, //buy or sell?
            percentagePrice = boosters[b].percentagePrice,
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

        //console.log(boosters[b].name + ": " + roundedPrice);

        Session.set(boosters[b].name, roundedPrice);
    }
};

Template.boosterOptions.helpers({
    calculateBoosterPrice : calculateBoosterPrice
});

Template.boosterOptions.events({
    "click .boosterOptionBuy": setBoosterOptionBuy,
    "click .boosterOptionSell": setBoosterOptionSell,
    "click .boosterOption1": setBoosterOption1,
    "click .boosterOption10": setBoosterOption10,
    "click .boosterOption100": setBoosterOption100
});