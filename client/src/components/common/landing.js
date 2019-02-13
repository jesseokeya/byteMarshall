import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/app.css'

class Landing extends Component {
    componentDidMount() {
        const urlParams = new URLSearchParams(window.location.search)
        const query = urlParams.get('to')
        if (query && query.length > 0) {
            this.props.history.push(`/${query}`)
        }
    }

    render() {
        return (
            <div className="content-wrapper">
                <section className="hero is-landing is-large">
                    <div className="hero-body">
                        <div className="container has-text-centered">

                            <div className="columns">
                                <div className="column is-6 is-offset-3">
                                    <h1 className="title is-1">
                                        ByteMarshall
                                    </h1>
                                    <h2 className="subtitle is-4">
                                        A realtime collaborative runtime environment for your favourite programming languages
                                    </h2>
                                    <br />
                                    <figure className="image">
                                        <Link to={'/editor'} href="/" className="button is-primary is-large is-outlined">
                                            <span>View Editor</span>
                                            <span className="icon">
                                                <i className="fas fa-arrow-right"></i>
                                            </span>
                                        </Link>
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="bg-light">
                    <div className="container section">
                        <div className="content has-text-centered">
                            <h1>Features you love</h1>
                        </div>

                        <nav className="columns">
                            <div className="column has-text-centered">
                                <article className="media">
                                    <figure className="media-left">
                                        <span className="icon has-text-danger">
                                            <i className="far fa-smile-wink fa-3x"></i>
                                        </span>
                                    </figure>
                                    <div className="media-content">
                                        <div className="content">
                                            <h4 className="heading"><strong>Free</strong></h4>
                                            <p>ByteMarshall is easy and free to use start now and learn more effectively
                                        </p>
                                        </div>
                                    </div>
                                </article>
                            </div>

                            <div className="column has-text-centered">
                                <article className="media">
                                    <figure className="media-left">
                                        <span className="icon has-text-danger">
                                            <i className="fas fa-user-friends fa-3x"></i>
                                        </span>
                                    </figure>
                                    <div className="media-content">
                                        <div className="content">
                                            <h4 className="heading"><strong>Collaborative</strong></h4>
                                            <p>You could work on programming problems with your friends under in reltime on different screens
                                        </p>
                                        </div>
                                    </div>
                                </article>
                            </div>
                            <div className="column has-text-centered">
                                <article className="media">
                                    <figure className="media-left">
                                        <span className="icon has-text-danger">
                                            <i className="fas fa-check-circle fa-3x"></i>
                                        </span>
                                    </figure>
                                    <div className="media-content">
                                        <div className="content">
                                            <h4 className="heading"><strong>Simple</strong></h4>
                                            <p>Simple user experience and multple themes and languages are supported on one page which makes it very easy to use </p>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </nav>
                    </div>
                </section>

                <section className="bg-white">
                    <div className="container section">
                        <div className="columns is-vcentered">
                            <div className="column">
                                <figure className="image">
                                    <img src="/assets/img/screenshot.png" alt="" />
                                </figure>
                            </div>
                            <div className="column ">
                                <div className="content">
                                    <h1>Discover your editor</h1>
                                    <p>Discover what a more pleasant programming experience feels like  </p>
                                    <Link to={'/editor'} href="/" className="button is-danger">Discover</Link>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                <footer className="footer">
                    <div className="container">
                        <div className="content has-text-centered">
                            <p>
                                Built
                                with
                                <span className="icon has-text-danger">
                                    <i className="fas fa-heart"></i>
                                </span>
                                by <a href="http://jesseokeya.com">Jesse Okeya</a> @ {new Date().getFullYear()}.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}

export { Landing }