import React, { useState, useEffect } from 'react';
import BannerHeader from './BannerHeader';
import Button from '@material-ui/core/Button';
import ScheduleOutlined from '@material-ui/icons/ScheduleOutlined';

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
                        <>
                        <li
                            className="StopListItem"
                            id={s.Value._text}
                            key={s.Value._text}
                        ><ScheduleOutlined /> {s.Text._text}</li>
                        </>
                    );
                })}
            </div>
        );
    }

    return (
        <div className="RouteInfo app">
            <BannerHeader />
            <div className="main">
                <Button variant="contained" color="primary" onClick={() => props.history.goBack()}>Back</Button>
                <h1 className="pageHeading">Route Info</h1>
                <div className="data">
                    <h3 className="DataLabel">Route name</h3>
                    <div>{name.name}</div>
                    <h3 className="DataLabel">Route direction</h3>
                    <div>{directionName[0].rName}</div>
                    <h3 className="DataLabel">Stops</h3>
                    <div>{stops}</div>
                </div>
            </div>
        </div>
    );
};

export default RouteInfo;