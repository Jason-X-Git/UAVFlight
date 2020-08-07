import React, {useEffect} from "react";
import {startSetFlights} from "../actions/flights";
import configureStore from "../store/configureStore";
import {Provider} from 'react-redux';

const store = configureStore();

function setIntervalImmediately(func, interval) {
    func();
    return setInterval(func, interval);
}

const AutomaticUpdate = (props) => {
    const recentMonths = store.getState().recentMonths;

    useEffect(() => {
        const interval = setIntervalImmediately(() => store.dispatch(startSetFlights()), 300000)
        return () => clearInterval(interval)
    }, [recentMonths]);


    return (
        <Provider store={store}>
            {props.children}
        </Provider>
    )
};

export default AutomaticUpdate;