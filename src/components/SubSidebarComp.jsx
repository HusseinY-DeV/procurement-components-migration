import React, { useCallback, useEffect, useState } from 'react'

export default React.memo(function SubSidebarComp({ initialPage, pages, handleNav }) {

    const [state, setState] = useState({ currentPage: initialPage, pages, hasPriv: '' })

    const navigatePage = useCallback((page, disabled, item) => {
        if (disabled) return
        handleNav(page)
    }, [])

    const listItems = useCallback(() => {
        const items = []

        for (let item of state.pages) {
            items.push(
                <li key={item.value} className={state.currentPage === item.value ? "button-active" : ""}
                    style={item.disabled ? { cursor: "not-allowed" } : { cursor: "pointer" }}
                    onClick={() => navigatePage(item.value, item.disabled, item)} >
                    {item.label}
                </li>
            )
        }
    }, [state.pages])

    useEffect(() => {
        if (state.pages === pages && state.currentPage === initialPage) return
        setState(prev => ({
            ...prev, currentPage: initialPage, pages
        }))
    }, [initialPage, pages])

    return (
        <div className="subsidebar" >
            <ul className="sideitem mt-3">
                {listItems()}
            </ul>
        </div>
    )
})
