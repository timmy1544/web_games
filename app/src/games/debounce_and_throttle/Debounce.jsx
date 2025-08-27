import { useState, useEffect } from 'react';

const DEBOUNCE_TIME = 1000 //ms

const DebounceInput = () => {
    const [inputState, setInputState] = useState('');

    useEffect(() => {
        const timerId = setTimeout(() => {
            if(inputState && inputState.length > 0) {
                //make api request here
                // eslint-disable-next-line
                console.log("%c" + `Make API Request, input: ${inputState}`, "color: green; font-weight: bold;");
            }
        }, DEBOUNCE_TIME)

        return () => clearTimeout(timerId);
    }, [inputState])

    const handleInputChange = (e) => {
        setInputState(e.target?.value)
    }

    return (
        <div className='debounce'>
            <div>This is a Input with debounce search after 1 sec</div>
            <input 
                type='text' 
                value={inputState} 
                onChange={handleInputChange}
                placeholder="Type to search..."
            >
            </input>
        </div>
    )

}

export default DebounceInput