// Flights Reducer

const flightsReducerDefaultState = [];

export default (state = flightsReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_FLIGHTS':
      return action.flights;
    default:
      return state;
  }
};
