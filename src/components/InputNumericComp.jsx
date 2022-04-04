import React from 'react'
import NumberFormat from "react-number-format";

export default React.memo(function InputNumericComp({ allowLeadingZeros, disabled, onBlur, readOnly, name, thousandSeparator, suffix, className, value, style, format, maxLength, placeholder, allowNegative, noDecimal, handleChange, maxValue, minValue }) {
    return (
        <div>
            <NumberFormat
                id={name}
                thousandSeparator={thousandSeparator ? true : false}
                suffix={suffix ? suffix : ""}
                name={name}
                className={`form-control  ${className}`}
                style={style}
                value={value}
                format={format ? format : null}
                maxLength={maxLength ? maxLength : null}
                placeholder={placeholder ? placeholder : ""}
                allowNegative={allowNegative ? true : false}
                onValueChange={(value) => {
                    value = noDecimal ? value.value.replace(".", "") : value.value
                    handleChange(value, name)
                }}
                isAllowed={(values) => {
                    const { formattedValue, floatValue } = values;
                    let isAllowed = true;
                    if ((maxValue && (floatValue > parseFloat(maxValue))) || (minValue && (floatValue < parseFloat(minValue)))) isAllowed = false
                    return formattedValue === "" || isAllowed
                }}
                readOnly={readOnly ? true : false}
                disabled={disabled ? true : false}
                onBlur={() => onBlur ? onBlur(value, name) : undefined}
                allowLeadingZeros={allowLeadingZeros ? true : false}
            />
        </div>
    )
})
