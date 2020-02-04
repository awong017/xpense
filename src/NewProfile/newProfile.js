import React, { Component } from 'react';
import NewProfileNav from '../NewProfileNav/newProfileNav';
import uuid from 'uuid/v4';
import './newProfile.css';
import ApiContext from '../ApiContext';

class NewProfile extends Component {

    static contextType = ApiContext;

    state = {
        error: null
    }

    updateProfile = (budget, timeFrame, goal1, category1, goal2, category2) => {
        this.setState({
            budget: budget,
            timeFrame: timeFrame,
            goal1: goal1,
            category1: category1,
            goal2: goal2,
            category2: category2
        })
    }

    render() {

        const { budgetError, timeFrameError, goalError, handleSaveNewProfile } = this.context;
        const { budget, timeFrame, goal1, category1, goal2, category2 } = this.state;

        return (
            <div>
                <NewProfileNav />
                <div className="new-profile">
                    <form className="new-profile-form" onSubmit={(e) => handleSaveNewProfile(e, budget, timeFrame, goal1, category1, goal2, category2)}>
                        <legend className="new-profile-legend"><h2>To get started, lets set a goal!</h2></legend>
                        <div>
                            <p className="budget-statement">I want to set a budget of </p>
                            <div className="budget-setting">
                                <span className="dollar-symbol">$</span>
                                <input type="text" className="budget-input" onChange={(e) => this.updateProfile(e.target.value, timeFrame, goal1, category1, goal2, category2)} placeholder="USD"></input>
                                <p className="budget-text">per</p>
                                <select className="budget-timeframe"  onChange={(e) => this.updateProfile(budget, e.target.value, goal1, category1, goal2, category2)}>
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
                        {/* <div className="goals-section">
                            <label className="goals-label">Goals: </label>
                            <div className="goal">
                                <p className="goal-text-1">1) I would like to spend less than</p>
                                <p className="goal-dollar-sign">$</p>
                                <input type="text" className="goal-input" onChange={(e) => this.updateProfile(budget, timeFrame, e.target.value, category1, goal2, category2)} placeholder="Amount in USD"></input>
                                <p className="goal-text-2">on</p>
                                <input type="text" className="goal-input goal-category-input" onChange={(e) => this.updateProfile(budget, timeFrame, goal1, e.target.value, goal2, category2)} placeholder="Create Category"></input>
                                <div className="error">{goalError}</div>
                            </div>
                            <div className="goal">
                                <p className="goal-text-1">2) I would like to spend less than</p>
                                <p className="goal-dollar-sign">$</p>
                                <input type="text" className="goal-input" onChange={(e) => this.updateProfile(budget, timeFrame, goal1, category1, e.target.value, category2)} placeholder="Amount in USD"></input>
                                <p className="goal-text-2">on</p>
                                <input type="text" className="goal-input goal-category-input" onChange={(e) => this.updateProfile(budget, timeFrame, goal1, category1, goal2, e.target.value)} placeholder="Create Category"></input>
                                <div className="error">{goalError}</div>
                            </div>
                        </div> */}
                        <div className="save">
                            <input type="submit" className="save-button" value="Get Started!"/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default NewProfile;