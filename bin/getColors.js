const fs = require('fs')
const path = require('path')
const Vibrant = require('node-vibrant')

const colors = {}

const main = async () => {
  const images = fs
    .readdirSync(path.join(__dirname, '../images'))
    .filter(name => !name.endsWith('-white.png'))

  for (let i = 0; i < images.length; i++) {
    const name = images[i].replace('.png', '')
    const palette = await Vibrant.from(path.join(__dirname, `../images/${name}.png`)).getPalette()
    const vibrant = palette.Vibrant && palette.Vibrant.getHex()
    const muted = palette.Muted && palette.Muted.getHex()
    const color = vibrant || muted

    if (color) {
      colors[name] = color
    }

    console.log(
      `[COLORS] Progress ${i}/${images.length} (${(i / images.length * 100).toFixed(2)}%)`,
    )
  }

  fs.writeFileSync(
    path.join(__dirname, '../colors.js'),
    `module.exports = ${JSON.stringify(colors, null, 2)}`,
  )

  console.log('[COLORS] Finished.')
}

main()
