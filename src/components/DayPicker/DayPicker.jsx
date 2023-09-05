import { useState } from "react"
import { addDays, format } from 'date-fns'
import { DayPicker } from 'react-day-picker'

const thisMonth = new Date(2023, 8, 5);

function Calendar() {
    const defaultSelected = {
        from: thisMonth,
        to: addDays(thisMonth, 4)
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

    console.log('DESDE: ', range.from)
    console.log('HASTA: ', range.to)


    return (
        <DayPicker
            id="test"
            mode="range"
            defaultMonth={thisMonth}
            selected={range}
            footer={footer}
            onSelect={setRange}
        />
    );
}

export default Calendar