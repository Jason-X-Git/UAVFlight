import React from 'react';
import {blueGrey, b} from "@material-ui/core/colors";
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    defaultStyle: {
        backgroundColor: "purple",
        opacity:0.8,
        color: 'white',
        fontWeight: "bold",
        padding: "0.3em",
        borderRadius: "10%"
    },

    circleNumberStyle: {
        fontSize:"0.9em",
        opacity:0.7,
        color: 'white',
        fontWeight: "bold",
        // width:"1.5em",
        minWidth: "1.4em",
        // maxWidth: "2.0em",
        height:"1.2em",
        padding: "0 0.1em 0 0.1em",
        margin: "0 10px",
        borderRadius: "50%",
        textAlign: "center",
    },

    boldStyle: {
        fontWeight: "bold"
    },

    bolderStyle: {
        fontWeight: "bolder"
    }
}));

export const InvertedText = (props) => {
    const classes = styles();
    return (
        <Typography variant="inherit" className={classes.defaultStyle}>
            {props.text}
        </Typography>
    )
};

export const BoldText = (props) => {
    const classes = styles();
    return (
        <Typography variant="inherit" className={classes.boldStyle}>
            {props.text || props.children}
        </Typography>
    )
};

export const CircleNumber = (props) => {
    const classes = styles();
    return (
        <div className={classes.circleNumberStyle} style={props.style}>
            {props.text || props.children}
        </div>
    )
};

