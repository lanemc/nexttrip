import React, { useState, Fragment } from 'react';

const RouteSelect = props => {
    const { routes } = props;
    
    const [selectedRouteName, setRouteName] = useState('');
    const [selectedRouteNumber, setRouteNumber] = useState('');


    //console.log(routes);

    const onChangeHandler = event => {
        setRouteName({ name: event.target.value });
    }

    const getRouteNumber = (routeName) => {
        const rName = selectedRouteName;

        const filteredRoute = routes.filter(route => route.Description._text === selectedRouteName.name);

        console.log(filteredRoute);
    }

    const routeOptions = routes.map(route => <option key={route.Route._text}>{route.Description._text}</option>);

    return (
        <Fragment>
            <select onChange={onChangeHandler}>
                {routeOptions}
            </select>
        {selectedRouteName ? getRouteNumber() : null} 
        </Fragment>
    );
};

export default RouteSelect;