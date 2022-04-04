import React, { useCallback, useEffect, useState } from 'react'
import TextareaAutosize from 'react-autosize-textarea';

export default React.memo(function TextAreaComp({ value, name, onChange, placeholder, style, maxLength, maxRows }) {

    const [valueState, setValueState] = useState('')

    const handleChangeInput = useCallback((e) => {
        const { value } = e.target
        setValueState(value)
        onChange(value, name)
    }, [])

    const onBlur = useCallback((e) => {
        setValueState(e.target.value.trim())
        onChange(e.target.value.trim(), name)
    }, [])

    useEffect(() => {
        setValueState(value)
    }, [value])

    return (
        <div>
            <TextareaAutosize
                onChange={handleChangeInput}
                name={name}
                value={valueState}
                placeholder={placeholder ? placeholder : ""}
                className={`form-control ${className}`}
                style={{ ...style }}
                maxLength={maxLength ? maxLength : 5000}
                onBlur={onBlur}
                disabled={disabled ? true : false}
                aria-label="maximum height"
                maxRows={maxRows}
            />
        </div>
    )
})
