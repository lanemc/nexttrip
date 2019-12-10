import React, { useEffect } from 'react';

const parser = require('xml-js');

const RouteInfo = props => {
    const { dir, num } = props.location.state[0];
    //console.log(props);

    useEffect(() => {
        let stops = [];
        fetch(`https://svc.metrotransit.org/NexTrip/Stops/${num}/${dir}`)
            .then(response => { 
                return response.text();
            }).then(response => {
                return JSON.parse(parser.xml2json(response, {compact: true, spaces: 4}));
            }).then(response => {
                console.log(response);  
            })
            .catch(error => {
                console.log(error);
            });
    });

    return (
        <>
            <button onClick={() => props.history.goBack()}>Back</button>
            <p>Route Info</p>
        </>
    );
};

export default RouteInfo;