import React from "react";
import ReactDOM from "react-dom";
import { ApplicationStore, i18n } from "./services";
import { App } from "./scenes";
import { Provider } from "react-redux";
import { Router } from "react-router";
import { I18nextProvider } from "react-i18next";
import { createBrowserHistory as createHistory } from "history";
import * as ReactGA from "react-ga";
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

const track = () => {
    ReactGA.pageview(window.location.pathname + window.location.search);
};

const Main = (props) => {
    ReactGA.initialize(process.env.REACT_APP_GA_ID); //Unique Google Analytics tracking number
    track();

    if (process.env.REACT_APP_SENTRY_DSN) {
        Sentry.init({
            dsn: process.env.REACT_APP_SENTRY_DSN,
            integrations: [new Integrations.Dedupe()],
        });
    }

    const history = createHistory(props);

    history.listen(() => {
        track();
    });

    return (
        <Provider store={ApplicationStore}>
            <I18nextProvider i18n={i18n}>
                <Router history={history}>
                    <App />
                </Router>
            </I18nextProvider>
        </Provider>
    );
};

ReactDOM.render(<Main />, document.getElementById("root"));
