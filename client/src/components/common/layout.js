import React, { Component } from 'react';
import { split as SplitAceEditor } from 'react-ace';
import 'brace/ext/language_tools';

import 'brace/mode/jsx';
import 'brace/ext/searchbox';

const languages = [
    'javascript',
    'java',
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

languages.forEach(lang => {
    require(`brace/mode/${lang}`);
    require(`brace/snippets/${lang}`);
});

themes.forEach(theme => {
    require(`brace/theme/${theme}`);
});

const defaultValue = [
    `function onLoad(editor) {
    console.log("i've loaded");
  }`,
    'Output: ',
];

class Layout extends Component {
    onLoad(editor) {
        const sp = editor.$editors[1]
        sp.getSession().setUseWorker(false);
    }

    onChange(newValue) {
        console.log('change', newValue);
        this.setState({
            value: newValue,
        });
    }

    onSelectionChange(newValue, event) {
        console.log('select-change', newValue);
        console.log('select-change-event', event);
    }

    onCursorChange(newValue, event) {
        console.log('cursor-change', newValue);
        console.log('cursor-change-event', event);
    }

    setTheme(e) {
        this.setState({
            theme: e.target.value,
        });
    }

    setMode(e) {
        this.setState({
            mode: e.target.value,
        });
    }

    setBoolean(name, value) {
        this.setState({
            [name]: value,
        });
    }

    setFontSize(e) {
        this.setState({
            fontSize: parseInt(e.target.value, 10),
        });
    }

    setSplits(e) {
        this.setState({
            splits: parseInt(e.target.value, 10),
        });
    }

    setOrientation(e) {
        this.setState({
            orientation: e.target.value,
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            splits: 2,
            orientation: 'beside',
            value: defaultValue,
            theme: 'solarized_dark',
            mode: 'javascript',
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            fontSize: 14,
            showGutter: true,
            showPrintMargin: true,
            highlightActiveLine: true,
            enableSnippets: false,
            showLineNumbers: true,
            useWorker: false
        };
        this.setTheme = this.setTheme.bind(this);
        this.setMode = this.setMode.bind(this);
        this.onChange = this.onChange.bind(this);
        this.setFontSize = this.setFontSize.bind(this);
        this.setBoolean = this.setBoolean.bind(this);
        this.setSplits = this.setSplits.bind(this);
        this.setOrientation = this.setOrientation.bind(this);
    }

    componentDidMount() {
        const targets = document.getElementsByClassName('ace_editor')
        const target = targets[2]
        // target.classList.('ace_editor')
        target.classList.add('disable-div')
    }

    render() {
        return (
            <div className="columns">
                <div className="column">
                    <div className="field">
                        <label>Mode:</label>
                        <p className="control">
                            <span className="select">
                                <select name="mode" onChange={this.setMode} value={this.state.mode}>
                                    {languages.map(lang => (
                                        <option key={lang} value={lang}>
                                            {lang}
                                        </option>
                                    ))}
                                </select>
                            </span>
                        </p>
                    </div>

                    <div className="field">
                        <label>Theme:</label>
                        <p className="control">
                            <span className="select">
                                <select name="Theme" onChange={this.setTheme} value={this.state.theme}>
                                    {themes.map(lang => (
                                        <option key={lang} value={lang}>
                                            {lang}
                                        </option>
                                    ))}
                                </select>
                            </span>
                        </p>
                    </div>

                    <div className="field">
                        <label>Orientation:</label>
                        <p className="control">
                            <span className="select">
                                <select name="orientation" onChange={this.setOrientation} value={this.state.orientation}>
                                    {['beside', 'below'].map(lang => (
                                        <option key={lang} value={lang}>
                                            {lang}
                                        </option>
                                    ))}
                                </select>
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control">
                            <label className="checkbox">
                                <input
                                    type="checkbox"
                                    checked={this.state.enableBasicAutocompletion}
                                    onChange={e => this.setBoolean('enableBasicAutocompletion', e.target.checked)}
                                /> Enable Basic Autocomplete
                           </label>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control">
                            <label className="checkbox">
                                <input
                                    type="checkbox"
                                    checked={this.state.enableLiveAutocompletion}
                                    onChange={e => this.setBoolean('enableLiveAutocompletion', e.target.checked)}
                                /> Enable Live Autocomplete
                           </label>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control">
                            <label className="checkbox">
                                <input
                                    type="checkbox"
                                    checked={this.state.showGutter}
                                    onChange={e => this.setBoolean('showGutter', e.target.checked)}
                                /> Show Gutter
                           </label>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control">
                            <label className="checkbox">
                                <input
                                    type="checkbox"
                                    checked={this.state.showPrintMargin}
                                    onChange={e => this.setBoolean('showPrintMargin', e.target.checked)}
                                /> Show Print Margin
                           </label>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control">
                            <label className="checkbox">
                                <input
                                    type="checkbox"
                                    checked={this.state.highlightActiveLine}
                                    onChange={e => this.setBoolean('highlightActiveLine', e.target.checked)}
                                /> Highlight Active Line
                           </label>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control">
                            <label className="checkbox">
                                <input
                                    type="checkbox"
                                    checked={this.state.enableSnippets}
                                    onChange={e => this.setBoolean('enableSnippets', e.target.checked)}
                                /> Enable Snippets
                           </label>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control">
                            <label className="checkbox">
                                <input
                                    type="checkbox"
                                    checked={this.state.showLineNumbers}
                                    onChange={e => this.setBoolean('showLineNumbers', e.target.checked)}
                                /> Show Line Numbers
                           </label>
                        </p>
                    </div>
                </div>
                <div className="examples column">
                    <div className="text-center">
                        <a className="button is-primary is-rounded">
                            <span className="text-bold">Run</span>
                            <span className="icon is-small">
                                <i className="fas fa-check"></i>
                            </span>
                        </a>
                    </div>
                    <h2 className="text-bold">Editor</h2>
                    <SplitAceEditor
                        mode={this.state.mode}
                        orientation={this.state.orientation}
                        splits={this.state.splits}
                        theme={this.state.theme}
                        name="target"
                        onLoad={this.onLoad}
                        debounceChangePeriod={1000}
                        onChange={this.onChange}
                        onSelectionChange={this.onSelectionChange}
                        fontSize={this.state.fontSize}
                        useWorker={this.state.useWorker}
                        height="80vw"
                        width="80vw"
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
                    />
                </div>
            </div>
        );
    }
}

export default Layout