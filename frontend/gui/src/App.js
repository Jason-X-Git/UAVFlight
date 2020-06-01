import React from "react";
import Header from "./components/Header";
import CustomLayout from "./container/Layout";
import BaseRouter from "./routes";
import {BrowserRouter as Router} from "react-router-dom";
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import { startSetFlights} from "./actions/flights";

import './styles/styles.scss';

const store = configureStore();

store.dispatch(startSetFlights());

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Provider store={store}>
                    <Router>
                        <Header/>
                        <CustomLayout>
                            <BaseRouter/>
                        </CustomLayout>
                    </Router>
                </Provider>
            </div>
        );
    }
}

export default App;
