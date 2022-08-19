import React from 'react'

function Price({ children }) {
  function numberWithCommas(x) {
    if (x) {
      x = x.toString()
      var pattern = /(-?\d+)(\d{3})/
      while (pattern.test(x)) x = x.replace(pattern, '$1,$2')
      return x
    }
  }
  return <span>{numberWithCommas(children)}</span>
}

export default Price
