import React, {Component} from 'react';
import HomeNav from '../HomeNav/homeNav';
import ExpenseChart from '../ExpenseChart/expenseChart';
import ApiContext from '../ApiContext';
import './home.css';

class Home extends Component {

    static contextType = ApiContext;

    render() {

        const { currentUser, expenses, budget } = this.context;

        const allCosts = expenses.map(expense => expense.cost);
        const total = allCosts.reduce((accumulator, currentValue) => {
            return accumulator + currentValue
        }, 0)
        const reformattedTotal = (Math.round(total*100)/100).toFixed(2);

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
                        That is x dollars under your budget! Keep it up!
                    </section>
                </div>
                <ExpenseChart />
            </div>
        )
    }
}

export default Home;