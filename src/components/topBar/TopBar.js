import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom'

import useJoboredService from '../../services/JoboredService';
import './topBar.scss';

import jobored from '../../resources/Jobored.svg';
import logo from '../../resources/Union.svg';

const TopBar = () => {

    const {getAuthorization} = useJoboredService();
    
    useEffect(() => {
        getAuthorization()
            .then(onAuthorization);
    }, [])

    const onAuthorization = (token) => {
        localStorage.setItem('_accessToken', token);
    }

    return (
        <header className='topBar__header'>
            <div className="topBar__container">
                <div className='topBar__logo'>
                    <Link to={'/'}>
                        <img className='rotate' src={logo} alt="logotype" />
                        <img className='topBar__logo-text logo' src={jobored} alt="logo-text" />
                    </Link>
                </div>
                <nav className="topBar__menu">
                    <ul>
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) => (isActive ? "active" : "")}
                            >
                                Поиск Вакансий
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                end
                                to='/favorites'
                                className={({ isActive }) => (isActive ? "active" : "")}
                            >
                                Избранное
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default TopBar;