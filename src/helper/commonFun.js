export const timeFormat = (timestamp) => {
  const date = new Date(timestamp);
  // Extract hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes();
  // Determine AM/PM
  const ampm = hours >= 12 ? "PM" : "AM";
  // Convert hours from 24-hour to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // Hour '0' should be '12'
  // Format minutes with leading zero if necessary
  const minutesFormatted = minutes < 10 ? "0" + minutes : minutes;
  // Create the time string
  const timeString = `${hours}:${minutesFormatted} ${ampm}`;
  return timeString;
};
