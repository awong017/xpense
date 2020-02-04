import React, {Component} from 'react';
import LandingNav from '../LandingNav/landingNav';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext';
import './landing.css';

class Landing extends Component {

    static contextType = ApiContext;

    render() {
        return (
            <div className="entire-page">
                <LandingNav />
                <div className="landing">
                    <h1 className="landing-title">Xpense</h1>
                    <p className="landing-heading">Budgeting made simple</p>
                    
                    <section className="landing-section how-it-works">
                        <h2 className="landing-section-heading">How It Works</h2>
                        <p className="how-it-works-text">Xpense is an app where you will be able to keep track of your daily expenses. Xpense will bring awareness to a users spending habits, resulting 
                        in more money in your pocket and achieving a happier lifestyle!</p>
                    </section>

                    <section className="landing-section view-expenses">
                        <h2 className="landing-section-heading">View Expenses with Ease</h2>
                        <p>Be able to look at all of your expenses with the Expense Summary</p>
                    </section>

                    <section className="landing-section know-where-you-stand">
                        <h2 className="landing-section-heading">Know Where You Stand Right Away</h2>
                        <p>See if you fall within your budget as soon as you log in by setting
                        your budget on your profile page</p>
                    </section>

                    <section className="landing-section organize-your-expenses">
                        <h2 className="landing-section-heading">Organize Your Expenses</h2>
                        <p>Easily categorize your expenses by creating your own custom categories
                        that best describes your purchases and group them with the available filters</p>
                        <div className="landing-image-4"></div>
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