const Metric = require('../models/metric')
const { NotFoundError, BadRequestError } = require('../errors')

const getAllMetrics = async (req, res) => {
  const metrics = await Metric.find({}).sort('searchTerm')
  res.status(200).json({ metrics, nbHits: metrics.length })
}

const createMetric = async (req, res) => {
  const metric = await Metric.create(req.body)
  res.status(201).json({ metric })
}

const getMetric = async (req, res) => {
  const metric = await Metric.findOne({ movie_id: req.params.id })
  if (!metric) throw new NotFoundError(`No metric with id: ${req.params.id}`)
  res.status(200).json({ metric })
}

const updateMetric = async (req, res) => {
  const { searchTerm, count, poster_url, movie_id } = req.body
  if (!searchTerm || !poster_url || !movie_id) {
    throw new BadRequestError(
      'searchTerm, poster_url and movie_id must be provided'
    )
  }
  if (!count) req.body.count = 1
  const metric = await Metric.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, runValidators: true }
  )
  if (!metric) throw new NotFoundError(`No metric with id: ${req.params.id}`)
  res.status(200).json({ metric })
}

const deleteMetric = async (req, res) => {
  const metric = await Metric.findOneAndDelete({ _id: req.params.id })
  if (!metric) throw new NotFoundError(`No metric with id: ${req.params.id}`)
  res.status(200).send()
}

const incrementCount = async (req, res) => {
  const { searchTerm, movieId, posterUrl } = req.body
  if (!searchTerm || !movieId || !posterUrl) {
    throw new BadRequestError(
      'searchTerm, movieId and posterUrl must be provided'
    )
  }
  let metric = await Metric.findOne({ movie_id: movieId })
  if (!metric) {
    metric = await Metric.create({
      searchTerm,
      movie_id: movieId,
      poster_url: posterUrl,
      count: 1,
    })
  } else {
    metric = await Metric.findOneAndUpdate(
      { movie_id: movieId },
      {
        $inc: { count: 1 },
        $set: { searchTerm, poster_url: posterUrl },
      },
      { new: true, runValidators: true }
    )
  }
  res.send({ metric })
}

const getTrending = async (req, res) => {
  const metrics = await Metric.find({}).sort({ count: -1 }).limit(5)
  res.status(200).json({ metrics })
}

module.exports = {
  getAllMetrics,
  createMetric,
  getMetric,
  updateMetric,
  deleteMetric,
  incrementCount,
  getTrending,
}
