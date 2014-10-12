var express = require('express');
var engines = require('consolidate');
var path = require('path');
var routes = require('./routes/index');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var scheduler = require('node-schedule');
var shows = require('./lib/shows');


// all environments
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));

//We're using handlebars inside the HTML files
app.engine('html', engines.handlebars);
app.set('view engine', 'html');

//I always hated this thing
app.disable('x-powered-by');

//Main stream page
app.get('/', routes.home);

//Future show archives page
// app.get('/archives', routes.mainArchives);
// app.get('/archives/:showname', routes.showArchives);
// app.get('/archives/:showname/:date', routes.singleShow);

//Future API?
//app.post('/streaminfo', routes.streaminfo);

//Using node-schedule to auto-update the page
var timer = new scheduler.RecurrenceRule();
timer.dayOfWeek = [1, 2, 3, 4, 5];
timer.minute = [1, 31];
timer.hour = [20,21,22,23,0,1,2,3];

var job = scheduler.scheduleJob(timer, function() {
    var hour = new Date().getUTCHours();
    var min = new Date().getMinutes();
    var day = new Date().getUTCDay();

    //For now, it emits even if the show is the same.
    //Maybe check if a show is the same, but not really important
    var info = shows.getCurrentShow(hour, min, day);
    io.emit('new show', info);
});

// Note that its NOT app.listen, the sockets are listening to
// http and won't work if express listens via app.listen
http.listen(3003, function() {
    console.log('Listening on port 3003');
});
