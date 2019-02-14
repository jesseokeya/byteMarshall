import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Nav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logInModal: '',
            signUpModal: '',
            user: null
        }
        this.displayLoginModal = this.displayLoginModal.bind(this)
        this.displaySignUpModal = this.displaySignUpModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.logIn = this.logIn.bind(this)
        this.signUp = this.signUp.bind(this)
    }

    displaySignUpModal() {
        this.setState({
            signUpModal: 'is-active',
            logInModal: ''
        })
    }

    displayLoginModal() {
        this.setState({
            signUpModal: '',
            logInModal: 'is-active'
        })
    }

    closeModal() {
        this.setState({
            signUpModal: '',
            logInModal: ''
        })
    }

    logIn() { }

    signUp() { }

    render() {
        return (
            <div>
                <nav className="navbar" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <Link className="navbar-item" to="/">
                            <img src="/favicon.ico" alt="logo" width="35" height="80" />
                        </Link>

                        <a type="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>

                    <div id="navbarBasicExample" className="navbar-menu">
                        <div className="navbar-start">
                            <Link to="/" className="navbar-item">
                                Home
                        </Link>
                            <Link to="/editor" className="navbar-item">
                                Editor
                        </Link>
                        </div>

                        <div className="navbar-end">
                            <div className="navbar-item">
                                <div className="buttons">

                                    <button className="button is-primary" onClick={this.displaySignUpModal}>
                                        <strong>Sign up</strong>
                                    </button>
                                    <button className="button is-info" onClick={this.displayLoginModal}>
                                        Log in
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                { /* Login Up Modal*/}
                <div id="signUpModal" className={`modal ${this.state.logInModal}`}>
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Log In</p>
                            <button className="delete" onClick={this.closeModal}></button>
                        </header>
                        <section className="modal-card-body">
                            <br />
                            <div className="control has-icons-left has-icons-right">
                                <input className="input is-medium" type="email" placeholder="Email" />
                                <span className="icon is-left">
                                    <i className="fas fa-envelope"></i>
                                </span>
                            </div>
                            <br />
                            <div className="control has-icons-left has-icons-right">
                                <input className="input is-medium" type="password" placeholder="Password" />
                                <span className="icon is-left">
                                    <i className="fas fa-lock"></i>
                                </span>
                            </div>
                            <br />
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-success" onClick={this.logIn}>Submit</button>
                            <button className="button" onClick={this.closeModal}>Cancel</button>
                        </footer>
                    </div>
                </div>
                { /* Sign Up Modal*/}
                <div id="logInModal" className={`modal ${this.state.signUpModal}`}>
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Sign Up</p>
                            <button className="delete" onClick={this.closeModal}></button>
                        </header>
                        <section className="modal-card-body">
                            <br />
                            <div className="control has-icons-left has-icons-right">
                                <input className="input is-medium" type="username" placeholder="Username" />
                                <span className="icon is-left">
                                    <i className="fas fa-user"></i>
                                </span>
                            </div>
                            <br />
                            <div className="control has-icons-left has-icons-right">
                                <input className="input is-medium" type="email" placeholder="Email" />
                                <span className="icon is-left">
                                    <i className="fas fa-envelope"></i>
                                </span>
                            </div>
                            <br />
                            <div className="control has-icons-left has-icons-right">
                                <input className="input is-medium" type="password" placeholder="Password" />
                                <span className="icon is-left">
                                    <i className="fas fa-lock"></i>
                                </span>
                            </div>
                            <br />
                            <div className="control has-icons-left has-icons-right">
                                <input className="input is-medium" type="confirmPassword" placeholder="Confirm Password" />
                                <span className="icon is-left">
                                    <i className="fas fa-lock"></i>
                                </span>
                            </div>
                            <br />
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-success" onClick={this.signUp}>Submit</button>
                            <button className="button" onClick={this.closeModal}>Cancel</button>
                        </footer>
                    </div>
                </div>
            </div>
        )
    }
}

export { Nav }