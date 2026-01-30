const axios = require('axios');
const xml2js = require('xml2js');

exports.fetchFeed = async (feedUrl) => {
  const response = await axios.get(feedUrl, {
    timeout: 20000,
    maxRedirects: 5,
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
      'Accept': 'application/xml,text/xml;q=0.9,*/*;q=0.8',
    },
  });

  const parser = new xml2js.Parser({
    explicitArray: false,
    mergeAttrs: true,
  });

  const json = await parser.parseStringPromise(response.data);

  return json.rss.channel.item || [];
};
