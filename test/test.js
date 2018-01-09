const assert = require('assert')
const plugin = require('../index.js')
const gdrive = plugin.blocks.gdrive

const validTestIDs = [
  '12yyAYTldr82RhGU926Smcs8tFqEJd8al',
  '0B2_QbmHLgXdHVmdaMl84ckhWczQ',
  '0B2_QbmHLgXcHa01UUnczUjVCOHM',
  '12yyAYTldr82RhGU926Smcs8tFqEJd8al',
  '0B2_QbmiLgXdHMmpsLUt5MzAwdlpVd3lITUV0NDFzQUtpc3o0',
  '1FSiZhXBfEfZnLrdZoGbv0Afmhm8CRCtmwURJkZvdvfE',
  '0B2_QbmHLgXdHaEAYWURoRmpleTR2Z1RXTlRqVHI0NmJZbUFr',
  '0B2_QbmHLgXdHckJpeEfyRmFjQVlHZzFjMDNaaGRCejdib09v'
]

const invalidTestIDs = [
  '12yyAYT?dr82RhGU926Smcs8tFqEJd8al',
  '0B2_QbmHLgXdHVmda-l84ckhWczQ',
  '0B2ßQbmHLgXcHa01UUnczUjVCOHM',
  '1$yyAYTldr82RhGU926Smcs8tFqEJd8al',
  '0B2_QbmiLgXdHMmpsLUt5Mz.AwdlpVd3lITUV0NDFzQUtp3o0',
  '1FSiZhXBfEfZnLrdZ!Gbv0Afmhm8CRCtmwURJkZvdvfE',
  '0B2_QbmHLgXdHa,EAYWURoRmpleTR2Z1RXTlRqVHI0NmJZbUFr',
  '0B2_QbmHLgXdHckJpe EfyRmFjQVlHZzFjMDNaaGRCejdib09v',
  '0B2_Qbm'
]

const validVideoUrls = [
  'https://drive.google.com/open?id=[[testID]]',
  'http://drive.google.com/open?id=[[testID]]',
  '//drive.google.com/open?id=[[testID]]',
  'drive.google.com/open?id=[[testID]]',
  'https://drive.google.com/file/d/[[testID]]',
  'http://drive.google.com/file/d/[[testID]]',
  '//drive.google.com/file/d/[[testID]]',
  'drive.google.com/file/d/[[testID]]',
  ' [[testID]] ',
  '[[testID]]'
]

const invalidVideoUrls = [
  `https://youtube.com/watch?v=[[testID]]`,
  '//google.com/file/d/[[testID]]',
  '$[[testID]]'
]

describe('gdrive', function () {
  describe('#getVideoID()', function () {
    it('should return the correct video ID when the video ID and the url are valid', function () {
      for (let testID of validTestIDs) {
        for (let videoUrl of validVideoUrls) {
          const url = videoUrl.replace('[[testID]]', testID)
          const videoID = gdrive.getVideoID(url)
          assert.equal(videoID, testID)
        }
      }
    })

    it('should return null if the videoID is valid and the url is invalid', function () {
      for (let testID of validTestIDs) {
        for (let videoUrl of invalidVideoUrls) {
          const url = videoUrl.replace('[[testID]]', testID)
          const videoID = gdrive.getVideoID(url)
          assert.equal(videoID, null)
        }
      }
    })

    it('should return null if the videoID is invalid and the url is valid', function () {
      for (let testID of invalidTestIDs) {
        for (let videoUrl of validVideoUrls) {
          const url = videoUrl.replace('[[testID]]', testID)
          const videoID = gdrive.getVideoID(url)
          assert.equal(videoID, null)
        }
      }
    })

    it('should return null if the videoID is invalid and the url is invalid', function () {
      for (let testID of invalidTestIDs) {
        for (let videoUrl of invalidVideoUrls) {
          const url = videoUrl.replace('[[testID]]', testID)
          const videoID = gdrive.getVideoID(url)
          assert.equal(videoID, null)
        }
      }
    })
  })

  describe('#process()', function () {
    it('should return an iframe if the generator mode is website and video ID and url are valid', function () {
      const url = validVideoUrls[0].replace('[[testID]]', validTestIDs[0])
      gdrive.generator = 'website'
      const result = gdrive.process({ body: url })
      assert.equal(/<iframe\ssrc="/.test(result), true)
    })

    it('should return a linked image if the generator mode is book and video ID and url are valid', function () {
      const url = validVideoUrls[0].replace('[[testID]]', validTestIDs[0])
      gdrive.generator = 'book'
      const result = gdrive.process({ body: url })
      assert.equal(/<a\shref="/.test(result), true)
      assert.equal(/<img\ssrc="/.test(result), true)
    })

    it('should return an empty string if the video ID or url are invalid', function () {
      const url = invalidVideoUrls[0].replace('[[testID]]', invalidTestIDs[0])
      const result = gdrive.process({ body: url })
      assert.equal(result, '')
    })
  })
})
