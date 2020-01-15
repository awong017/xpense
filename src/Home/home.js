import React, {Component} from 'react';
import HomeNav from '../HomeNav/homeNav';
import ExpenseChart from '../ExpenseChart/expenseChart';
import ApiContext from '../ApiContext';
import './home.css';

class Home extends Component {

    static contextType = ApiContext;

    amountSpent = (timeFrame, spent) => {
        if(timeFrame.toLowerCase() === 'day') {
            return `You have spent ${spent} today.`
        }
        else
        {
            return `You have spent ${spent} this ${timeFrame.toLowerCase()}.`
        }
    }

    budgetStanding = (spent, budget) => {
        if(spent<budget) {
            return `Thats $${(budget-spent).toFixed(2)} under your budget! Keep it up!`
        }
        else
        {
            return `Thats $${Math.abs(budget-spent).toFixed(2)} over your budget! Watch out!`
        }
    }

    expensesTotal = (timeFrame, expenses) => {
        if(timeFrame.toLowerCase() === 'day') {
            const filteredItems = expenses.filter((expense) => {
                return expense.date >= Date.now()-100000000
            })
            return filteredItems
        }
        else if(timeFrame.toLowerCase() === 'week') {
            const filteredItems = expenses.filter((expense) => {
                return expense.date >= Date.now()-700000000
            })
            return filteredItems
        }
        else if(timeFrame.toLowerCase() === 'month') {
            const filteredItems = expenses.filter((expense) => {
                return expense.date >= Date.now()-3000000000
            })
            return filteredItems
        }
        else if(timeFrame.toLowerCase() === 'year') {
            const filteredItems = expenses.filter((expense) => {
                return expense.date >= Date.now()-36500000000
            })
            return filteredItems
        }
    }

    render() {

        const { currentUser, expenses, budget, categories, goals } = this.context;

        const allCosts = this.expensesTotal(budget.timeFrame, expenses).map(expense => expense.cost);
        const total = allCosts.reduce((accumulator, currentValue) => {
            return accumulator + currentValue
        }, 0)
        const reformattedTotal = (Math.round(total*100)/100).toFixed(2);

        // const checkBudgetCategory = goals.some((goal) => {
        //     return goal.category.toLowerCase() === category.toLowerCase()
        // })

        // if(checkBudgetCategory === true) {
        //     const findBudgetCategory = goals.find((goal) => {
        //     return goal.category.toLowerCase() === category.toLowerCase()
        //     })

        //     const filteredExpenses = expenses.filter((expense) => {
        //     return expense.category.toLowerCase() === category.toLowerCase()
        //     })
        //     const filteredExpenseCosts = filteredExpenses.map((expense) => {
        //     return expense.cost
        //     })
        //     const total = filteredExpenseCosts.reduce((accumulator, currentValue) => {
        //     return accumulator + currentValue
        //     }, 0)

        //     const reformattedTotal = (Math.round(total*100)/100).toFixed(2);
            
        //     if(findBudgetCategory.amount >= reformattedTotal) {
        //     const categoryTotal = findBudgetCategory.amount - reformattedTotal
        //     const reformattedCategoryTotal = (Math.round(categoryTotal*100)/100).toFixed(2);
        //     }
        //     else
        //     {
        //     const categoryTotal = reformattedTotal - findBudgetCategory.amount
        //     const reformattedCategoryTotal = (Math.round(categoryTotal*100)/100).toFixed(2);
        //     }
        // }

        return (
            <div className="home">
                <HomeNav/>
                <div className="home-main">
                    <div className="welcome">
                        <h1>Welcome {currentUser.userName}!</h1>
                    </div>
                    <section className="dollars-spent">
                        {this.amountSpent(budget.timeFrame, reformattedTotal)}
                    </section>
                    <section className="budget-dollars">
                        {this.budgetStanding(parseFloat(reformattedTotal), budget.budget)}
                    </section>
                </div>
                <ExpenseChart />
            </div>
        )
    }
}

export default Home;