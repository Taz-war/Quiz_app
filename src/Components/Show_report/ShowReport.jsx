import React from 'react'
import { useLocation } from 'react-router-dom';

const ShowReport = () => {
    const location = useLocation();
    const id = location.state?.id;
    return (
        <>
            <div>
                <h1>This show report</h1>
            </div>
        </>
    )
}

export default ShowReport
