import React, { useState, useEffect, useRef } from "react";

const Stopwatch = () => {
    const [time, setTime] = useState(0); // time in ms
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    // Handle start
    const handleStart = () => {
        if (!isRunning) {
            setIsRunning(true);
        }
    };

    // Handle stop
    const handleStop = () => {
        setIsRunning(false);
    };

    // Handle reset
    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
    };

    // Timer effect
    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime((prev) => prev + 1000);
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

    // Format Time: M:SS
    const formatTime = () => {
        const totalSeconds = Math.floor(time / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const paddedSeconds = seconds.toString().padStart(2, "0");
        return `${minutes}:${paddedSeconds}`;
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>Stopwatch</h1>
            <h2>Time: {formatTime()}</h2>

            {!isRunning ? (
                <button onClick={handleStart}>Start</button>
            ) : (
                <button onClick={handleStop}>Stop</button>
            )}

            <button onClick={handleReset} style={{ marginLeft: "10px" }}>
                Reset
            </button>
        </div>
    );
};

export default Stopwatch;
