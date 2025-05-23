/* eslint-disable jsx-a11y/alt-text */
import { Link } from 'react-router-dom'
import logo from './../../assets/logo.jpg'
import { useContext } from 'react'
import {
  FaShoppingCart,
  FaUserCog,
  FaSignInAlt,
  FaSignOutAlt,
} from 'react-icons/fa'
import { observer } from 'mobx-react-lite'
import { Context } from '../../index'
import styles from './NavBar.module.css'

const Navbar = observer(() => {
  const { user } = useContext(Context)

  const logOut = () => {
    console.log(user.isAuth)
    user.setUser({})
    user.setIsAuth(false)
  }

  const getData = () => {
    console.log(user.isAuth)
    console.log(user.user.name)
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to='/' className={styles.logo}>
          <span className={styles.logoIcon}>
            <img src={logo} />
          </span>
          <span className={styles.logoText}>ВОЛК ДИТЕЙЛИНГ</span>
        </Link>

        <ul className={styles.navLinks}>
          <li>
            <Link to='/' className={styles.link}>
              ГЛАВНАЯ
            </Link>
          </li>
          <li>
            <Link onClick={getData} to='/portfolio' className={styles.link}>
              ПОРТФОЛИО
            </Link>
          </li>
        </ul>

        <div className={styles.navLinks}>
          <ul className={styles.navLinks}>
            {user.user.role === 'ADMIN' && (
              <li>
                <Link to='/admin/services'>
                  <FaUserCog
                    className={styles['navbar-icons'] + ' ' + styles.link}
                  />
                </Link>
              </li>
            )}

            {user.isAuth ? (
              <>
                <li>
                  <Link to='/basket'>
                    <FaShoppingCart
                      className={styles['navbar-icons'] + ' ' + styles.link}
                    />
                  </Link>
                </li>
                <li>
                  <Link to='/login' onClick={logOut}>
                    <FaSignOutAlt
                      className={styles['navbar-icons'] + ' ' + styles.link}
                    />
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link to='/login'>
                  <FaSignInAlt
                    className={styles['navbar-icons'] + ' ' + styles.link}
                  />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
})

export default Navbar
