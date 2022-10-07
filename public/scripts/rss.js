// rss.js: A script to read and turning the RSS feed (RSSfeed.xml) to JavaScript objects, using the library 
// rss-parser (https://www.npmjs.com/package/rss-parser)

// Import the library and create a new RSS Parser
const RSS_Parser = require('rss-parser')
let RSS_Parser = new RSS_Parser();

const UrlFeed = "http://localhost:3000/public/xml/RSSfeed.xml"

(async () => {

  // Parse the RSS feed
  let feed = await RSS_Parser.parseURL(UrlFeed);

  // Go through each item in the feed
  feed.items.forEach(item => {
    // Write items from the feed here
  });

})();