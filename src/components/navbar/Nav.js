import React from 'react';
import {NavLink} from "react-router-dom";


const Nav = () => {
    return (
        <nav className='nav'>
            <div>
                <NavLink to='/profile'>Profile</NavLink>
            </div>

            <div>
                <NavLink to='/dialogs'>Messages</NavLink>
            </div>

            <div>
                <NavLink to='/users'>Users</NavLink>
            </div>

        </nav>
    );
};


export default Nav;