import React from 'react';
import {connect} from 'react-redux';
import {setTextFilter, sortByDateAsc, sortByDateDesc, sortByUAVNoAsc, sortByUAVNoDesc} from '../actions/filters';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {makeStyles} from '@material-ui/core/styles';
import {blue} from "@material-ui/core/colors";

const choices = [
    {
        value: 'UAVNo Desc',
        label: 'UAVNo Desc️',
    },
    {
        value: 'UAVNo Asc',
        label: 'UAVNo Asc',
    },
    {
        value: 'Date Desc',
        label: 'Processed Date Desc',
    },
    {
        value: 'Date Asc',
        label: 'Processed Date Asc',
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    textField: {
        width: 500,
        margin: 100,
        fontSize: 30,
    },
//style for font size
    resize: {
        fontSize: 20
    },
}));

const FlightsListFilters = (props) => {
    const classes = useStyles();

    const onTextChange = (e) => {
        props.setTextFilter(e.target.value);
    };
    const onSortChange = (e) => {
        console.log('Sorting by ', e.target.value);
        if (e.target.value === 'Date Desc') {
            props.sortByDateDesc();
        } else if (e.target.value === 'Date Asc') {
            props.sortByDateAsc();
        } else if (e.target.value === 'UAVNo Desc') {
            props.sortByUAVNoDesc();
        } else if (e.target.value === 'UAVNo Asc') {
            props.sortByUAVNoAsc();
        }
    };
    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    id="standard-basic"
                    label="Search anything"
                    value={props.filters.text}
                    onChange={onTextChange}
                    InputLabelProps={{style: {fontSize: 15}}}
                    InputProps={{
                        classes: {
                            input: classes.resize,
                        },
                    }}
                    className={classes.textField}
                />
                <TextField
                    id="standard-select-sorting"
                    select
                    label="Select SortBy"
                    // value={currency}
                    onChange={onSortChange}
                    // helperText="Please select your sorting"
                    InputLabelProps={{style: {fontSize: 15}}}
                    InputProps={{
                        classes: {
                            input: classes.resize,
                        },
                    }}
                    className={classes.textField}
                >
                    {choices.map((option) => (
                        <MenuItem key={option.value} value={option.value} style={{fontSize: 15}}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
        </form>
    );
};

const mapStateToProps = (state) => ({
    flights: state.flights,
    filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByDateDesc: () => dispatch(sortByDateDesc()),
    sortByDateAsc: () => dispatch(sortByDateAsc()),
    sortByUAVNoDesc: () => dispatch(sortByUAVNoDesc()),
    sortByUAVNoAsc: () => dispatch(sortByUAVNoAsc()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlightsListFilters);
