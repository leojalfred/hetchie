import mongoose, { Schema } from 'mongoose'

const gpa = new Schema({
  required: { type: Number, required: true },
  band: Number,
})
const salary = new Schema({
  small: Number,
  large: { type: Number, required: true },
})
const ranking = new Schema({
  position: { type: Number, required: true },
  ranking: { type: Schema.Types.ObjectId, ref: 'rankings', required: true },
})
const links = new Schema({ firm: String, chambers: String, vault: String })
const firm = new Schema({
  name: { type: String, required: true },
  links,
  locations: [{ type: Schema.Types.ObjectId, ref: 'locations' }],
  practices: [{ type: Schema.Types.ObjectId, ref: 'practices' }],
  gpa,
  salary,
  rankings: [ranking],
  qualifications: [{ type: Schema.Types.ObjectId, ref: 'qualifications' }],
  date: Date,
})

const Firm = mongoose.model('firms', firm)
export default Firm
