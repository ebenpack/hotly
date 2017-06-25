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

/*

 0
 :
 {days: [7], includesToday: true, open: [{start: "1200", end: "2100"}], segments: []}
 1
 :
 {days: [1], open: [{start: "1500", end: "2000"}], segments: []}
 2
 :
 {days: [2], open: [{start: "1600", end: "2100"}], segments: []}
 3
 :
 {days: [3], open: [{start: "1500", end: "2100"}], segments: []}
 4
 :
 {days: [4], open: [{start: "1500", end: "2200"}], segments: []}
 5
 :
 {days: [5], open: [{start: "1400", end: "+0100"}], segments: []}
 6
 :
 {days: [6], open: [{start: "1300", end: "+0100"}], segments: []}
 */

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
            const adjustedDayNum = dayNum === 7 ? 0 : dayNum; // adjust Sunday to 0 instead of 7
            popular_hours.popular_today = timeframe.includesToday && adjustedDayNum === todayNum;

            if (timeframe.open.length > 0) {
                popular_hours.weekday_text[adjustedDayNum] = `${consts.WEEKDAYS[adjustedDayNum]}: `;

                timeframe.open.forEach((period, index) => {
                    popular_hours.periods.push({
                        open: {day: adjustedDayNum, time: period.start},
                        close: {day: adjustedDayNum, time: period.end}
                    });

                    if (index > 0) popular_hours.weekday_text[adjustedDayNum] += `, `;
                    // TODO: convert to 12 hour time
                    popular_hours.weekday_text[adjustedDayNum] += `${period.start} - ${period.end}`;
                });
            }
        });
    });

    return popular_hours;
}
