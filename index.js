const list = require('./list')

const PREFIX = 'https://unpkg.com/cryptoicons-cdn/images'
const HAS_DARK = 2

module.exports = (ticker, theme = 'light', fallback = true) => {
  if (!list[ticker]) {
    return fallback ? `${PREFIX}/UNKNOWN.png` : null
  }

  const suffix = list[ticker] === HAS_DARK && theme === 'dark' ? '-white' : ''

  return `${PREFIX}/${ticker}${suffix}.png`
}
