const colors = require('./colors')

module.exports = (ticker, fallback = true) => colors[ticker] || (fallback ? '#232323' : null)
