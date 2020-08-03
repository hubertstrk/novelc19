import { sortBy, times, sum, meanBy, minBy, maxBy } from 'lodash'

export class SlidingWindow {
  /**
  * Creates an instance of SlidingWindow.
  *
  * @constructor
  * @param {number} size The size of the sliding window.
  * @param {dataPoints} dataPoints The dataPoints.
  */
  constructor (dataPoints, size = 7) {
    this.dataPoints = dataPoints
    this.size = size
    this.windows = this.windows()
  }

  /**
   * Generates the windows based on the window size.
   */
  windows () {
    const range = times(this.dataPoints.length - this.size, Number)
    return range.map(item => this.dataPoints.slice(item, item + this.size))
  }

  /**
   * Maximum.
   */
  max () {
    return this.windows.map((window) => {
      return {
        value: maxBy(window, 'value').value,
        date: window[Math.ceil(window.length / 2)].date
      }
    })
  }

  /**
   * Minimum.
   */
  min () {
    return this.windows.map((window) => {
      return {
        value: minBy(window, 'value').value,
        date: window[Math.ceil(window.length / 2)].date
      }
    })
  }

  /**
   * Mean.
   */
  mean () {
    return this.windows.map(window => {
      const filtered = window.length < 5 ? window : this.outlier(window)
      const mean = meanBy(filtered, 'value')
      const vv2 = filtered.map(element => Math.pow(mean - element.value, 2))
      const std = Math.sqrt(sum(vv2) / (filtered.length - 1))
      return {
        value: mean,
        high: mean + std,
        low: mean - std,
        date: window[Math.ceil(window.length / 2)].date
      }
    })
  }

  /**
   * Median.
   */
  median () {
    return this.windows.map(window => {
      const sorted = sortBy(window, 'value')

      const half = sorted.length / 2

      if ((half % 2 === 0)) {
        return sorted[sorted.length / 2]
      }

      return {
        value: (sorted[Math.floor(half)].value + sorted[Math.ceil(half)].value) / 2,
        date: window[Math.ceil(window.length / 2)].date
      }
    })
  }

  outlier (window) {
    const clone = window.slice(0)
    const sorted = sortBy(clone, 'value')
    sorted.pop()
    sorted.shift()
    return sorted
  }
}
