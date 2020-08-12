import mongoose, { Schema } from 'mongoose'

const qualification = new Schema({ name: { type: String, required: true } })
const Qualification = mongoose.model('qualifications', qualification)
export default Qualification
