import React from "react";
import axios from "axios";
import { Card, Button } from "antd";

class FlightDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flight: {}
    };
  }

  componentDidMount() {
    const flightID = this.props.match.params.flightID;
    axios.get(`${process.env.REACT_APP_DJANGO_API_URL}/${flightID}/`).then(res => {
      this.setState({
        flight: res.data
      });
      // console.log("Details: ", this.state.flight);
    });
  }

  handleFormDelete = event => {
    const flightID = this.props.match.params.flightID;
    console.log("Deleting ", this.props.match.flightID);
    axios
      .delete(`http://127.0.0.1:8000/api/${flightID}/`)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
    this.props.history.push("/");
    this.forceUpdate();
  };

  render() {
    const flight = this.state.flight;
    if (flight.id) {
      return (
        <div>
          <Card id={flight.id}>
            <p>{flight.uav_no}</p>
            <p>{flight.grs_job_no}</p>
            <p>{flight.job_desc}</p>
          </Card>
        </div>
      );
    } else {
      return <div>Flight does not exists !</div>;
    }
  }
}

export default FlightDetail;
