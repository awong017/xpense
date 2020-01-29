import React, { Component } from 'react';
import ProfileNav from '../ProfileNav/profileNav';
import AddExpenseCategory from '../AddExpenseCategory/addExpenseCategory';
import './profile.css';
import ApiContext from '../ApiContext';

class Profile extends Component {

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

        const { currentUser, categories, budgetError, timeFrameError, goalError, handleUpdateProfile } = this.context;
        const { budget, timeFrame, goal1, category1, goal2, category2 } = this.state;

        return (
            <div>
                <ProfileNav />
                <div className="profile">
                    <form className="profile-form" onSubmit={(e) => handleUpdateProfile(e, budget, timeFrame)}>
                        <legend className="profile-legend"><h2>Profile</h2></legend>
                        <div>
                            <label className="profile-label">Name: </label>
                            <p className="user-info">{currentUser.userName}</p>
                        </div>
                        <div>
                            <label className="profile-label">Password: </label>
                            <p className="user-info" type="password">{currentUser.password}</p>
                        </div>
                        <div className="profile-budget">
                            <label className="profile-label">Budget: </label>
                            <p className="dollar-sign">$</p>
                            <input type="text" className="budget-input" onChange={(e) => this.updateProfile(e.target.value, timeFrame, goal1, category1, goal2, category2)} placeholder="USD"></input>
                            <p className="budget-text">per</p>
                            <select className = "budget-timeframe" onChange={(e) => this.updateProfile(budget, e.target.value, goal1, category1, goal2, category2)}>
                                <option>--Select Time--</option>
                                <option>Day</option>
                                <option>Week</option>
                                <option>Month</option>
                                <option>Year</option>
                            </select>
                            <div className="error">{budgetError}</div>
                            <div className="error">{timeFrameError}</div>
                        </div>
                        {/* <div className="goals-section">
                            <label className="goals-label">Goals: </label>
                            <div className="goal">
                                <p className="goal-text-1">1) I would like to spend less than</p>
                                <p className="goal-dollar-sign">$</p>
                                <input type="text" className="goal-input" onChange={(e) => this.updateProfile(budget, timeFrame, e.target.value, category1, goal2, category2)} placeholder="USD"></input>
                                <p className="goal-text-2">on</p>
                                <div className="category-menu">
                                    <select className="select-category" onChange={(e) => this.updateProfile(budget, timeFrame, goal1, e.target.value, goal2, category2)}>
                                        <option defaultValue>--Select Category--</option>
                                        {categories.map(category =>
                                            <AddExpenseCategory
                                                category={category.name}/>
                                            )}
                                    </select>
                                </div>
                                <div className="error">{goalError}</div>
                            </div>
                            <div className="goal">
                                <p className="goal-text-1">2) I would like to spend less than</p>
                                <p className="goal-dollar-sign">$</p>
                                <input type="text" className="goal-input" onChange={(e) => this.updateProfile(budget, timeFrame, goal1, category1, e.target.value, category2)} placeholder="USD"></input>
                                <p className="goal-text-2">on</p>
                                <div className="category-menu">
                                    <select className="select-category" onChange={(e) => this.updateProfile(budget, timeFrame, goal1, category1, goal2, e.target.value)}>
                                        <option defaultValue>--Select Category--</option>
                                        {categories.map(category =>
                                            <AddExpenseCategory
                                                category={category.name}/>
                                            )}
                                    </select>
                                </div>
                                <div className="error">{goalError}</div>
                            </div>
                        </div> */}
                        <div className="save">
                            <input type="submit" className="save-button" value="Update"/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Profile;