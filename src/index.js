import React from 'react';
import ReactDOM from 'react-dom';
import RouteForm from './RouteForm';
import './index.css';

class App extends React.Component {

    render() {
        return (
            <div className="app">
                <div className="banner">
                    <img className="logo" src="" alt="" />
                    <img className="accent" src="" alt="" />
                </div>
                <h1 className="pageHeading" >Find bus route information</h1>
                <RouteForm />
                <button className="btn" >View route</button>
            </div>
        );
    }
}

ReactDOM.render(<App/> , document.getElementById('App'))