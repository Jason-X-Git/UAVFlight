import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import {connect} from 'react-redux';
import {startSetFlights} from "../actions/flights";
import {setRecentMonths} from "../actions/recentMonths"
import {RotateCircleLoading} from 'react-loadingg';

const RecentMonths = (props) => {
    const [recentMonths, setRecentMonths] = useState(props.recentMonths);
    const [loading, setLoading] = useState(false);

    const buttonStyle = {margin: '0 5px', fontSize: '15px', padding: '0.01px 10px'};
    return (
        <div style={{display: "flex", margin: "10px 10px"}}>
            <div>Recent {recentMonths} Months</div>
            <Button disabled={loading} variant="secondary" onClick={() => setRecentMonths(recentMonths + 1)} style={buttonStyle}>+</Button>
            <Button disabled={loading} variant="secondary" onClick={() => setRecentMonths((recentMonths - 1) < 1 ? 1 : recentMonths - 1)}
                    style={buttonStyle}>-</Button>
            <Button disabled={loading} onClick={async () => {
                console.log('Dispatch for ', recentMonths, ' months');
                setLoading(true);
                await props.setRecentMonths(recentMonths);
                const fetchTime = await props.startSetFlights();
                setLoading(false);
            }
            } style={buttonStyle}>Go</Button>
            {loading? `loading data within ${recentMonths} months......`:
                props.fetchTime && `Fetched @ ${props.fetchTime.format('YYYY-MM-DD HH:mm')}`}
            {loading && <RotateCircleLoading color='purple'/>}
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({
    fetchTime: ownProps.fetchTime,
    recentMonths: state.recentMonths
});

const mapDispatchToProps = (dispatch) => ({
    startSetFlights: () => dispatch(startSetFlights()),
    setRecentMonths: (recentMonths) => dispatch(setRecentMonths(recentMonths)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecentMonths);
