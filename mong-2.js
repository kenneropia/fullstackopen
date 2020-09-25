const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017/Mine-app'

mongoose.connect(url, {
  useNewUrlParser:true,
  useUnifiedTopology:true
})

const mineSchema = new mongoose.Schema({
  miner: String,
  age: Number
})

const Mine = mongoose.model("Mine", mineSchema)

const mine = new Mine({
  miner: "james brown",
  age: 15
})

mine.save().then(result => {
  console.log(result,"fff")
 
})

Mine.find({}).then((mines) => {
  mines.forEach((m) => {
    console.log(m)
  })
  
})
