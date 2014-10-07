//Note that hour and minute need to be in UTC
exports.getCurrentShow = function(hour, minute, day) {
    if (minute < 30) minute = 0;
    else minute = 30;
    var info = 'Now playing: ';
    switch (day) {
        case 2:
        case 3:
        case 4:
        case 5:
            switch (hour) {
                case 0:
                case 1:
                case 2:
                    info += showTimes[day][hour][minute];
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

var showTimes = {
    2: {
        0: {
            0: "Rappers Delight with Josh Kaplan and James Reese",
            30: "In the Loop with Maddie Shook"
        },
        1: {
            0: "GCNHQ with Jenny Spade",
            30: "All Ears with Colin O’Malley and Allison Gurney"
        },
        2: {
            0: "Buckley & Hevenor with Brent Buckley and Jacob Hevenor",
            30: "KB Sports Talk with Colin Bradley and Peter Knechtle"
        }
    },
    3: {
        0: {
            0: "Rappers Delight with Josh Kaplan and James Reese",
            30: "In the Loop with Maddie Shook"
        },
        1: {
            0: "GCNHQ with Jenny Spade",
            30: "All Ears with Colin O’Malley and Allison Gurney"
        },
        2: {
            0: "Buckley & Hevenor with Brent Buckley and Jacob Hevenor",
            30: "KB Sports Talk with Colin Bradley and Peter Knechtle"
        }
    },
    4: {
        0: {
            0: "Rappers Delight with Josh Kaplan and James Reese",
            30: "In the Loop with Maddie Shook"
        },
        1: {
            0: "GCNHQ with Jenny Spade",
            30: "All Ears with Colin O’Malley and Allison Gurney"
        },
        2: {
            0: "Buckley & Hevenor with Brent Buckley and Jacob Hevenor",
            30: "KB Sports Talk with Colin Bradley and Peter Knechtle"
        }
    },
    5: {
        0: {
            0: "Rappers Delight with Josh Kaplan and James Reese",
            30: "In the Loop with Maddie Shook"
        },
        1: {
            0: "GCNHQ with Jenny Spade",
            30: "All Ears with Colin O’Malley and Allison Gurney"
        },
        2: {
            0: "Buckley & Hevenor with Brent Buckley and Jacob Hevenor",
            30: "KB Sports Talk with Colin Bradley and Peter Knechtle"
        }
    }
};