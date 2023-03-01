
// Styles
import styles from "./navbar.module.css";

// Third-party libraries
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import Image from "next/image";



const NavBar = () => {
    return (
        <div className={styles.navbar}>
            <div className={styles.container}>
                <div className={styles.searchContainer}>
                    <input type="text" placeholder="Pesquisar" />
                    <SearchOutlinedIcon />
                </div>
                <div className={styles.rightContainer}>
                    <div className={styles.item} >
                        <DarkModeOutlinedIcon className={`${styles.icon} ${styles.darkIcon}`} />
                    </div>
                    <div className={styles.item}>
                        <NotificationsNoneOutlinedIcon className={`${styles.icon} ${styles.notificationIcon}`} />
                        <div className={styles.notificationCounter}>1</div>
                        <div className={styles.item}>
                            <span>Olá, <b>Marcos</b></span>
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
                    </div>
                </div>

            </div>

        </div >
    );
}

export default NavBar;