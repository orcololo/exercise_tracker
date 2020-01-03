const mongoose = require("../database");

const ExerciseSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    duration: {
      type: Number,
      require: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;
