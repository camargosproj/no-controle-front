
// Styles
import styles from "./sidebar.module.css";


// Third-party libraries
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PaidIcon from '@mui/icons-material/Paid';
import AddCardIcon from '@mui/icons-material/AddCard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SavingsIcon from '@mui/icons-material/Savings';
import Link from 'next/link';




const SideBar = () => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarLogoContainer}>
                <Link href="/">
                    <span className='logo'>NO CONTROLE</span>
                </Link>
            </div>
            <div className={styles.sidebarLinksContainer}>
                <ul>
                    <p className={styles.title}>MAIN</p>
                    <li>
                        <DashboardIcon className={styles.icon} />
                        <span>Dashboard</span>
                    </li>
                    <p className={styles.title}>MENU</p>
                    <Link href="/incomes">
                        <li>
                            <PaidIcon className={styles.icon} />
                            <span>Rendimentos</span>
                        </li>
                    </Link>
                    <Link href="/expenses">
                        <li>
                            <AddCardIcon className={styles.icon} />
                            <span>Despesas</span>
                        </li>
                    </Link>
                    <Link href="/contas">
                        <li>
                            <SavingsIcon className={styles.icon} />
                            <span>Contas</span>
                        </li>
                    </Link>
                    <p className='title'>Configurações</p>
                    <Link href="/perfil">
                        <li>
                            <PersonOutlineIcon className={styles.icon} />
                            <span>Perfil</span>
                        </li>
                    </Link>
                    <Link href="/logout">
                        <li>
                            <ExitToAppIcon className={styles.icon} />
                            <span>Sair</span>
                        </li>
                    </Link>

                </ul>
            </div>

        </div>
    );
}

export default SideBar;