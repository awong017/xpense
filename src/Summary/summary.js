import React, {Component} from 'react';
import SummaryNav from '../SummaryNav/summaryNav';
import SummaryFilters from '../SummaryFilters/summaryFilters';
import SummaryList from '../SummaryList/summaryList';
import './summary.css';

class Summary extends Component {

    render() {
        return (
            <div>
                <SummaryNav />
                <div className="summary">
                    <h1 className="summary-title">Expenses Summary</h1>
                    <SummaryFilters />
                    <SummaryList />
                </div>
            </div>
        );
    }
}

export default Summary;