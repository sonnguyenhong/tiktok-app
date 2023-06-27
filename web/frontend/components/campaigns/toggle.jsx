import React, { useState } from 'react';
import './toggle.css'
function ToggleSwitch(props) {

    const [isOn, setIsOn] = useState(props.status);
    // if (props.status) {
    //     const [isOn, setIsOn] = useState(true);
    // }
    // else {
    //     const [isOn, setIsOn] = useState(false);
    // }

    const handleToggle = () => {
        setIsOn(!isOn);
    };

    return (
        <div className="switch">
            <input
                type="checkbox"
                checked={isOn}
                onClick={handleToggle}
                id="toggleSwitch"

            />
            <span class="slider round"></span>
        </div>
    );
}

export default ToggleSwitch;