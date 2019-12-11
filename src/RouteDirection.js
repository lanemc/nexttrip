import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

const RouteDirection = props => {
    return (
        <FormControlLabel className="radio" key={props.id} value={props.value} control={<Radio type="radio" />} label={props.text} />
    )
};

export default RouteDirection;