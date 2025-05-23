import { Routes, Route, Link } from 'react-router-dom'
import ServicesAdmin from '../../components/ServicesAdmin/ServicesAdmin'
import styles from './Admin.module.css'

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <ul>
          <li>
            <Link to='/admin/services'>УСЛУГИ</Link>
          </li>
          <li>
            <Link to='/admin/portfolio'>ПОРФОЛИО</Link>
          </li>
          <li>
            <Link to='/admin/orders'>ЗАКАЗЫ</Link>
          </li>
        </ul>
      </div>
      <div className={styles.main}>
        <Routes>
          <Route exact path='services' element={<ServicesAdmin />} />
          <Route path='portfolio' element={<p>Porfolio</p>} />
          <Route path='orders' element={<p>Orders</p>} />
        </Routes>
      </div>
    </div>
  )
}

export default Admin
