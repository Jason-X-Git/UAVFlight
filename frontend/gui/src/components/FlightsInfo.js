import React from "react";
import {connect} from 'react-redux';
import Typography from "@material-ui/core/Typography";
import selectFlights from "../selector/selectFlights";
import {CircleNumber} from "./InvertedText";
import moment from "moment";

export const FlightsInfo = ({
                                allFlightsCount, filteredFlightsCount, runningFlightsCount, failedFlightsCount, stoppedFlightsCount,
                                successFlightsCount, maxDate, minDate
                            }) => {
    console.log('max date: ', maxDate);
    return (
        <Typography variant="h4" style={{fontWeight: "bolder", color: "darkblue", margin: "0.2em", display: "flex"}}>
            <CircleNumber style={{backgroundColor: "grey"}} number={allFlightsCount} label="TOTAL"/>
            {allFlightsCount !== filteredFlightsCount && <CircleNumber style={{backgroundColor: "purple"}}
                                                                      number={filteredFlightsCount} label="FILTERED"/>}
            {successFlightsCount > 0 && <CircleNumber style={{backgroundColor: "green"}} number={successFlightsCount} label="SUCCESS"/>}
            {runningFlightsCount > 0 && <CircleNumber style={{backgroundColor: "blue"}} number={runningFlightsCount} label="RUNNING"/>}
            {stoppedFlightsCount > 0 && <CircleNumber style={{backgroundColor: "brown"}} number={stoppedFlightsCount} label="STOPPED"/>}
            {failedFlightsCount > 0 && <CircleNumber style={{backgroundColor: "red"}} number={failedFlightsCount} label="FAILED"/>}
            {minDate && maxDate && ` (From ${minDate} to ${maxDate})`}
        </Typography>
    )
};

const mapStateToProps = (state) => {
    const allFlights = state.flights;
    const filteredFlights = selectFlights(state.flights, state.filters);
    const runningFlights = filteredFlights.filter((item) => (item.current_start));
    const failedFlights = filteredFlights.filter((item) => (!item.no_errors));
    const stoppedFlights = filteredFlights.filter((item) => (item.current_step_name.includes('Stopped')));
    const successFlights = filteredFlights.filter((item) => (item.current_step_name.includes('All Done')));
    const minDate = moment.min(filteredFlights.map((f) => moment(f.transfer_started))).format('YYYY-MM-DD');
    const maxDate = moment.max(filteredFlights.map((f) => moment(f.transfer_started))).format('YYYY-MM-DD');

    return {
        allFlightsCount: allFlights.length,
        filteredFlightsCount: filteredFlights.length,
        runningFlightsCount: runningFlights.length,
        failedFlightsCount: failedFlights.length,
        stoppedFlightsCount: stoppedFlights.length,
        successFlightsCount: successFlights.length,
        maxDate,
        minDate
    }
};

export default connect(mapStateToProps)(FlightsInfo);