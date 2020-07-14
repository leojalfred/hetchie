import mongoose, { Schema } from 'mongoose'

const locationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isAlso: [{ type: Schema.Types.ObjectId, ref: 'locations' }],
})

const Location = mongoose.model('locations', locationSchema)
export default Location
