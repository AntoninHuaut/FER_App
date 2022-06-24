const { randomInt } = require("crypto")
const express = require("express")
const formidable = require("express-formidable")
const path = require("path")

const app = express()
const port = 4007

const idToNames = {
  0: "Angry",
  1: "Disgust",
  2: "Fear",
  3: "Joy",
  4: "Sad",
  5: "Surprise",
}

app.use(
  formidable({
    encoding: "utf-8",
    uploadDir: path.join(__dirname, "uploads"),
    multiples: true,
    keepExtensions: true, // req.files to be arrays of files
  })
)

app.post("/upload", (req, res) => {
  console.log("Files " + JSON.stringify(req.files)) // contains data about file fields
  setTimeout(() => {
    res.send({
      idToNames: idToNames,
      guessEmotion: randomInt(Object.keys(idToNames).length),
      arrayEmotion: Object.keys(idToNames).map((_) => randomInt(1000) / 1000),
    })
  }, 250)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
