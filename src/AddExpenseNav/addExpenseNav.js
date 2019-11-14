import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './addExpenseNav.css';

class AddExpenseNav extends Component {
    render() {
        return (
            <div className="add-expense-nav">
                <ul className="add-expense-nav-ul">
                    <li>
                        <Link to={"/home"}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to={"/profile"}>
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link to={"/summary"}>
                            Summary
                        </Link>
                    </li>
                    <li>
                        <Link to={"/"}>
                            Log Out
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default AddExpenseNav;