import React, { Component } from 'react'

class Nav extends Component {
    render() {
        return (
            <div className="nav-wrapper">
                <nav className="navbar" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="/">
                            <img src="https://image.flaticon.com/icons/svg/1410/1410345.svg" alt="logo" width="30" height="30" />
                            <b className="nav-title">ByteMarshall</b>
                        </a>
                        <div id="navbarBasicExample" className="navbar-menu text-right">
                            <button className="button is-primary">
                                <span>Login</span>
                                <span className="icon">
                                    <i className="fas fa-sign-in-alt"></i>
                                </span>
                            </button>
                            <button className="button is-info shift-right">
                                <span>Signup</span>
                                <span className="icon">
                                    <i className="fas fa-sign-out-alt"></i>
                                </span>
                            </button>
                        </div>
                        <a href="/" role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>
                </nav>
            </div>
        )
    }
}

export { Nav }