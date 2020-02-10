import React, { Component } from 'react';
import ProfileNav from '../ProfileNav/profileNav';
import './profile.css';
import ApiContext from '../ApiContext';

class Profile extends Component {

    static contextType = ApiContext;

    state = {
        error: null
    }

    updateProfile = (budget, timeFrame) => {
        this.setState({
            budget: budget,
            timeFrame: timeFrame,
        })
    }

    hidePassword = (password) => {
        let transformation = password.split('').map(() => "x");
        return transformation.join('');
    }

    render() {

        const { currentUser, budgetError, timeFrameError, handleUpdateProfile } = this.context;
        const { budget, timeFrame } = this.state;

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
                            <p className="user-info" type="password">{this.hidePassword(currentUser.password)}</p>
                        </div>
                        <div className="profile-budget">
                            <label className="profile-label">Budget: </label>
                            <p className="dollar-sign">$</p>
                            <input type="text" className="budget-input" onChange={(e) => this.updateProfile(e.target.value, timeFrame)} placeholder="USD"></input>
                            <p className="budget-text">per</p>
                            <select className = "budget-timeframe" onChange={(e) => this.updateProfile(budget, e.target.value)}>
                                <option>--Select Time--</option>
                                <option>Day</option>
                                <option>Week</option>
                                <option>Month</option>
                                <option>Year</option>
                            </select>
                            <div className="error">{budgetError}</div>
                            <div className="error">{timeFrameError}</div>
                        </div>
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