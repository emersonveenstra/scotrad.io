var express = require('express');
var engines = require('consolidate');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var currentShows = require('./lib/currentShows');
var routes = require('./routes/index');
var scheduler = require('node-schedule');

var ScotRadio = module.exports = function() {
    this.io = io;
    this.showObjects = currentShows.objects;
    this.showStamps = currentShows.timestamps;
    this.customMessageArray = [];
    //Using node-schedule to auto-update the page
    this.updateSocketsJob = scheduler.scheduleJob({minute: [0,30]}, this.changeMessage());
};

ScotRadio.prototype.changeMessage = function() {
    if (this.customMessageArray.length !== 0) {
        this.io.emit('change-message', this.customMessageArray.pop());
    }
    else {
        this.io.emit('change-message', this.getCurrentShowObject(false));
    }
};

ScotRadio.prototype.getShowObject = function(showID) {
    if (typeof this.showObjects[showID] !== 'undefined') return this.showObjects[showID];
    else return false;
};

ScotRadio.prototype.getCurrentShowObject = function() {
    var showID = this.getCurrentShowID();
    console.log(showID);
    if (typeof this.showObjects[showID] !== 'undefined') return this.showObjects[showID];
    else return false;
};

ScotRadio.prototype.getShowID = function(timestamp) {
    if (typeof this.showStamps[timestamp] !== 'undefined') return this.showStamps[timestamp];
    else return false;
};

ScotRadio.prototype.getCurrentShowID = function() {
    var day = new Date().getUTCDay().toString();
    var hour = new Date().getUTCHours().toString();
    var min = new Date().getMinutes();
    //Round minute to the previous half hour
    if (min < 30) min = '00';
    else min = '30';
    var timestamp = day + hour + min;
    if (typeof this.showStamps[timestamp] !== 'undefined') return this.showStamps[timestamp];
    else return 'not-live';
};

ScotRadio.prototype.startServer = function() {
    // all environments
    app.use(express.static(__dirname + '/public'));
    app.set('views', path.join(__dirname, 'views'));

    //We're using handlebars inside the HTML files
    app.engine('html', engines.handlebars);
    app.set('view engine', 'html');

    //I always hated this thing
    app.disable('x-powered-by');

    //Main stream page
    app.get('/', routes.mainStream(req, res, this));

    //Future show archives page
    // app.get('/archives', routes.mainArchives);
    // app.get('/archives/:showname', routes.showArchives);
    // app.get('/archives/:showname/:date', routes.singleShow);

    //Future API?
    //app.post('/streaminfo', routes.streaminfo);

    // Note that its NOT app.listen, the sockets are listening to
    // http and won't work if express listens via app.listen
    http.listen(3003, function() {
        console.log('Listening on port 3003');
    });
};

(new ScotRadio()).startServer();
