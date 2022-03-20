var currentDayEl = $('#currentDay');
var saveButton = $('.saveBtn')
var nineAm = $('#hour-9');
var tenAm = $('#hour-10');
var elevenAm = $('#hour-11');
var twelveAm = $('#hour-12');
var onePm = $('#hour-13');
var twoPm = $('#hour-14');
var threePm = $('#hour-15');
var fourPm = $('#hour-16');
var fivePm = $('#hour-17');
var timeBlock = $('.time-block');

var hoursInDay = [09, 10, 11, 12, 13, 14, 15, 16, 17];
var timeRows = [nineAm, tenAm, elevenAm, twelveAm, onePm, twoPm, threePm, fourPm, fivePm];
var timeClasses = ["hour-9", "hour-10", "hour-11","hour-12", "hour-13", "hour-14", "hour-15", "hour-16", "hour-17",]

// Displays date on top of page in required format.
function displayDate() {
  var today = moment().format('dddd, MMM DD');
  currentDayEl.text(today);
}

// Checks the current time and color the text areas accordingly
function checkTime() {
  var currentTime = moment().toObject().hours;

  for (let i = 0; i <= 8; i++) {
    // Checks if time hasn't yet occured, is currently occuring, or has already occured in that order
    if (currentTime < hoursInDay[i]) {
      // Removes previous background classes related to time
      if (timeRows[i].children("textarea").hasClass("present")) {
        timeRows[i].children("textarea").removeClass("present")
      } else if (timeRows[i].children("textarea").hasClass("past")) {
        timeRows[i].children("textarea").removeClass("past")
      }
      // Sets current background to future time color
      timeRows[i].children("textarea").addClass("future");
    } else if (currentTime == hoursInDay[i]) {
      // Removes previous background classes related to time
      if (timeRows[i].children("textarea").hasClass("future")) {
        timeRows[i].children("textarea").removeClass("future")
      } else if (timeRows[i].children("textarea").hasClass("past")) {
        timeRows[i].children("textarea").removeClass("past")
      }
      // Sets current background to present time color
      timeRows[i].children("textarea").addClass("present");
    } else {
      // Removes previous background classes related to time
      if (timeRows[i].children("textarea").hasClass("present")) {
        timeRows[i].children("textarea").removeClass("present")
      } else if (timeRows[i].children("textarea").hasClass("future")) {
        timeRows[i].children("textarea").removeClass("future")
      }
      // Sets current background to past time color
      timeRows[i].children("textarea").addClass("past");
    }
  }
}

// Checks to see if there is any stored data and applies it to proper time slot
function storedTasks() {
  for (let i = 0; i <= 8; i++) {
    if (typeof (localStorage.getItem(timeClasses[i])) != 'undefined') {
      storedText = localStorage.getItem(timeClasses[i]);
      timeRows[i].children('.description').text(storedText);
    };
  }
}

// Runs the display date, background color set, and stored data insertion functions upon page opening or refreshing
function init() {
  displayDate();
  checkTime();
  storedTasks();
}

init()

// Saves text in textarea and attaches it to a key named after the time row it's in
function saveTask(event) {
  event.preventDefault();

  var btnClicked = $(event.target);
  var taskSaved = btnClicked.parents('div').children('.description').val();

  var parentId = btnClicked.parents('div').attr('id');
  localStorage.setItem(parentId, taskSaved);
}

// Saves the text input upon clicking the save icon at the right end of the row
timeBlock.on("click", ".saveBtn", saveTask);

// Checks the time every second and updates the text area background colors accordingly
setInterval(checkTime, 1000)