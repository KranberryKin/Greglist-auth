import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const House = new Schema(
  {
    bedrooms: { type: Number, required: true, min: 1 },
    bathrooms: { type: Number, required: true, min: 1 },
    levels: { type: Number, required: true, min: 1, max: 4 },
    imgUrl: { type: String },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
