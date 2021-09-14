import mongoose from 'mongoose'
import { Value as ValueSchema } from '../models/Value'
import { AccountSchema } from '../models/Account'
import { Car } from '../models/Car'
import { House } from '../models/House'

class DbContext {
  Houses = mongoose.model('House', House)
  Cars = mongoose.model('Car', Car)
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
}

export const dbContext = new DbContext()
