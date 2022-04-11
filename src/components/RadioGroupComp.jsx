import React, { useEffect, useState, useCallback } from 'react'
import { Radio, RadioGroup } from "react-icheck";
import { map } from "lodash";
import EnhancedSwitch from 'react-icheck/lib/EnhancedSwitch'
import PropTypes from 'prop-types';

EnhancedSwitch.propTypes = {
    ...EnhancedSwitch.propTypes,
    cursor: PropTypes.string
}

export default function RadioGroupComp({ value, name, className, style, onClick, increaseArea, disabled, radioClassname, styleHTMLLabel, radios }) {

    const [valueState, setValueState] = useState(value)

    const handleChange = useCallback((e) => {
        let { value, name } = e.target
        setValueState(value)
        onClick(value, name)
    }, [])

    renderRadio = useCallback((radios) => {
        let HTML = []
        map(radios, (value, key) => {
            HTML.push(
                <Radio
                    cursor="pointer"
                    key={key}
                    value={value.value}
                    name={value.name}
                    className="col-4"
                    radioClass="iradio_square-blue"
                    increaseArea={`${increaseArea ? "20%" : null}`}
                    disabled={disabled ? true : false}
                    label={
                        `<span style='${styleHTMLLabel}; padding: 0 20px 0 0;' class='${radioClassname ? radioClassname : ""}'>${value.name}</span>`
                    }
                />
            )
        })

        return HTML;
    }, [])

    useEffect(() => {
        if (valueState !== value) setValueState(value)
    }, [value])

    return (
        <div className="radio-button-main-container">
            <RadioGroup
                name={name}
                value={valueState}
                className={className + "row"}
                style={style}
                onChange={handleChange}
            >
                {renderRadio(radios)}
            </RadioGroup>
        </div>
    );
}