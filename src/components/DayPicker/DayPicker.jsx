import { useState } from "react"
import { addDays, format } from 'date-fns'
import { DayPicker } from 'react-day-picker'

const pastMonth = new Date(2020, 10, 15);

function Calendar() {
    const defaultSelected = {
        from: pastMonth,
        to: addDays(pastMonth, 4)
    };
    const [range, setRange] = useState(defaultSelected);

    let footer = <p>Please pick the first day.</p>
    if (range && range.from) {
        if (!range.to) {
            footer = <p>{format(range.from, 'PPP')}</p>
        } else if (range.to) {
            footer =
                <p>
                    {format(range.from, 'PPP')} {format(range.to, 'PPP')}
                </p>
        }
    }

    return (
        <DayPicker
            id="test"
            mode="range"
            defaultMonth={pastMonth}
            selected={range}
            footer={footer}
            onSelect={setRange}
        />
    );
}

export default Calendar