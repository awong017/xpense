import React, {Component} from 'react';
import HomeNav from '../HomeNav/homeNav';
import ExpenseChart from '../ExpenseChart/expenseChart';
import ApiContext from '../ApiContext';
import './home.css';

class Home extends Component {

    static contextType = ApiContext;

    budgetStanding = (spent, budget) => {
        if(spent<budget) {
            return `Thats $${budget-spent} under your budget! Keep it up!`
        }
        else
        {
            return `Thats $${budget-spent} over your budget! Watch out!`
        }
    }

    render() {

        const { currentUser, expenses, budget, categories, goals } = this.context;

        const allCosts = expenses.map(expense => expense.cost);
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
                        You have spent ${reformattedTotal} this week.
                    </section>
                    <section className="budget-dollars">
                        {this.budgetStanding(parseInt(reformattedTotal), budget)}
                    </section>
                </div>
                <button onClick={() => console.log(this.context.categories)}>reformatted total</button>
                <button onClick={() => console.log(budget[0].budget)}>budget</button>
                <ExpenseChart />
            </div>
        )
    }
}

export default Home;