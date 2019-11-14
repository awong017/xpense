import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './profileNav.css';

class ProfileNav extends Component {
    render() {
        return (
            <div className="profile-nav">
                <ul className="profile-nav-ul">
                    <li>
                        <Link to={"/home"}>
                            Home
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

export default ProfileNav;
