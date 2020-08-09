import React, {useEffect, useState} from "react";
import configureStore from "../store/configureStore";
import {Provider} from 'react-redux';
import {RotateCircleLoading} from 'react-loadingg';
import Button from "react-bootstrap/Button";

import {startSetFlights} from "../actions/flights";
import {setRecentMonths} from "../actions/recentMonths"

const store = configureStore();

function setIntervalImmediately(func, interval) {
    func();
    return setInterval(func, interval);
}

const AutomaticUpdate = (props) => {
    const storeRecentMonths = store.getState().recentMonths;
    const [pageRecentMonths, setPageRecentMonths] = useState(storeRecentMonths);
    const [loading, setLoading] = useState(false);
    const [fetchTime, setFetchTime] = useState(null);

    useEffect(() => {
        const interval = setIntervalImmediately(
            async () => {
                setLoading(true);
                const dataFetchTime = await store.dispatch(startSetFlights());
                setFetchTime(dataFetchTime);
                setLoading(false)
            },
            300000);
        return () => clearInterval(interval)
    }, [storeRecentMonths]);

    const buttonStyle = {margin: '0 5px', fontSize: '15px', padding: '0.01px 10px'};

    return (
        <Provider store={store}>
            {loading && <RotateCircleLoading color='purple'/>}
            <div style={{display: "flex", margin: "10px 10px"}}>
                <div>Recent {pageRecentMonths} Months</div>
                <Button disabled={loading} variant="secondary"
                        onClick={() => setPageRecentMonths(pageRecentMonths + 1)}
                        style={buttonStyle}>+</Button>
                <Button disabled={loading} variant="secondary"
                        onClick={() => setPageRecentMonths(
                            (pageRecentMonths - 1) < 1 ? 1 : pageRecentMonths - 1)}
                        style={buttonStyle}>-</Button>
                <Button disabled={loading || pageRecentMonths === storeRecentMonths}
                        onClick={async () => {
                    console.log('Dispatch for ', pageRecentMonths, ' months');
                    setLoading(true);
                    await store.dispatch(setRecentMonths(pageRecentMonths));
                    setLoading(false);
                }
                } style={buttonStyle}>Go</Button>
                {loading ? `loading data within ${pageRecentMonths} months......` :
                    fetchTime && `Fetched @ ${fetchTime.format('YYYY-MM-DD HH:mm')}`}
                {loading && <RotateCircleLoading color='purple'/>}
            </div>
            {props.children}
        </Provider>
    )
};

export default AutomaticUpdate;