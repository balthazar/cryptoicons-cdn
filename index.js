const list = require('./list')

const HAS_DARK = 2

module.exports = (ticker, theme = 'light') => {
  if (!list[ticker]) {
    return null
  }

  const suffix = list[ticker] === HAS_DARK && theme === 'dark' ? '-white' : ''

  return `https://unpkg.com/cryptoicons-cdn/images/${ticker}${suffix}.png`
}
