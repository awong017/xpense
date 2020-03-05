import React, { Component } from 'react';
import { DateRange } from 'react-date-range';
import ApiContext from '../ApiContext';
import './dateFilter.css';
 
class DateFilter extends Component {

    static contextType = ApiContext;

    handleSelect = (range) => {

        const { filterDate } = this.context;
        const startDate = new Date(range.startDate._d).getTime();
        const endDate = new Date(range.endDate._d).getTime();

        filterDate(startDate, endDate);
    }
 
    render(){
        return (
            <div className="date-filter">
                <DateRange
                    onChange={this.handleSelect}
                />
            </div>
        )
    }
}

export default DateFilter;
 