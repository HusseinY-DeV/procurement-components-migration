import React, { useCallback, useEffect, useState } from 'react'
import { Tooltip } from "reactstrap";

export default React.memo(function InputPassComp({ right, value, handleChange, name, handleOnblur, className, maxLength, disabled, readOnly, placeholder, hideToggle }) {

    const [state, setState] = useState({ stateValue: value, showPassword: false, showToolTip: false })

    const handleChangeInput = useCallback((e) => {
        const { value } = e.target
        setState(prevState => (
            { ...prevState, stateValue: value }
        ))
        handleChange(value, name)
    }, [])

    const togglePasswordVisibility = useCallback(() => {
        setState(prevState => ({
            ...prevState, showPassword: !prevState.showPassword
        }))
    }, [])

    const toggleTooltip = useCallback(() => {
        setState(prevState => ({
            ...prevState, showToolTip: !prevState.showToolTip
        }))
    }, [])

    const onBlur = useCallback((e) => {
        setState(prevState => (
            { ...prevState, stateValue: e.target.value.trim() }
        ))
        handleChange(e.target.value.trim(), name)
        handleOnblur && handleOnblur(e.target.value.trim())
    }, [])

    useEffect(() => {
        if (value === state.stateValue) return
        setState(prevState => (
            { ...prevState, stateValue: value }
        ))
    }, [value])


    return (
        <>
            <input
                type={state.showPassword ? "text" : "password"}
                name={name}
                style={{ padding: "0.5rem 1.5rem 0.5rem 0.75rem" }}
                className={`form-control ${className}`}
                value={state.stateValue}
                onChange={handleChangeInput}
                placeholder={placeholder}
                readOnly={readOnly ? true : false}
                disabled={disabled ? true : false}
                maxLength={maxLength ? maxLength : null}
                onBlur={onBlur}
            />
            {!hideToggle &&
                <span className="showPass pointer" id={`${name}-showhidePass`} onClick={togglePasswordVisibility} style={{ position: "absolute", top: "0px", right, padding: "0.45rem 0.3rem", zIndex: 1000, cursor: 'pointer' }}>
                    <i className={`fa fa-eye${state.showPassword ? "-slash" : ""}`}></i>
                    <Tooltip placement="bottom" isOpen={state.showToolTip} target={`${name}-showhidePass`} toggle={toggleTooltip}>{state.showPassword ? "Hide Password" : "Show Password"}</Tooltip>
                </span>
            }
        </>
    )
})
