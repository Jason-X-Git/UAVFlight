import axios from "axios";

export const setFlights = (flights) => ({
    type: 'SET_FLIGHTS',
    flights
});

const readData = () => {
    return axios.get("http://192.168.1.5:8000/api/")
};



export const startSetFlights = () => {
    return (dispatch, getState) => {
        return readData()
            .then((res) => {
                const flights = [];
                res.data.forEach((flight) => {
                    flights.push({
                        ...flight
                    })
                });
                dispatch(setFlights(flights));
            })
    }
};

