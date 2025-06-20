"use client"
import { useEffect } from 'react';
import style from './style.css';
import { LayoutDashboard, ChevronLeft, User, Menu, CalendarDays, Library, Star, Settings, HelpCircle, LogOut } from 'lucide-react'; // Make sure 'Extension' is imported here
import Image from 'next/image';
import logo from './logo.png';

const Sidebar = () => {


    return (
        <>
            {/* Button for mobile menu */}
            <button className="sidebar-menu-button">
                <Menu />
            </button>

            {/* Sidebar */}
            <aside className="sidebar">
                {/* Sidebar Header */}
                <header className="sidebar-header">
                    <a href="#" className="header-logo">
                        <Image src={logo} alt="CodingNepal" width={100} height={100}  />
                    </a>

                </header>

                {/* Navigation */}
                <nav className="sidebar-nav">
                    {/* Primary Nav */}
                    <ul className="nav-list primary-nav">
                        {/* Dashboard item */}
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <LayoutDashboard />
                                <span className="nav-label">Dashboard</span>
                            </a>

                        </li>




                        {/* Resources */}
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <Library />
                                <span className="nav-label">Resources</span>
                            </a>

                        </li>

                        <li className="nav-item dropdown-container">
                            <a href="#" className="nav-link dropdown-toggle">
                                <Star />
                                <span className="nav-label">Bookmarks</span>
                                </a>
                        </li>



                        {/* Settings */}
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <User />
                                <span className="nav-label">Profile</span>
                            </a>
                            <ul className="dropdown-menu">
                                <li className="nav-item"><a className="nav-link dropdown-title">Settings</a></li>
                            </ul>
                        </li>
                    </ul>

                    {/* Secondary Bottom Nav */}
                    <ul className="nav-list secondary-nav">
                        {/* Support */}
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <HelpCircle />
                                <span className="nav-label">Support</span>
                            </a>
                            <ul className="dropdown-menu">
                                <li className="nav-item"><a className="nav-link dropdown-title">Support</a></li>
                            </ul>
                        </li>

                        {/* Sign Out */}
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <LogOut />
                                <span className="nav-label">Sign Out</span>
                            </a>

                        </li>
                    </ul>
                </nav>
            </aside>
        </>
    )
}
export default Sidebar;