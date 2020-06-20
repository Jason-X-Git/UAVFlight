import axios from "axios";

export const setFlights = (flights) => ({
    type: 'SET_FLIGHTS',
    flights
});

const readData = () => {
    return axios.get(`${process.env.REACT_APP_DJANGO_API_URL}`)
};



export const startSetFlights = () => {
    return (dispatch, getState) => {
        return readData()
            .then((res) => {
                const flights = [];
                res.data.forEach((flight) => {
                    flights.push({
                        ...flight,
                        type: 'point'
                    })
                });
                dispatch(setFlights(flights));
            })
    }
};

