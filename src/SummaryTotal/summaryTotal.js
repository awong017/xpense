import React, {Component} from 'react';
import ApiContext from '../ApiContext';
import './summaryTotal.css';

class SummaryTotal extends Component {

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

        const allCosts = this.listedExpenses(currentCategory, filteredExpenses).map(expense => expense.cost);
        const total = allCosts.reduce((accumulator, currentValue) => {
            return accumulator + currentValue
        }, 0)
        const reformattedTotal = (Math.round(total*100)/100).toFixed(2);

        return (
            <div className="summary-total">
                <h3>Total: ${reformattedTotal}</h3>
            </div>
        );
    }
}

export default SummaryTotal;