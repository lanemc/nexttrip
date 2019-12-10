import React, { useState, useEffect } from 'react';

const parser = require('xml-js');

const RouteInfo = props => {
    const { dir, num, name } = props.location.state[0];

    console.log(Object.getOwnPropertyNames(name));
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
            <button onClick={() => props.history.goBack()}>Back</button>
            <p>Route Info</p>
            {name}
            {stops}
        </>
    );
};

export default RouteInfo;