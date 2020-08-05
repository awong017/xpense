import React, {Component} from 'react';
import SummaryFilters from '../SummaryFilters/summaryFilters';
import SummaryList from '../SummaryList/summaryList';
import './summary.css';

class Summary extends Component {

    render() {
        return (
            <div className="summary">
                <h1 className="summary-title">Expenses Summary</h1>
                <SummaryFilters />
                <SummaryList />
            </div>
        );
    }
}

export default Summary;