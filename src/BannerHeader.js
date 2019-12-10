import React from 'react';

import logo from './img/metro-transit-logo.png';

const BannerHeader = () => {
    return (
        <div className="banner">
            <img className="logo" src={logo} alt="metro-transit-logo" />
            <img className="accent" src="" alt="" />
        </div>
    )
};

export default BannerHeader;