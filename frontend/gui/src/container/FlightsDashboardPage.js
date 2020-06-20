import React from 'react';
import FlightsListView from './FlightsListView';
import FlightsListFilter from '../components/FlightsListFilter';
import FlightsInfo from "../components/FlightsInfo";
import FlightsMap from "../components/FlightsMap";

const FlightsDashboardPage = () => (
    <div>
        <FlightsMap />
        <FlightsListFilter/>
        <FlightsInfo/>
        <FlightsListView/>
    </div>
);

export default FlightsDashboardPage;
