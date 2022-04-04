import React, { useCallback, useEffect, useState } from "react";
import EnhancedSwitch from 'react-icheck/lib/EnhancedSwitch'
import { Checkbox } from "react-icheck";
import PropTypes from 'prop-types';


export function CheckboxComp({ checked, onCheckChange, checkboxClassName, name, className, description, disabled, readOnly, style, increaseArea }) {

    const [state, setState] = useState(checked);

    const handleChange = useCallback((key) => e => {
        const value = e.target.checked;
        setState(value)
        onCheckChange(value, key);
    }, []);

    EnhancedSwitch.propTypes = {
        ...EnhancedSwitch.propTypes,
        cursor: PropTypes.string
    }

    useEffect(() => {
        if (state === checked) return;
        setState(checked);
    }, [checked]);

    return <Checkbox
        cursor="pointer"
        checkboxClass={`${checkboxClassName ? checkboxClassName : "icheckbox_square-blue"}${className ? " " + className : ""}`}
        increaseArea={increaseArea ? "20%" : ""}
        checked={state}
        onChange={handleChange(name)}
        label={description ? `<span style='margin:0px 20px 0px 7px'> ${description} </span>` : "<span></span>"}
        disabled={disabled ? true : false}
        readOnly={readOnly ? true : false}
        style={style}
    />
}


