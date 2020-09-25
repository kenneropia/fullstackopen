require('dotenv').config()
const mongoose = require('mongoose')

let mongooseUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/Note-app'


mongoose
  .connect(mongooseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })



const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

mongoose.pluralize(null)



module.exports = mongoose.model('Note', noteSchema)
