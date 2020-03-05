import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './landingNav.css';

class LandingNav extends Component {
    render() {
        return (
            <div className="nav">
                <ul className="landing-nav-ul">
                    <li className="landing-nav-li">
                        <Link to={"/"}>
                            Xpense
                        </Link>
                    </li>
                    <li className="landing-nav-li">
                        <Link to={"/login"}>
                            Login/Sign Up
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default LandingNav;