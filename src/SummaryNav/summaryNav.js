import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './summaryNav.css';

class SummaryNav extends Component {
    render() {
        return (
            <div className="summary-nav">
                <ul className="summary-nav-ul">
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
                        <Link to={"/add"}>
                            Add Expense
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

export default SummaryNav;