import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './landingNav.css';

class LandingNav extends Component {
    render() {
        return (
            <div className="landing-nav">
                <ul className="landing-nav-ul">
                    <li>
                        <Link to={"/"}>
                            Xpense
                        </Link>
                    </li>
                    <li>
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