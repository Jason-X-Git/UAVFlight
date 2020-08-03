// Get select flights

export default (flights, {text, sortBy}) => {
    // console.log('State Fights', flights);
    // console.log('State Filter text', text);
    // console.log('State SortBy ', sortBy);
    const flightsFiltered = flights.filter((flight) => {
        const uavMatch = flight.uav_no.toLowerCase().includes(text.toLowerCase());
        const jobNoMatch = flight.grs_job_no && flight.grs_job_no.toLowerCase().includes(text.toLowerCase());
        const jobDescMatch = flight.job_desc && flight.job_desc.toLowerCase().includes(text.toLowerCase());
        const latestStatusMatch = flight.latest_status.toLowerCase().includes(text.toLowerCase());
        const errorsMatch = flight.error_details && flight.error_details.toLowerCase().includes(text.toLowerCase());
        return uavMatch || jobNoMatch || jobDescMatch || latestStatusMatch || errorsMatch;
    });

    // console.log(flightsFiltered.length,' Filtered flights: ', flightsFiltered);

    // console.log(`Filtered flights (Sorted by ${sortBy}): `, flightsFiltered);
    return flightsFiltered.sort((a, b) => {
        // console.log('Checking sort value', sortBy);
        if (sortBy === 'Processed Date Desc') {
            return a.latest_time > b.latest_time && a.uav_no > b.uav_no ? -1 : 1;
        } else if (sortBy === 'UAVNo Desc') {
            return a.uav_no > b.uav_no ? -1 : 1;
        } else if (sortBy === 'Processed Date Asc') {
            return a.latest_time < b.latest_time && a.uav_no < b.uav_no ? -1 : 1;
        } else if (sortBy === 'UAVNo Asc') {
            return a.uav_no < b.uav_no ? -1 : 1;
        } else {
            return true
        }
    })
};
