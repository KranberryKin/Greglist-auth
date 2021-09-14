import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class HousesService {
  async getHouses() {
    const Houses = await dbContext.Houses.find()
    return Houses
  }

  async createHouse(houseData) {
    const house = await dbContext.Houses.create(houseData)
    return house
  }

  async findById(id) {
    const house = await dbContext.Houses.findById(id)
    if (!house) {
      throw new BadRequest('Invalid Id')
    }
    return house
  }
}

export const hosuesService = new HousesService()
