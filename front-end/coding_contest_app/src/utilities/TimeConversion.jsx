import moment from "moment";


const MonthFormattedDate = ({ utcTime }) => {
    const date = new Date(utcTime);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
  
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    const monthName = monthNames[monthIndex];

    const formattedDate = `${day} ${monthName} ${year}`;
    return formattedDate;
}

const TimeFromDate = ({ utcTime }) => {
  const date = new Date(utcTime);

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12;
  
  const formattedTime = `${hours}:${minutes} ${ampm}`;
  return formattedTime;
};

const TimeDifference = ({ startDate, endDate }) => {
  const startTime = new Date(startDate).getTime();
  const endTime = new Date(endDate).getTime();
  const differenceInMilliseconds = endTime - startTime;

  // Convert milliseconds to total minutes
  const differenceInMinutes = differenceInMilliseconds / (1000 * 60);

  return `${differenceInMinutes} Mins`
  };

  function formatDateTime(dbDateTime) {
  // Create a new Date object from the database format
  const date = new Date(dbDateTime);

  // Get month, day, year
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-indexed
  const day = ("0" + date.getDate()).slice(-2);
  const year = date.getFullYear();

  // Get hours and minutes
  let hours = date.getHours();
  const minutes = ("0" + date.getMinutes()).slice(-2);
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format

  // Format the date as MM/DD/YYYY HH:MM AM/PM
  return `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;
}


function convertToMomentFormat(inputDate) {
  // Convert the input date (Date object) to a moment object
  const momentDate = moment(inputDate);

  // Format the moment object to "MM/DD/YYYY h:mm A"
  return momentDate.format("MM/DD/YYYY h:mm A");
}

const convertToDbDateTime = (date) => {
  // Ensure the date is in moment format and convert it to ISO string
  return moment(date).toISOString(); // Output: "2024-09-30T18:30:00Z"
};

export {MonthFormattedDate, TimeFromDate, TimeDifference, convertToMomentFormat, convertToDbDateTime};