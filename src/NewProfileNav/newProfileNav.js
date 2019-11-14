import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './newProfileNav.css';

class NewProfileNav extends Component {
    render() {
        return (
            <div className="new-profile-nav">
                <ul className="new-profile-nav-ul">
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

export default NewProfileNav;