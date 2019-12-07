import React, { Component } from 'react';
import NewProfileNav from '../NewProfileNav/newProfileNav';
import './newProfile.css';
import ApiContext from '../ApiContext';

class NewProfile extends Component {

    static contextType = ApiContext;

    state = {
        error: null
    }

    updateProfile = (budget, goal1, category1, goal2, category2) => {
        this.setState({
            budget: budget,
            goal1: goal1,
            category1: category1,
            goal2: goal2,
            category2: category2
        })
    }

    render() {

        const { budgetError, goalError, handleSave } = this.context;
        const { budget, goal1, category1, goal2, category2 } = this.state;

        return (
            <div>
                <NewProfileNav />
                <div className="new-profile">
                    <form className="new-profile-form" onSubmit={(e) => handleSave(e, budget, goal1, category1, goal2, category2)}>
                        <legend className="new-profile-legend"><h2>Before we begin, lets set some goals</h2></legend>
                        <div>
                            <label className="new-profile-label">Weekly Budget: </label>
                            <p className="dollar-sign">$</p>
                            <input type="text" className="dollar-input" onChange={(e) => this.updateProfile(e.target.value, goal1, category1, goal2, category2)} placeholder="Amount in USD"></input>
                            <div className="error">{budgetError}</div>
                        </div>
                        <div className="goals-section">
                            <label className="goals-label">Goals: </label>
                            <div className="goal">
                                <p className="goal-text-1">1) I would like to spend less than</p>
                                <p className="goal-dollar-sign">$</p>
                                <input type="text" className="goal-input" onChange={(e) => this.updateProfile(budget, e.target.value, category1, goal2, category2)} placeholder="Amount in USD"></input>
                                <p className="goal-text-2">on</p>
                                <input type="text" className="goal-input goal-category-input" onChange={(e) => this.updateProfile(budget, goal1, e.target.value, goal2, category2)} placeholder="Create Category"></input>
                                <div className="error">{goalError}</div>
                            </div>
                            <div className="goal">
                                <p className="goal-text-1">2) I would like to spend less than</p>
                                <p className="goal-dollar-sign">$</p>
                                <input type="text" className="goal-input" onChange={(e) => this.updateProfile(budget, goal1, category1, e.target.value, category2)} placeholder="Amount in USD"></input>
                                <p className="goal-text-2">on</p>
                                <input type="text" className="goal-input goal-category-input" onChange={(e) => this.updateProfile(budget, goal1, category1, goal2, e.target.value)} placeholder="Create Category"></input>
                                <div className="error">{goalError}</div>
                            </div>
                        </div>
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