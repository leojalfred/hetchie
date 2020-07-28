import mongoose, { Schema } from 'mongoose'

const ranking = new Schema({
  name: { type: String, required: true },
  link: String,
})

const Ranking = mongoose.model('rankings', ranking)
export default Ranking
