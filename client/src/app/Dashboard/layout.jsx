import React from 'react';
import Sidebar from "../comp-1/sidebar/sidebar"
import style from "./style.css"

export default function Layout({ children }) {
    return (
        <div className="dashboard-wrapper">
            <Sidebar  className="dashboard-sidebar" />
            <div>{children}</div>
        </div>
    );
}