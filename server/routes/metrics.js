const express = require('express')
const router = express.Router()

const {
  getAllMetrics,
  getMetric,
  createMetric,
  updateMetric,
  deleteMetric,
} = require('../controllers/metrics')

router.route('/').get(getAllMetrics).post(createMetric)
router.route('/:id').get(getMetric).patch(updateMetric).delete(deleteMetric)

module.exports = router
