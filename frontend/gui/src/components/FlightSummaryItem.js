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
        'current_running': null
    };

    item = this.props.item;
    current_step_name = this.item.current_step_name;
    next_step_names = this.item.next_step_names;
    last_step_name = this.item.last_step_name;
    start_time = this.item.current_start && new moment(this.item.current_start);

    running_time = () => {
        const time_diff = new moment().locale('ca').diff(this.start_time);
        const d = moment.duration(time_diff);
        const hours = Number(d.days()) * 24 + d.hours();
        const dd = moment.utc(d.as('milliseconds')).format(`${hours}[:]mm[:]ss`);
        this.setState({
            'current_running': dd
        })
    };

    componentDidMount() {
        this.intervalID = setIntervalImmediately(this.running_time, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }


    render() {
        const {classes} = this.props;

        return (
            <div>
                <Link href={`/${this.item.id}`} underline="none">
                    <ListItem
                        key={this.key}
                        button
                        className={classes.listItemStyle}
                    >
                        <ListItemText>
                            <Typography variant="h3">
                                <BoldText>{this.item.uav_no}</BoldText> - {this.item.grs_job_no}
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography variant="h4">
                                <InvertedText>
                                    {`@${this.current_step_name}.`}
                                    {this.start_time && ` ${this.state.current_running}
                                     from ${this.start_time.local().format('MM-DD HH:mm')}`}
                                </InvertedText>
                                {' '}
                                {this.next_step_names && `➡️ ${this.next_step_names}`}
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography variant="h5">
                                {this.item.job_desc}
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
