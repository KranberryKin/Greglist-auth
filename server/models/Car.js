import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const Car = new Schema(
  {
    make: { type: String, required: [true, 'Who make it?'], enum: ['honda', 'hyundai', 'ford', 'tesla'], lowercase: true },
    model: { type: String, required: true },
    imgUrl: { type: String, default: '//placehold.it/100x100', minlength: 8 },
    year: { type: Number, required: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
