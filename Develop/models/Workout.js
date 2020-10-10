const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const workoutSchema = new Schema (
    {
            day: {
                 type: Date 
            },
            exercises: [{
                type: {
                    type: String
                },
                name: {
                    type: String,
                    trim: true
                },
                duration: {
                    type: Number,
                    trim: true
                },
                weight: {
                    type: Number,
                    trim: true
                },
                reps: {
                    type: Number,
                    trim: true
                },
                sets: {
                    type: Number,
                    trim: true
                },
                distance: {
                    type: Number,
                    trim: true

                }
                
            }],
            totalDuration: {
                type: Number
            }
    }
)

const model = mongoose.model("Workout", workoutSchema)


module.exports = model