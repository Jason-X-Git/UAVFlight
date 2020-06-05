import React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';
import Link from "@material-ui/core/Link";
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/styles';
import {green} from "@material-ui/core/colors";
import {BoldText, InvertedText} from "./InvertedText";

function setIntervalImmediately(func, interval) {
    func();
    return setInterval(func, interval);
}

const styles = theme => ({
    listItemStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        '&:hover': {
            backgroundColor: green[500],
            color: 'white'
        }
    },

});

class FlightSummaryItem extends React.Component {
    intervalID = 0;

    state = {
        ...this.props.item,
    };


    running_time = () => {
        const start_time = this.state.current_start && new moment(this.state.current_start);
        const time_diff = new moment().locale('ca').diff(start_time);
        const d = moment.duration(time_diff);
        const hours = Number(d.days()) * 24 + d.hours();
        const dd = moment.utc(d.as('milliseconds')).format(`${hours}[:]mm[:]ss`);
        this.setState({
            start_time,
            current_running_counter: dd
        })
    };

    componentDidMount() {
        this.intervalID = setIntervalImmediately(this.running_time, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    repeatStringNumTimes = (string, times) => {
        var repeatedString = "";
        while (times > 0) {
            repeatedString += string;
            times--;
        }
        return repeatedString;
    };

    render() {
        const {classes} = this.props;

        return (
            <div>
                <Link href={`/${this.state.id}`} underline="none">
                    <ListItem
                        key={this.key}
                        button
                        className={classes.listItemStyle}
                    >
                        <ListItemText>
                            <Typography variant="h4">
                                <BoldText>{this.state.uav_no}</BoldText> - {this.state.grs_job_no}
                            </Typography>
                        </ListItemText>
                        {this.repeatStringNumTimes('🟢', this.state.success_steps_count)}
                        {this.repeatStringNumTimes('🔴', this.state.failure_steps_count)}
                        {this.state.current_start && '🔵'}
                        {this.repeatStringNumTimes('⚪', this.state.remaining_steps_count)}
                        <ListItemText>
                            <Typography variant="h5">
                                <BoldText>
                                    {this.state.current_step_name.includes('Stopped')
                                    || this.state.current_step_name.includes('Not Started') ?
                                        `🥵️ ${this.state.current_step_name}.` :
                                        this.state.current_step_name.includes('Done') ?
                                            `😄 ${this.state.current_step_name}.` :
                                            this.state.current_step_name.includes('Failure') ?
                                                `👿 ${this.state.current_step_name}.` :
                                            `👍 Running ${this.state.current_step_name}.`}
                                    {this.state.start_time && ` ${this.state.current_running_counter}
                                     from ${this.state.start_time.local().format('MM-DD HH:mm')}`}
                                </BoldText>
                                {' '}
                                {this.state.next_step_names && `➡️ ${this.state.next_step_names}`}
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography variant="h5">
                                {this.state.job_desc}
                            </Typography>
                        </ListItemText>
                    </ListItem>
                </Link>
                <Divider style={{margin: "10px auto"}}/>
            </div>

        );
    }

}

export default withStyles(styles)(FlightSummaryItem);
