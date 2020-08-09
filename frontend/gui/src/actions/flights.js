import axios from "axios";
import moment from "moment";

export const setFlights = (flights) => ({
    type: 'SET_FLIGHTS',
    flights
});

const apiUrl = `${process.env.REACT_APP_DJANGO_API_URL}`;

const getItems = async function (pageNo = 1) {

    let actualUrl = apiUrl + `?page=${pageNo}`;
    console.log("Retrieving data from API for page : " + pageNo);
    try {

        var apiResults = await axios.get(actualUrl)
            .then(resp => {
                // console.log('Res pages: ',resp.data.total_pages)
                return [resp.data.results, resp.data.total_pages];
            });
        return apiResults;
    } catch (error) {
        alert(error);
    }
};

const getEntireItemList = async function (pageNo = 1, recentMonths) {
    try {
        console.log('Retrieving ', recentMonths, 'months');
        const [results, totalPages] = await getItems(pageNo);
        // console.log('Total pages: ', totalPages)
        const resultsFiltered = results.filter(item =>
            moment(item.transfer_started) > moment().add(-recentMonths, 'M'));
        if (resultsFiltered.length > 0 && pageNo + 1 <= totalPages) {
            return resultsFiltered.concat(await getEntireItemList(pageNo + 1, recentMonths));
        } else {
            console.log('Done.');
            return resultsFiltered;
        }

    } catch (error) {
        alert(error);
    }
};


export const startSetFlights = () => {

    return (dispatch, getState) => {
        const recentMonths = getState().recentMonths;
        return getEntireItemList(1, recentMonths)
            .then((items) => {
                // console.log('Res data, ', items)
                const flights = [];
                items.forEach((flight) => {
                    flights.push({
                        ...flight,
                        type: 'point'
                    })
                });
                dispatch(setFlights(flights));
            })
            .then(() => moment().local())
            .catch(error => alert(error))
    }
};

