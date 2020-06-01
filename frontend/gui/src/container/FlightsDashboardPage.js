import React from 'react';
import FlightsListView from './FlightsListView';
import FlightsListFilter from '../components/FlightsListFilter';

const FlightsDashboardPage = () => (
  <div>
    <FlightsListFilter />
    <FlightsListView />
  </div>
);

export default FlightsDashboardPage;
