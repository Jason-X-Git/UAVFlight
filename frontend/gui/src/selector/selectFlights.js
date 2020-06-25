import moment from 'moment';

// Get select flights

export default (flights, { text, sortBy }) => {
  // console.log('State Fights', flights);
  // console.log('State Filter text', text);
  // console.log('State SortBy ', sortBy);
  const flightsFiltered = flights.filter((flight) => {
    const uavMatch = flight.uav_no.toLowerCase().includes(text.toLowerCase());
    const jobNoMatch = flight.grs_job_no.toLowerCase().includes(text.toLowerCase());
    const jobDescMatch = flight.job_desc.toLowerCase().includes(text.toLowerCase());
    const latestStatusMatch = flight.latest_status.toLowerCase().includes(text.toLowerCase());
    // const currentStepMatch = flight.current_step_name &&
    //     flight.current_step_name.toLowerCase().includes(text.toLowerCase());
    // const nextStepMatch = flight.next_step_names &&
    //     flight.next_step_names.toLowerCase().includes(text.toLowerCase());
    return uavMatch || jobNoMatch || jobDescMatch || latestStatusMatch;
  }).sort((a, b) => {
    // console.log('Checking sort value', sortBy);
    if (sortBy === 'Processed Date Desc') {
      return a.latest_time > b.latest_time && a.uav_no > b.uav_no ? -1 : 1;
    } else if (sortBy === 'UAVNo Desc') {
      return a.uav_no > b.uav_no ? -1 : 1;
    } else if (sortBy === 'Processed Date Asc') {
      return a.latest_time < b.latest_time && a.uav_no < b.uav_no ? -1 : 1;
    } else if (sortBy === 'UAVNo Asc') {
      return a.uav_no < b.uav_no ? -1 : 1;
    }
  });
  // console.log(`Filtered flights (Sorted by ${sortBy}): `, flightsFiltered);
  return flightsFiltered
};
