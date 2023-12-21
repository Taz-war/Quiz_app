import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ShowReport = () => {
    const location = useLocation();
    const id = location.state?.id;
    const [errorMessage, setErrorMessage] = useState("");
    const [report,setReport] =useState([])

    useEffect(async()=>{
        try {
            const response = await fetch(`http://localhost:5000/publishedQuestions/${id}`);
            const data = await response.json();
            setReport(data);
          } catch (error) {
            setErrorMessage(error.message);
          }
    },[])

    return (
        <>
            <div>
                <h1>This show report</h1>
            </div>
        </>
    )
}

export default ShowReport
