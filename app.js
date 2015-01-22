var express = require('express');
var engines = require('consolidate');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var currentShows = require('./lib/currentShows');
var routes = require('./routes/index');
var scheduler = require('node-schedule');
var aws = require('aws-sdk');

var ScotRadio = module.exports = function() {
    this.io = io;
    this.showObjects = currentShows.objects;
    this.showStamps = currentShows.timestamps;
    this.customMessageArray = [];

    //Using node-schedule to auto-update the page
    this.updateSocketsJob = scheduler.scheduleJob({minute: [0,30]}, this.changeMessage(true));

    //Get the list of everything on S3
    this.s3 = new aws.S3({params: {Bucket: 'scot-radio-archives'}});
};

ScotRadio.prototype.changeMessage = function(deleteOld) {
    this.io.emit('change-message', this.getCurrentMessage(deleteOld));
};

ScotRadio.prototype.addCustomMessage = function(message, overwrite) {
    this.customMessageArray.push(message);
    if (overwrite) this.changeMessage(deleteOld);
};

ScotRadio.prototype.getCurrentMessage = function(deleteOld) {
    if (!deleteOld && this.customMessageArray.length !== 0) {
        return this.customMessageArray[this.customMessageArray.length];
    }
    else if (deleteOld && this.customMessageArray.length !== 0) {
        return this.customMessageArray.pop();
    }
    else {
        return this.getCurrentShowObject();
    }
};

ScotRadio.prototype.getShowObject = function(showID) {
    if (typeof this.showObjects[showID] !== 'undefined') return this.showObjects[showID];
    else return false;
};

ScotRadio.prototype.getCurrentShowObject = function() {
    var showID = this.getCurrentShowID();
    if (typeof this.showObjects[showID] !== 'undefined') return this.showObjects[showID];
    else return false;
};

ScotRadio.prototype.getShowID = function(timestamp) {
    if (typeof this.showStamps[timestamp] !== 'undefined') return this.showStamps[timestamp];
    else return false;
};

ScotRadio.prototype.getCurrentShowID = function() {
    var day = new Date().getDay().toString();
    var hour = new Date().getHours().toString();
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
    var self = this;
    app.get('/', function(req, res) {
        res.render('index.html', self.getCurrentShowObject());
    });

    //Future show archives page
    app.get('/archives', routes.mainArchive);
    // app.get('/archives/:showname', routes.showArchives);
    // app.get('/archives/:showname/:date', routes.singleShow);

    //Admin page
    //app.get('/admin', routes.admin);

    //this.io.on('adminUpdateMessage', function(data) {
    //        this.addCustomMessage(data, true);
    //        console.log('got message');
    //});

    // Note that its NOT app.listen, the sockets are listening to
    // http and won't work if express listens via app.listen
    http.listen(3003, function() {
        console.log('Listening on port 3003');
    });
};

(new ScotRadio()).startServer();
