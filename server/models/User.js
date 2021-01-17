import mongoose, { Schema } from 'mongoose'

const list = new Schema({
  name: { type: String, required: true },
  firms: [{ type: Schema.Types.ObjectId, ref: 'firms' }],
})

const user = new Schema({
  first: { type: String, required: true },
  last: { type: String, required: true },
  email: { type: String, required: true },
  school: { type: String, required: true },
  year: { type: Number, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  verified: { type: Boolean, default: false },
  admin: { type: Boolean, default: false },
  salt: String,
  gpa: Number,
  locations: [{ type: Schema.Types.ObjectId, ref: 'locations' }],
  practices: [{ type: Schema.Types.ObjectId, ref: 'practices' }],
  lists: [list],
})

const User = mongoose.model('users', user)
export default User
