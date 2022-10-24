// Import express
const express = require('express')
const router = express.Router() 

// Create routes: 

router.get('/', (req, res) => {
    res.render('patient')
})

/*
router.get('/', (req, res, next) => {
    doTheSqlCommand(  function(sqlResult) {myRender(res,sqlResult);});
})
myRender(res,sqlResult)
{
    
    res.render()
}
*/

// Export() information from the file
module.exports = router