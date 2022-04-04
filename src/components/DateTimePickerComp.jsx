import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom';
import DatePicker from 'react-datepicker';
import Moment from 'moment';
import InputMask from 'react-input-mask';

function DateTimeInputMask(props) {

    const inputRef = useRef(null)

    const focus = () => { ReactDOM.findDOMNode(inputRef.current).focus(); }

    return (<InputMask {...props} ref={inputRef} />);
};

export default function DateTimePickerComp({ key, placeholder, allowTime, dateSlash, selected, name, onDateTimeChange, prevIndex, maxDate, minDate, disabled, className, onBlur, readOnly, disabled }) {

    const [state, setState] = useState({ date: '', selected: selected ? Moment(selected) : null, isValid: true })
    const inputRef = useRef(null)

    const onDateChange = useCallback((datetime) => {
        setState(prevState => ({
            ...prevState, selected: datetime, isValid: true
        }))

        if (datetime === null) onDateTimeChange(name, datetime, true);
    }, [])

    const onChangeRaw = useCallback((e) => {
        let value = e.target.value
        setState(prevState => ({ ...prevState, date: value }))
    }, [])

    const prevIndex = useCallback((name) => {
        if (prevIndex) prevIndex(name)
    }, [])

    const keyDownDate = useCallback((e) => {
        const keyCode = e.keyCode || e.which;
        if (keyCode === 9) {
            if (e.shiftKey) { prevIndex(e.target.name); e.preventDefault(); }
        }
    }, [])

    const handleBlur = useCallback((e) => {
        let value = e.target.value;
        let formattedDate = Moment(value, "DD/MM/YYYY HH:mm");
        let formattedDate1 = Moment(value, "DD/MM/YYYY").year();
        let checkMaxMin = true
        let currentYear = Moment(new Date(), "DD/MM/YYYY").year();
        let checkError = true;

        if (formattedDate1 < currentYear) { checkError = false }

        if (maxDate) {
            if (formattedDate.isAfter(maxDate)) {
                checkMaxMin = false
            }
        }

        if (minDate) {

            if (formattedDate.format("YYYY/MM/DD") < Moment(minDate).format("YYYY/MM/DD")) {
                checkMaxMin = false
            }

        }

        setState(prevState => ({
            ...prevState, isValid: (formattedDate.isValid() || value === "") && checkError && checkMaxMin ? true : false
        }))

        onDateTimeChange(name, (value === "" ? "" : formattedDate), (formattedDate.isValid() || value === "") && checkError && checkMaxMin ? true : false)

    }, [])

    // ! check if the component will have the x to clear the date input 
    checkIfClearable = useCallback(() => {
        if (disabled) return false;
        return true;
    }, [disabled])

    useEffect(() => {
        if (selected === state.selected) return
        setState(prevState => ({ ...prevState, selected: selected ? Moment(selected) : null }))
    }, [selected])

    return (
        <div >
            <DatePicker
                ref={inputRef}
                customInput={
                    <DateTimeInputMask mask={allowTime ? dateSlash ? '99/99/9999 hr:mn' : '99-99-9999 hr:mn ap' : "99/99/9999"}
                        formatChars={{
                            '9': '[0-9]', 'h': '[0-2]', 'r': '[0-9]', 'm': '[0-5]', 'n': '[0-9]',
                            'a': '[Aa,Pp]', 'p': '[Mm]'
                        }}
                        maskChar={null} />
                }
                dateFormat={`DD/MM/YYYY${allowTime ? " HH:mm" : ""}`}
                key={key ? key : undefined}
                locale="en-gb"
                selected={state.selected && state.isValid ? state.selected : null}
                onChange={onDateChange}
                showMonthDropdown
                showYearDropdown
                showTime={true}
                timeFormat="HH:mm"
                style={{
                    width: "100%",
                    padding: '0'
                }}
                timeIntervals={60}
                showTimeSelect={allowTime}
                className={`form-control ${allowTime ? "" : "text-center"} ${className}`}
                minDate={minDate ? Moment(minDate) : undefined}
                maxDate={maxDate ? Moment(maxDate) : undefined}
                onChangeRaw={onChangeRaw}
                isClearable={checkIfClearable()}
                onBlur={onBlur ? onBlur : handleBlur}
                onKeyDown={keyDownDate}
                placeholderText={placeholder}
                todayButton="Today"
                dropdownMode="select"
                readOnly={readOnly ? true : false}
                disabled={disabled ? true : false}
            />
        </div>
    )
}
