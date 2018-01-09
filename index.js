'use strict'

const getVideoID = require('./getVideoID')

module.exports = {
  blocks: {
    gdrive: {
      process (block) {
        const videoID = getVideoID(block.body)
        if (videoID == null) { return '' }
        const shareUrl = `https://drive.google.com/file/d/${videoID}/view`
        const embedUrl = `//drive.google.com/file/d/${videoID}/preview`
        const thumbUrl = `https://drive.google.com/thumbnail?sz=w1024&id=${videoID}`
        if (this.generator === 'website') {
          return `<div style="position: relative; padding-bottom: 56.25%; padding-top: 25px; height: 0;">\n` +
                 `  <iframe src="${embedUrl}" style="border: none; position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" allowfullscreen></iframe>\n` +
                 `</div>\n`
        } else {
          return `<p><a href="${shareUrl}"><img src="${thumbUrl}" alt="Watch on Google Drive" /></a></p>\n`
        }
      }
    }
  }
}
