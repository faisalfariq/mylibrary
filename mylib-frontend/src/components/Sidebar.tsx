import React from "react";

const Sidebar: React.FC = () => {
    return(
        <>
            <div className="main-sidebar sidebar-style-2">
                <aside id="sidebar-wrapper">
                    <div className="sidebar-brand">
                        <a href="/" className="text-primary">My Library</a>
                    </div>
                    <ul className="sidebar-menu">
                        {/* <li className="nav-item">
                            <a href="/" className="nav-link"><i className="fas fa-book"></i><span>Books</span></a>
                        </li> */}
                    </ul>
                </aside>
            </div>
        </>
    )
}

export default Sidebar;