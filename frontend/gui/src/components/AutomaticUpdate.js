import React from "react";
import {startSetFlights} from "../actions/flights";
import configureStore from "../store/configureStore";
import {Provider} from 'react-redux';

const store = configureStore();

function setIntervalImmediately(func, interval) {
    func();
    return setInterval(func, interval);
}

class AutomaticUpdate extends React.Component {

    componentDidMount() {
        setIntervalImmediately( () => store.dispatch(startSetFlights()), 300000)
    }

    render() {
        return (
            <Provider store={store}>
                {this.props.children}
            </Provider>
        )
    }
}

export default AutomaticUpdate;