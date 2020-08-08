import React, {useEffect, useState} from "react";
import {startSetFlights} from "../actions/flights";
import configureStore from "../store/configureStore";
import {Provider} from 'react-redux';
import {RotateCircleLoading} from 'react-loadingg';

const store = configureStore();

function setIntervalImmediately(func, interval) {
    func();
    return setInterval(func, interval);
}

const AutomaticUpdate = (props) => {
    const recentMonths = store.getState().recentMonths;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const interval = setIntervalImmediately(
            async () => {
                setLoading(true);
                await store.dispatch(startSetFlights());
                setLoading(false)
            },
            300000);
        return () => clearInterval(interval)
    }, [recentMonths]);


    return (
        <Provider store={store}>
            {loading && <RotateCircleLoading color='purple'/>}
            {props.children}
        </Provider>
    )
};

export default AutomaticUpdate;