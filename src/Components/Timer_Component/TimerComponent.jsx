import React from 'react';
import { useTimer } from 'react-timer-hook';

const TimerComponent = ({ examDuration }) => {
    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({  onExpire: () => console.warn('onExpire called'), autoStart: false });

    const formatTime = (time) => {
        // Convert the time to a string and pad it with zeros if necessary to ensure it has at least two digits
        return String(time).padStart(2, '0');
    }
    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '30px' }}>
                <span style={{backgroundColor:'#E7EDF0',borderRadius:'10px',padding:1}}>{formatTime(hours)}</span>:
                <span style={{backgroundColor:'#E7EDF0',borderRadius:'10px',padding:1}}>{formatTime(minutes)}</span>:
                <span style={{backgroundColor:'#E7EDF0',borderRadius:'10px',padding:1}}>{formatTime(seconds)}</span>
            </div>
            <p>{isRunning ? 'Running' : 'Not running'}</p>
            <button onClick={start}>Start</button>
            <button onClick={pause}>Pause</button>
            <button onClick={resume}>Resume</button>
            <button onClick={() => {
                // Restarts to 5 minutes timer
                const time = new Date();
                time.setSeconds(time.getSeconds() + examDuration);
                restart(time)
            }}>Restart</button>
        </div>
    );
}

export default TimerComponent
