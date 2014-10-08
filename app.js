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
app.engine('html', engines.handlebars);
app.set('view engine', 'html');
app.disable('x-powered-by');

app.get('/', routes.home);
//app.post('/streaminfo', routes.streaminfo);
//app.get('/archives', routes.archives);

var timer = new scheduler.RecurrenceRule();
timer.dayOfWeek = [1, 2, 3, 4, 5];
timer.minute = [1, 31];
timer.hour = [20,21,22,23,0,1,2,3];

var job = scheduler.scheduleJob(timer, function() {
    var hour = new Date().getUTCHours();
    var min = new Date().getMinutes();
    var day = new Date().getUTCDay();
    var info = shows.getCurrentShow(hour, min, day);
    io.emit('new show', info);
})

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3003, function() {
    console.log('Listening on port 3003');
});
