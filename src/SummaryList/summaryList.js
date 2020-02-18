import React, {Component} from 'react';
import SummaryItem from '../SummaryItem/summaryItem';
import SummaryTotal from '../SummaryTotal/summaryTotal';
import ApiContext from '../ApiContext';
import './summaryList.css';

class SummaryList extends Component {

    static contextType = ApiContext;

    listedExpenses = (currentCategory, filteredExpenses) => {
        if(currentCategory!=="All" || filteredExpenses.length>0) {
            return this.context.filteredExpenses;
        }
        else
        {
            return this.context.expenses;
        }
    }

    render() {

        const { currentCategory, filteredExpenses } = this.context;

        return (
            <div className="summary-expenses">
                <ul className="summary-list">
                    <li className="summary-list-item">Date</li>
                    <li className="summary-list-item">Name</li>
                    <li className="summary-list-item category-list-item">Category</li>
                    <li className="summary-list-item">Amount</li>
                </ul>
                <div className="summary-item-group">
                    {this.listedExpenses(currentCategory, filteredExpenses).map(expense => 
                        <SummaryItem 
                            key={expense.id}
                            id={expense.id}
                            date={expense.date}
                            name={expense.name}
                            category={expense.category}
                            amount={expense.cost}
                        />
                    )}
                </div>
                <SummaryTotal />
            </div>
        );
    }
}

export default SummaryList;