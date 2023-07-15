import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialDatePicker(props) {
    const Name = props.name;
    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                autoOk
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="none"
                id="date-picker-inline"
                label={Name}
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}


            />
        </MuiPickersUtilsProvider>
    );
}