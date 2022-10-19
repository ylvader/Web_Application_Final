// Import express
const express = require('express')
const router = express.Router() 

// Create routes: localhost:3000/videos will render videos.ejs
router.get('/', (req, res, next) => {
    doTheSqlCommand(  function(sqlResult) {myRender(res,sqlResult);});
})
myRender(res,sqlResult)
{
    
    res.render()
}

// Export() information from the file
module.exports = router