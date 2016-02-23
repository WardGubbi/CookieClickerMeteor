    // counter starts at 0
    Session.setDefault('counter', 0);

    Template.cookie.helpers({
        counter: function () {
            return Session.get('counter');
        }
    });

    Template.cookie.events({
        'click img': function () {
            // increment the counter when button is clicked
            Session.set('counter', Session.get('counter') + 1);
        }
    });
    Cursors = 1000;
    Grandmas = 0;
    Cursorefficiency = 1;
    GrandmaEfficiency = 1;

		Template.registerHelper('getTotalCookies', function(numberOfCookies, count) {
			return numberOfCookies * count;
		});
