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
    return React.createElement('button', { className: 'button', onClick: props.onClick }, props.innerText);
};


// ----------------------------------------
// containers
// ----------------------------------------
// containers use children prop to pass data

const Header = function(props) {
    // example of dynamic children container
    return React.createElement('header', { className: 'header' }, props.children);
};

const Content = function(props) {
    return React.createElement('main', { className: 'content' }, props.children);
};

const Footer = function(props) {
    return React.createElement('footer', { className: 'footer' }, props.children);
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


// ----------------------------------------
// layouts
// ----------------------------------------
// layouts return a fragment with placeholders

const HeaderMainFooter = function(props) {
    // example of layout

    const header = React.createElement(Header, null, props.headerContents);
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

    const mainContents = React.createElement('div', { className: 'container' }, [
        React.createElement(Counter, { initialCount: 0 }),
    ]);

    const footerContents = null;

    return React.createElement(HeaderMainFooter, { headerContents, mainContents, footerContents });
};


// ----------------------------------------
// root
// ----------------------------------------
// the root element can have only one child
// the root element can be inside a React wrapper

ReactDOM.render(
    React.createElement(React.StrictMode, null, React.createElement(Page)),
    document.getElementById('root'),
);
