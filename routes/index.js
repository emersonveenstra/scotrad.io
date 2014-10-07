var shows = require('../lib/shows');

exports.home = function(req, res) {
    var hour = new Date().getUTCHours();
    var min = new Date().getMinutes();
    var day = new Date().getUTCDay();
    var info = shows.getCurrentShow(hour, min, day);
    res.render('index.html', {showInfo: info});
};