const express = require('express')
const fs = require('fs-extra')
const path = require('path')
const cron = require('node-cron')
const fetch = require('node-fetch')

const router = express.Router()

const URL = 'https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=tle'
const TLE_PATH = path.resolve(__dirname,'../tle.txt')

async function downloadTLE() {
  const response = await fetch(URL)
  const tle = await response.text().trim()
  await fs.writeFile(TLE_PATH,tle)
}

// on startup
;(async function () {
  try {
    await fs.access(TLE_PATH)
    console.log('TLE file found.')
    const { mtime, ctime } = await fs.stat(TLE_PATH)
    const currentTime = new Date()

    // if file modified time is older than 30 minute, then re-download a new file from URL
    if (currentTime - mtime >= 30 * 60 * 1000 ) {
      console.log('TLE File is outdated, re-downloading...')
      await downloadTLE()
    }
  } catch (err) {
    console.log('File not found, downloading new file into our server')
    await downloadTLE()
  }
})()

cron.schedule('*/30 * * * *', async function () {
  console.log(`Checking update on TLE at ${new Date().toLocaleString()}`)
  await downloadTLE()
})


router.get('/active', async function(req,res) {
  const buf = await fs.readFile(TLE_PATH)
  const tle = buf.toString('utf8')
  res.set('Content-Disposition', 'Filename=\"active.txt\"')
  res.set('Content-Type','text/plain; charset=UTF-8')
  res.send(tle)
})

module.exports = router