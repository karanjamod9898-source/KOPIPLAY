const https = require('https');

function follow(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      resolve({ status: res.statusCode, location: res.headers.location });
    }).on('error', err => resolve({ error: err.message }));
  });
}

async function run() {
  console.log('rssfeed 302 to:', await follow('https://gamemonetize.com/rssfeed.php?format=json&num=10'));
  console.log('img 302 to:', await follow('https://img.gamemonetize.com/'));
}
run();

