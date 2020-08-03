// import { sortBy } from 'lodash'

export class DataList {
  /**
  * Create a point.
  * @param {dataPoints} dataPoints - The data points
  */
  constructor (dataPoints) {
    this.dataPoints = dataPoints
  }

  /**
   * Gets the sorted absolute data points.
   */
  absolute () {
    // return sortBy(this.dataPoints, dataPoint => dataPoint.date)
    return this.dataPoints
  }

  /**
   * Gets the sorted relativ data points.
   */
  relativ () {
    const relativ = this.dataPoints.map((dataPoint, index, values) => {
      if (index === 0) return dataPoint
      return {
        date: dataPoint.date,
        value: values[index].value - values[index - 1].value
      }
    })
    return relativ // sortBy(relativ, dataPoint => dataPoint.date)
  }
}
