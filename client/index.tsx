import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./containers/app";
import { AppContainer } from 'react-hot-loader'

// <AppContainer/> is a component that handles module reloading, as well as error handling. 
// The root component of your app should be nested in AppContainer as a child. When in production, 
// AppContainer is automatically disabled, and simply returns its children.

const render = (Component: any) => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById("example")
    )
}

render(App)

// React Hot Loader 3 does not hide the hot module replacement API, so the following
// needs to be added below wherever you call ReactDOM.render in your app:
// Hot Module Replacement API
// Handle hot reloading requests from Webpack
if ((module as any).hot) {
    (module as any).hot.accept('./containers/app', () => {
        //If we receive a HMR request for our App container, then reload it using require (we can't do this dynamically with import)
        const NextApp = require('./containers/app').default;
        // according to https://github.com/gaearon/react-hot-loader/tree/master/docs#webpack-2
        // it should be possible to omit reloading App. But I was not able to achieve this

        //And render it into the root element again
        render(NextApp);

    })
}