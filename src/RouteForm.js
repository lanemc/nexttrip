import React from 'react';
import RouteSelect from './RouteSelect';

const parser = require('xml-js');

class RouteForm extends React.Component {
    state = {
        routes: []
    }

    componentDidMount() {
        let routeList = [];
        fetch("https://svc.metrotransit.org/NexTrip/Routes")
            .then(response => { 
                return response.text();
            }).then(response => {
                //console.log(JSON.parse(parser.xml2json(response, {compact: true, spaces: 4})))
                return JSON.parse(parser.xml2json(response, {compact: true, spaces: 4}));
            }).then(response => {
                const res = response.ArrayOfNexTripRoute.NexTripRoute;
                routeList = res.map((route) => {
                    return route
                });
                this.setState({
                    routes: routeList
                });

            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            this.state.routes && <RouteSelect routes={this.state.routes} />  
        );
    }
};

export default RouteForm;