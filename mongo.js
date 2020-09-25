const mongoose = require("mongoose")

const url = "mongodb://localhost:27017/Note-app";


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is Easy',
  date: new Date(),
  important: true,
})

note.save().then((result) => {
  console.log('note saved!')
  mongoose.connection.close()
})

Note.find({}, {
 _id:0 , content:1,date:1
}).then((result) => {
  result.forEach((note) => {
    console.log(note)
  })
  mongoose.connection.close()
})