import { NavLink } from 'react-router-dom';
import '../assets/NavBar.css';
import AULogo from '../assets/Aurora_spartans_logo.png';

function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">

                <NavLink className="navbar-brand" to="/">
                    <img
                        src={AULogo}
                        alt="Aurora CS Logo"
                        className="navbar-logo"
                    />
                </NavLink>

                <span className="navbar-title">
                    Aurora CS Course Scheduler
                </span>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" end>
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">
                                About
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;