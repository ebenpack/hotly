import axios from 'axios';

import consts from '../consts';


// returns a promise
export default function searchVenues(lat, lng, venueName) {
    return axios.get(`${consts.foursquare.VENUE_BASE_URL}${consts.foursquare.VENUE_SEARCH_URL}`, {
        params: {
            ll: `${lat},${lng}`,
            client_id: consts.foursquare.CLIENT_ID,
            client_secret: consts.foursquare.CLIENT_SECRET,
            intent: consts.foursquare.INTENT.CHECK_IN,
            query: venueName,
            v: consts.foursquare.VERSION,
            m: consts.foursquare.MODE.FOURSQUARE
        }
    });
};

// returns a promise
export function getVenueHours(venueId) {
    return axios.get(`${consts.foursquare.VENUE_BASE_URL}/${venueId}${consts.foursquare.VENUE_HOURS_URL}`, {
        params: {
            client_id: consts.foursquare.CLIENT_ID,
            client_secret: consts.foursquare.CLIENT_SECRET,
            v: consts.foursquare.VERSION,
            m: consts.foursquare.MODE.FOURSQUARE
        }
    });
}

export function getFoursquareVenueFromGooglePlace(googlePlace, foursquareVenues) {
    if (foursquareVenues.length === 1) return foursquareVenues[0];

    // TODO: more sophisticatedly look for a match
    return foursquareVenues.find((venue) => {
        // TODO: come up with better way to fuzzy match on name
        if (venue.name.includes(googlePlace.name) || googlePlace.name.includes(venue.name)) {
            return true;
        }

        // TODO: try to match on location details

        return false;
    });
}

export function transformVenueHoursToGoogleFormat(hours) {
    if (!hours || !hours.timeframes) return null;

    const popular_hours = {
        popular_today: false,
        periods: [],
        weekday_text: [
            'Monday: Closed',
            'Tuesday: Closed',
            'Wednesday: Closed',
            'Thursday: Closed',
            'Friday: Closed',
            'Saturday: Closed',
            'Sunday: Closed'
        ]
    };

    const date = new Date();
    const todayNum = date.getDay();

    hours.timeframes.forEach((timeframe) => {
        const days = timeframe.days;

        days.forEach((dayNum) => {
            popular_hours.popular_today = timeframe.includesToday && dayNum === todayNum;

            if (timeframe.open.length > 0) {
                popular_hours.weekday_text[dayNum] = `${consts.WEEKDAYS[dayNum]}: `;

                timeframe.open.forEach((period, index) => {
                    popular_hours.periods.push({
                        open: {day: dayNum, time: period.start},
                        close: {day: dayNum, time: period.end}
                    });

                    if (index > 0) popular_hours.weekday_text[dayNum] += `, `;
                    // TODO: convert to 12 hour time
                    popular_hours.weekday_text[dayNum] += `${period.start} - ${period.end}`;
                });
            }
        });
    });

    return popular_hours;
}
