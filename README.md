# cryptoicons-cdn

> Cryptocurrencies-related icons served over CDN

    yarn add cryptoicons-cdn

### Usage

```js
import getImage from 'cryptoicons-cdn'

const imageUrl = getImage('ETH')
```

If you pass the string `dark` as a second param, it will return an alternative
whitescale icon if available to work on darker backgrounds.

### Colors

```js
import getColor from 'cryptoicons-cdn/getColor'

const color = getColor('MFT')
```

Will return the vibrant or main color of the logo of the given ticker. By default,
it fallbacks to `#232323` if no defined color has been found. Pass `false` as a second
parameter to disable it.
