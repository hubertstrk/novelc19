const squash = (precision) => (string, value) => {
  if (value < 1000) return value
  else if (value >= 1000 && value < 1000000) return `${(value / 1000).toFixed(precision)} T`
  else return `${(value / 1000000).toFixed(precision)} M`
}

export const sparseSquash = (string, value) => {
  return squash(1)`${value}`
}

export const preciseSquash = (string, value) => {
  return squash(3)`${value}`
}

export const isoToDate = (iso) => {
  const date = new Date(iso)
  return date.toLocaleDateString(browserLanguage)
}

export const isoToTime = (iso) => {
  const date = new Date(iso)
  return date.toLocaleTimeString(browserLanguage)
}

export const browserLanguage = () => {
  return navigator.language
}

export const capitalize = (value) => {
  if (typeof value !== 'string') return ''
  return value.charAt(0).toUpperCase() + value.slice(1)
}
