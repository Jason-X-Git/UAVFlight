import React from 'react'
import { Route } from 'react-router-dom'
import FlightsDashboardPage from './container/FlightsDashboardPage'
import FlightDetail from './container/FlightDetailsView'

const BaseRouter = () => (
  <div className="content-container">
    <Route exact path="/" component={FlightsDashboardPage} />
    <Route exact path="/:flightID" component={FlightDetail} />
  </div>
);

export default BaseRouter;