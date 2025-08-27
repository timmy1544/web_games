import { useRef } from "react";

const THROTTLE_TIME = 2000 //ms;

const ThrottleButton = () => {
    const lastClick = useRef(0);

    const handleClick = () => {
        const now = Date.now();
        if (now - lastClick.current >= THROTTLE_TIME) {
            // eslint-disable-next-line
            console.log("%c" + 'Button is click!', "color: blue; font-weight: bold;");
            lastClick.current = now
        }
    }

    return (
        <div className='throttle'>
            Throttle Button that can only make request every 1 second
            <button onClick={handleClick}>Click Me!</button>
        </div>
    )
}

export default ThrottleButton;