import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "react-router-dom";
import { Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import RouteForm from './RouteForm';
import RouteInfo from './RouteInfo';
import NotFound from './NotFound';
import logo from './img/metro-transit-logo.png';
import './index.css';

const history = createBrowserHistory();

class App extends React.Component {

    render() {
        return (
            <div className="app">
                <div className="banner">
                    <img className="logo" src={logo} alt="metro-transit-logo" />
                    <img className="accent" src="" alt="" />
                </div>
                <h1 className="pageHeading" >Find bus route information</h1>
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