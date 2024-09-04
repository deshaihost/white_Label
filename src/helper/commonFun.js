
// e.g. timeFormat("240509_114200") => "5/9 11:42 AM"
export const timeFormat = (timestamp) => {
  const date = new Date(timestamp);

  // Extract month, day, hours, and minutes
  const month = date.getMonth() + 1; // Months are zero-based
  const day = date.getDate();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM"; // Determine AM/PM

  // Convert hours from 24-hour to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // Hour '0' should be '12'
  const minutesFormatted = minutes < 10 ? "0" + minutes : minutes; // Format minutes with leading zero if necessary

  // Create and return the time string
  const timeString = `${month}/${day} ${hours}:${minutesFormatted} ${ampm}`;
  return timeString;
};


// e.g. formatDateRange("240101_000000", "240103_000000") => "Jan 1-3"
// e.g. formatDateRange("240101_000000", "240203_000000") => "Jan 1 - Feb 3"
export function formatDateRange(startDate, endDate, showNumNights=false) {
  if (!startDate || !endDate) {return null;}
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Helper function to parse date string
  function parseDate(dateString) {
    const datePart = dateString.split("_")[0];
    const year = parseInt(datePart.slice(0, 2), 10) + 2000; // Assuming year is in the 2000s
    const month = parseInt(datePart.slice(2, 4), 10) - 1; // Month is 0-indexed
    const day = parseInt(datePart.slice(4, 6), 10);
    return new Date(year, month, day);
  }

  // Parse the start and end dates
  const start = parseDate(startDate);
  const end = parseDate(endDate);

  // Get the month and day for both dates
  const startMonth = monthNames[start.getMonth()];
  const startDay = start.getDate();
  const endMonth = monthNames[end.getMonth()];
  const endDay = end.getDate();

  // Calculate the number of nights
  const numNights = Math.round((end - start) / (1000 * 60 * 60 * 24));

  // Create the formatted date range
  let formattedDateRange;
  if (startMonth === endMonth && start.getFullYear() === end.getFullYear()) {
    formattedDateRange = `${startMonth} ${startDay} - ${endDay}`;
  } else if (start.getFullYear() === end.getFullYear()) {
    formattedDateRange = `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
  } else { // Handle different years
    formattedDateRange = `${startMonth} ${startDay}, ${start.getFullYear()} - ${endMonth} ${endDay}, ${end.getFullYear()}`;
  }

  // Append the number of nights if showNumNights is true
  if (showNumNights) {formattedDateRange += ` (${numNights} nights)`;}

  return formattedDateRange;
}
