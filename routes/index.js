exports.mainStream = function(req, res) {
    res.render('index.html', this.getCurrentShowObject());
};

exports.admin = function(req, res) {
    res.render('admin.html');
};
