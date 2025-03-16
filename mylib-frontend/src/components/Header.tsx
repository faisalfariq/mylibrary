import React from "react";

const Header: React.FC = () => {

    const handleLogout = ()=>{
        return true;
    }
    return(
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
                            <img alt="image" src={'img/avatar/avatar-1.png'} className="rounded-circle mr-1"/>
                            {/* <div className="d-sm-none d-lg-inline-block">Hi, {{ auth()->user()->name }}</div> */}
                            <div className="d-sm-none d-lg-inline-block">Hi, Faisal{}</div>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                            <div className="dropdown-divider"></div>
                            {/* <a href="#" onClick="document.getElementById('logout-form').submit();" */}
                            <a href="#" onClick={handleLogout}
                                className="dropdown-item has-icon text-danger">
                                <i className="fas fa-sign-out-alt"></i> Logout
                            </a>
                            <form action="{{ route('logout') }}" id="logout-form" method="POST" className="d-none">
                            </form>
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Header;