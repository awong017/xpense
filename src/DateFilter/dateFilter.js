import React, { Component } from 'react';
import { DateRange } from 'react-date-range';
import ApiContext from '../ApiContext';
 
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
            <div>
                <DateRange
                    onChange={this.handleSelect}
                />
            </div>
        )
    }
}

export default DateFilter;
 