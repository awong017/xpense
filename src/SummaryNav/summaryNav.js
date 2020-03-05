import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './summaryNav.css';

class SummaryNav extends Component {
    render() {
        return (
            <div className="nav">
                <ul className="summary-nav-ul">
                    <li className="summary-nav-li">
                        <Link to={"/home"}>
                            Home
                        </Link>
                    </li>
                    <li className="summary-nav-li">
                        <Link to={"/profile"}>
                            Profile
                        </Link>
                    </li>
                    <li className="summary-nav-li">
                        <Link to={"/add"}>
                            Add Expense
                        </Link>
                    </li>
                    <li className="summary-nav-li">
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