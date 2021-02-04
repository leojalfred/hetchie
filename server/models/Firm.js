import mongoose, { Schema } from 'mongoose'

const firm = new Schema({
  name: { type: String, required: true },
  links: { firm: String, chambers: String, vault: String },
  rankings: [
    {
      position: { type: Number, required: true },
      ranking: { type: Schema.Types.ObjectId, ref: 'rankings', required: true },
    },
  ],
})

const Firm = mongoose.model('firms', firm)
export default Firm
