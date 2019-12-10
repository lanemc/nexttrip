import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RouteDirection from './RouteDirection';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const parser = require('xml-js');

const RouteSelect = props => {
    const { routes } = props;

    const [selectedRouteName, setRouteName] = useState('');
    const [selectedRouteNumber, setRouteNumber] = useState('');
    const [selectedRouteDirection, setRouteDirection] = useState('');
    const [routeDirection, setDirection] = useState('');

    const routeOptions = routes.map(route => <option key={route.Route._text}>{route.Description._text}</option>);

    const onChangeSelect = event => {
        setRouteName({ name: event.target.value });
    }

    useEffect(() => {
        if (selectedRouteName) {
            getRouteDirection();
        }
    }, [selectedRouteName.name]); // eslint-disable-line react-hooks/exhaustive-deps

    // Get the ordinal route directions for the selected route
    const getRouteDirection = () => {

        const filteredRoute = routes.filter(route => 
            route.Description._text === selectedRouteName.name
        );

        const num = filteredRoute[0].Route._text;
        
        setRouteNumber(num);

        let directions = [];
        fetch(`https://svc.metrotransit.org/NexTrip/Directions/${num}`)
            .then(response => { 
                return response.text();
            }).then(response => {
                return JSON.parse(parser.xml2json(response, {compact: true, spaces: 4}));
            }).then(response => {
                directions = response.ArrayOfTextValuePair.TextValuePair;
                setRouteDirection(directions);  
            })
            .catch(error => {
                console.log(error);
            });
    }

    const onChangeRadio = event => {
        setDirection(event.target.value);
    }

    let directions = null;
    if(selectedRouteDirection) {
        directions = (
            <div>
                <FormControl component="fieldset" className="">
                    <FormLabel component="legend">Select route direction</FormLabel>
                    <RadioGroup aria-label="gender" name="gender1" onChange={onChangeRadio}>
                        {selectedRouteDirection.map(direction => {
                            return (
                                <RouteDirection
                                    id={direction.Value._text}
                                    key={direction.Value._text}
                                    text={direction.Text._text}
                                    value={direction.Value._text}  
                                />
                            );
                        })}
                    </RadioGroup>
                </FormControl>
            </div>
        );
    }

    return (
        <Fragment>
            <select onChange={onChangeSelect}>
                {routeOptions}
            </select>

                    {directions}
            
            <Link to={{
                pathname: '/routeinfo',
                state: [{dir: routeDirection, num: selectedRouteNumber, name: selectedRouteName }]
            }}>
                <button className="btn" disabled={!routeDirection}>View route</button>
            </Link>
        </Fragment>
    );
};

export default RouteSelect;