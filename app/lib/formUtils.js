const currentDate = new Date()
const currentYear = currentDate.getFullYear() % 100
const currentMonth = currentDate.getMonth() + 1

export const validateExpiryDate = (value) => {
    const [month, year] = value.split('/').map(Number)
    const expYear = 2000 + year
    const expDate = new Date(expYear, month - 1)
    return expDate > currentDate
}

export const formatExpiryDate = (value) => {
    let v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      const month = parseInt(v.slice(0, 2), 10)
      if (month > 12) {
        v = '12' + v.slice(2)
      }
      v = v.slice(0, 2) + '/' + v.slice(2, 4)
    }
    return v
}

export const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
}