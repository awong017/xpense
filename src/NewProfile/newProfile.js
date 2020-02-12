import React, { Component } from 'react';
import NewProfileNav from '../NewProfileNav/newProfileNav';
import './newProfile.css';
import ApiContext from '../ApiContext';

class NewProfile extends Component {

    static contextType = ApiContext;

    state = {
        error: null
    }

    updateProfile = (budget, timeFrame) => {
        this.setState({
            budget: budget,
            timeFrame: timeFrame
        })
    }

    render() {

        const { budgetError, timeFrameError, handleSaveNewProfile } = this.context;
        const { budget, timeFrame } = this.state;

        return (
            <div>
                <NewProfileNav />
                <div className="new-profile">
                    <form className="new-profile-form" onSubmit={(e) => handleSaveNewProfile(e, budget, timeFrame)}>
                        <legend className="new-profile-legend"><h2>To get started, lets set a goal!</h2></legend>
                        <div>
                            <p className="budget-statement">I want to set a budget of </p>
                            <div className="budget-setting">
                                <span className="dollar-symbol">$</span>
                                <input type="text" className="budget-input" onChange={(e) => this.updateProfile(e.target.value, timeFrame)} placeholder="USD"></input>
                                <p className="budget-text">per</p>
                                <select className="budget-timeframe"  onChange={(e) => this.updateProfile(budget, e.target.value)}>
                                    <option defaultValue>--Select Time--</option>
                                    <option value="day">Day</option>
                                    <option value="week">Week</option>
                                    <option value="month">Month</option>
                                    <option value="year">Year</option>
                                </select>
                            </div>
                            <div className="error">{budgetError}</div>
                            <div className="error">{timeFrameError}</div>
                        </div>
                        <div className="new-profile-save">
                            <input type="submit" className="new-profile-save-button" value="Get Started!"/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default NewProfile;