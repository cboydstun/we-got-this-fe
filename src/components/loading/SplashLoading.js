import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import splash from '../lotties/loading-ring.json';

const SplashLoading = ({ height = '100%', width = '100%' }) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: splash,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <div>
            <Lottie
                options={defaultOptions}
                height={height}
                width={width}
                isStopped={false}
                isPaused={false}
            />
        </div>
    );
};

export default SplashLoading;
