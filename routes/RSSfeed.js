// Import express
const express = require('express')
const router = express.Router() 

// Create routes: localhost:3000/RSSfeed will render RSSfeed.ejs
router.get('/', (req, res, next) => {
    res.render('RSSfeed')
})

// Export information from the file
module.exports = router