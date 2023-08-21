import {
    DarkModeOutlined,
    ExitToApp,
    NotificationsNoneOutlined,
    PaidSharp,
    SearchOutlined
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../../services/contexts/useAuth";
import styles from "./navbar.module.css";

const NavBar = () => {
    const { user, logout } = useAuth();
    return (
        <div className={styles.navbar}>
            <div className={styles.container}>
                <div className={styles.navLeftContainer}>
                    <Link href="/">NO CONTROLE</Link>
                    <PaidSharp />
                    <div className={styles.searchContainer}>
                        <input type="text" placeholder="Pesquisar" />
                        <SearchOutlined />
                    </div>
                </div>
                <div className={styles.navRightContainer}>
                    <div className={styles.item}>
                        <DarkModeOutlined
                            className={`${styles.icon} ${styles.darkIcon}`}
                        />
                    </div>
                    <div className={styles.item}>
                        <NotificationsNoneOutlined
                            className={`${styles.icon} ${styles.notificationIcon}`}
                        />
                        <div className={styles.notificationCounter}>1</div>
                        <div className={styles.item}>
                            <span>
                                Olá, <b>{user?.name}</b>
                            </span>
                        </div>
                        <div className={styles.item}>
                            <Image
                                src="/profile.jpg"
                                alt=""
                                className={styles.profileImage}
                                width={100}
                                height={100}
                            />
                        </div>
                        <div className={styles.item} onClick={logout}>
                            <ExitToApp className={styles.exitIcon} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
