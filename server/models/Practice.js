import mongoose, { Schema } from 'mongoose'

const practiceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isAlso: [{ type: Schema.Types.ObjectId, ref: 'practices' }],
})

const Practices = mongoose.model('practices', practiceSchema)
export default Practices
