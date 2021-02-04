import mongoose, { Schema } from 'mongoose'

const user = new Schema({
  first: { type: String, required: true },
  last: { type: String, required: true },
  email: { type: String, required: true },
  school: { type: Schema.Types.ObjectId, ref: 'schools', required: true },
  year: { type: Number, required: true },
  gpa: Number,
  locations: [{ type: Schema.Types.ObjectId, ref: 'locations' }],
  practices: [{ type: Schema.Types.ObjectId, ref: 'practices' }],
  lists: [
    {
      name: { type: String, required: true },
      firms: [{ type: Schema.Types.ObjectId, ref: 'firms' }],
    },
  ],
  role: { type: String, default: 'user', required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
  verified: { type: Boolean, default: false, required: true },
  salt: String,
})

const User = mongoose.model('users', user)
export default User
