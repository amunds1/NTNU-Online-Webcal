// TODO Get evens from multiple pages (&page=1, &page=2, &page=3 etc)

const request = require('request');
const moment = require('moment');

function generateEventList() {
  const date = moment().format('YYYY-MM-DD');
  const url = `https://online.ntnu.no/api/v1/events/?event_start__gte=${date}`;

  return new Promise((resolve, reject) => {
    request(url, { json: true }, (err, res, body) => {

      if (err) { 
        reject(err);
      }
  
      const eventList = body.results.map(result => ({
          title: result.title,
          start: result.event_start,
          end: result.event_end,
          summary: result.ingress_short,
          description: result.ingress_short,
          location: result.location,
          url: result.absolute_url,
          id: result.id
      }));
  
      resolve(eventList);
    });
  });
};

module.exports = {
  generateEventList
};
