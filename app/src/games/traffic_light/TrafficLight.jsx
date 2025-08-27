import './TrafficLight.scss';
import { useEffect, useState } from "react";

const LIGHTS = [5000, 2000, 7000]; // [GREEN, YELLOW, RED] IN MS

const TrafficLight = () => {
    const [timer, setTimer] = useState(0);
    const [start, setStart] = useState(false);

    useEffect(() => {
        let intervalId;
        if (start) {
            intervalId = setInterval(() => {
                setTimer(prev => prev + 1000)
            }, 1000)
        }

        return () => {
            clearInterval(intervalId)
        }
    }, [start])

    const RenderCountdown = (time, type) => {
        if (type === 'green') {
            return <div className='counter'>{(LIGHTS[0] - time)/1000}</div>
        } else if (type === 'yellow') {
            return <div className='counter'>{(LIGHTS[0] + LIGHTS[1] - time)/1000}</div>
        } else {
            return <div className='counter'>{(LIGHTS[0] + LIGHTS[1] + LIGHTS[2]- time)/1000}</div>
        }
    }
 
    const renderLight = () => {
        const total = LIGHTS[0] + LIGHTS[1] + LIGHTS[2];
        const time = timer % total;

        if (time >= 0 && time < LIGHTS[0]) {
            return <div className="light light__green">{RenderCountdown(time, 'green')}</div>;
        } else if (time >= LIGHTS[0] && time < LIGHTS[0] + LIGHTS[1]) {
            return <div className="light light__yellow">{RenderCountdown(time, 'yellow')}</div>;
        } else {
            return <div className="light light__red">{RenderCountdown(time, 'red')}</div>;
        }
    }

    const renderStartOrPauseButton = () => {
        if (timer === 0 && !start) {
            return 'Start'
        } else if (timer !== 0 && start) {
            return 'Pause';
        }
        return 'Resume'
    }

    const handleResetClick = () => {
        setStart(false);
        setTimer(0);
    }

    

    return (
        <div className="traffic-light">
            {renderLight()}
            <div className='button-container'>
                <button className='button' onClick={() => setStart(prev => !prev)}>{renderStartOrPauseButton()}</button>
                <button className='button' onClick={handleResetClick}>Reset</button>
            </div>
        </div>
    )
}

export default TrafficLight