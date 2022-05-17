
// Styles
import "./NavBar.scss";

// Third-party libraries
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";



const NavBar = () => {
    return ( 
        <div className="navbar">
            <div className="container">
                <div className="search-container">
                    <input type="text" placeholder="Pesquisar"/>
                    <SearchOutlinedIcon />                    
                </div>
                <div className="right-container">
                    <div className="item">
                        <DarkModeOutlinedIcon className="icon dark-icon"/>
                    </div>
                    <div className="item">
                        <NotificationsNoneOutlinedIcon className="icon notification-icon" />
                    <div className="notification-counter">1</div>
                    <div className="item">
                        <span>Olá, <b>Marcos</b></span>
                    </div>
                    <div className="item">
                        <img
                        src="https://zipmex.com/static/d1af016df3c4adadee8d863e54e82331/1bbe7/Twitter-NFT-profile.jpg"
                        alt=""
                        className="profile-image"
                        />
                    </div>
          </div>
                </div>

            </div>

        </div>
     );
}
 
export default NavBar;