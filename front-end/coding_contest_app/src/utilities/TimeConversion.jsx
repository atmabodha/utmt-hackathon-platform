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


export {MonthFormattedDate, TimeFromDate, TimeDifference};