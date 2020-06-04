import React from 'react';
import {red, cyan, green} from "@material-ui/core/colors";
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    defaultStyle: {
        backgroundColor: red[100],
        color: cyan,
        fontWeight: "bold",
    },

    boldStyle: {
        fontWeight: "bold"
    }
}));

export const InvertedText = (props) => {
    const classes = styles();
    return (
        <Typography variant="inherit" className={classes.defaultStyle}>
            {props.children}
        </Typography>
    )
};

export const BoldText = (props) => {
    const classes = styles();
    return (
        <Typography variant="inherit" className={classes.boldStyle}>
            {props.children}
        </Typography>
    )
};

