const mongoose = require('mongoose')

const MetricSchema = new mongoose.Schema({
  searchTerm: {
    type: String,
    required: [true, 'searchTerm must be provided'],
  },
  count: {
    type: Number,
    default: 1,
  },
  poster_url: {
    type: String,
    required: [true, 'poster_url must be provided'],
  },
  movie_id: {
    type: Number,
    required: [true, 'movie_id must be provided'],
  },
})

module.exports = mongoose.model('Metric', MetricSchema)
