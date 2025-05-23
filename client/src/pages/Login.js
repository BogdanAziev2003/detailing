import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MAIN_ROUTE } from '../utils/consts'
import { login } from '../http/userAPI'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'

const Login = observer(() => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { user } = useContext(Context)
  const navigate = useNavigate()

  const click = async () => {
    try {
      let data

      data = await login(email, password)
      console.log(data)
      user.setUser(data)
      user.setIsAuth(true)
      navigate(MAIN_ROUTE)
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  return (
    <div className='authContainer'>
      <div className='authForm'>
        <h2 className='authTitle'>Вход в аккаунт</h2>

        <form>
          <div className='inputGroup'>
            <label htmlFor='email' className='inputLabel'>
              Email
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='inputField'
              required
            />
          </div>

          <div className='inputGroup'>
            <label htmlFor='password' className='inputLabel'>
              Пароль
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='inputField'
              required
            />
          </div>

          <button onClick={click} className='authButton'>
            <p>Войти</p>
          </button>
        </form>

        <div className='authFooter'>
          <p>
            Ещё нет аккаунта?{' '}
            <Link to='/registration' className='authLink'>
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
})

export default Login
