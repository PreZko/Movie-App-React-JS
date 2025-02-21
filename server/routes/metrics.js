const express = require('express')
const router = express.Router()

const {
  getAllMetrics,
  getMetric,
  createMetric,
  updateMetric,
  deleteMetric,
  incrementCount,
  getTrending,
} = require('../controllers/metrics')

router.route('/').get(getAllMetrics).post(createMetric)
router.route('/:id').get(getMetric).patch(updateMetric).delete(deleteMetric)
router.route('/increment').post(incrementCount)
router.route('/get/trending').get(getTrending)

module.exports = router
