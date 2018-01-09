module.exports = {
  blocks: {
    gdrive: {
      getVideoID (url) {
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
      },

      process: function (block) {
        const videoID = this.getVideoID(block.body)
        if (videoID == null) { return '' }
        const shareUrl = `https://drive.google.com/file/d/${videoID}/view`
        const embedUrl = `//drive.google.com/file/d/${videoID}/preview`
        const thumbUrl = `https://lh3.google.com/u/0/d/${videoID}=w1280-h720-p-k-nu-iv1`
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
