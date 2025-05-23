import Login from './pages/Login'
import Main from './pages/Main'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Registration from './pages/Registration'
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  MAIN_ROUTE,
  REGISTRATION_ROUTE,
} from './utils/consts'
import Basket from './pages/Basket'
import Admin from './pages/Admin/Admin'
import Navbar from './components/NavBar/NavBar'
import { observer } from 'mobx-react-lite'

const App = observer(() => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path={MAIN_ROUTE} element={<Main />} />
        <Route path={LOGIN_ROUTE} element={<Login />} />
        <Route path={REGISTRATION_ROUTE} element={<Registration />} />
        <Route path={BASKET_ROUTE} element={<Basket />} />
        <Route path={ADMIN_ROUTE} element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
})

export default App
