import React, { useState, useEffect } from 'react';
import BannerHeader from './BannerHeader';

const parser = require('xml-js');

const RouteInfo = props => {
    const { dir, num, name } = props.location.state[0];

    const directions = [
        { 1: 'SOUTHBOUND' },
        { 2: 'EASTBOUND' },
        { 3: 'WESTBOUND' },
        { 4: 'NORTHBOUND' }
    ];

    console.log(Object.getOwnPropertyNames(directions));

    const filteredDir = directions.filter(direction => 
        direction.key === dir
    );

    const [routeStops, setRouteStops] = useState('');

    useEffect(() => {
        getStops();
    },[num]);

    const getStops = () => {
        let stops = [];
        fetch(`https://svc.metrotransit.org/NexTrip/Stops/${num}/${dir}`)
            .then(response => { 
                return response.text();
            }).then(response => {
                return JSON.parse(parser.xml2json(response, {compact: true, spaces: 4}));
            }).then(response => {
                //console.log(response);  
                stops = response.ArrayOfTextValuePair.TextValuePair;
                setRouteStops(stops);
            })
            .catch(error => {
                console.log(error);
            });
    }


    console.log(routeStops);
    let stops = null;
    if(routeStops) {
        console.log(routeStops);
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
            <button onClick={() => props.history.goBack()}>Back</button>
            <p>Route Info</p>
            {name.name}
            {filteredDir}
            {stops}
        </>
    );
};

export default RouteInfo;