$(document).ready(function () {
  // Function to generate the time blocks dynamically
  function generateTimeBlocks() {
    const workHours = 9; // Start work at 9 AM
    const totalHours = 9; // Work until 5 PM
    const container = $('#timeBlocksContainer');

    for (let i = 0; i < totalHours; i++) {
      const hour = workHours + i;
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12; // Convert 0 to 12
      const timeBlock = `
        <div id="hour-${hour}" class="row time-block">
          <div class="col-2 col-md-1 hour text-center py-3">${displayHour}${ampm}</div>
          <textarea class="col-8 col-md-10 description" rows="3"></textarea>
          <button class="btn saveBtn col-2 col-md-1" aria-label="save">
            <i class="fas fa-save" aria-hidden="true"></i>
          </button>
        </div>
      `;
      container.append(timeBlock);
    }
  }

  // Function to update the time block classes based on the current hour
  function updateBlockClasses() {
    const currentHour = dayjs().hour();

    $('.time-block').each(function () {
      const blockHour = parseInt($(this).attr('id').split('-')[1]);
      $(this).removeClass('past present future');

      if (blockHour < currentHour) {
        $(this).addClass('past');
      } else if (blockHour === currentHour) {
        $(this).addClass('present');
      } else {
        $(this).addClass('future');
      }
    });
  }

  // Function to save an event to local storage
  function saveEventToLocalStorage(timeBlockId, eventDescription) {
    localStorage.setItem(timeBlockId, eventDescription);
  }

  // Function to load saved events from local storage and set the textarea values
  function loadSavedEvents() {
    $('.time-block').each(function () {
      const timeBlockId = $(this).attr('id');
      const savedEvent = localStorage.getItem(timeBlockId);
      $(this).find('.description').val(savedEvent);
    });
  }

  // Function to display the current date in the header
  function displayCurrentDate() {
    const currentDate = dayjs().format('dddd, MMMM D, YYYY');
    $('#currentDay').text(currentDate);
  }

  // Add click event listener to the save buttons
  $('.saveBtn').on('click', function () {
    const timeBlockElement = $(this).closest('.time-block');
    const timeBlockId = timeBlockElement.attr('id');
    const eventDescription = timeBlockElement.find('.description').val();
    saveEventToLocalStorage(timeBlockId, eventDescription);
  });

  // Call the function to generate the time blocks
  generateTimeBlocks();

  // Call the functions to display the current date, load saved events, and update the classes
  displayCurrentDate();
  loadSavedEvents();
  updateBlockClasses();

  // Add an interval to update the classes every minute
  setInterval(updateBlockClasses, 60000); // 60000 milliseconds = 1 minute
});