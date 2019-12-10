import React, { useState, Fragment, useEffect } from 'react';
import RouteDirection from './RouteDirection';

const parser = require('xml-js');

const RouteSelect = props => {
    const { routes } = props;

    const [selectedRouteName, setRouteName] = useState('');
    const [selectedRouteDirection, setRouteDirection] = useState('');
    const [routeDirection, setDirection] = useState('');

    const routeOptions = routes.map(route => <option key={route.Route._text}>{route.Description._text}</option>);

    //console.log(routes);

    const onChangeSelect = event => {

        setRouteName({ name: event.target.value });

    }

    useEffect(() => {
        if (selectedRouteName) {
            getRouteDirection();
        }
      }, [selectedRouteName.name]);

    const getRouteDirection = () => {

        const filteredRoute = routes.filter(route => route.Description._text === selectedRouteName.name);
        const num = filteredRoute[0].Route._text;

        let directions = [];
        fetch(`https://svc.metrotransit.org/NexTrip/Directions/${num}`)
            .then(response => { 
                return response.text();
            }).then(response => {
                return JSON.parse(parser.xml2json(response, {compact: true, spaces: 4}));
            }).then(response => {
                directions = response.ArrayOfTextValuePair.TextValuePair;
                // console.log(directions);
                setRouteDirection(directions);    
            })
            .catch(error => {
                console.log(error);
            });

        //console.log(selectedRouteDirection[0].text); // This logged state is one value behind the selected option
    }

    const onChangeRadio = event => {
        setDirection(event.target.value);
    }

    let dirs = null;

    if(selectedRouteDirection) {
        console.log(selectedRouteDirection);
        dirs = (
            <div>
                {selectedRouteDirection.map((dir, index) => {
                    return ( 
                        <RouteDirection
                            id={dir.Value._text}
                            key={dir.Value._text}
                            value={dir.Text._text}
                            changed={onChangeRadio}
                        />
                    );
                })}
            </div>
        );
    }

    return (
        <Fragment>
            <select onChange={onChangeSelect}>
                {routeOptions}
            </select>
            {dirs}
        </Fragment>
    );
};

export default RouteSelect;