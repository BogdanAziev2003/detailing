import { makeAutoObservable } from 'mobx'

export default class ServiceStore {
  constructor() {
    this._services = {}
    makeAutoObservable(this)
  }

  setServices(data) {
    this._services = data
  }

  get services() {
    return this._services
  }
}
