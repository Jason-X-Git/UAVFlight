import axios from "axios";

export const setFlights = (flights) => ({
    type: 'SET_FLIGHTS',
    flights
});

const readData = () => {
    return axios.get("http://127.0.0.1:8000/api/")
};

// function setIntervalImmediately(func, interval) {
//     func();
//     return setInterval(func, interval);
// }

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

