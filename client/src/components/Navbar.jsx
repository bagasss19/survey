import React from 'react'
import {
    Link,
} from "react-router-dom";
import Logo from '../Assets/tandai_hires.png'

export default function Navbar() {
    //admin login
    if (localStorage.token) {
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation" style={{ position: 'sticky', top: 0, backgroundColor: "#ffffff" }}>
                <div className="navbar-brand" style={{ position: "absolute", marginTop: "10px", marginLeft: "10px" }}>
                    <Link to="/"><img src="https://bulma.io/images/bulma-logo.png" alt="navbar" width="112" height="28" /></Link>
                </div>

                <div className="navbar-end" style={{ width: "300px" }} >
                    {/* <Link to="/package"><p style={{ marginTop: "10px" }}>{(() => {
                        switch (localStorage.paket) {
                            case "starter": return <span className="tag is-dark is-medium">Starter</span>
                            case "pro": return <span className="tag is-warning is-medium">Pro</span>
                            default: return <h5>Not Confirmed</h5>;
                        }
                    })()}</p>
                    </Link> */}

                    <div className="navbar-item has-dropdown is-hoverable">
                        <p className="navbar-link">
                            <img src="https://stickerly.pstatic.net/sticker_pack/hlmWGXRBp4SiGY7Y5ZqCHQ/VQG4JY/2/aa5ea56b-64ad-4779-9e30-0af35c43def3.png" alt="profil" style={{ margin: "auto", marginRight: "5px" }} />
                            {localStorage.username}
                        </p>

                        <div className="navbar-dropdown">
                            <Link to="/profile">
                                <p className="navbar-item profile">
                                    Profile
                                </p>
                            </Link>

                            <Link to="/faq">
                                <p className="navbar-item profile">
                                    Documentation
                                </p>
                            </Link>
                            <hr className="navbar-divider" />
                            <p className="navbar-item logout"
                                onClick={(e) => {
                                    e.preventDefault()
                                    localStorage.clear()
                                    window.location.reload();
                                }}>
                                <p style={{ color: "#CB3A31", fontWeight: "bold", textAlign: "left", cursor: "pointer" }}>Logout</p>
                            </p>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }

    //logout
    else {
        return (
            <></>
        )
    }
}