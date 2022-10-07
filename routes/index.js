// Import express
const express = require('express')
const router = express.Router() // get router

// Create routes
// localhost:3000/index will render index.ejs
router.get('/', (req, res, next) => {
    // render our views to index.js file?
    res.render('index')
})

// Create routes to videos
router.get('/videos', (req, res, next) => {
    res.render('videos')
})

// Create routes to RSSfeed
router.get('/RSSfeed', (req, res, next) => {
    res.render('RSSfeed')
})

// Export information from the file
module.exports = router