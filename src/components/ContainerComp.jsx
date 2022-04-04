import React, { useCallback, useEffect, useState } from 'react'
import RoundedIcon from "./RoundedIcon"

export default function ContainerComp({ containerBody, name, onClickPlus, containerHeader, addPlus }) {

    const [state, setState] = useState({ isOpen: true, containerBody: containerBody })

    const toggle = useCallback(() => {
        setState(prevState => ({ ...prevState, isOpen: !prevState.isOpen }))
    }, [])

    const handleClickPlus = useCallback(() => {
        onClickPlus(name)
    }, [])

    useEffect(() => {
        if (state.containerBody === containerBody) return
        setState(prevState => ({ ...prevState, containerBody }))
    }, [containerBody])

    return (
        <div className="col-12 border-left border-right border-bottom border-top" style={{ borderRadius: "4px" }}>
            <div className="row containerHeader">
                <div className="col-10 no-padding-right">
                    <div className="flex title">
                        <span className="containerTitle">{containerHeader ? containerHeader : " Sample Title "}</span>
                        {addPlus &&
                            <RoundedIcon
                                iconClass="fa-plus"
                                iconColor="#fff"
                                backgroundColor="#00C20C"
                                onClick={this.onClickPlus}
                                position="left"
                            />
                        }
                    </div>
                </div>
                <div className="col-2 text-right">
                    <div onClick={toggle}>
                        {state.isOpen ? <i className="fa fa-chevron-down pointer"></i> : <i className="fa fa-chevron-up"></i>}
                    </div>
                </div>
            </div>
            <div className="row no-padding" style={{ display: state.isOpen ? "" : "none" }}>
                <div className="col-12">
                    {state.containerBody}
                </div>
            </div>
        </div>
    )
}
