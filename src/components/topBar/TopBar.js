import { Link, NavLink } from 'react-router-dom'

import './topBar.scss';

import jobored from '../../resources/jobored.svg';
import logo from '../../resources/union.svg';

const TopBar = (props) => {

    return (
        <header className='topBar__header'>
            <div className="topBar__container">
                <div className='topBar__logo'>
                    <Link 
                        to={'/'}
                        // onClick={() => onRestart()} 
                    >
                        <img className='rotate' src={logo} alt="logotype" />
                        <img className='topBar__logo-text logo' src={jobored} alt="logo-text" />
                    </Link>
                </div>
                <nav className="topBar__menu">
                    <ul>
                        <li>
                            <NavLink
                                to='/'
                                className={({ isActive }) => (isActive ? "active" : "")}
                            >
                                Поиск Вакансий
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
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