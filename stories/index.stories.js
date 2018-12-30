import React from 'react'
import { Grid } from 'react-virtualized'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import list from '../list'
import getImage from '../index'

const array = Object.keys(list)
  .map(ticker => ({ value: list[ticker], ticker }))
  .reduce((all, one, i) => {
    const ch = Math.floor(i / 10)
    all[ch] = [].concat(all[ch] || [], one)
    return all
  }, [])

console.log(array)

class Demo extends React.Component {
  state = {
    theme: 'light',
  }

  cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
    const { theme } = this.state
    if (!array[rowIndex][columnIndex]) {
      return null
    }

    const { ticker } = array[rowIndex][columnIndex]

    return (
      <div
        style={{
          ...style,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          fontFamily: 'monospace',
          color: theme === 'dark' ? 'white' : 'black',
        }}
        key={key}
      >
        <img width={20} height={20} src={getImage(ticker, theme)} />
        <div style={{ marginTop: 5 }}>{ticker}</div>
      </div>
    )
  }

  render() {
    const { theme } = this.state
    const isDark = theme === 'dark'

    return (
      <div style={{ backgroundColor: isDark ? '#212121' : '', padding: '3rem' }}>
        <button
          onClick={() => this.setState({ theme: isDark ? 'light' : 'dark' })}
          style={{ marginBottom: '2rem' }}
        >
          toggle theme
        </button>

        <Grid
          cellRenderer={this.cellRenderer}
          columnCount={array[0].length}
          columnWidth={60}
          rowCount={array.length}
          rowHeight={60}
          width={600}
          height={300}
          theme={theme}
        />
      </div>
    )
  }
}

storiesOf('Main', module).add('Demo', () => <Demo />)
