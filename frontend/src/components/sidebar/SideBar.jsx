import {Link} from 'react-router-dom';

// Styles
import './SideBar.scss';

// Third-party libraries
import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PaidIcon from '@mui/icons-material/Paid';
import AddCardIcon from '@mui/icons-material/AddCard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SavingsIcon from '@mui/icons-material/Savings';





const SideBar = () => {
    return ( 
        <div className="sidebar">
            <div className="sidebar-logo-container">
                <Link to="/">
                    <span className='logo'>NO CONTROLE</span>
                </Link>
            </div>
            <div className="sidebar-links-container">
                <ul>
                    <p className='title'>MAIN</p>
                    <li>
                        <DashboardIcon className='icon'/>
                        <span>Dashboard</span>
                    </li>
                    <p className='title'>MENU</p>
                    <Link to="/rendimentos">
                        <li>
                            <PaidIcon className="icon" />
                            <span>Rendimentos</span>
                        </li>
                    </Link>
                    <Link to="/despesas">
                        <li>
                            <AddCardIcon className="icon" />
                            <span>Despesas</span>
                        </li>
                    </Link>
                    <Link to="/contas">
                        <li>
                            <SavingsIcon className="icon" />
                            <span>Contas</span>
                        </li>
                    </Link>
                    <p className='title'>Configurações</p>
                    <Link to="/perfil">
                        <li>
                            <PersonOutlineIcon className="icon" />
                            <span>Perfil</span>
                        </li>
                    </Link>
                    <Link to="/logout">
                        <li>
                            <ExitToAppIcon className="icon" />
                            <span>Sair</span>
                        </li>
                    </Link>

                </ul>
            </div>

        </div>
    );
}
 
export default SideBar;