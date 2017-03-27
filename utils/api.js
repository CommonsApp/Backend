const request = require('superagent')
const apiKey = '3nvAQphja842k9e2lTR0E72cJoJHrPPC1bbhBEvG'

const Api = {
  getMembers(cb) {
    const url = 'https://api.propublica.org/congress/v1/115/senate/members.json';
    request
      .get(url)
      .set('X-API-Key', apiKey)
      .end(function(err, res){
        if (err || !res.ok) {
          cb('Couldn\'t complete request to propublica :(', null)
        } else {
          console.log('made call to propubilca: ' + url)
          cb(null, res.body.results)
        }
    });
  }
}

module.exports = Api