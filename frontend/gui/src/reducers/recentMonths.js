const defaultRecentMonths = 1;

export default (state = defaultRecentMonths, action) => {
  switch (action.type) {
    case 'SET_RECENT_MONTHS':
      return action.recentMonths;
    default:
      return state;
  }
};
