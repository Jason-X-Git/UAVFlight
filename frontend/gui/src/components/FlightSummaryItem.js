import React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';
import Link from "@material-ui/core/Link";
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/styles';
import {green} from "@material-ui/core/colors";

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
            backgroundColor: green[600],
            color: 'white'
        }
    },

});

class FlightSummaryItem extends React.Component {
    state = {
        'current_running': null
    };

    item = this.props.item;
    start_time = this.item.current_start ? new moment(this.item.current_start) : null;

    running_time = () => {
        const time_diff = new moment().locale('ca').diff(this.start_time);
        const d = moment.duration(time_diff);
        const days = Number(d.days());
        const dd = moment.utc(d.as('milliseconds')).format(`${days} [Days] HH[:]mm[:]ss`);
        this.setState({
            'current_running': dd
        })
    };

    componentDidMount() {
        setIntervalImmediately(this.running_time, 1000);
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
                            <Typography variant="h4">
                                {`${this.item.uav_no} - ${this.item.grs_job_no}`}
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography variant="h5">
                                {this.start_time ?
                                    `Started at ${this.start_time.local().format('YYYY-MM-DD HH:mm:ss')}.
                        Already running for ${this.state.current_running}`
                                    : 'Not Started yet'
                                }
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
