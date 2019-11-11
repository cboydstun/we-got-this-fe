import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import splash from '../lotties/loading-ring.json';

const SplashLoading = () => {
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
                height={400}
                width={400}
                isStopped={false}
                isPaused={false}
            />
        </div>
    );
};

export default SplashLoading;
