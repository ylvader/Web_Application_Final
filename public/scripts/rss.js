// rss.js: A script to read and turning the RSS feed (RSSfeed.xml) to JavaScript objects, using the library 
// rss-parser (https://www.npmjs.com/package/rss-parser)
// Not used - Should be implemented in the future

// Import the library and create a new RSS Parser
let RSS_Parsers = new RSSParser();

const UrlFeed = "http://localhost:3000/public/xml/RSSfeed.aspx"

(async () => {

  // Parse the RSS feed
  let feed = await RSS_Parsers.parseURL(UrlFeed);
  console.log(feed.title);

  // Go through each item in the feed
  feed.items.forEach(item => {
    // Write items from the feed here
  });

})();