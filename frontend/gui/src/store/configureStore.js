import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import flightsReducer from '../reducers/flights';
import filtersReducer from '../reducers/filters';
import recentMonthsReducer from "../reducers/recentMonths";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            flights: flightsReducer,
            filters: filtersReducer,
            recentMonths: recentMonthsReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
};
