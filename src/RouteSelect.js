import React from 'react';

class RouteSelect extends React.Component {
    state = {
        selectedRoute: {
            name: '',
            number: ''
        }
    }

    render() {
        let routes = this.props.state.routes;
        let routeOptions = routes.map((route) => <option key={route.Route._text}>{route.Description._text}</option>);
        
        return (
            <>
                <select>
                    {routeOptions}
                </select>
            </>
        );
    }

};

export default RouteSelect;