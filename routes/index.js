var shows = require('../lib/shows');

//Main streaming page, inserting current show here in case sockets
//don't work
exports.home = function(req, res) {
    var hour = new Date().getUTCHours();
    var min = new Date().getMinutes();
    var day = new Date().getUTCDay();
    var info = shows.getCurrentShow(hour, min, day);
    res.render('index.html', {showInfo: info});
};
