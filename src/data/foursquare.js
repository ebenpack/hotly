import axios from 'axios';

import consts from '../consts';


// returns a promise
export default function searchVenues(lat, lng, venueName=null, categories=[]) {
    const params = {
        ll: `${lat},${lng}`,
        client_id: consts.foursquare.CLIENT_ID,
        client_secret: consts.foursquare.CLIENT_SECRET,
        intent: consts.foursquare.INTENT.CHECK_IN,
        v: consts.foursquare.VERSION,
        m: consts.foursquare.MODE.FOURSQUARE
    };

    if (venueName) {
        params.query = venueName;
    }

    if (categories.length > 0) {
        params.categoryId = categories;
    }

    return axios.get(`${consts.foursquare.VENUE_BASE_URL}${consts.foursquare.VENUE_SEARCH_URL}`, {params});
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
            const adjustedDayNum = dayNum === 7 ? 0 : dayNum; // adjust Sunday to 0 instead of 7
            popular_hours.popular_today = timeframe.includesToday && adjustedDayNum === todayNum;

            if (timeframe.open.length > 0) {
                popular_hours.weekday_text[adjustedDayNum] = `${consts.WEEKDAYS[adjustedDayNum]}: `;

                timeframe.open.forEach((period, index) => {
                    const startHours = period.start.substring(0, 2);
                    const startMinutes = period.start.substring(3, 2);
                    const endHours = period.end.substring(0, 2);
                    const endMinutes = period.end.substring(3, 2);

                    const startTime = (startHours > 12) ? `${startHours - 12}:${startMinutes}0 PM` : `${startHours}:${startMinutes}0 AM`;
                    const endTime = (endHours > 12) ? `${endHours - 12}:${endMinutes}0 PM` : `${endHours}:${endMinutes}0 AM`;

                    popular_hours.periods.push({
                        open: {day: adjustedDayNum, time: period.start},
                        close: {day: adjustedDayNum, time: period.end}
                    });

                    if (index > 0) popular_hours.weekday_text[adjustedDayNum] += `, `;
                    popular_hours.weekday_text[adjustedDayNum] += `${startTime} - ${endTime}`;
                });
            }
        });
    });

    return popular_hours;
}
