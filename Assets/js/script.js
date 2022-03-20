var currentDayEl = $('#currentDay');

function displayDate() {
  var today = moment().format('dddd, MMM DD');
  currentDayEl.text(today);
}
displayDate();