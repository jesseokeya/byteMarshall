import React, { Component } from 'react';
import { isEmpty } from 'lodash'
import { split as SplitAceEditor } from 'react-ace';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import socketIOClient from "socket.io-client";
import { getLanguageTemplates, getServer } from '../../util';
import { compileCode } from '../../actions/compileAction';
import 'brace/ext/language_tools';

import 'brace/mode/jsx';
import 'brace/ext/searchbox';

const languages = [
    'javascript',
    'python',
    'golang'
];

const themes = [
    'monokai',
    'github',
    'tomorrow',
    'kuroir',
    'twilight',
    'xcode',
    'textmate',
    'solarized_dark',
    'solarized_light',
    'terminal',
];

const socket = socketIOClient(getServer())

socket.on('connected', data => console.log(data))

languages.forEach(lang => {
    require(`brace/mode/${lang}`);
    require(`brace/snippets/${lang}`);
});

themes.forEach(theme => {
    require(`brace/theme/${theme}`);
});

class ByteMarshallEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            splits: 2,
            orientation: 'beside',
            value: [],
            theme: 'solarized_dark',
            mode: 'javascript',
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            laoding: false,
            fontSize: 14,
            showGutter: true,
            showPrintMargin: true,
            highlightActiveLine: true,
            enableSnippets: true,
            showLineNumbers: true,
            useWorker: false,
            hasSaved: false
        };
        this.setTheme = this.setTheme.bind(this);
        this.setMode = this.setMode.bind(this);
        this.onChange = this.onChange.bind(this);
        this.setBoolean = this.setBoolean.bind(this);
        this.setOrientation = this.setOrientation.bind(this);
        this.handleCompile = this.handleCompile.bind(this)
    }

    onLoad(editor) {
        const sp = editor.$editors[1]
        sp.getSession().setUseWorker(false)
    }

    onChange(newValue) {
        if (newValue.join().trim() !== this.state.value.join().trim()) {
            this.setState({
                value: newValue,
            }, _ => socket.emit('stateChanged', { ...this.state }))
        }
    }

    setTheme(e) {
        this.setState({
            theme: e.target.value,
        }, _ => socket.emit('stateChanged', { ...this.state }));
    }

    setMode(e) {
        const languageTemplates = getLanguageTemplates()
        this.setState({ mode: e.target.value }, _ => socket.emit('stateChanged', { ...this.state }));
        this.setState({ value: [languageTemplates[e.target.value], this.state.value[1]] })
    }

    setBoolean(name, value) {
        this.setState({
            [name]: value,
        });
    }

    setOrientation(e) {
        this.setState({
            orientation: e.target.value,
        }, _ => socket.emit('stateChanged', { ...this.state }));
    }

    componentDidMount() {
        const urlParams = new URLSearchParams(window.location.search)
        const session = urlParams.get('session')
        if (session && session.length > 0) {
            this.setState({ session })
        } else {
            this.props.history.push(`/editor?session=${localStorage.getItem('session')}`)
        }
        const targets = document.getElementsByClassName('ace_editor')
        const target = targets[2]
        if (target) {
            target.classList.add('disable-div')
        }
        const languageTemplates = getLanguageTemplates()
        let settings = localStorage.getItem('settings')
        let cache = localStorage.getItem('languageTemplates'), defaultValue
        let result = this.props.compiled.result || ''
        if (!isEmpty(result)) {
            if (this.props.compiled.result.stdout) {
                result = this.props.compiled.result.stdout
            }
        }
        if (!cache) {
            cache = JSON.parse(cache)
            defaultValue = [
                languageTemplates && languageTemplates[this.state.mode]
                    ? languageTemplates[this.state.mode]
                    : `const welcome = 'Hello World!';\nconsole.log(welcome);`,
                result || `${cache && cache.javascript ? 'Output: ' : 'Output: Hello World!'}`
            ]
        } else {
            cache = JSON.parse(cache)
            settings = JSON.parse(settings)
            const mode = settings.mode ? settings.mode : this.state.mode
            defaultValue = [
                languageTemplates && languageTemplates[mode]
                    ? languageTemplates[mode]
                    : `const welcome = 'Hello World!';\nconsole.log(welcome);`,
                result || `${cache.javascript ? 'Output: ' : 'Output: Hello World!'}`
            ]
        }
        if (settings) {
            settings = typeof settings === 'string' ? JSON.parse(settings) : settings
            this.setState({ ...settings })

        }
        this.setState({ value: defaultValue }, () => this.handleCompile())
        this.setState({ loading: this.props.compiled.loading })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ loading: nextProps.compiled.loading })
        const output = nextProps.compiled.result && nextProps.compiled.result.stdout && nextProps.compiled.result.stdout.length > 0
            ? `Output: ${nextProps.compiled.result.stdout}`
            : `${nextProps.compiled.result && nextProps.compiled.result.stderr ? nextProps.compiled.result.stderr : 'Something went wrong!. Check your syntax'}`
        this.setState({ value: [this.state.value[0], output] }, _ => {
            socket.emit('stateChanged', { ...this.state })
            socket.on('updateState', state => {
                if (state.session && this.state.session && state.session === this.state.session) {
                    this.setState({ ...state, loading: false, hasSaved: false }, this.updateStore)
                }
            })
        })
    }

    handleCompile() {
        this.setState({ loading: true })
        this.updateStore()
        this.setState({ hasSaved: true })
        setTimeout(_ => this.setState({ hasSaved: false }), 3000)
        this.props.compileCode({ language: this.state.mode, syntax: this.state.value[0] })
    }

    updateStore() {
        let cached = localStorage.getItem('languageTemplates'), cachedTemplates = {}
        if (cached) {
            cached = JSON.parse(cached)
            cachedTemplates = { ...cached }
            cachedTemplates[this.state.mode] = this.state.value[0]
            localStorage.setItem('languageTemplates', JSON.stringify(cachedTemplates))
        } else {
            cachedTemplates[this.state.mode] = this.state.value[0]
            localStorage.setItem('languageTemplates', JSON.stringify(cachedTemplates))
        }
        const settings = {
            mode: this.state.mode,
            theme: this.state.theme,
            orientation: this.state.orientation
        }
        localStorage.setItem('settings', JSON.stringify(settings))
    }

    notifyUser() {
        return (<div>
            <br />
            <div className="notification is-primary">
                <button className="delete"></button>
                <strong>Code was successfully saved.</strong>
            </div>
        </div>)
    }

    render() {
        return (
            <div className='columns'>
                <div className='column'>
                    <div className='field'>
                        <label>Mode:</label>
                        <p className='control'>
                            <span className='select'>
                                <select name='mode' onChange={this.setMode} value={this.state.mode}>
                                    {languages.map(lang => (
                                        <option key={lang} value={lang}>
                                            {lang}
                                        </option>
                                    ))}
                                </select>
                            </span>
                        </p>
                    </div>

                    <div className='field'>
                        <label>Theme:</label>
                        <p className='control'>
                            <span className='select'>
                                <select name='Theme' onChange={this.setTheme} value={this.state.theme}>
                                    {themes.map(lang => (
                                        <option key={lang} value={lang}>
                                            {lang}
                                        </option>
                                    ))}
                                </select>
                            </span>
                        </p>
                    </div>

                    <div className='field'>
                        <label>Orientation:</label>
                        <p className='control'>
                            <span className='select'>
                                <select name='orientation' onChange={this.setOrientation} value={this.state.orientation}>
                                    {['beside', 'below'].map(lang => (
                                        <option key={lang} value={lang}>
                                            {lang}
                                        </option>
                                    ))}
                                </select>
                            </span>
                        </p>
                    </div>
                    <div className='field'>
                        <p className='control'>
                            <label className='checkbox'>
                                <input
                                    type='checkbox'
                                    checked={this.state.enableBasicAutocompletion}
                                    onChange={e => this.setBoolean('enableBasicAutocompletion', e.target.checked)}
                                /> Enable Basic Autocomplete
                           </label>
                        </p>
                    </div>
                    <div className='field'>
                        <p className='control'>
                            <label className='checkbox'>
                                <input
                                    type='checkbox'
                                    checked={this.state.enableLiveAutocompletion}
                                    onChange={e => this.setBoolean('enableLiveAutocompletion', e.target.checked)}
                                /> Enable Live Autocomplete
                           </label>
                        </p>
                    </div>
                    <div className='field'>
                        <p className='control'>
                            <label className='checkbox'>
                                <input
                                    type='checkbox'
                                    checked={this.state.showGutter}
                                    onChange={e => this.setBoolean('showGutter', e.target.checked)}
                                /> Show Gutter
                           </label>
                        </p>
                    </div>
                    <div className='field'>
                        <p className='control'>
                            <label className='checkbox'>
                                <input
                                    type='checkbox'
                                    checked={this.state.showPrintMargin}
                                    onChange={e => this.setBoolean('showPrintMargin', e.target.checked)}
                                /> Show Print Margin
                           </label>
                        </p>
                    </div>
                    <div className='field'>
                        <p className='control'>
                            <label className='checkbox'>
                                <input
                                    type='checkbox'
                                    checked={this.state.highlightActiveLine}
                                    onChange={e => this.setBoolean('highlightActiveLine', e.target.checked)}
                                /> Highlight Active Line
                           </label>
                        </p>
                    </div>
                    <div className='field'>
                        <p className='control'>
                            <label className='checkbox'>
                                <input
                                    type='checkbox'
                                    checked={this.state.enableSnippets}
                                    onChange={e => this.setBoolean('enableSnippets', e.target.checked)}
                                /> Enable Snippets
                           </label>
                        </p>
                    </div>
                    <div className='field'>
                        <p className='control'>
                            <label className='checkbox'>
                                <input
                                    type='checkbox'
                                    checked={this.state.showLineNumbers}
                                    onChange={e => this.setBoolean('showLineNumbers', e.target.checked)}
                                /> Show Line Numbers
                           </label>
                        </p>
                    </div>
                </div>
                <div className='examples column'>
                    <div className='text-center'>
                        <button id="runButton" onClick={this.handleCompile} className='button is-primary is-rounded'>
                            <span className='text-bold'>Run</span>
                            <span className='icon is-small'>
                                <i className='fas fa-check'></i>
                            </span>
                        </button>
                        {this.state.loading && <div className="loader move-right"></div>}
                        {this.state.hasSaved && this.notifyUser()}
                    </div>
                    <h2 className='text-bold'>Editor</h2>
                    {this.state.value && this.state.value.length > 0 && <SplitAceEditor
                        mode={this.state.mode}
                        orientation={this.state.orientation}
                        splits={this.state.splits}
                        theme={this.state.theme}
                        name='target'
                        onLoad={this.onLoad}
                        debounceChangePeriod={1000}
                        onChange={(newValue) => this.onChange(newValue)}
                        fontSize={this.state.fontSize}
                        useWorker={this.state.useWorker}
                        height='150vh'
                        width={window.innerWidth <= 769 ? '95vw' : '80vw'}
                        showPrintMargin={this.state.showPrintMargin}
                        showGutter={this.state.showGutter}
                        highlightActiveLine={this.state.highlightActiveLine}
                        value={this.state.value}
                        setOptions={{
                            displayIndentGuides: false,
                            enableBasicAutocompletion: this.state.enableBasicAutocompletion,
                            enableLiveAutocompletion: this.state.enableLiveAutocompletion,
                            enableSnippets: this.state.enableSnippets,
                            showLineNumbers: this.state.showLineNumbers,
                            tabSize: 2,
                        }}
                    />}
                </div>
            </div>
        );
    }
}

ByteMarshallEditor.propTypes = {
    compileCode: PropTypes.func.isRequired,
    compiled: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    compiled: state.compiled
});

const Editor = connect(mapStateToProps, { compileCode })(ByteMarshallEditor)

export { Editor }