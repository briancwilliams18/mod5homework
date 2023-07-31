$(document).ready(function () {

  $('.saveBtn').on('click', function(event) {
    const timeBlock = $(this).closest('.time-block');
    const timeBlockId = timeBlock.attr('id');

    const descriptionTextarea = timeBlock.find('textarea');
    const description = descriptionTextarea.val();

    localStorage.setItem(timeBlockId, description);
  });

    const currentTime = dayjs().hour();
  
    $('.time-block').each(function () {
      const timeBlockHour = parseInt($(this).attr('id').split('-')[1]); 

      if (timeBlockHour < currentTime) {
        // Time block is in the past
        $(this).addClass('past').removeClass('present future');
      } else if (timeBlockHour == currentTime) {
        // Time block is the current hour
        $(this).addClass('present').removeClass('past future');
      } else {
        // Time block is in the future
        $(this).addClass('future').removeClass('past present');
      }
    });

  $('.time-block').each(function () {
    const timeBlockId = $(this).attr('id');
    const description = localStorage.getItem(timeBlockId);
  
    if (description) {
     const descriptionTextarea = $(this).find('textarea');
      descriptionTextarea.val(description);
    }
  });
  const currentDate = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDate);
});
