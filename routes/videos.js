// import express
const express = require('express')
const router = express.Router() // get router

router.get('/', (req, res, next) => {
    // render our views to index.js file?
    res.render('videos')
})


// export information from the file: the router
module.exports = router