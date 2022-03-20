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

function displayDate() {
  var today = moment().format('dddd, MMM DD');
  currentDayEl.text(today);
}

function checkTime() {
  var currentTime = moment().toObject().hours;

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

function storedTasks() {
  for (let i = 0; i <= 8; i++) {
    if (typeof (localStorage.getItem(timeClasses[i])) != 'undefined') {
      storedText = localStorage.getItem(timeClasses[i]);
      timeRows[i].children('.description').text(storedText);
    };
  }
}

function init() {
  displayDate();
  checkTime();
  storedTasks();
}

init()

function saveTask(event) {
  event.preventDefault();

  var btnClicked = $(event.target);
  var taskSaved = btnClicked.parents('div').children('.description').val();

  var parentId = btnClicked.parents('div').attr('id');
  localStorage.setItem(parentId, taskSaved);
}

timeBlock.on("click", ".saveBtn", saveTask);

setInterval(checkTime, 1000)