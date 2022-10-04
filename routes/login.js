// import express
const express = require('express')
const router = express.Router() // get router

// create routes
// will be localhost:3000 when you use just /
router.get('/', (req, res) => {
    // render our views to index.js file?
    res.render('login', { layout: 'login' })
})

// export information from the file: the router
module.exports = router