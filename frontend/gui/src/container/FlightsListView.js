import React from "react";
import {connect} from 'react-redux';

import {List, ListItem, makeStyles, Divider, Box} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

import FlightSummaryItem from "../components/FlightSummaryItem";
import selectFlights from "../selector/selectFlights"

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper
    },
    item: {
        padding: theme.spacing(1.2)
    },
    avatar: {marginRight: theme.spacing(5)},
    paginator: {
        justifyContent: "center",
        padding: "10px"
    }
}));

const Paginator = (props) => (
    <Box component="span">
        <Pagination
            count={props.noOfPages}
            page={props.page}
            onChange={props.handleChange}
            defaultPage={1}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
            classes={{ul: props.classes.paginator}}
        />
    </Box>
);

const FlightsList = props => {
    const flightsList = props.flights;
    const classes = useStyles();
    const itemsPerPage = 6;
    const [page, setPage] = React.useState(1);
    const noOfPages = Math.ceil(flightsList.length / itemsPerPage);

    const handleChange = (event, value) => {
        console.log('Setting page to ', value);
        setPage(value);
    };

    return (
        <div>
            <Paginator noOfPages={noOfPages} page={page} handleChange={handleChange} classes={classes}/>
            <Divider/>
            <List dense compoent="span">
                {flightsList
                    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                    .map((item) => <FlightSummaryItem item={item} key={item.id}/>)}
            </List>
            <Divider/>
            <Paginator noOfPages={noOfPages} page={page} handleChange={handleChange} classes={classes}/>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        flights: selectFlights(state.flights, state.filters)
    };
};

export default connect(mapStateToProps)(FlightsList);