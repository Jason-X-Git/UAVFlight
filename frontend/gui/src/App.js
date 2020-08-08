import React from "react";
import Header from "./components/Header";
import BaseRouter from "./routes";
import {BrowserRouter as Router} from "react-router-dom";
import AutomaticUpdate from "./components/AutomaticUpdate";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.scss';
import RecentMonths from "./components/RecentMonths";
import {Provider} from "react-redux";


class App extends React.Component {
    render() {
        return (
            <>
                <Header/>
                <div className="App content-container">
                    <AutomaticUpdate>
                        <Router>
                            <BaseRouter/>
                        </Router>
                    </AutomaticUpdate>
                </div>
            </>
        );
    }
}

export default App;
