'use strict'

module.exports = function (url) {
  url = url.trim()
  if (/drive\.google\.com/.test(url)) {
    const patterns = [
      /drive\.google\.com\/open\?id=([a-zA-Z0-9_]{8,64})$/,
      /drive\.google\.com\/open\?id=([a-zA-Z0-9_]{8,64})&/,
      /drive\.google\.com\/file\/d\/([a-zA-Z0-9_]{8,64})$/,
      /drive\.google\.com\/file\/d\/([a-zA-Z0-9_]{8,64})\//
    ]
    for (let pattern of patterns) {
      if (pattern.test(url)) {
        return pattern.exec(url)[1]
      }
    }
  } else if (/^[a-zA-Z0-9_]{8,64}$/.test(url)) {
    return url
  }
  return null
}
