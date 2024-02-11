import React from "react";
import Link from "next/link";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <Link href="/" passHref className={styles.title}>
        ShopMyStyle
      </Link>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <Link href="/api/auth/login" passHref>
            Login
          </Link>
        </li>
        {/* <li className={styles.li}>
          <Link href="/favorites" passHref>
            Favorites
          </Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default NavBar;
