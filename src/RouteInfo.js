import React, { useState, useEffect } from 'react';
import BannerHeader from './BannerHeader';
import Button from '@material-ui/core/Button';

const parser = require('xml-js');

const RouteInfo = props => {
    const { dir, num, name } = props.location.state[0];
    const [routeStops, setRouteStops] = useState('');

    const directions = [
        { rNumber: '1', rName: 'SOUTHBOUND' },
        { rNumber: '2', rName: 'EASTBOUND' },
        { rNumber: '3', rName: 'WESTBOUND' },
        { rNumber: '4', rName: 'NORTHBOUND' }
    ];

    const directionName = directions.filter(direction => 
        direction.rNumber === dir
    );

    useEffect(() => {
        getStops();
    },[num]); // eslint-disable-line react-hooks/exhaustive-deps

    const getStops = () => {
        let stops = [];
        fetch(`https://svc.metrotransit.org/NexTrip/Stops/${num}/${dir}`)
            .then(response => { 
                return response.text();
            }).then(response => {
                return JSON.parse(parser.xml2json(response, {compact: true, spaces: 4}));
            }).then(response => { 
                stops = response.ArrayOfTextValuePair.TextValuePair;
                setRouteStops(stops);
            })
            .catch(error => {
                console.log(error);
            });
    }

    let stops = null;
    if(routeStops) {
        stops = (
            <div>
                {routeStops.map(s => {
                    return ( 
                        <li
                            id={s.Value._text}
                            key={s.Value._text}
                        >{s.Text._text}</li>
                    );
                })}
            </div>
        );
    }

    return (
        <>
            <BannerHeader />
            <Button variant="contained" color="secondary" onClick={() => props.history.goBack()}>Back</Button>
            <h1 className="pageHeading">Route Info</h1>
            {name.name}
            {directionName[0].rName}
            {stops}
        </>
    );
};

export default RouteInfo;