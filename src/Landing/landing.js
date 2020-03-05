import React, {Component} from 'react';
import LandingNav from '../LandingNav/landingNav';
import ApiContext from '../ApiContext';
import HowItWorks from './images/how-it-works.png';
import ViewExpenses from './images/view-expenses.png';
import KnowWhereYouStand from './images/know-where-you-stand.png';
import OrganizeYourExpenses from './images/organize-your-expenses.png';
import './landing.css';

class Landing extends Component {

    static contextType = ApiContext;

    render() {
        return (
            <div className="landing-page">
                <LandingNav />
                <div className="landing">
                    <header className="header">
                        <h1 className="landing-title">Xpense</h1>
                        <p className="landing-heading">Budgeting made simple</p>
                    </header>
                    <section className="landing-section how-it-works">
                        <h2 className="landing-section-heading">How It Works</h2>
                        <div className="content-one">
                            <p className="how-it-works-text">Xpense is an app where you will be able to keep track of your daily expenses. 
                            Xpense will bring awareness to a users spending habits, resulting 
                            in more money in your pocket and achieving a happier lifestyle!</p>
                            <img src={HowItWorks} 
                            className="image-one"
                            alt="expenses graphic 1"/>
                        </div>
                    </section>
                    <section className="landing-section view-expenses">
                        <h2 className="landing-section-heading">View Expenses with Ease</h2>
                        <div className="content-two">
                            <img src={ViewExpenses}
                            className="image-two"
                            alt="expenses graphic 2"/>
                            <p className="view-expenses-text">Be able to look at all of your expenses with the Expense Summary.</p>
                        </div>
                    </section>
                    <section className="landing-section know-where-you-stand">
                        <h2 className="landing-section-heading">Know Where You Stand</h2>
                        <div className="content-three">
                            <p className="know-where-you-stand-text">See if you fall within your budget as soon as you log in by setting
                            your budget on your profile page.</p>
                            <img src={KnowWhereYouStand} 
                            className="image-three" 
                            alt="expenses graphic 3"/>
                        </div>
                    </section>
                    <section className="landing-section organize-your-expenses">
                        <h2 className="landing-section-heading">Organize Your Expenses</h2>
                        <div className="content-four">
                            <img src={OrganizeYourExpenses} 
                            className="image-four"
                            alt="expenses graphic 4"/>
                            <p className="organize-your-expenses-text">Easily categorize your expenses by creating your own custom categories
                            that best describes your purchases and group them with the available filters.</p>
                        </div>
                    </section>
                    <button className="sign-up-button" 
                        onClick={() => this.props.history.push("/login")}>
                        Sign Up!  
                    </button>
                </div>
            </div>
        )
    }
}

export default Landing;