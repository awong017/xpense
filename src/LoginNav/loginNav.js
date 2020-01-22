import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './loginNav.css';

class LoginNav extends Component {
    render() {
        return (
            <div className="login-nav">
                <ul className="login-nav-ul">
                    <li className="login-nav-li">
                        <Link to={"/"}>
                            Xpense
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default LoginNav;