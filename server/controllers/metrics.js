const getAllMetrics = async (req, res) => {
  res.status(200).send('Get metrics')
}

const createMetric = async (req, res) => {
  res.status(201).send('Create metric')
}

const getMetric = async (req, res) => {
  res.status(200).send('Get metric')
}

const updateMetric = async (req, res) => {
  res.status(200).send('Update metric')
}

const deleteMetric = async (req, res) => {
  res.status(200).send('Delete metric')
}

module.exports = {
  getAllMetrics,
  createMetric,
  getMetric,
  updateMetric,
  deleteMetric,
}
