// Import express
const express = require('express')
const router = express.Router() 

// Create routes: 
router.get('/', (req, res) => {
    res.render('patient')
})

// Export() information from the file
module.exports = router