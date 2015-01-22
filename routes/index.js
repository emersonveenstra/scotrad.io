var currentShows = require('../lib/currentShows').objects;

exports.mainStream = function(req, res) {
    res.render('index.html', this.getCurrentShowObject());
};

exports.admin = function(req, res) {
    res.render('admin.html');
};

exports.mainArchive = function(req, res) {
    res.render('mainArchive.html', {shows: currentShows});
};
