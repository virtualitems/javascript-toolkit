// beginning of application
(function (document, window) {

// ----------------------------------------
// utils
// ----------------------------------------


// ----------------------------------------
// hooks
// ----------------------------------------

const useCounter = function (initial) {
    // example of custom hook
    const initialState = Number(initial) || 0;
    const [count, setCount] = React.useState(initialState);
    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);
    const reset = () => setCount(initialState);
    return [count, increment, decrement, reset];
};

const useToggle = function (firstValue, secondValue) {
    const [value, setValue] = React.useState(firstValue);

    const toggle = function () {
        const newValue = value === firstValue ? secondValue : firstValue;
        setValue(newValue);
    };

    return [value, toggle];
};


// ----------------------------------------
// context
// ----------------------------------------
// context is used to share one state between all components

const AppContext = React.createContext(null);

const AppContextProvider = function(props) {
    // example of context wrapper

    const [theme, toggleTheme] = useToggle('dark', 'light');

    const context = {
        theme,
        toggleTheme,
    };

    return React.createElement(AppContext.Provider, {value: context}, props.children);
};


// ----------------------------------------
// contents
// ----------------------------------------
// contents use custom props to pass data

const Title = function(props) {
    // example of fixed text content
    return React.createElement('h1', null, 'React library');
};

const Button = function(props) {
    // example of dynamic text content
    // if the component is actionable, the actions must be passed as props
    return React.createElement('button', { className: 'button', onClick: props.onClick }, props.innerText);
};


// ----------------------------------------
// containers
// ----------------------------------------
// containers use children prop to pass data

const Header = function(props) {
    // example of dynamic children container
    const { children, className, onClick } = props;

    const element = React.createElement('header',
        {
            className: `header ${className || ''}`,
            onClick: onClick,
        },
        children
    );

    return element;
};

const Content = function(props) {
    // example of dynamic children container
    return React.createElement('main', {className: 'main'}, props.children);
};

const Footer = function(props) {
    // example of dynamic children container
    return React.createElement('footer', {className: 'footer'}, props.children);
};

const Counter = function(props) {
    // example of fixed children container

    const [count, increment, decrement, reset] = useCounter(props.initialCount);

    const decrementButton = React.createElement(Button, { onClick: decrement, innerText: '-' });
    const incrementButton = React.createElement(Button, { onClick: increment, innerText: '+' });
    const countText = React.createElement('span', null, count);

    return React.createElement('div', { className: 'counter' },
        [decrementButton, countText, incrementButton]
    );
};


const Form = function({ children, className, onSubmit, method, action, enctype }) {
    // example of form container
    // if the component is actionable, the actions must be passed as props

    const config = {
        className: `form ${className || ''}`,
        onSubmit: onSubmit,
        method: method,
        action: action,
        enctype: enctype,
    };

    return React.createElement('form', config, children);
};

// ----------------------------------------
// layouts
// ----------------------------------------
// layouts return a fragment with placeholders
// the placeholders are props

const ThreeSectionsLayout = function(props) {
    // example of layout

    const context = React.useContext(AppContext);

    const header = React.createElement(Header,
        {
            className: `theme--${context.theme}`,
            onClick: () => context.toggleTheme(),
        },
        props.headerContents
    );

    const main = React.createElement(Content, null, props.mainContents);

    const footer = React.createElement(Footer, null, props.footerContents);

    return React.createElement(React.Fragment, null, [header, main, footer]);
};


// ----------------------------------------
// pages
// ----------------------------------------
// pages return a rendered layout with contents

const Page = function(props) {
    // example of page
    const headerContents = React.createElement(Title);

    const mainContents = React.createElement(React.Fragment, null,
        React.createElement('section', { className: 'section' },
            React.createElement(Counter, { initialCount: 0 }),
        ),
        React.createElement('section', { className: 'section' },
            React.createElement(Form, { method: 'POST', enctype: 'multipart/form-data', action: '#' },
                React.createElement('input', { type: 'file', name: 'file' }),
                React.createElement('input', { type: 'submit', value: 'Submit' }),
            ),
        ),
    );

    const footerContents = null;

    return React.createElement(ThreeSectionsLayout, { headerContents, mainContents, footerContents });
};


// ----------------------------------------
// root
// ----------------------------------------

// is necessary an html element with id="root"
const htmlRootElement = document.getElementById('root');

// create an ReactDOM root element
const reactRootElement = ReactDOM.createRoot(htmlRootElement);

// the main component can be inside wrappers
// the root element can have only one child
const App =
    React.createElement(React.StrictMode, null,
        React.createElement(AppContextProvider, null,
            React.createElement(Page)
        )
    );

// render the main component inside the root element
reactRootElement.render(App);

// short version
//ReactDOM.render(App, document.getElementById('root'));


// end of application
})(document, window);
