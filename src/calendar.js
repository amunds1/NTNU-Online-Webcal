const ical = require('ical-generator');

function generateCalendar(eventList) {
    const cal = ical({
        domain: 'github.com',
        name: 'Online Event Feed'
    });

    for (const event of eventList) {
        cal.createEvent({
            start: event.start,
            end: event.end, 
            summary: event.summary,
            description: event.summary,
            location: event.location,
            url: event.url,
            uid: event.id
        });
    }

    return cal;
}

module.exports = {
    generateCalendar
};

