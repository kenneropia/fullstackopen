const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

morgan.token('host', function (req, res) {
  return req.hostname
})

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

app.use(
  morgan(':url :req[body] :method :host :status :res[content-length] - :response-time ms')
)

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2019-05-30T18:39:34.091Z',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true,
  },
]

const generateID = (notes) => {
  const maxID = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0
  return maxID + 1
}

app.get('/', (req, res) => {
  res.send('<h1>Hello Worl</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
  console.log(notes)
})

app.post('/api/notes', (req, res) => {
  const body = req.body

  if (!body.content) {
    return res.status(404).json({
      error: 'content missing',
    })
  }

  const note = {
    id: generateID(notes),
    content: body.content,
    date: new Date(),
    important: body.important || false,
  }
  console.log(note)
  notes = notes.concat(note)
  res.json(note)
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
