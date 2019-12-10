import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "react-router-dom";
import { Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import BannerHeader from './BannerHeader';
import RouteForm from './RouteForm';
import RouteInfo from './RouteInfo';
import NotFound from './NotFound';
import './index.css';

const history = createBrowserHistory();

class App extends React.Component {

    render() {
        return (
            <div className="app">
                <BannerHeader />
                <h1 className="pageHeading">Find bus route information</h1>
                <RouteForm />
            </div>
        );
    }
}

ReactDOM.render(
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/routeinfo" component={RouteInfo} />
        <Route component={NotFound} />
      </Switch>
    </Router>,
    document.getElementById('root')
)