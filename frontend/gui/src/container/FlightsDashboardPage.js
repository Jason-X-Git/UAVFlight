import React from 'react';
import FlightsListView from './FlightsListView';
import FlightsListFilter from '../components/FlightsListFilter';
import FlightsInfo from "../components/FlightsInfo";

const FlightsDashboardPage = () => (
    <div>
        <FlightsListFilter/>
        <FlightsInfo/>
        <FlightsListView/>
    </div>
);

export default FlightsDashboardPage;
