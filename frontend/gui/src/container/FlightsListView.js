import React from "react";
import List from '@material-ui/core/List';
import FlightSummaryItem from "../components/FlightSummaryItem";
import selectFlights from "../selector/selectFlights"
import {connect} from 'react-redux';



export const FlightsList = (props) => (
    <div>
        <List>
            {props.flights.map((item) => <FlightSummaryItem item={item} key={item.id}/>)}
        </List>
    </div>
);

const mapStateToProps = (state) => {
    return {
        flights: selectFlights(state.flights, state.filters)
        // flights: state.flights
    };
};

export default connect(mapStateToProps)(FlightsList);
