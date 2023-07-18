import { Button, Popover, ActionList, Select } from '@shopify/polaris';
import { useState, useCallback } from 'react';

export default function UserPixel(props) {
    const [selected, setSelected] = useState('today');

    const handleSelectChange = useCallback(
        (value) => setSelected(value),
        [],
    );

    const options = [
        {label: 'Today', value: 'today'},
        {label: 'Yesterday', value: 'yesterday'},
        {label: 'Last 7 days', value: 'lastWeek'},
    ];

    return (
        <Select
            options={options}
            onChange={handleSelectChange}
            value={selected}
        />
    );
    
    // const [popoverActive, setPopoverActive] = useState(false);

    // const togglePopoverActive = useCallback(
    //     () => setPopoverActive((popoverActive) => !popoverActive),
    //     [],
    // );
    // const ID = "141625634563"
    // const activator = (
    //     <Button onClick={togglePopoverActive} disclosure>
    //         TikTok Pixel for Shopify {ID}
    //     </Button>
    // );
    // return (
    //     <Popover
    //         active={popoverActive}
    //         activator={activator}
    //         autofocusTarget="first-node"
    //         onClose={togglePopoverActive}
    //     >

    //         <Popover.Pane>
    //             <ActionList
    //                 actionRole="menuitem"
    //                 items={[
    //                     { content: 'Online store' },
    //                     { content: 'Facebook' },
    //                     { content: 'Shopify POS' },
    //                 ]}
    //             />
    //         </Popover.Pane>
    //     </Popover>
    // );
}