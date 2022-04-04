import React from 'react'
import { NavLink } from 'react-router-dom';

export default function Sidebar({ location }) {

    const handleClick = useCallback((e) => {
        let childrens, i = 0;
        let clickedSection, clickedSectionIsOpened = false;

        e.preventDefault()

        switch (e.target.tagName) {
            case "A":

                //case sidebar on click close all other childrens
                if (e.target.parentElement.parentElement.children.length > 0) {
                    childrens = e.target.parentElement.parentElement.children;
                }

                clickedSection = e.target.parentElement
                break;

            case "SPAN":

                //case sidebar on click close all other childrens
                if (e.target.parentElement.parentElement.parentElement.parentElement.children.length > 0) {
                    childrens = e.target.parentElement.parentElement.parentElement.parentElement.children;
                }

                clickedSection = e.target.parentElement.parentElement.parentElement;
                break;

            default:

                //case sidebar on click close all other childrens
                if (e.target.parentElement.parentElement.parentElement.children.length > 0) {
                    childrens = e.target.parentElement.parentElement.parentElement.children;
                }

                clickedSection = e.target.parentElement.parentElement;
        }

        clickedSectionIsOpened = clickedSection.classList.contains('open');

        if (childrens) {

            for (i = 0; i < childrens.length; i++) {
                childrens[i].classList.remove("open");
            }

        }

        if (!clickedSectionIsOpened) {
            clickedSection.classList.add('open');
        }

    }, [])

    const activeRoute = useCallback((routeName) => {

        if (document.body.className.indexOf("sidebar-hidden") > -1) {

            if (location.pathname.indexOf(routeName) > -1) {
                return 'nav-item nav-dropdown sidebar-active'
            } else {
                return 'nav-item nav-dropdown'
            }

        } else {
            return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
        }

    }, [])

    return (
        <div className="sidebar" style={{ backgroundColor: "whitesmoke" }}>
            <nav className="sidebar-nav">
                <ul className="nav">

                    {/* Dashboard */}
                    <li className={`${this.activeRoute("/dashboard")}`}>
                        <NavLink to={'/auth/dashboard'} className="nav-link mini-font-size" activeClassName="active"><i className="fa fa-th fa-lg mini-font-size"><span className="mini-menu-title">Dashboard</span></i> Dashboard</NavLink>
                    </li>
                    <li className={`divider`}></li>

                </ul>
            </nav>
        </div>
    )
}
