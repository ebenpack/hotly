export default {
    pages: {
        LANDING_PAGE: 'landing',
        DETAIL_PAGE: 'detail',
        CHECKIN_PAGE: 'checkin'
    },
    foursquare: {
        CLIENT_ID: 'VMHWOXYXUUQKL3ET4RW4M4DAX4QKKIWQVRYDWMBTXUVOYJP5',
        CLIENT_SECRET: '3V4SOWARSVGLM0WF1XCRF2CCY54L51D4VJ2NHFO3Z1VOLAYO',
        VENUE_BASE_URL: 'https://api.foursquare.com/v2/venues',
        VENUE_SEARCH_URL: '/search',
        VENUE_HOURS_URL: '/hours',
        CATEGORY_ID: '4d4b7105d754a06376d81259', // category = 'Nightlife Spot'
        INTENT: {
            MATCH: 'match',
            CHECK_IN: 'checkin'
        },
        RADIUS: 24000,
        VERSION: '20170624',
        MODE: {
            FOURSQUARE: 'foursquare',
            SWARM: 'swarm'
        }
    }
};
