import React from 'react';
import { connect } from 'react-redux';
import {setTextFilter, sortByDateAsc, sortByDateDesc, sortByUAVNoAsc, sortByUAVNoDesc} from '../actions/filters';

export class FlightsListFilters extends React.Component {
  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value);
  };
  onSortChange = (e) => {
    console.log('Sorting by ', e.target.value);
    if (e.target.value === 'Date Desc') {
      this.props.sortByDateDesc();
    } else if (e.target.value === 'Date Asc') {
      this.props.sortByDateAsc();
    } else if (e.target.value === 'UAVNo Desc') {
      this.props.sortByUAVNoDesc();
    } else if (e.target.value === 'UAVNo Asc') {
      this.props.sortByUAVNoAsc();
    }
  };
  render() {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input
              type="text"
              className="text-input"
              placeholder="Search anything"
              value={this.props.filters.text}
              onChange={this.onTextChange}
            />
          </div>
          <div className="input-group__item">
            <select
              className="select"
              // value={this.props.filters.sortBy}
              onChange={this.onSortChange}
            >
              <option value="UAVNo Desc">UAVNo Desc</option>
              <option value="UAVNo Asc">UAVNo Asc</option>
              <option value="Date Desc">Date Desc</option>
              <option value="Date Asc">Date Asc</option>
            </select>
          </div>
        </div>



      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  flights: state.flights,
  filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByDateDesc: () => dispatch(sortByDateDesc()),
  sortByDateAsc: () => dispatch(sortByDateAsc()),
  sortByUAVNoDesc: () => dispatch(sortByUAVNoDesc()),
  sortByUAVNoAsc: () => dispatch(sortByUAVNoAsc()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlightsListFilters);
