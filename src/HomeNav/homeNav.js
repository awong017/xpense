import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './homeNav.css';

class HomeNav extends Component {
    render() {

        return (
            <div className="home-nav">
                <ul className="home-nav-ul">
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

export default HomeNav;