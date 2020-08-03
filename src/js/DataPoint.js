export class DataPoint {
  constructor (date, value) {
    this.date = date
    this.value = value
  }

  get date () {
    return this.date()
  }

  get value () {
    return this.value()
  }
}
