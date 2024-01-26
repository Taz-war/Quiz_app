import React, { useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';

const texts = ["Highlight the ability to create various types of questions (Multiple Choice, Short Answer, True/False).", 
"Emphasize the ease of launching quizzes and sharing access with students via a unique room name.", 
"Showcase the feature where teachers can see live progress of each student during the quiz."];

const AnimatedText = () => {
    const [index, setIndex] = useState(0);

    const transitions = useTransition(texts[index], {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 3000 },
        onRest: () => setIndex(state => (state + 1) % texts.length),
    });

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIndex(state => (state + 1) % texts.length);
        }, 30000); // Change text every 4 seconds

        return () => clearInterval(intervalId);
    }, []);

    return transitions((styles, item) => (
        <animated.div style={{
            ...styles,
            color: 'white',        // Set text color
            textAlign: 'center',    // Align text to the left
        }}>
            <h1>{item}</h1>
        </animated.div>
    ));
};

export default AnimatedText;
