import React from "react";
import axios from "axios";
import {Card} from "antd";
import {useEffect, useState} from "react";

const FlightDetail = (props) => {

    const [flight, setFlight] = useState({});

    useEffect(() => {
        const flightID = props.match.params.flightID;
        axios.get(`${process.env.REACT_APP_DJANGO_API_URL}/${flightID}/`).then(res => {
            setFlight(res.data);
            // console.log("Details: ", this.state.flight);
        });
        document.title = `${flight.uav_no}-${flight.latest_status}`;
    }, [flight.latest_status]);

    if (flight.project_uuid) {
        return (
            <div>
                <Card id={flight.project_uuid}>
                    <p>{flight.uav_no}</p>
                    <p>{flight.grs_job_no}</p>
                    <p>{flight.job_desc}</p>
                    <p>{flight.latest_status}</p>
                </Card>
            </div>
        );
    } else {
        return <div>Flight does not exists !</div>;
    }
};

export default FlightDetail;
