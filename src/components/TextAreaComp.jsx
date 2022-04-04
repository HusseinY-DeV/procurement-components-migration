import React, { useCallback, useEffect, useState } from 'react';
import TextareaAutosize from 'react-autosize-textarea';

export function TextAreaComp({ value, name, maxRows, onChange, placeholder, maxLength, disabled, className, style }) {

    const [state, setState] = useState(value);

    const handleChange = useCallback(e => {
        const { value } = e.target;
        setState(value.trim());
        onChange(value.trim(), name)
    }, [onChange])

    const onBlur = useCallback(e => {
        const { value } = e.target;
        setState(value.trim());
        onChange(value.trim(), name)
    }, [onChange])

    useEffect(() => {
        if (value === state) return;
        setState(value);
    }, [value]);

    return <div>
        <TextareaAutosize
            onChange={handleChange}
            name={name}
            value={state}
            placeholder={placeholder ? placeholder : ""}
            className={`form-control ${className}`}
            style={{ ...style }}
            maxLength={maxLength ? maxLength : 5000}
            onBlur={onBlur}
            disabled={disabled}
            aria-label="maximum height"
            maxRows={maxRows}
        />
    </div>
}


