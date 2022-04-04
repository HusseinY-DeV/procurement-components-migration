import React, { useCallback, useMemo, useState } from 'react';
import { Tooltip } from "reactstrap";
import React from 'react'

const validPositions = ["right", "left"];

export function RoundedIcon({ id, tooltip, backgroundColor, position, display, onClick, iconColor, iconClass }) {

    const divStyles = useMemo(() => {
        return {
            backgroundColor,
            float: validPositions.includes(position) ? position : "none",
            margin: position === 'center' ? "0 auto" : "0 0 0 10px",
            display: display ?? ""
        }
    }, [backgroundColor, position, display]);

    const [state, setState] = useState({
        id: id ? id.replace(/ /g, "").replace(/'/g, "", "") : "",
        tooltip: tooltip ? this.props.tooltip : "",
        tooltipVisible: false
    })

    const toggleTooltip = useCallback(() => {
        setState(prevState => {
            return {
                ...prevState,
                tooltipVisible: !prevState.tooltipVisible
            }
        });
    }, [])

    return <div id={state.id}
        style={divStyles}
        className="roundWrapper pointer"
        onClick={onClick}
    >
        <i style={{ color: `${iconColor}` }} className={`fa ${iconClass}`} />

        {(state.id && state.tooltip) &&
            <Tooltip placement="bottom" isOpen={state.tooltipVisible} target={state.id} toggle={toggleTooltip}>{state.tooltip}</Tooltip>
        }

    </div>
}
