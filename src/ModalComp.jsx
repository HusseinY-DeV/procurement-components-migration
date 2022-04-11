import React, { useEffect, useState } from 'react'

export function ModalComp({ modalTitle, modalBody, onAcceptColor, onRefusedColor, onCloseColor, onAcceptText, onRefusedText, onCloseText, onAccept, onRefused, onClose, className, modal, size }) {

    const [modalState, setModalState] = useState(false)

    useEffect(() => {
        if (modalState !== modal) setModalState(modal)
    }, [modal])



    return (

        <div onKeyDown={(e) => { if (e.key === 'Escape') onClose?.() }}>
            <Modal
                size={size ? size : ""}
                isOpen={modalState} className={"reset-modal-style " + className}
                toggle={onClose}
                backdrop="static">
                <ModalHeader id="custom-modal-header" >{modalTitle}</ModalHeader>
                <ModalBody id="custom-modal-body">{modalBody}</ModalBody>
                <ModalFooter id="custom-modal-footer">
                    {onAccept && <Button color={onAcceptColor || "info"} onClick={onAccept}>{onAcceptText || "Save"}</Button>}
                    {onRefused && <Button color={onRefusedColor || "warning"} onClick={onRefused}>{onRefusedText || "Refused"}</Button>}
                    {onClose && <Button color={onCloseColor || "danger"} onClick={onClose}>{onCloseText || "Close"}</Button>}
                </ModalFooter>
            </Modal>
        </div>
    )
}
