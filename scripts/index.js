/* Notes

Components architecture:
Page > Sections > Layout > Containers > Contents

Components instances:
  Page
  |- Sections
  |  |- Contents
  |  |- Containers
  |- Layout

*/

// beginning of application
(function (document, window) {
'use strict';

// ----------------------------------------
// globals
// ----------------------------------------
// globals are constants that are used in the whole application
// style strings are used to group css class names in a single variable


// ----------------------------------------
// polyfills
// ----------------------------------------
// polyfills are used to provide modern functionality on older browsers that do not natively support it


// ----------------------------------------
// errors
// ----------------------------------------
// errors are used to handle exceptions

const ValidationError = class extends Error {
    constructor(message) {
        super(message);
    }
};

const RepositoryError = class extends Error {
    constructor({ message, step, throwed }) {
        super(message);
        this.step = step;
        this.throwed = throwed;
    }
};


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

const useRepository = function (model_class, fetchTarget, fetchConfig, repoConfig) {
    const [data, setData] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const isValid = repoConfig?.isValid || (() => true);

    const send = React.useCallback(() => {

        // async process wrapper
        new Promise((resolve, reject) => {

            // request
            fetch(fetchTarget, fetchConfig)
            .catch(stepError => {
                setError(new RepositoryError({
                    message: 'Fetch failed',
                    step: 'request',
                    throwed: stepError
                }));
                reject(stepError);
            })

            // response
            .then(response => response.json())
            .catch(stepError => {
                setError(new RepositoryError({
                    message: 'Response parsing failed',
                    step: 'response',
                    throwed: stepError
                }));
                reject(stepError);
            })

            // transform
            .then(rawData => rawData.map(itemData => {
                if (isValid(itemData))
                    return new model_class(itemData);
                else
                    reject(new ValidationError('Invalid data'));
            }))
            .catch(stepError => {
                setError(new RepositoryError({
                    message: 'Data transformation failed',
                    step: 'transform',
                    throwed: stepError
                }));
                reject(stepError);
            })

            // resolve
            .then(resultData => {
                setData(resultData);
                resolve(resultData);
            })
            .catch(stepError => setError(
                new RepositoryError({
                    message: 'Data resolving failed',
                    step: 'data',
                    throwed: stepError
                })
            ))

            // done
            .finally(() => setLoading(false));

        }); //:: new Promise

        // loading
        setLoading(true);

    }, [model_class, fetchTarget, fetchConfig]);

    return [send, data, error, loading];

}; //::useRepository

// TODO useHttpRequest


// ----------------------------------------
// context
// ----------------------------------------
// context is used to share one state between all components

const AppContext = React.createContext(null);

const AppContextProvider = function({ children }) {
    // example of context wrapper

    const [theme, toggleTheme] = useToggle('dark', 'light');

    const context = {
        theme,
        toggleTheme,
    };

    return React.createElement(AppContext.Provider, {value: context}, children);
};


// ----------------------------------------
// models
// ----------------------------------------
// models are used to define the structure of data

const UserModel = class {
    constructor({id, name, username, email, address, phone, website, company}) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.address = address;
        this.phone = phone;
        this.website = website;
        this.company = company;
    }
};


// ----------------------------------------
// contents
// ----------------------------------------
// contents use custom props to pass data

const Title = function(_) {
    // example of fixed text content
    return React.createElement('h1', null, 'React library');
};

const Button = function({ onClick, innerText }) {
    // example of dynamic text content
    // if the component is actionable, the actions must be passed as props
    return React.createElement('button', { type: 'button', className: 'button', onClick }, innerText);
};


// ----------------------------------------
// containers
// ----------------------------------------
// containers use children prop to pass data

const Header = function({ children, className, onClick }) {
    // example of dynamic children container

    const element = React.createElement('header',
        {
            className: `header ${className || ''}`,
            onClick: onClick,
        },
        children
    );

    return element;
};

const Content = function({ children }) {
    // example of dynamic children container
    return React.createElement('main', {className: 'main'}, children);
};

const Footer = function({ children }) {
    // example of dynamic children container
    return React.createElement('footer', {className: 'footer'}, children);
};

const Counter = function({ initialCount }) {
    // example of fixed children container

    const [count, increment, decrement, _] = useCounter(initialCount);

    const decrementButton = React.createElement(Button, { onClick: decrement, innerText: '-' });
    const incrementButton = React.createElement(Button, { onClick: increment, innerText: '+' });
    const countText = React.createElement('span', null, count);

    return React.createElement('div', { className: 'counter' },
        decrementButton,
        countText,
        incrementButton,
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
// Sections
// ----------------------------------------


// ----------------------------------------
// layouts
// ----------------------------------------
// layouts return a fragment with placeholders
// the placeholders are props

const ThreeSectionsLayout = function({ headerContents, mainContents, footerContents }) {
    // example of layout

    const header = React.createElement(Header, headerContents?.props, headerContents?.children);
    const main = React.createElement(Content, mainContents?.props, mainContents?.children);
    const footer = React.createElement(Footer, footerContents?.props, footerContents?.children);

    return React.createElement(React.Fragment, null, [header, main, footer]);
};


// ----------------------------------------
// pages
// ----------------------------------------
// pages return a rendered layout with contents

const Page = function(_) {
    // example of page

    const context = React.useContext(AppContext);

    const [getUsers, usersList, usersError, loadingUsers] = useRepository(UserModel, 'https://jsonplaceholder.typicode.com/users');

    React.useEffect(() => {
        getUsers();
    }, []);

    console.log(loadingUsers, usersError, usersList);

    const headerContents = {
        props: {
            className: `theme--${context.theme}`,
            onClick: () => context.toggleTheme(),
        },
        children: React.createElement(Title)
    };

    const mainContents = {
        props: null,

        children: React.createElement(React.Fragment, null,

            React.createElement('section', { className: 'section' },

                React.createElement('h1', null, 'Theme section'),
                React.createElement('p', null, `Current theme: ${context.theme}`),

            ),  // end of counter section

            React.createElement('section', { className: 'section' },

                React.createElement('h1', null, 'Counter section'),
                React.createElement(Counter, { initialCount: 0 }),

            ),  // end of counter section

            React.createElement('section', { className: 'section' },
                React.createElement(Form, { method: 'POST', enctype: 'multipart/form-data', action: '#' },
                React.createElement('h1', null, 'Form section'),
                React.createElement('div', null,
                        React.createElement('input', { type: 'file', name: 'file' })
                    ),
                    React.createElement('div', null,
                        React.createElement('input', { type: 'submit', value: 'Submit' }),
                    ),
                )

            )  // end of form section

        )  // end of main contents
    };

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
