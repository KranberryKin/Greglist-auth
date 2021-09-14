import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class CarsService {
  async editCar(carId, userId, carData) {
    const car = await this.getCarById(carId)
    if (!car) {
      throw new BadRequest('Invalid Card ID')
    }

    if (userId !== car.creatorId.toString()) {
      throw new Forbidden('You shall not Pass!')
    }
    car.make = carData.make || car.make
    await car.save()
    return car
  }

  async removeCar(carId, userId) {
    const car = await dbContext.Cars.findById(carId)
    if (userId !== car.creatorId.toString()) {
      throw new Forbidden('You shall not Pass!')
    }
    await car.remove()
    return car
  }

  async getCars() {
    const cars = await dbContext.Cars.find()
    return cars
  }

  async createCar(carData) {
    const car = await dbContext.Cars.create(carData)
    return car
  }

  async getCarById(id) {
    const car = await dbContext.Cars.findById(id)
    if (!car) {
      throw new BadRequest('Invalid Id')
    }
    return car
  }
}

export const carsService = new CarsService()
