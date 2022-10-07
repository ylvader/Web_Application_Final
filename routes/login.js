// Import express
const express = require('express')
const router = express.Router() 

// Create routes: localhost:3000 will render login.ejs
router.get('/', (req, res) => {
    res.render('login')
})

// Export information from the file
module.exports = router