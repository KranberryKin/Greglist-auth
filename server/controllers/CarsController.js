import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { carsService } from '../services/CarsService'
import { logger } from '../utils/Logger'

export class CarsController extends BaseController {
  constructor() {
    super('api/cars')
    this.router
      .get('', this.getCars)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo) // middleware
      .post('', this.createCar)
      .delete('/:carId', this.removeCar)
      .put('/:id', this.editCar)
  }

  async getCars(req, res, next) {
    try {
      const cars = await carsService.getCars()
      return res.send(cars)
    } catch (error) {
      next(error)
    }
  }

  async createCar(req, res, next) {
    try {
      logger.log('Who is the User?', req.userInfo)
      req.data.creatorId = req.userInfo.id
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      const car = await carsService.createCar(req.data)
      res.send(car)
    } catch (error) {
      next(error)
    }
  }

  async editCar(req, res, next) {
    try {
      const car = await carsService.editCar(req.params.carId, req.userInfo.id, req.body)
      res.send(car)
    } catch (error) {
      next(error)
    }
  }

  async removeCar(req, res, next) {
    try {
      const car = await carsService.removeCar(req.params.carId, req.userInfo.id)
      res.send(car)
    } catch (error) {
      next(error)
    }
  }
}
