import React from "react";
import {connect} from 'react-redux';
import Typography from "@material-ui/core/Typography";
import selectFlights from "../selector/selectFlights";
import {CircleNumber} from "./InvertedText";

export const FlightsInfo = ({
                                flightsCount, runningFlightsCount, failedFlightsCount, stoppedFlightsCount,
                                successFlightsCount
                            }) => {
    return (
        <Typography variant="h3" style={{fontWeight: "bolder", color: "darkblue", margin: "0.2em"}}>
            <CircleNumber style={{backgroundColor: "grey"}}>{flightsCount}</CircleNumber>{" TOTAL ! "}
            <CircleNumber style={{backgroundColor: "green"}}>{successFlightsCount}</CircleNumber>{" SUCCESS ! "}
            <CircleNumber style={{backgroundColor: "blue"}}>{runningFlightsCount}</CircleNumber>{" RUNNING ! "}
            <CircleNumber style={{backgroundColor: "brown"}}>{stoppedFlightsCount}</CircleNumber>{" STOPPED ! "}
            <CircleNumber style={{backgroundColor: "red"}}>{failedFlightsCount}</CircleNumber>{" FAILED !"}
        </Typography>
    )
};

const mapStateToProps = (state) => {
    const visibleFlights = selectFlights(state.flights, state.filters);
    const runningFlights = visibleFlights.filter((item) => (item.current_start));
    const failedFlights = visibleFlights.filter((item) => (item.failure_steps_count));
    const stoppedFlights = visibleFlights.filter((item) => (item.current_step_name.includes('Stopped')));
    const successFlights = visibleFlights.filter((item) => (item.current_step_name.includes('All Done')));

    return {
        flightsCount: visibleFlights.length,
        runningFlightsCount: runningFlights.length,
        failedFlightsCount: failedFlights.length,
        stoppedFlightsCount: stoppedFlights.length,
        successFlightsCount: successFlights.length,
    }
};

export default connect(mapStateToProps)(FlightsInfo);