import mongoose, { Schema } from 'mongoose'

const photoSchema = new Schema({
  name: {
    type: String
  },
  albumName: {
    type: String
  },
  photoUrl: {
    type: String
  },
  photographer: {
    type: String
  }
}, {
  timestamps: true
})

photoSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      albumName: this.albumName,
      photoUrl: this.photoUrl,
      photographer: this.photographer,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Photo', photoSchema)

export const schema = model.schema
export default model
