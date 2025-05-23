import { Link } from 'react-router-dom';
import {useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {MAIN_ROUTE} from "../utils/consts";
import {registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const formatPhone = (value) => {
    let cleaned = value.replace(/\D/g, ''); // Удаляем всё, кроме цифр
    
    // Ограничиваем длину (11 цифр для РФ)
    cleaned = cleaned.substring(0, 11);

    let formatted = '';
    if (cleaned.length > 0) {
      formatted = '+7 ';
      if (cleaned.length > 1) {
        formatted += '(' + cleaned.substring(1, 4);
      }
      if (cleaned.length >= 4) {
        formatted += ') ' + cleaned.substring(4, 7);
      }
      if (cleaned.length >= 7) {
        formatted += '-' + cleaned.substring(7, 9);
      }
      if (cleaned.length >= 9) {
        formatted += '-' + cleaned.substring(9, 11);
      }
    }
    return formatted;
  };

const Registration = observer(() => {


    const {user} = useContext(Context)
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');


    const click = async () => {
        try {
            let data;

            data = await registration(email, password, name, phone);
            console.log(data)
            user.setUser(user)
            user.setIsAuth(true)
            navigate(MAIN_ROUTE)
        } catch (e) {
            console.log(e)
        }

    }


return (
    <div className='authContainer'>
      <div className='authForm'>
        <h2 className='authTitle'>Регистрация</h2>
        
        <form>
          <div className='inputGroup'>
            <label htmlFor="email" className='inputLabel'>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='inputField'
              required
            />
          </div>

          <div className='inputGroup'>
            <label htmlFor="password" className='inputLabel'>Пароль</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='inputField'
              required
            />
          </div>
          
          <div className='inputGroup'>
            <label htmlFor="name" className='inputLabel'>Имя</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='inputField'
              required
            />
          </div>
          
          <div className='inputGroup'>
            <label htmlFor="phone" className='inputLabel'>Номер телефона</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              className='inputField'
              required
            />
          </div>

          <button onClick={click} className='authButton'>
            <p>Войти</p>
          </button>
        </form>

        <div className='authFooter'>
          <p>Уже есть аккаунт? <Link to="/login" className='authLink'>Войти</Link></p>
        </div>
      </div>
    </div>
  );
});

export default Registration;
