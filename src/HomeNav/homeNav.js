import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext';
import './homeNav.css';

class HomeNav extends Component {

    static contextType = ApiContext;

    render() {

        const { handleLogout } = this.context;

        return (

            <div className="home-nav">
                <ul className="home-nav-ul">
                    <li className="home-nav-li">
                        <Link to={"/profile"}>
                            Profile
                        </Link>
                    </li>
                    <li className="home-nav-li">
                        <Link to={"/summary"}>
                            Summary
                        </Link>
                    </li>
                    <li className="home-nav-li">
                        <Link 
                            to={"/"}
                            onClick={() => handleLogout()}>
                            Log Out
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default HomeNav;