import React, { useState, Fragment } from 'react';

const parser = require('xml-js');

const RouteSelect = props => {
    const { routes } = props;
    
    const [selectedRouteName, setRouteName] = useState('');
    const [selectedRouteDirection, setRouteDirection] = useState('');

    //console.log(routes);

    const onChangeHandler = event => {
        setRouteName({ name: event.target.value });
    }

    const getRouteDirection = () => {

        const filteredRoute = routes.filter(route => route.Description._text === selectedRouteName.name);
        const num = filteredRoute[0].Route._text;

        let directions = [];
        fetch(`https://svc.metrotransit.org/NexTrip/Directions/${num}`)
            .then(response => { 
                return response.text();
            }).then(response => {
                //console.log(JSON.parse(parser.xml2json(response, {compact: true, spaces: 4})))
                return JSON.parse(parser.xml2json(response, {compact: true, spaces: 4}));
            }).then(response => {
                directions = response.ArrayOfTextValuePair.TextValuePair;
                console.log(directions);
            })
            .catch(error => {
                console.log(error);
            });


        //console.log(num);
    }

    const routeOptions = routes.map(route => <option key={route.Route._text}>{route.Description._text}</option>);

    return (
        <Fragment>
            <select onChange={onChangeHandler}>
                {routeOptions}
            </select>
        {selectedRouteName ? getRouteDirection() : null} 
        </Fragment>
    );
};

export default RouteSelect;