import mongoose, { Schema } from 'mongoose'

const firm = new Schema({
  name: { type: String, required: true },
  links: { firm: String, chambers: String, vault: String },
  rankings: [
    {
      position: { type: Number },
      ranking: { type: Schema.Types.ObjectId, ref: 'rankings', required: true },
    },
  ],
})

const Firm = mongoose.model('firms', firm)
export default Firm
