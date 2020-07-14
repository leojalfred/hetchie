import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  first: {
    type: String,
    required: true,
  },
  last: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  salt: String,
  locations: [{ type: Schema.Types.ObjectId, ref: 'locations' }],
  practices: [{ type: Schema.Types.ObjectId, ref: 'practices' }],
})

const User = mongoose.model('users', userSchema)
export default User
