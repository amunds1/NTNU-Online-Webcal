// TODO Get evens from multiple pages (&page=1, &page=2, &page=3 etc)

const request = require('request');
const moment = require('moment');

function getRawEventList(url) {
  return new Promise((resolve, reject) => {
    request(url, { json: true }, (err, res, body) => {
      if (err) {
        reject(err);
      } else {
        resolve(body);
      }
    });
  });
}

async function generateEventList() {
  const date = moment().format('YYYY-MM-DD');
  const baseUrl = `https://online.ntnu.no/api/v1/events/?event_start__gte=${date}`;
  let url = baseUrl;
  const eventList = [];

  while (url != null) {
    console.log(url);

    const body = await getRawEventList(url);
    url = body.next;

    eventList.push(...body.results.map(result => ({
      title: result.title,
      start: result.event_start,
      end: result.event_end,
      summary: result.ingress_short,
      description: result.ingress_short,
      location: result.location,
      url: result.absolute_url,
      id: result.id
    })));
  }

  return eventList;
};

module.exports = {
  generateEventList
};
