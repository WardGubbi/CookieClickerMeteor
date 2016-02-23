Meteor.startup(function () {
	if (Boosters.find().count() === 0) {
		var boosterArray = [
			{
				name: 'Cursor',
				description: 'Autoclicks ones every 10 seconds',
				count: 0,
				basePrice: 10,
				currentPrice: 10,
                currentSellPrice: 10,
				percentagePrice: 0.15,
				imgTag: 'cursor',
				whenVisible: 0,
				numberOfCookies: 10
			},
			{
				name: 'Grandma',
				description: 'A nice grandma to bake more cookies',
				count: 0,
				basePrice: 200,
				currentPrice: 200,
                currentSellPrice: 200,
				percentagePrice: 0.15,
				imgTag: 'grandma',
				whenVisible: 100,
				numberOfCookies: 100
			},
			{
				name: 'Farm',
				description: 'Grows cookie plants from cookie seeds',
				count: 0,
				basePrice: 400,
				currentPrice: 400,
                currentSellPrice: 400,
				percentagePrice: 0.15,
				imgTag: 'farm',
				whenVisible: 300,
				numberOfCookies: 250
			},
			{
				name: 'Mine',
				description: 'Mines out cookie dough and chocolate chips',
				count: 0,
				basePrice: 1000,
				currentPrice: 1000,
                currentSellPrice: 1000,
				percentagePrice: 0.15,
				imgTag: 'mine',
				whenVisible: 800,
				numberOfCookies: 750
			},
			{
				name: 'Bank',
				description: 'Generates cookies from interest',
				count: 0,
				basePrice: 10000,
				currentPrice: 10000,
                currentSellPrice: 10000,
				percentagePrice: 0.15,
				imgTag: 'bank',
				whenVisible: 9000,
				numberOfCookies: 1000
			}
		];

		_.each(boosterArray, function (object) {
			Boosters.insert(object);
		});
	}

	if (Games.find().count() === 0) {
		Games.insert({cookiesTotal: 0, cookieBalance: 0, cookiesPerSecond: 0});
	}


	if (Upgrades.find().count() === 0) {
		var cursorUpgradeArray = [
			{
				booster: 'Cursor',
				name: 'upgrade_cursor_0',
				img: 'images/store/upgrade/upgrade_cursor_0.png',
				price: 100,
				prereq: 1,
				type: 'multiplier',
				boost: 2
			},
			{
				booster: 'Cursor',
				name: 'upgrade_cursor_1',
				img: 'images/store/upgrade/upgrade_cursor_1.png',
				price: 500,
				prereq: 1,
				type: 'multiplier',
				boost: 2
			},
			{
				booster: 'Cursor',
				name: 'upgrade_cursor_2',
				img: 'images/store/upgrade/upgrade_cursor_2.png',
				price: 10000,
				prereq: 10,
				type: 'multiplier',
				boost: 2
			},
			{
				booster: 'Cursor',
				name: 'upgrade_cursor_3',
				img: 'images/store/upgrade/upgrade_cursor_3.png',
				price: 100000,
				prereq: 20,
				type: 'gain',
				boost: 0.1
			},
			{
				booster: 'Cursor',
				name: 'upgrade_cursor_4',
				img: 'images/store/upgrade/upgrade_cursor_4.png',
				price: 10000000,
				prereq: 40,
				type: 'gain',
				boost: 0.5
			},
			{
				booster: 'Cursor',
				name: 'upgrade_cursor_5',
				img: 'images/store/upgrade/upgrade_cursor_5.png',
				price: 100000000,
				prereq: 80,
				type: 'gain',
				boost: 5
			}
		];
		var grandmaUpgradeArray = [
			{
				booster: 'Grandma',
				name: 'Forwards from grandma',
				img: 'images/store/upgrade/upgrade_grandma_7.png',
				price: 1000,
				prereq: 1,
				type: 'multiplier',
				boost: 2
			},
			{
				booster: 'Grandma',
				name: 'Steel-plated rolling pins',
				img: 'images/store/upgrade/upgrade_grandma_8.png',
				price: 5000,
				prereq: 5,
				type: 'multiplier',
				boost: 2
			},
			{
				booster: 'Grandma',
				name: 'Lubricated dentures',
				img: 'images/store/upgrade/upgrade_grandma_9.png',
				price: 50000,
				prereq: 25,
				type: 'multiplier',
				boost: 2
			},
			{
				booster: 'Grandma',
				name: '	Prune juice',
				img: 'images/store/upgrade/upgrade_grandma_44.png',
				price: 5000000,
				prereq: 50,
				type: 'multiplier',
				boost: 2
			},
			{
				booster: 'Grandma',
				name: 'Double-thick glasses',
				img: 'images/store/upgrade/upgrade_grandma_110.png',
				price: 500000000,
				prereq: 100,
				type: 'multiplier',
				boost: 2
			}
		];
		_.each(cursorUpgradeArray, function (object) {
			Upgrades.insert(object);
		});

		_.each(grandmaUpgradeArray, function (object) {
			Upgrades.insert(object);
		});
	}

});
