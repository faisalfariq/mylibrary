import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path: string) => location.pathname.startsWith(path) ? "active" : "";

    return (
        <div className="main-sidebar sidebar-style-2">
            <aside id="sidebar-wrapper">
                <div className="sidebar-brand">
                    <a type="button" onClick={() => navigate('/')} className="text-primary">My Library</a>
                </div>
                <ul className="sidebar-menu">
                    <li className={`nav-item ${isActive("/books")}`}>
                        <a type="button" onClick={() => navigate('/books')} className="nav-link"><i className="fas fa-book"></i><span>Books</span></a>
                    </li>
                </ul>
            </aside>
        </div>
    )
}

export default Sidebar;