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
