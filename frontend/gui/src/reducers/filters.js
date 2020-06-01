import moment from 'moment';

// Filters Reducer

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'uav_no_desc',
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
                sortBy: 'uav_no_desc'
            };
        case 'SORT_BY_DATE_DESC':
            return {
                ...state,
                sortBy: 'date_desc'
            };
        case 'SORT_BY_UAV_NO_ASC':
            return {
                ...state,
                sortBy: 'uav_no_asc'
            };
        case 'SORT_BY_DATE_ASC':
            return {
                ...state,
                sortBy: 'date_asc'
            };
        default:
            return state;
    }
};
