import { Outlet } from "react-router-dom"
import Header from "./Header/Header"
import styles from './Layout.module.css'
import Nav from "./Nav/Nav"
import ScrollToTop from './ScrollToTop/ScrollToTop'


function Layout() {
  

  return (
    <>
    <ScrollToTop />
    <div className={styles.mobile}>
      <Header />
      <div className={styles.mobile__content}>
        <Outlet />
      </div>
      <Nav />
    </div>
    </>
  );
}

export default Layout;
