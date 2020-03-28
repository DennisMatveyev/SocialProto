import React from 'react';
import {NavLink} from "react-router-dom";


const Nav = () => {
    return (
        <nav className='navbar navbar-dark navbar-expand-lg'>
            <ul className='navbar-nav'>
                <li className='nav-item'>
                    <NavLink to='/profile'>Profile</NavLink>
                </li>

                <li className='nav-item'>
                    <NavLink to='/dialogs'>Messages</NavLink>
                </li>

                <li className='nav-item'>
                    <NavLink to='/users'>Users</NavLink>
                </li>

                <li className='nav-item'>
                    <NavLink to='/notes'>Notes</NavLink>
                </li>
            </ul>
        </nav>
    );
};


export default Nav;