var currentShows = require('./currentShows');

//Note that hour and minute need to be in UTC
exports.getCurrentShow = function(hour, minute, day) {
    //Round minute to the previous half hour
    if (minute < 30) minute = 0;
    else minute = 30;
    var info = 'Now playing: ';
    // Note: all times are in UTC, not local time
    switch (day) {
        case 2:
        case 3:
        case 4:
        case 5:
            switch (hour) {
                case 0:
                case 1:
                case 2:
                    info += currentShows[day][hour][minute];
                    break;
                default:
                    info += 'Loop of yesterday\'s shows';
                    break;
            }
            break;
        default:
            info = 'We take the weekend off, come back Monday at 8 for new content!';
            break;
    }
    return info;
}
