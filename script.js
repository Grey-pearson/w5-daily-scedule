// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// local storage
// make func that will store the input for each hr and let me load it on page start
// function that loads local data
// func that can call to update local data for that hr

// header: 
// load the local time
// save the time as a var
// update time in P every second

// container:
// array of the hours to call to create the full list of elements
// append the correct time class to each element so they are colored

// make click from save button and id each button so can find which button got pressed
// save to local data for that id


// $(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

  // call func for header time, to local data, display local data, 
  // and create elements then assigning them the correct time class


// });

let myDay = [{
    id: '0',
    hour: '09',
    time: '09',
    meridiem: 'am',
    reminder: ''
  },{
    id: '1',
    hour: '10',
    time: '10',
    meridiem: 'am',
    reminder: ''
  },{
    id: '2',
    hour: '11',
    time: '11',
    meridiem: 'am',
    reminder: ''
  },{
    id: '3',
    hour: '12',
    time: '12',
    meridiem: 'am',
    reminder: ''
  },{
    id: '4',
    hour: '13',
    time: '01',
    meridiem: 'pm',
    reminder: ''
  },{
    id: '5',
    hour: '14',
    time: '02',
    meridiem: 'pm',
    reminder: ''
  },{
    id: '6',
    hour: '15',
    time: '03',
    meridiem: 'pm',
    reminder: ''
  },{
    id: '7',
    hour: '16',
    time: '04',
    meridiem: 'pm',
    reminder: ''
  },{
    id: '8',
    hour: '17',
    time: '05',
    meridiem: 'pm',
    reminder: ''
  }
]

// to update with time
let currentDay = $('#currentDay')
// to add the hr's
let container = $('#container')


// updates header with the date
function getHeaderDate() {
  // the current time, possibly used with a loop to contantly update once a second
  let currentHeaderDate = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a')
  currentDay.text(currentHeaderDate)
  setTimeout(getHeaderDate, 1000)
}

// saving date to local storage
function saveNotes(){
  localStorage.setItem('myDay', JSON.stringify(myDay))
}

// loads local data to elements
function reminders() {
  myDay.forEach(function (_thisHour){
    $(`#${_thisHour.id}`).val(_thisHour.reminder)
  })
}

// if local data then load it, calls functions
function init(){
  let day = JSON.parse(localStorage.getItem('myDay'))

  if (day) {
    myDay = day
  }

  saveNotes()
  reminders()
}

// header date and time
getHeaderDate()

// rendering the html and classes
myDay.forEach(function(thisHour){
  // for time block
  let hourRow = $('<form>').attr({
    'class': 'row'
  })
  container.append(hourRow)

  // time feild
  let hourField = $("<div>")
  .text(`${thisHour.time}${thisHour.meridiem}`)
  .attr({
    "class": "col-md-2 hour"
  })

  // schedule data
  let hourPlan = $('<div>')
  .attr({
    'class': 'col-md-9 description p-0'
  })
  let planData = $('<textarea>')
  hourPlan.append(planData)
  planData.attr('id', thisHour.id)
  if (thisHour.hour < dayjs().format('HH')) {
    planData.attr ({
      'class': 'past space' 
    })
  } else if (thisHour.hour == dayjs().format('HH')){
    planData.attr({
      'class': 'present space'
    })
  } else if (thisHour.hour > dayjs().format('HH')){
    planData.attr({
      'class': 'future space'
    })
  }

  // save buttons
  let saveButton = $('<i class="far fa-save fa-lg"></i>')
  let savePlan = $('<button>')
  .attr({
    'class': 'col-md-1 saveBtn'
  })
  savePlan.append(saveButton)
  hourRow.append(hourField, hourPlan, savePlan)

})


// for local storage after html is created
init()


// saves data for local data 
$('.saveBtn').on('click', function(event){
  event.preventDefault()
  let saveIndex = $(this).siblings('.description ').children('.space').attr("id")
  myDay[saveIndex].reminder = $(this).siblings('.description').children('.space').val()
  console.log(saveIndex)
  // console.log(myDay[saveIndex].reminder)
  saveNotes()
  reminders()
})

// hr display is displaying the fucking army time
// class appending for past future and present is wrong
// local data manip is broke