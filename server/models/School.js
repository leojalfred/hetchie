import mongoose, { Schema } from 'mongoose'

const school = new Schema({
  name: { type: String, required: true },
  firms: [
    {
      firm: { type: Schema.Types.ObjectId, ref: 'firms', required: true },
      offices: [
        {
          locations: [{ type: Schema.Types.ObjectId, ref: 'locations' }],
          practices: [{ type: Schema.Types.ObjectId, ref: 'practices' }],
          qualifications: [
            { type: Schema.Types.ObjectId, ref: 'qualifications' },
          ],
          salary: {
            large: { type: Number, required: true },
            small: Number,
          },
          date: { type: Date, required: true },
        },
      ],
      gpa: {
        required: { type: Number, required: true },
        band: Number,
      },
    },
  ],
  protected: { type: Boolean, default: false, required: true },
})

const School = mongoose.model('schools', school)
export default School
