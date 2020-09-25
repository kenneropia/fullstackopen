const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const Note = require('./models/note')

morgan.token('host', function (req, res) {
  return req.hostname
})

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(
  morgan(
    ':url :req[body] :method :host :status :res[content-length] - :response-time ms'
  )
)

const generateID = (notes) => {
  const maxID = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0
  return maxID + 1
}

app.get('/', (req, res) => {
  res.send('<h1>Hello Worl</h1>')
})

app.get('/api/notes', (req, res) => {
  Note.find({}).then(
    notes => {
      res.json(notes)
      mongoose.connection.close()
    }
    
  )
  

})

app.put('/api/notes/:id', (req, res) => {
  const body = req.body
  const id = +req.params.id
  const verifiedNote = notes.findIndex((element) => {
    return element.id == id
  })

  if (verifiedNote !== -1) {
    notes[verifiedNote] = body
    res.json(body)
  }
})

app.post('/api/notes', (req, res) => {
  const body = req.body

  if (!body.content) {
    return res.status(404).json({
      error: 'content missing',
    })
  }


const note = new Note({
  content: body.content,
  date: new Date(),
  important: body.important || false,
})

note.save().then((result) => {
  console.log('note saved!')
  
})

})


app.get('/api/notes/:id', (req, res) => {
  const id = +req.params.id
  const note = notes.find((note) => {
    return note.id === id
  })
  if (note) res.json(note)
  else
    res.status(404).json({
      error: 'content missing',
    })
})

app.delete('/api/notes/:id', (req, res) => {
  const id = +req.params.id
  notes = notes.filter((note) => note.id !== id)
  res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`you can finally have some rest on localhost:${PORT}`)
