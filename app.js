const Title = class extends React.Component {
    render() {
        return React.createElement('h1', null, 'React library');
    }
};


const Header = class extends React.Component {
    render() {
        return React.createElement('header', { className: 'Header' }, this.props.children);
    }
};


const CounterButton = class extends React.Component {

    constructor(props) {
        super(props);
        this.state = { count: 0 };
    }

    render() {
        const el = React.createElement(
            'button',
            {
                className: 'button',
                onClick: () => this.setState({ count: this.state.count + 1 })
            },
            `Count: ${this.state.count}`,
        );

        return el;
    }

};

const Content = class extends React.Component {
    render() {
        return React.createElement('main', { className: 'content' }, this.props.children);
    }
};


const App = class extends React.Component {
    render() {
        const header = React.createElement(Header, null, React.createElement(Title));
        const content = React.createElement(Content, null, React.createElement(CounterButton));
        return React.createElement(React.Fragment, null, header, content);
    }
};


ReactDOM.render(
    React.createElement(React.StrictMode, null, React.createElement(App)),
    document.getElementById('root'),
);

