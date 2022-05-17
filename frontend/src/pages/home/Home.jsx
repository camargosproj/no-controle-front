import "./Home.scss";
import SideBar from "../../components/sidebar/SideBar";
import NavBar from "../../components/navbar/NavBar";
import Widget from "../../components/widget/Widget";
import Chart from "../../components/chart/Chart";
import Featured from "../../components/featured/Featured";

// Third-party libraries
import React from 'react';


const Home = () => {
    return ( 
        <div className="home">
            <SideBar />
            <div className="home-container">
                <NavBar/>
                <div className="widgets">
                     <Widget type="rendimentos" />                   
                     <Widget type="despesas" />                   
                     <Widget type="saldo" />                   
                </div>

                <div className="charts">
                    <Featured />
                    <Chart title="Receita Anual" aspect={2 / 1} />
                </div>
            </div>
        </div>
    );
}
 
export default Home;