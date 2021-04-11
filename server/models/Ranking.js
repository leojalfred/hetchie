import mongoose, { Schema } from 'mongoose'

const ranking = new Schema({
  name: { type: String, required: true },
  link: { type: String, required: true },
})

const Ranking = mongoose.model('rankings', ranking)
export default Ranking
