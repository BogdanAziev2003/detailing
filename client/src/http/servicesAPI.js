import { authHost, $host } from './index'
import { jwtDecode } from 'jwt-decode'

export const getServices = async () => {
  const { data } = await $host.get('api/service')
  return data
}

export const createService = async (service) => {
  console.log('api ', service)
  const { data } = await authHost.post('api/service', service, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return data
}
