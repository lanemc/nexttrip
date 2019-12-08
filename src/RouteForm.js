import React from 'react';

const parser = require('xml-js');

class RouteForm extends React.Component {
    state = {
        routes: [
            {
                name: '',
                number: ''
            }
        ]
    }

    componentDidMount() {
        fetch("https://svc.metrotransit.org/NexTrip/Routes")
            .then((response) => response.text())
            .then(response => {
                const parseResponse = JSON.parse(parser.xml2json(response, {compact: true, spaces: 4}));
                console.log(parseResponse.ArrayOfNexTripRoute.NexTripRoute);
                const res = parseResponse.ArrayOfNexTripRoute.NexTripRoute;
                
                const mapRoutes = res.map(route => { return {route: route.Route._text, display: route.Description._text  }});



                console.log(mapRoutes); //***** Pull out route numbers */



                this.setState({ routes: [{route: '', display: '(Select a route)'}].concat(mapRoutes) });
            }).catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <>
                <select>
                    {this.state.routes.map((route) => <option key={route.route} value={route.route}>{route.display}</option>)}
                </select>
            </>
        );
    }

}

export default RouteForm;