exports.mainStream = function(req, res, self) {
    res.render('index.html', self.getCurrentShowObject());
};
