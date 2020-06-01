import React from "react";
import Header from "./components/Header";
import BaseRouter from "./routes";
import {BrowserRouter as Router} from "react-router-dom";
import AutomaticUpdate from "./components/AutomaticUpdate";

import './styles/styles.scss';


class App extends React.Component {
    render() {
        return (
            <div className="App">
                <AutomaticUpdate>
                    <Router>
                        <Header/>
                        <BaseRouter/>
                    </Router>
                </AutomaticUpdate>
            </div>
        );
    }
}

export default App;
