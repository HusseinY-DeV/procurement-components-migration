import React, { useCallback, useEffect, useState } from 'react'

export default React.memo(function InputTextComp({ value, removeSpaces, name, handleChange, handleOnblur, id, type, style, className, placeholder, readOnly, disabled, maxLength }) {

    const [valueState, setValueState] = useState(value)

    const handleChangeInput = useCallback((e) => {
        const { value } = e.target
        setValueState(removeSpaces ? value.replace(" ", "") : value)
        handleChange(removeSpaces ? value.replace(" ", "") : value, name)
    }, [])

    const onBlur = useCallback((e) => {
        setValueState(e.target.value.trim())
        handleChange(e.target.value.trim(), name)
        handleOnblur && handleOnblur(e.target.value.trim())
    }, [])

    useEffect(() => {
        if (value === valueState) return
        setValueState(value)
    }, [value])

    return (
        <input
            key={`${name}_input`}
            id={id ? id : undefined}
            type={type ? type : "text"}
            name={name}
            style={style}
            className={`form-control ${className}`}
            value={valueState}
            onChange={handleChangeInput}
            placeholder={placeholder}
            readOnly={readOnly ? true : false}
            disabled={disabled ? true : false}
            onBlur={onBlur}
            maxLength={maxLength ? maxLength : null}
        />
    )
})
