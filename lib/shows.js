//Note that hour and minute need to be in UTC
exports.getCurrentShow = function(hour, minute, day) {
    //This should really be its own function...
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


//This should also really not be here...
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
            0: "Pilgrim Rock Studio with Aiden Ostrowski and Charlie Abbot",
            30: "Pilgrim Rock Studio with Aiden Ostrowski and Charlie Abbot"
        },
        1: {
            0: "Golden Oldies with David Chamberlain",
            30: "Golden Oldies with David Chamberlain"
        },
        2: {
            0: "Beyond 255 with Carl Brooks",
            30: "Beyond 255 with Carl Brooks"
        }
    },
    4: {
        0: {
            0: "Tech and Times with David Vogel and Ethan Sullivan",
            30: "Tech and Times with David Vogel and Ethan Sullivan"
        },
        1: {
            0: "LewTwo with Matthew Lewis and Andrew Lewis",
            30: "Josh Richards and Jack Davies"
        },
        2: {
            0: "Trail Mix with Jimmy Sicord and Anna Obert",
            30: "Vibe Guide with Caleb Cole and Gaines Minton"
        }
    },
    5: {
        0: {
            0: "Madmen on Air with the Sweaty-Toothed Madmen",
            30: "Madmen on Air with the Sweaty-Toothed Madmen"
        },
        1: {
            0: "Where the Sidewalk Ends with Jess Pfohl",
            30: "C ‘n Em News with Cassie McCoumb and Emily Richey-Smith"
        },
        2: {
            0: "Kairos with Alicia Banks and Demi Padilla",
            30: "Kairos with Alicia Banks and Demi Padilla"
        }
    }
};
