var currentDayEl = $('#currentDay');
var nineAm = $('#hour-9');
var tenAm = $('#hour-10');
var elevenAm = $('#hour-11');
var twelveAm = $('#hour-12');
var onePm = $('#hour-13');
var twoPm = $('#hour-14');
var threePm = $('#hour-15');
var fourPm = $('#hour-16');
var fivePm = $('#hour-17');

function displayDate() {
  var today = moment().format('dddd, MMM DD');
  currentDayEl.text(today);
}
displayDate();

function checkTime() {
  var currentTime = moment().toObject().hours;
  var hoursInDay = [09, 10, 11, 12, 13, 14, 15, 16, 17];
  var timeRows = [nineAm, tenAm, elevenAm, twelveAm, onePm, twoPm, threePm, fourPm, fivePm];
  for (let i = 0; i <= 8; i++) {
    if (currentTime < hoursInDay[i]) {
      if (timeRows[i].children("textarea").hasClass("present")) {
        timeRows[i].children("textarea").removeClass("present")
      } else if (timeRows[i].children("textarea").hasClass("past")) {
        timeRows[i].children("textarea").removeClass("past")
      }
      timeRows[i].children("textarea").addClass("future");  
    } else if (currentTime == hoursInDay[i]) {
      if (timeRows[i].children("textarea").hasClass("future")) {
        timeRows[i].children("textarea").removeClass("future")
      } else if (timeRows[i].children("textarea").hasClass("past")) {
        timeRows[i].children("textarea").removeClass("past")
      }
      timeRows[i].children("textarea").addClass("present");  
    } else {
      if (timeRows[i].children("textarea").hasClass("present")) {
        timeRows[i].children("textarea").removeClass("present")
      } else if (timeRows[i].children("textarea").hasClass("future")) {
        timeRows[i].children("textarea").removeClass("future")
      }
      timeRows[i].children("textarea").addClass("past");  
    }
  }
}
checkTime();

setInterval(checkTime, 1000)