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

export function getFoursquareVenueFromGooglePlace(googlePlace, foursquareVenues) {
    if (foursquareVenues.length === 1) return foursquareVenues[0];

    // TODO: more sophisticatedly look for a match
    return foursquareVenues.find((venue) => {
        // TODO: come up with better way to fuzzy match on name
        if (venue.name === googlePlace.name) {
            return true;
        }

        // TODO: try to match on location details

        return false;
    });
}
