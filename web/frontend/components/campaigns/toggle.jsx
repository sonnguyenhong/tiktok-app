import React, { useEffect, useRef, useState } from 'react';
import './toggle.css'
function ToggleSwitch(props) {
    const { onToggle, status } = props
    const [isOn, setIsOn] = useState(status);
    const inputRef = useRef(null)

    const handleToggle = (e) => {
        setIsOn(!isOn);
    };

    useEffect(() => {
        if (onToggle) {
            onToggle(isOn)
        }
    }, [isOn])

    return (
        <div onClick={() => { inputRef.current.click() }} className="switch">
            <input
                ref={inputRef}
                type="checkbox"
                checked={isOn}
                onChange={handleToggle}
                id="toggleSwitch"
            />
            <span class="slider round"></span>
        </div>
    );
}

export default ToggleSwitch;