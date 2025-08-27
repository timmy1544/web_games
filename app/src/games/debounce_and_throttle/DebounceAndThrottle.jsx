import './DebounceAndThrottle.scss'
import DebounceInput from './Debounce';
import ThrottleButton from './Throttle';

const DebounceAndThrottle = () => {

    return (
        <div className='container'>
            <DebounceInput />
            <ThrottleButton />
        </div>
    )
}

export default DebounceAndThrottle;