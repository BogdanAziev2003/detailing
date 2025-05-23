import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Context } from './../index'
import { useNavigate } from 'react-router-dom'

const ServiceCard = observer(({ service }) => {
  const { user } = useContext(Context)

  const navigate = useNavigate()

  const click = () => {
    if (user.isAuth) {
      alert('Добавлен')
    } else {
      navigate('/login')
    }
  }

  const finalPrice = service.discount
    ? service.price * (1 - service.discount / 100)
    : service.price

  return (
    <div className='card'>
      <div className='imageContainer'>
        <img
          src={'http://127.0.0.1:5000/' + service.photo_url}
          alt={service.name}
          className='image'
        />
        {service.discount > 0 && (
          <div className='discountBadge'>-{service.discount}%</div>
        )}
      </div>

      <div className='content'>
        <h3 className='title'>{service.name}</h3>
        <p className='description'>{service.description}</p>

        <div className='meta'>
          <div className='duration'>
            ⏱️ {Math.floor(service.duration_minutes / 60)}ч{' '}
            {service.duration_minutes % 60}мин
          </div>

          <div className='priceContainer'>
            {service.discount > 0 && (
              <span className='oldPrice'>
                {service.price.toLocaleString()} ₽
              </span>
            )}
            <span className='price'>{finalPrice.toLocaleString()} ₽</span>
          </div>
        </div>

        <button className='button' onClick={click}>
          ЗАПИСАТЬСЯ
        </button>
      </div>
    </div>
  )
})

export default ServiceCard
