// SET_TEXT_FILTER
export const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});

export const sortByDateDesc = () => ({
  type: 'SORT_BY_DATE_DESC'
});

export const sortByUAVNoDesc = () => ({
  type: 'SORT_BY_UAV_NO_DESC'
});

export const sortByDateAsc = () => ({
  type: 'SORT_BY_DATE_ASC'
});

export const sortByUAVNoAsc = () => ({
  type: 'SORT_BY_UAV_NO_ASC'
});

