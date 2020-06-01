import moment from 'moment';

// Get select flights

export default (flights, { text, sortBy }) => {
  console.log('State Fights', flights);
  console.log('State Filter text', text);
  console.log('State SortBy ', sortBy);
  const flightsFiltered = flights.filter((flight) => {
    const uavMatch = flight.uav_no.toLowerCase().includes(text.toLowerCase());
    const jobNoMatch = flight.grs_job_no.toLowerCase().includes(text.toLowerCase());
    const jobDescMatch = flight.job_desc.toLowerCase().includes(text.toLowerCase());
    return uavMatch || jobNoMatch || jobDescMatch;
  }).sort((a, b) => {
    console.log('Checking sort value', sortBy);
    if (sortBy === 'date_desc') {
      return a.current_start > b.current_start ? -1 : 1;
    } else if (sortBy === 'uav_no_desc') {
      return a.uav_no > b.uav_no ? -1 : 1;
    } else if (sortBy === 'date_asc') {
      return a.current_start < b.current_start ? -1 : 1;
    } else if (sortBy === 'uav_no_asc') {
      return a.uav_no < b.uav_no ? -1 : 1;
    }
  });
  console.log(`Filtered flights (Sorted by ${sortBy}): `, flightsFiltered);
  return flightsFiltered
};
