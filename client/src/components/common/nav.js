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