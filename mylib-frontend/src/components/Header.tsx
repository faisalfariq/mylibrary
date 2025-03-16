import React from "react";
import avatar from '../../public/img/avatar/avatar-1.png';

const Header: React.FC = () => {

    return (
        <>
            <div className="navbar-bg"></div>
            <nav className="navbar navbar-expand-lg main-navbar">
                <form className="form-inline mr-auto">
                    <ul className="navbar-nav mr-3">
                        <li><a href="#" data-toggle="sidebar" className="nav-link nav-link-lg"><i className="fas fa-bars"></i></a></li>
                    </ul>
                </form>
                <ul className="navbar-nav navbar-right">
                    <li className="dropdown"><a href="#" data-toggle="dropdown"
                        className="nav-link dropdown-toggle nav-link-lg nav-link-user">
                        <img alt="image" src={avatar} className="rounded-circle mr-1" />
                        <div className="d-sm-none d-lg-inline-block">Admin</div>
                    </a>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Header;