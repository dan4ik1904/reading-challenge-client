import {  Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Nav from "./Nav/Nav";
import styles from './Layout.module.css'


function Layout() {
  return (
    <>
    <div className={styles.mobile}>
      <div className={styles.mobile__top}>
        <Header />
      </div>
      <div className={styles.mobile__content}>
        <Outlet />
      </div>
      <Nav />
    </div>
      
    </>
  );
}

export default Layout;
