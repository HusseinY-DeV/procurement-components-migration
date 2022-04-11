import React, { useCallback, useEffect, useState } from 'react'
import { Tooltip, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useNavigate } from 'react-router-dom';

export function SaveButton({ HideUndoAlert, handleClear, focusOnCancel, modal, createdBy, creationDate, modifiedBy, modifiedDate, StartRfp, SendEmail, SendReminder, toggleModalReason, handleSave, handleFromOffer, handleSaveAsDraft, shouldBlockNavigation, visible }) {


    const navigate = useNavigate()
    const [tooltip, setToolTip] = useState({
        save: false, saveAsDraft: false, clear: false, close: false, start: false, sendMail: false, sendReminder: false, reject: false
    })
    const [mondalState, setModalState] = useState({ clearModal: false, discardModal: false, toggleModalReason: false })

    const toggleTooltip = useCallback((name) => {
        setToolTip(prevState => ({
            ...prevState, [name]: !prevState[name]
        }))
    }, [])

    const toggleModal = useCallback(() => {
        if (HideUndoAlert) handleClear()
        else setModalState(prevState => ({
            ...prevState, clearModal: !prevState.clearModal
        }))

        if (focusOnCancel) focusOnCancel()
    }, [HideUndoAlert, focusOnCancel])

    const handleClose = useCallback(() => {
        if (focusOnCancel) focusOnCancel()
        navigate.goBack()
    }, [focusOnCancel])

    return (
        <div className={`componentButtonsContainer ${modal ? "buttonsContainerInModal" : "buttonsContainer"} hidden`}>
            <div className="row no-margin">
                <div className="col-md-6">
                    {
                        visible &&
                        <small>Created by {createdBy} on {creationDate} - Modified by {modifiedBy} on {modifiedDate}</small>
                    }
                </div>
                <div className="col-md-6 text-right no-padding">
                    <button id="start" type="button" className="topIcons" onClick={StartRfp} >
                        <i className="fa fa-play-circle"></i>
                        <span>Start</span>
                        <Tooltip placement="bottom" isOpen={tooltip.start} target="start" toggle={toggleTooltip("start")}>Start</Tooltip>
                    </button>

                    <button id="sendMail" type="button" className="topIcons" onClick={SendEmail} >
                        <i className="fa fa-envelope"></i>
                        <span>Send Mail</span>
                        <Tooltip placement="bottom" isOpen={tooltip.sendMail} target="sendMail" toggle={toggleTooltip("sendMail")}>Send Mail</Tooltip>
                    </button>

                    <button id="sendReminder" type="button" className="topIcons" onClick={SendReminder} >
                        <i className="fa fa-bell"></i>
                        <span>Send Reminder</span>
                        <Tooltip placement="bottom" isOpen={tooltip.sendReminder} target="sendReminder" toggle={toggleTooltip("sendReminder")}>Send Reminder</Tooltip>
                    </button>

                    <button id="reject" type="button" className="topIcons" onClick={toggleModalReason} style={{ color: "red" }}>
                        <i className="fa fa-trash-o"></i>
                        <span>Reject</span>
                        <Tooltip placement="bottom" isOpen={tooltip.reject} target="reject" toggle={toggleModalReason}>Reject</Tooltip>
                    </button>

                    <button id="clear" type="button" className="topIcons" onClick={toggleModal} >
                        <i className="fa fa-trash-o"></i>
                        <span>Undo</span>
                        <Tooltip placement="bottom" isOpen={tooltip.clear} target="clear" toggle={toggleTooltip("clear")}>Undo</Tooltip>
                    </button>

                    <button id="save" className="topIcons" type="button" onClick={handleSave}>
                        <i className="fa fa-floppy-o"></i>
                        <span>Save</span>
                        <Tooltip placement="bottom" isOpen={tooltip.save} target="save" toggle={toggleTooltip("save")}>Save</Tooltip>
                    </button>

                    <button id="fromOffer" className="topIcons" type="button" onClick={handleFromOffer}>
                        <i className="fa fa-floppy-o"></i>
                        <span>From Offer</span>
                        <Tooltip placement="bottom" isOpen={tooltip.save} target="fromOffer" toggle={toggleTooltip("fromOffer")}>From Offer</Tooltip>
                    </button>

                    <button id="saveAsDraft" className="topIcons" type="button" onClick={handleSaveAsDraft}>
                        <i className="fa fa-floppy-o"></i>
                        <span>Save As Draft</span>
                        <Tooltip placement="bottom" isOpen={tooltip.saveAsDraft} target="saveAsDraft" toggle={toggleTooltip("saveAsDraft")}>Save As Draft</Tooltip>
                    </button>

                    <button id="close" className="topIcons" type="button" onClick={handleClose}>
                        <i className="fa fa-times"></i>
                        <span>Close</span>
                        <Tooltip placement="bottom" isOpen={tooltip.close} target="close" toggle={toggleTooltip("close")}>Close</Tooltip>
                    </button>

                    <Modal isOpen={mondalState.clearModal} toggle={toggleModal} className="clearModal ">
                        <ModalHeader toggle={toggleClearModal}>Undo</ModalHeader>
                        <ModalBody>
                            {shouldBlockNavigation ? "Are you sure you want to undo ?" : "No changes detected !"}
                        </ModalBody>
                        <ModalFooter>
                            {shouldBlockNavigation && <Button color="primary" onClick={() => { handleClear(); toggleModal(); }}>Undo</Button>}
                            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        </div>
    )
}
