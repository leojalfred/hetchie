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
          gpa: { type: Number, required: true },
          salary: {
            large: Number,
            small: Number,
          },
          qualifications: [
            { type: Schema.Types.ObjectId, ref: 'qualifications' },
          ],
          date: { type: Date, required: true },
        },
      ],
    },
  ],
  protected: { type: Boolean, default: false, required: true },
})

const School = mongoose.model('schools', school)
export default School
