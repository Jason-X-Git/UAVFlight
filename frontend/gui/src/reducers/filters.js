import moment from 'moment';

// Filters Reducer

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'UAVNo Desc',
};

export default (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_UAV_NO_DESC':
            return {
                ...state,
                sortBy: 'UAVNo Desc'
            };
        case 'SORT_BY_DATE_DESC':
            return {
                ...state,
                sortBy: 'Processed Date Desc'
            };
        case 'SORT_BY_UAV_NO_ASC':
            return {
                ...state,
                sortBy: 'UAVNo Asc'
            };
        case 'SORT_BY_DATE_ASC':
            return {
                ...state,
                sortBy: 'Processed Date Asc'
            };
        default:
            return state;
    }
};
