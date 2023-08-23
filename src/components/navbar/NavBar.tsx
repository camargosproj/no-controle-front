
import Image from "next/image";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdDarkMode, MdOutlineExitToApp, MdPaid } from "react-icons/md";
import { useAuth } from "../../services/contexts/useAuth";
import styles from "./navbar.module.css";

const NavBar = () => {
    const { user, logout } = useAuth();
    return (
        <div className={styles.navbar}>
            <div className={styles.container}>
                <div className={styles.navLeftContainer}>
                    <Link href="/">NO CONTROLE</Link>
                    <MdPaid className={`text-primary text-6xl md:text-2xl`} />
                    <div className={styles.searchContainer}>
                        <input type="text" placeholder="Pesquisar" />
                        <AiOutlineSearch className={`text-primary text-6xl md:text-2xl`} />
                    </div>
                </div>
                <div className={styles.navRightContainer}>
                    <div className={styles.item}>

                        <MdDarkMode className={`text-primary text-6xl md:text-2xl`} />
                    </div>
                    <div className={styles.item}>

                        <IoIosNotificationsOutline className={`text-primary text-6xl md:text-2xl`} />
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
                            <MdOutlineExitToApp className={`text-primary text-6xl md:text-2xl`} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
