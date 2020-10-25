const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const path = require("path")
const fs = require("fs")
const db = require("./Develop/models")
var Workout = mongoose.model('Workout');


const PORT = process.env.PORT || 3000;
const app = express()

app.use(morgan());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
mongoose.connect('mongodb://localhost/workout', {useNewUrlParser: true});

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../Develop/public/index.html"))
  })

app.get('/exercise', (req, res) => {
  res.sendFile(path.join(__dirname, "../Develop/public/exercise.html"))
  })

app.get('/stats', (req, res) => {
  res.sendFile(path.join(__dirname, "../Develop/public/stats.html"))
  })

app.get("/api/workouts", function (req, res) {
  Workout.find({}).then(function (data) {
    
      data.forEach(
        (workout) => {
          workout.totalDuration = getTotalDuration(workout)
        }
      )
      console.log(data)
      res.json(data)
  }).catch(error => {
      res.json(error);
  });
});

app.post('/api/workouts', (req, res) => {
Workout.create({
  day: new Date(),
  exercises: []
})
  .then(data => {
      res.json(data);
  })
  .catch(error => {
      res.json(error);
  });
  })

app.get('/api/workouts/range', (req, res) => {
Workout.aggregate([{ $enum: {}}]).then(function (data) {
  res.json(data)
}).catch(error => {
  res.json(error);
});
  })

app.put('/api/workouts/:id', (req, res) => {
  Workout.update({_id: req.params.id},{$push: { exercises: req.body }})
  .then(data => {
      res.json(data);
  })
  .catch(error => {
      res.json(error);
  });
  })

app.listen(PORT, () => {
    console.log("App is listening on: " + PORT)
  })

getTotalDuration = function(workout){
    let total = 0;
      const exercises = workout.exercises
      exercises.forEach(
        (exercise) => {
          total = total + exercise.duration
          
        }
      )
      console.log(total)
      return total;
}