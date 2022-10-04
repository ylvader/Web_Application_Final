// import express
const express = require('express')
const router = express.Router() // get router

// create routes
// will be localhost:3000 when you use just /
router.get('/', (req, res, next) => {
    // render our views to index.js file?
    res.render('index')
})

router.get('/dashboard', (req, res, next) => {
    // render our views to index.js file?
    res.render('dashboard')
})

router.get('/videos', (req, res, next) => {
    // render our views to index.js file?
    res.render('videos')
})

// export information from the file: the router
module.exports = router