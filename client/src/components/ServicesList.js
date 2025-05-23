/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from 'mobx-react-lite'
import ServiceCard from './ServiceCard'
import { useContext, useEffect } from 'react'
import { Context } from '..'
import { getServices } from '../http/servicesAPI'

const ServicesList = observer(() => {
  const { services } = useContext(Context)

  useEffect(() => {
    getServices().then((data) => {
      services.setServices(data)
      console.log(services.services)
    })
  }, [])

  return (
    <section className='section'>
      <div className='grid'>
        {services.services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  )
})

export default ServicesList
