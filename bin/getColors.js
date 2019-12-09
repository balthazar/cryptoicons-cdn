const fs = require('fs')
const path = require('path')
const Vibrant = require('node-vibrant')

const getColor = async name => {
  const palette = await Vibrant.from(path.join(__dirname, `../images/${name}.png`)).getPalette()
  const vibrant = palette.Vibrant && palette.Vibrant.getHex()
  const lightVibrant = palette.LightVibrant && palette.LightVibrant.getHex()
  const darkVibrant = palette.DarkVibrant && palette.DarkVibrant.getHex()
  const muted = palette.Muted && palette.Muted.getHex()
  return vibrant || lightVibrant || darkVibrant || muted
}

const writeFile = data =>
  fs.writeFileSync(
    path.join(__dirname, '../colors.js'),
    `module.exports = ${JSON.stringify(data, null, 2)}`,
  )

const main = async symbol => {
  if (!symbol) {
    return console.log('Likely to override hardcoded colors, proceed with caution.')
  }

  if (symbol) {
    const color = await getColor(symbol)
    const oldColors = require('../colors')
    writeFile({ ...oldColors, [symbol]: color })
    return console.log(`[COLORS] ${symbol} color added (${color}). Use vim sort.`)
  }

  const colors = {}

  const images = fs
    .readdirSync(path.join(__dirname, '../images'))
    .filter(name => !name.endsWith('-white.png'))

  for (let i = 0; i < images.length; i++) {
    const name = images[i].replace('.png', '')
    const color = await getColor(name)

    if (color) {
      colors[name] = color
    }

    console.log(
      `[COLORS] Progress ${i}/${images.length} (${((i / images.length) * 100).toFixed(2)}%)`,
    )
  }

  writeFile(colors)
  console.log('[COLORS] Finished.')
}

const symbol = process.argv[2]

main(symbol)
