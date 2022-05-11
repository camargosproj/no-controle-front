import "./Home.scss";
import SideBar from "../../components/sidebar/SideBar";

// Third-party libraries
import React from 'react';


const Home = () => {
    return ( 
        <div className="home">
            <SideBar />
            <div className="home-container">
                Teste de font
            </div>
        </div>
    );
}
 
export default Home;