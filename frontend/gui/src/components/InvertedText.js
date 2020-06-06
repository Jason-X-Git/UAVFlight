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
        borderRadius: "20%"
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

export const BolderText = (props) => {
    const classes = styles();
    return (
        <Typography variant="inherit" className={classes.bolderStyle}>
            {props.text || props.children}
        </Typography>
    )
};

