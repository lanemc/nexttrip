import React from 'react';

const RouteDirection = props => {
    return (
        <li key={props.id} className="direction-options">
            <input type="radio" id={props.id} onChange={props.changed} value={props.value} />
            <label htmlFor={props.id}>{props.value}</label>
        </li>
    )
};

export default RouteDirection;