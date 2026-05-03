const TAGS = {
    'executive': 'linear-gradient(to right in oklab, rgb(47, 7, 67), rgb(65, 41, 90))',
    'assistant executive': 'linear-gradient(to right in oklab, rgb(47, 7, 67), rgb(65, 41, 90))',
    'logistics': 'linear-gradient(to right in oklab, rgb(47, 7, 67), rgb(65, 41, 90))',
    'arranger': 'linear-gradient(to right in oklab, rgb(47, 7, 67), rgb(65, 41, 90))',
    'artist': 'linear-gradient(to right in oklab, rgb(47, 7, 67), rgb(65, 41, 90))',
    'website': 'linear-gradient(to right in oklab, rgb(47, 7, 67), rgb(65, 41, 90))',
    'og': 'linear-gradient(to right in oklab, rgb(137, 33, 107), rgb(218, 68, 83))',

    'ukulele': 'linear-gradient(to right in oklab, rgb(255, 150, 150), rgb(255, 100, 100))',
    'acoustic guitar': 'linear-gradient(to right in oklab, rgb(255, 150, 150), rgb(255, 100, 100))',
    'electric guitar': 'linear-gradient(to right in oklab, rgb(255, 150, 150), rgb(255, 100, 100))',
    'bass guitar': 'linear-gradient(to right in oklab, rgb(255, 150, 150), rgb(255, 100, 100))',

    'voice': 'rgb(255, 255, 255)',
    'electric piano': 'rgb(255, 255, 255)',
    'piano': 'rgb(255, 255, 255)',
    'drums': 'rgb(255, 255, 255)',
    
    'trumpet': 'linear-gradient(to right in oklab, rgb(255, 255, 110), rgb(255, 240, 160))',
    'trombone': 'linear-gradient(to right in oklab, rgb(255, 255, 110), rgb(255, 240, 160))',
    
    'violin': 'linear-gradient(to right in oklab, rgb(250, 180, 50), rgb(230, 130, 50))',
    'cello': 'linear-gradient(to right in oklab, rgb(250, 180, 50), rgb(230, 130, 50))',
    'double bass': 'linear-gradient(to right in oklab, rgb(250, 180, 50), rgb(230, 130, 50))',

    'piccolo': 'rgb(180, 180, 180)',
    'recorder': 'rgb(180, 180, 180)',
    'flute': 'rgb(180, 180, 180)',
    'oboe': 'linear-gradient(to right in oklab, rgb(50, 50, 50), rgb(40, 60, 50))',
    'clarinet': 'linear-gradient(to right in oklab, rgb(50, 50, 50), rgb(40, 60, 50))',
    'bass clarinet': 'linear-gradient(to right in oklab, rgb(50, 50, 50), rgb(40, 60, 50))',
    'alto saxophone': 'rgb(220, 190, 70)',
    'tenor saxophone': 'rgb(220, 190, 70)',
    'baritone saxophone': 'rgb(220, 190, 70)',
};

const CURRENT_EVENT = {
    type: 'concert',
    links: {
        poster: 'assets/images/posters/poster 2026-04.webp',
        rvsp: '#',
        setlist: 'https://lmc.moe/setlist',
        recording: '#'
    },
    title: '2026 End of Winter Concert',
    dateStart: new Date(2026, 3, 5, 17, 0, 0),
    dateEnd: new Date(2026, 3, 5, 20, 0, 0),
    hideAfter: new Date(2026, 4, 1, 0, 0, 0),
    location: '252 Bloor Street West (OISE C-162)',
    tickets: '$5, pay in-person',
    preConcertDescription: [
        'The LMC returns this April for its regularly-scheduled end of winter concert, featuring 3 hours of music, XX songs played by XX of our talented musicians!',
        "We'll be playing songs from j-pop, anime, video games, and more! Find the link to the setlist for the concert here."
    ],
    postConcertDescription: [`Thank you to all performers and audience for a successful April concert! The next season of LMC operations will begin in September 2026.`],
};

const ANNOUNCEMENTS = [
    {
        type: 'alert',
        text: 'This website is currently under construction — some pages are unfinished and there may be bugs.'
    },
    {
        type: 'announcement',
        text: 'We’re looking for people with experience in drawing, graphic design, audio mixing, or video editing to help us with recording projects! If you have experience, please consider reaching out to XX on XXX!'
    },
    {
        type: 'announcement',
        text: 'The LMC is opening for its 3rd year this 2025-2026 Fall-Winter term! Our first meeting is at XX:XX pm at XXXX on Sept. XX. Come get a better idea of our club. No instruments needed. Click [this link](https://docs.google.com/forms/d/e/1FAIpQLSfNEoh9rA4vCyZd9dz-yV35tpFnqDVq3yWQvJjz0NlGMqZ9-Q/viewform) to become a member!'
    }
];

const UPCOMING_EVENTS = [
    {   
        dateStart: new Date(2026, 9, 20, 20, 0, 0),
        dateEnd: new Date(2026, 9, 21, 1, 0, 0),
        location: 'OISE C-154',
        title: '2026 End of Winter Concert',
        image: 'assets/images/locations/oise.webp'
    },
    {
        dateStart: new Date(2026, 11, 2, 8, 0, 0),
        dateEnd: new Date(2026, 11, 2, 10, 0, 0),
        location: "Cat's Eye",
        title: 'Cool Workshop',
        image: 'assets/images/locations/oise.webp'
    },
    {
        dateStart: new Date(2026, 4, 13, 17, 0, 0),
        dateEnd: new Date(2026, 4, 13, 20, 0, 0),
        location: "OISE Something",
        title: 'Some event IDK',
        image: 'assets/images/locations/oise.webp'
    },
];

const MEMBERS = [
    {
        "id": 0,
        "name": "Stone",
        "joined": "Fall 2023",
        "left": "Fall 2024",
        "instruments": [
            "Piano",
            "Drums",
            "Electric Guitar",
            "Bass Guitar",
            "Double Bass"
        ],
        "roles": [
            "Executive (23)",
            "OG"
        ],
        "links": {}
    },
    {
        "id": 1,
        "name": "alpurposeflour",
        "joined": "Fall 2023",
        "left": "",
        "instruments": [
            "Voice",
            "Piano",
            "Acoustic Guitar",
            "Bass Guitar",
            "Trombone"
        ],
        "roles": [
            "Executive (23/24)",
            "Logistics",
            "OG"
        ],
        "links": {}
    },
    {
        "id": 2,
        "name": "Sean",
        "joined": "Fall 2023",
        "left": "",
        "instruments": [
            "Piano",
            "Violin"
        ],
        "roles": [
            "Executive (23/25)",
            "Arranger",
            "OG"
        ],
        "links": {
            "discord": "amoguus",
            "youtube": [
                "Deez",
                "https://www.youtube.com/@deez9741"
            ]
        }
    },
    {
        "id": 3,
        "name": "Mike",
        "joined": "Winter 2024",
        "left": "",
        "instruments": [
            "Voice",
            "Piano",
            "Acoustic Guitar",
            "Violin"
        ],
        "roles": [
            "Executive (25)",
            "Arranger",
            "OG"
        ],
        "links": {
            "discord": "pixelatedmike",
            "instagram": "michaelkim_05"
        }
    },
    {
        "id": 4,
        "name": "Michelle",
        "joined": "Winter 2024",
        "left": "Fall 2024",
        "instruments": [
            "Voice",
            "Piano",
            "Acoustic Guitar"
        ],
        "roles": [
            "OG"
        ],
        "links": {}
    },
    {
        "id": 5,
        "name": "Aedhan",
        "joined": "Winter 2024",
        "left": "Winter 2025",
        "instruments": [
            "Voice"
        ],
        "roles": [
            "Executive (24)",
            "OG"
        ],
        "links": {
            "youtube": [
                "Amako ni Naru",
                "https://www.youtube.com/@amakoninaru8389"
            ]
        }
    },
    {
        "id": 6,
        "name": "Bryan",
        "joined": "Winter 2024",
        "left": "Winter 2025",
        "instruments": [
            "Voice",
            "Drums"
        ],
        "roles": [
            "OG"
        ],
        "links": {
            "youtube": [
                "Cerocune",
                "https://www.youtube.com/@Cerocune"
            ]
        }
    },
    {
        "id": 7,
        "name": "Dimmy",
        "joined": "Winter 2024",
        "left": "Winter 2025",
        "instruments": [
            "Bass Guitar"
        ],
        "roles": [
            "OG"
        ],
        "links": {}
    },
    {
        "id": 8,
        "name": "Inès Alibay",
        "joined": "Winter 2024",
        "left": "",
        "instruments": [
            "Voice",
            "Piano",
            "Acoustic Guitar",
            "Electric Guitar",
            "Bass Guitar"
        ],
        "roles": [
            "OG"
        ],
        "links": {}
    },
    {
        "id": 9,
        "name": "Richard",
        "joined": "Winter 2024",
        "left": "",
        "instruments": [
            "Piano",
            "Flute"
        ],
        "roles": [
            "Arranger",
            "Website",
            "OG"
        ],
        "links": {}
    },
    {
        "id": 10,
        "name": "Mellow",
        "joined": "Winter 2024",
        "left": "",
        "instruments": [
            "Voice",
            "Trumpet",
            "Trombone"
        ],
        "roles": [
            "Artist",
            "OG"
        ],
        "links": {}
    },
    {
        "id": 11,
        "name": "A. G. Montejo",
        "joined": "Winter 2024",
        "left": "",
        "instruments": [
            "Voice",
            "Piano",
            "Ukulele",
            "Clarinet",
            "Alto Saxophone",
            "Tenor Saxophone",
            "Baritone Saxophone"
        ],
        "roles": [
            "Artist",
            "OG"
        ],
        "links": {}
    },
    {
        "id": 12,
        "name": "Louis Miguel",
        "joined": "Winter 2024",
        "left": "",
        "instruments": [
            "Violin"
        ],
        "roles": [
            "OG"
        ],
        "links": {}
    },
    {
        "id": 13,
        "name": "Kai",
        "joined": "Winter 2024",
        "left": "",
        "instruments": [
            "Voice",
            "Piano",
            "Electric Guitar",
            "Violin"
        ],
        "roles": [
            "Arranger"
        ],
        "links": {
            "spotify": [
                "Kaizyu",
                "https://open.spotify.com/artist/30UzBgSpF2zQq3cc2uWQiv?si=P1obSR1RRL2tt8kRDC56ng"
            ],
            "youtube": [
                "WhyKai",
                "https://www.youtube.com/@WhyKaii"
            ]
        }
    },
    {
        "id": 14,
        "name": "Yuki",
        "joined": "Fall 2024",
        "left": "Fall 2024",
        "instruments": [
            "Clarinet"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 15,
        "name": "Katie",
        "joined": "Fall 2024",
        "left": "Winter 2025",
        "instruments": [
            "Violin"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 16,
        "name": "Daniel",
        "joined": "Fall 2024",
        "left": "Winter 2025",
        "instruments": [
            "Voice",
            "Alto Saxophone"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 17,
        "name": "Amber",
        "joined": "Fall 2024",
        "left": "Winter 2025",
        "instruments": [
            "Piano",
            "Violin"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 18,
        "name": "Peter",
        "joined": "Fall 2024",
        "left": "Winter 2025",
        "instruments": [
            "Drums"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 19,
        "name": "Edison",
        "joined": "Fall 2024",
        "left": "Winter 2025",
        "instruments": [
            "Oboe"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 20,
        "name": "Jimin",
        "joined": "Fall 2024",
        "left": "",
        "instruments": [
            "Voice",
            "Piano",
            "Drums",
            "Electric Guitar"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 21,
        "name": "James Inneo",
        "joined": "Fall 2024",
        "left": "",
        "instruments": [
            "Bass Guitar"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 22,
        "name": "Emily",
        "joined": "Fall 2024",
        "left": "",
        "instruments": [
            "Electric Guitar"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 23,
        "name": "Robin",
        "joined": "Fall 2024",
        "left": "",
        "instruments": [
            "Acoustic Guitar",
            "Electric Guitar"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 24,
        "name": "Kasey",
        "joined": "Fall 2024",
        "left": "",
        "instruments": [
            "Voice",
            "Ukulele",
            "Trumpet"
        ],
        "roles": [
            "Artist"
        ],
        "links": {}
    },
    {
        "id": 25,
        "name": "Anon",
        "joined": "Fall 2024",
        "left": "",
        "instruments": [
            "Electric Guitar",
            "Bass Guitar",
            "Cello"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 26,
        "name": "Han",
        "joined": "Fall 2024",
        "left": "",
        "instruments": [
            "Acoustic Guitar",
            "Electric Guitar"
        ],
        "roles": [
            "Assistant Executive (25)",
            "Logistics"
        ],
        "links": {
            "discord": "saltedh"
        }
    },
    {
        "id": 27,
        "name": "Rylen Fong",
        "joined": "Fall 2024",
        "left": "",
        "instruments": [
            "Acoustic Guitar",
            "Ukulele",
            "Clarinet",
            "Alto Saxophone"
        ],
        "roles": [
            "Arranger"
        ],
        "links": {
            "youtube": [
                "Rayzerfang Music",
                "https://www.youtube.com/channel/UClEvA2YVTvVi-8RUTY5CFFg"
            ]
        }
    },
    {
        "id": 28,
        "name": "Raekye",
        "joined": "Fall 2024",
        "left": "",
        "instruments": [
            "Piano"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 29,
        "name": "Angelina Zheng",
        "joined": "Fall 2024",
        "left": "",
        "instruments": [
            "Voice",
            "Piano"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 30,
        "name": "Tommy",
        "joined": "Fall 2024",
        "left": "",
        "instruments": [
            "Piano"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 31,
        "name": "xx.kamikaze.yasuomaster.69.xx",
        "joined": "Fall 2024",
        "left": "Winter 2025",
        "instruments": [
            "Voice",
            "Violin"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 32,
        "name": "Yuki",
        "joined": "Fall 2024",
        "left": "Fall 2024",
        "instruments": [
            "Piano",
            "Clarinet"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 33,
        "name": "Tyrone Fang",
        "joined": "Fall 2024",
        "left": "",
        "instruments": [
            "Voice",
            "Acoustic Guitar",
            "Electric Guitar",
            "Bass Guitar"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 34,
        "name": "Crystal Y.",
        "joined": "Winter 2025",
        "left": "",
        "instruments": [
            "Voice",
            "Ukulele"
        ],
        "roles": [
            "Artist"
        ],
        "links": {}
    },
    {
        "id": 35,
        "name": "Hayden Hoffort",
        "joined": "Winter 2025",
        "left": "",
        "instruments": [
            "Trumpet"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 36,
        "name": "Johnathan H.",
        "joined": "Winter 2025",
        "left": "",
        "instruments": [
            "Piano"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 37,
        "name": "Kae",
        "joined": "Winter 2025",
        "left": "",
        "instruments": [
            "Voice",
            "Electric Guitar",
            "Bass Guitar"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 38,
        "name": "Michelle",
        "joined": "Fall 2025",
        "left": "",
        "instruments": [
            "Piano"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 39,
        "name": "Sophia",
        "joined": "Fall 2025",
        "left": "",
        "instruments": [
            "Voice",
            "Bass Guitar"
        ],
        "roles": [
            "Assistant Executive (25)"
        ],
        "links": {
            "discord": "sopha__a"
        }
    },
    {
        "id": 40,
        "name": "Eric",
        "joined": "Fall 2025",
        "left": "",
        "instruments": [
            "Voice",
            "Piano"
        ],
        "roles": [
            "Assistant Executive (25)"
        ],
        "links": {
            "discord": "eeeric_nothing"
        }
    },
    {
        "id": 41,
        "name": "Zachary Pang",
        "joined": "Fall 2025",
        "left": "",
        "instruments": [
            "Voice"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 42,
        "name": "Olivia Yip",
        "joined": "Fall 2025",
        "left": "",
        "instruments": [
            "Voice",
            "Acoustic Guitar",
            "Ukulele"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 43,
        "name": "Emma Ethina Islam",
        "joined": "Fall 2025",
        "left": "",
        "instruments": [
            "Voice"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 44,
        "name": "Brian Lin",
        "joined": "Fall 2025",
        "left": "",
        "instruments": [
            "Voice",
            "Piano",
            "Electric Guitar"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 45,
        "name": "Fatima Gonsalves",
        "joined": "Fall 2025",
        "left": "",
        "instruments": [
            "Voice",
            "Piano",
            "Bass Guitar"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 46,
        "name": "Carmen",
        "joined": "Fall 2025",
        "left": "",
        "instruments": [
            "Voice",
            "Piano",
            "Electric Guitar"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 47,
        "name": "J. Mansia",
        "joined": "Fall 2025",
        "left": "",
        "instruments": [
            "Voice",
            "Piano",
            "Drums",
            "Electric Guitar",
            "Bass Guitar",
            "Violin"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 48,
        "name": "Simba",
        "joined": "Fall 2025",
        "left": "",
        "instruments": [
            "Violin",
            "Alto Saxophone"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 49,
        "name": "Skylar",
        "joined": "Fall 2025",
        "left": "Fall 2025",
        "instruments": [
            "Violin",
            "Flute"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 50,
        "name": "Nicole Liu",
        "joined": "Fall 2025",
        "left": "Fall 2025",
        "instruments": [
            "Piano",
            "Violin"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 51,
        "name": "Benjamin L.",
        "joined": "Fall 2025",
        "left": "",
        "instruments": [
            "Clarinet"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 52,
        "name": "Brandon Law",
        "joined": "Fall 2025",
        "left": "",
        "instruments": [
            "Voice",
            "Piano",
            "Alto Saxophone",
            "Tenor Saxophone"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 53,
        "name": "Efren Wang",
        "joined": "Fall 2025",
        "left": "",
        "instruments": [
            "Piano",
            "Trombone"
        ],
        "roles": [
            "Logistics"
        ],
        "links": {}
    },
    {
        "id": 54,
        "name": "William",
        "joined": "Fall 2025",
        "left": "",
        "instruments": [
            "Voice",
            "Electric Guitar"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 55,
        "name": "Ericka",
        "joined": "Fall 2025",
        "left": "",
        "instruments": [
            "Voice",
            "Acoustic Guitar"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 56,
        "name": "Alexander Davydenko",
        "joined": "Fall 2025",
        "left": "",
        "instruments": [
            "Electric Guitar"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 57,
        "name": "Emre",
        "joined": "Fall 2025",
        "left": "",
        "instruments": [
            "Acoustic Guitar",
            "Electric Guitar"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 58,
        "name": "Sofia Gondim",
        "joined": "Fall 2025",
        "left": "",
        "instruments": [
            "Voice",
            "Piano",
            "Electric Guitar",
            "Bass Guitar",
            "Bass Clarinet"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 59,
        "name": "Andrew Tan",
        "joined": "Fall 2025",
        "left": "",
        "instruments": [
            "Voice",
            "Piano",
            "Electric Guitar",
            "Bass Guitar"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 60,
        "name": "Emmett Hartley",
        "joined": "Fall 2025",
        "left": "",
        "instruments": [
            "Bass Guitar"
        ],
        "roles": [
            "Logistics"
        ],
        "links": {}
    },
    {
        "id": 61,
        "name": "Jonathan",
        "joined": "Fall 2025",
        "left": "",
        "instruments": [
            "Voice",
            "Piano",
            "Electric Guitar",
            "Bass Guitar",
            "Flute"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 62,
        "name": "FH",
        "joined": "Fall 2025",
        "left": "",
        "instruments": [
            "Piano",
            "Clarinet"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 63,
        "name": "Xianghai (Steven)",
        "joined": "Fall 2025",
        "left": "",
        "instruments": [
            "Harmonica",
            "Voice",
            "Piano"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 64,
        "name": "Julian",
        "joined": "Fall 2025",
        "left": "",
        "instruments": [
            "Voice",
            "Piano",
            "Drums"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 65,
        "name": "Joe",
        "joined": "Winter 2026",
        "left": "",
        "instruments": [
            "Piano"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 66,
        "name": "Paul Y.",
        "joined": "Winter 2026",
        "left": "",
        "instruments": [
            "Piano",
            "Drums",
            "Electric Guitar",
            "Bass Guitar",
            "Alto Saxophone"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 67,
        "name": "Ze",
        "joined": "Winter 2026",
        "left": "",
        "instruments": [
            "Violin"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 68,
        "name": "Kaveh",
        "joined": "Winter 2026",
        "left": "",
        "instruments": [
            "Drums"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 69,
        "name": "Cathy Z.",
        "joined": "Winter 2026",
        "left": "",
        "instruments": [
            "Voice",
            "Piccolo",
            "Flute",
            "Recorder",
            "Alto Saxophone",
            "Tenor Saxophone"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 70,
        "name": "Cailyn",
        "joined": "Winter 2026",
        "left": "",
        "instruments": [
            "Drums"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 71,
        "name": "Kaden Calvert",
        "joined": "Winter 2026",
        "left": "",
        "instruments": [
            "Drums"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 72,
        "name": "Kai Kang Nie",
        "joined": "Winter 2026",
        "left": "",
        "instruments": [
            "Bagpipes",
            "Voice"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 73,
        "name": "Celina L.",
        "joined": "Winter 2026",
        "left": "",
        "instruments": [
            "Voice"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 74,
        "name": "Lucia",
        "joined": "Winter 2026",
        "left": "",
        "instruments": [
            "Voice",
            "Piano",
            "Electric Guitar"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 75,
        "name": "Leo",
        "joined": "Winter 2026",
        "left": "",
        "instruments": [
            "Piano",
            "Bass Guitar"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 76,
        "name": "Phillip Hsu",
        "joined": "Winter 2026",
        "left": "",
        "instruments": [
            "Accordion",
            "Acoustic Guitar"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 77,
        "name": "Hana",
        "joined": "Winter 2026",
        "left": "",
        "instruments": [
            "Voice"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 78,
        "name": "Prashanth Shyamala",
        "joined": "Winter 2026",
        "left": "",
        "instruments": [
            "Electric Guitar"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 79,
        "name": "Charlene Chiang",
        "joined": "Winter 2026",
        "left": "",
        "instruments": [
            "Piano",
            "Bass Guitar",
            "Clarinet",
            "Trumpet",
            "Trombone"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 80,
        "name": "Colin Boothby",
        "joined": "Winter 2026",
        "left": "",
        "instruments": [
            "Theremin"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 81,
        "name": "yams",
        "joined": "Winter 2026",
        "left": "",
        "instruments": [
            "Electric Guitar"
        ],
        "roles": [],
        "links": {}
    }
];

const INSTRUMENTS = ['Accordion', 'Aux Percussion???', 'Bagpipes', 'Guitar', 'Voice', 'Piano', 'Electric Piano', 'Drums', 'Acoustic Guitar', 'Aux. Percussion???', 'Backing Voice', 'Djembe', 'Ukulele', 'Electric Guitar', 'Bass Guitar', 'Bongos', 'Lead Electric Guitar', 'Violin', 'Cello', 'Double Bass', 'Piccolo', 'Flute', 'Lead Voice', 'Recorder', 'Oboe', 'Clarinet', 'Bass Clarinet', 'Alto Saxophone', 'Tenor Saxophone', 'Baritone Saxophone', 'Harmonica', 'Rhythm Electric Guitar', 'Shaker', 'Theremin', 'Triangle', 'Trumpet', 'Trombone'];

const MUSIC = [
    {
        "id": 0,
        "name": "Zankyosanka",
        "composer": "Aimer",
        "from": "Demon Slayer",
        "mediaOrigin": "Anime",
        "reference": "https://www.youtube.com/watch?v=tLQLa6lM3Us&pp",
        "performances": [
            {
                "concerts": [
                    1,
                    2
                ],
                "performers": {
                    "4": [
                        4,
                        5,
                        6
                    ],
                    "5": [
                        2
                    ],
                    "7": [
                        0,
                        20
                    ],
                    "13": [
                        8
                    ],
                    "14": [
                        7
                    ],
                    "17": [
                        12
                    ],
                    "21": [
                        9
                    ],
                    "27": [
                        11
                    ],
                    "36": [
                        10
                    ]
                },
                "arranger": [
                    2
                ],
                "sheetMusic": "#",
                "songType": "Large"
            }
        ]
    },
    {
        "id": 1,
        "name": "Renai Circulation",
        "composer": "Kana Hanazawa",
        "from": "Bakemonogatari",
        "mediaOrigin": "Anime",
        "reference": "https://youtu.be/uKxyLmbOc0Q?si=-Zun1LXR44xKox1Z",
        "performances": [
            {
                "concerts": [
                    1,
                    2
                ],
                "performers": {
                    "4": [
                        4,
                        5,
                        6
                    ],
                    "5": [
                        2
                    ],
                    "7": [
                        0,
                        20
                    ],
                    "13": [
                        8
                    ],
                    "14": [
                        1
                    ],
                    "17": [
                        12
                    ],
                    "21": [
                        9
                    ],
                    "27": [
                        11
                    ],
                    "36": [
                        10
                    ]
                },
                "arranger": [
                    9
                ],
                "sheetMusic": "#",
                "songType": "Large"
            }
        ]
    },
    {
        "id": 2,
        "name": "Daddy! Daddy! Do!",
        "composer": "Masayuki Suzuki ft. Airi Suzuki",
        "from": "Kaguya-sama: Love is War",
        "mediaOrigin": "Anime",
        "reference": "https://www.youtube.com/watch?v=2Od7QCsyqkE&pp",
        "performances": [
            {
                "concerts": [
                    1,
                    2
                ],
                "performers": {
                    "4": [
                        4,
                        5,
                        6
                    ],
                    "5": [
                        2
                    ],
                    "7": [
                        0,
                        20
                    ],
                    "13": [
                        8
                    ],
                    "14": [
                        7
                    ],
                    "17": [
                        12
                    ],
                    "21": [
                        9
                    ],
                    "27": [
                        11
                    ],
                    "36": [
                        10
                    ]
                },
                "arranger": [
                    3
                ],
                "sheetMusic": "#",
                "songType": "Large"
            }
        ]
    },
    {
        "id": 3,
        "name": "Fly Me to the Moon",
        "composer": "Bart Howard",
        "from": "Neon Genesis Evangelion",
        "mediaOrigin": "Anime",
        "reference": "https://www.youtube.com/watch?v=w2xi6Qjv8mw",
        "performances": [
            {
                "concerts": [
                    0,
                    1,
                    2,
                    3
                ],
                "performers": {
                    "4": [
                        5
                    ],
                    "5": [
                        3
                    ],
                    "7": [
                        20
                    ],
                    "14": [
                        1
                    ],
                    "17": [
                        13
                    ]
                },
                "songType": "Small",
                "link": "https://www.youtube.com/watch?v=FvuYsi84Sfg"
            }
        ]
    },
    {
        "id": 4,
        "name": "Moonlight Stage",
        "composer": "GYARI",
        "mediaOrigin": "Vocaloid",
        "reference": "https://www.youtube.com/watch?v=TTk6C8ADgcU",
        "performances": [
            {
                "concerts": [
                    0,
                    1,
                    "RCAG Studio Night 2024????",
                    2,
                    3
                ],
                "performers": {
                    "4": [
                        5
                    ],
                    "5": [
                        3
                    ],
                    "7": [
                        20
                    ],
                    "14": [
                        1
                    ]
                },
                "songType": "Small",
                "link": "https://www.youtube.com/watch?v=_f_jcX2gmpQ"
            }
        ]
    },
    {
        "id": 5,
        "name": "Déja Vu",
        "composer": "Dave Rogers",
        "from": "Initial D",
        "mediaOrigin": "Anime",
        "reference": "https://www.youtube.com/watch?v=UT7O7FyUbxA&pp",
        "performances": [
            {
                "concerts": [
                    0,
                    1,
                    2
                ],
                "performers": {
                    "4": [
                        4,
                        6
                    ],
                    "5": [
                        2
                    ],
                    "7": [
                        0,
                        20
                    ],
                    "13": [
                        8
                    ],
                    "14": [
                        7
                    ]
                },
                "arranger": [
                    0
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "id": 6,
        "name": "Anytime Anywhere",
        "composer": "Milet",
        "from": "Frieren: Beyond Journey's End",
        "mediaOrigin": "Anime",
        "reference": "https://www.youtube.com/watch?v=r105CzDvoo0&pp",
        "performances": [
            {
                "concerts": [
                    1,
                    2
                ],
                "performers": {
                    "4": [
                        4,
                        6
                    ],
                    "5": [
                        2
                    ],
                    "13": [
                        8
                    ],
                    "14": [
                        7
                    ]
                },
                "songType": "Small"
            }
        ]
    },
    {
        "id": 7,
        "name": "Marigold",
        "composer": "M2U",
        "from": "Deemo",
        "mediaOrigin": "Video Game",
        "reference": "https://youtu.be/39EzeqzlwVY?si=vcJtk6j0CIhS97K-",
        "performances": [
            {
                "concerts": [
                    1
                ],
                "performers": {
                    "5": [
                        2,
                        38
                    ]
                },
                "songType": "Small"
            }
        ]
    },
    {
        "id": 8,
        "name": "Salt, Pepper, Birds, and the Thought Police",
        "composer": "Mili",
        "from": "Library Of Ruina",
        "mediaOrigin": "Video Game",
        "reference": "https://www.youtube.com/watch?v=Dca9gJyjoAg&pp",
        "performances": [
            {
                "concerts": [
                    1,
                    2
                ],
                "performers": {
                    "4": [
                        5
                    ],
                    "5": [
                        3
                    ],
                    "7": [
                        20
                    ],
                    "17": [
                        13
                    ]
                },
                "songType": "Small"
            }
        ]
    },
    {
        "id": 9,
        "name": "Droit dans le soleil",
        "composer": "Détroit",
        "reference": "https://youtu.be/MoXNwGKA8cg?si=oVC4CrezCIxnvGie",
        "performances": [
            {
                "concerts": [
                    1,
                    2
                ],
                "performers": {
                    "4": [
                        5
                    ],
                    "5": [
                        3
                    ],
                    "8": [
                        3
                    ],
                    "14": [
                        1
                    ]
                },
                "songType": "Small",
                "link": "https://www.youtube.com/watch?v=d0apOZbRKU4"
            }
        ]
    },
    {
        "id": 10,
        "name": "Komm, süsser Tod",
        "composer": "Shirō Sagisu",
        "from": "Neon Genesis Evangelion",
        "mediaOrigin": "Anime",
        "reference": "https://youtu.be/hoKluzn07eQ?si=QRBOh6tGD1CbTn5M",
        "performances": [
            {
                "concerts": [
                    1,
                    2
                ],
                "performers": {
                    "4": [
                        5,
                        4
                    ],
                    "5": [
                        3
                    ],
                    "7": [
                        20
                    ],
                    "14": [
                        7
                    ]
                },
                "songType": "Small"
            }
        ]
    },
    {
        "id": 11,
        "name": "My City's on Fire",
        "composer": "Laszlo Vincze",
        "from": "Chicken Police",
        "mediaOrigin": "Video Game",
        "reference": "https://youtu.be/9KA-sZSU5iQ?si=aC2VUNUSpc5aAZDG",
        "performances": [
            {
                "concerts": [
                    1,
                    2,
                    3
                ],
                "performers": {
                    "4": [
                        5
                    ],
                    "5": [
                        3
                    ],
                    "7": [
                        20
                    ]
                },
                "songType": "Small"
            }
        ]
    },
    {
        "id": 12,
        "name": "Heartache",
        "composer": "Toby Fox",
        "from": "Undertale",
        "mediaOrigin": "Video Game",
        "reference": "https://www.youtube.com/watch?v=XJ9XtKJHvjQ",
        "performances": [
            {
                "concerts": [],
                "performers": {
                    "4": [
                        5
                    ],
                    "17": [
                        12
                    ],
                    "21": [
                        9
                    ]
                },
                "arranger": [
                    9
                ],
                "songType": "Small",
                "link": "https://www.youtube.com/watch?v=oTlV8LhFbxQ"
            }
        ]
    },
    {
        "id": 13,
        "name": "Death by Glamour",
        "composer": "Toby Fox",
        "from": "Undertale",
        "mediaOrigin": "Video Game",
        "reference": "https://www.youtube.com/watch?v=qeDIZCc6Cyo",
        "performances": [
            {
                "concerts": [
                    3
                ],
                "performers": {
                    "5": [
                        2
                    ],
                    "7": [
                        0
                    ],
                    "13": [
                        22
                    ],
                    "14": [
                        7
                    ],
                    "17": [
                        12
                    ],
                    "21": [
                        9
                    ],
                    "24": [
                        19
                    ],
                    "25": [
                        32
                    ],
                    "27": [
                        11
                    ],
                    "35": [
                        24
                    ],
                    "36": [
                        10
                    ]
                },
                "arranger": [
                    9
                ],
                "sheetMusic": "#",
                "songType": "Large"
            }
        ]
    },
    {
        "id": 14,
        "name": "Bloody Stream",
        "composer": "CODA",
        "from": "JoJo's Bizarre Adventure",
        "mediaOrigin": "Anime",
        "reference": "https://www.youtube.com/watch?v=hmpJqJLsR48",
        "performances": [
            {
                "concerts": [
                    3
                ],
                "performers": {
                    "4": [
                        6
                    ],
                    "5": [
                        17
                    ],
                    "6": [
                        13
                    ],
                    "7": [
                        18
                    ],
                    "13": [
                        26
                    ],
                    "14": [
                        0
                    ],
                    "21": [
                        9
                    ],
                    "27": [
                        16
                    ],
                    "28": [
                        11
                    ],
                    "35": [
                        24
                    ],
                    "36": [
                        10
                    ]
                },
                "arranger": [
                    3
                ],
                "sheetMusic": "#",
                "songType": "Large"
            }
        ]
    },
    {
        "id": 15,
        "name": "Zettai Zetsumei",
        "composer": "Cö shu Nie",
        "from": "The Promised Neverland",
        "mediaOrigin": "Anime",
        "reference": "https://www.youtube.com/watch?v=6WNk9yMNovs",
        "performances": [
            {
                "concerts": [
                    3
                ],
                "performers": {
                    "4": [
                        4
                    ],
                    "7": [
                        18
                    ],
                    "14": [
                        1
                    ],
                    "16": [
                        8
                    ],
                    "17": [
                        15
                    ],
                    "21": [
                        9
                    ],
                    "25": [
                        27
                    ],
                    "27": [
                        16
                    ],
                    "28": [
                        11
                    ],
                    "31": [
                        26
                    ],
                    "35": [
                        24
                    ],
                    "36": [
                        10
                    ]
                },
                "arranger": [
                    2
                ],
                "sheetMusic": "#",
                "songType": "Large"
            }
        ]
    },
    {
        "id": 16,
        "name": "Wild Side",
        "composer": "ALI",
        "from": "Beastars",
        "mediaOrigin": "Anime",
        "reference": "https://www.youtube.com/watch?v=u5heWZ9occg",
        "performances": [
            {
                "concerts": [
                    3
                ],
                "performers": {
                    "4": [
                        13,
                        5
                    ],
                    "5": [
                        3
                    ],
                    "7": [
                        6
                    ],
                    "14": [
                        1
                    ],
                    "27": [
                        11
                    ],
                    "35": [
                        10,
                        24
                    ]
                },
                "arranger": [
                    "OpticWattz"
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "id": 17,
        "name": "But Not for Me",
        "composer": "Chet Baker",
        "reference": "https://www.youtube.com/watch?v=R_f_mMJAezM",
        "performances": [
            {
                "concerts": [
                    3
                ],
                "performers": {
                    "4": [
                        13
                    ],
                    "5": [
                        3
                    ],
                    "7": [
                        6
                    ],
                    "17": [
                        13
                    ]
                },
                "songType": "Small"
            }
        ]
    },
    {
        "id": 18,
        "name": "Wind",
        "composer": "Akeboshi",
        "from": "Naruto",
        "mediaOrigin": "Anime",
        "reference": "https://www.youtube.com/watch?v=WqGOaOHu5uY",
        "performances": [
            {
                "concerts": [],
                "performers": {
                    "4": [
                        5
                    ],
                    "5": [
                        9
                    ],
                    "17": [
                        12
                    ],
                    "21": [
                        9
                    ]
                },
                "arranger": [
                    9
                ],
                "songType": "Small",
                "link": "https://www.youtube.com/watch?v=w5HBakdZ06E"
            },
            {
                "concerts": [
                    3
                ],
                "performers": {
                    "4": [
                        5
                    ],
                    "5": [
                        3
                    ],
                    "7": [
                        18
                    ],
                    "17": [
                        12
                    ],
                    "21": [
                        9
                    ]
                },
                "arranger": [
                    9
                ],
                "sheetMusic": "#",
                "songType": "Small"
            }
        ]
    },
    {
        "id": 19,
        "name": "Ringo Biyori",
        "composer": "Rocky Chack",
        "from": "Spice and Wolf",
        "mediaOrigin": "Anime",
        "reference": "https://www.youtube.com/watch?v=hO5KQgFjIxI",
        "performances": [
            {
                "concerts": [
                    3,
                    7
                ],
                "performers": {
                    "4": [
                        5
                    ],
                    "5": [
                        3
                    ],
                    "7": [
                        6
                    ],
                    "14": [
                        1
                    ],
                    "17": [
                        13
                    ],
                    "25": [
                        11
                    ],
                    "35": [
                        24
                    ]
                },
                "arranger": [
                    3
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "id": 20,
        "name": "Let You Down",
        "composer": "Dawid Podsiadło",
        "from": "Cyberpunk Edgerunners",
        "mediaOrigin": "Anime",
        "reference": "https://www.youtube.com/watch?v=yBuHEV44s3Y",
        "performances": [
            {
                "concerts": [
                    3
                ],
                "performers": {
                    "3": [
                        23
                    ],
                    "4": [
                        5
                    ],
                    "5": [
                        3
                    ],
                    "7": [
                        20
                    ],
                    "14": [
                        21
                    ]
                },
                "songType": "Small"
            }
        ]
    },
    {
        "id": 21,
        "name": "Midnight Rendez-Vous",
        "composer": "CASIOPEA",
        "reference": "https://www.youtube.com/watch?v=4Hvvltt7d-U",
        "performances": [
            {
                "concerts": [
                    3
                ],
                "performers": {
                    "7": [
                        20
                    ],
                    "13": [
                        0
                    ],
                    "14": [
                        21
                    ]
                },
                "songType": "Small"
            }
        ]
    },
    {
        "id": 22,
        "name": "From the Start",
        "composer": "Laufey",
        "reference": "https://www.youtube.com/watch?v=lSD_L-xic9o",
        "performances": [
            {
                "concerts": [
                    3
                ],
                "performers": {
                    "4": [
                        5
                    ],
                    "5": [
                        2
                    ],
                    "7": [
                        20
                    ],
                    "8": [
                        3
                    ],
                    "14": [
                        1
                    ]
                },
                "songType": "Small"
            }
        ]
    },
    {
        "id": 23,
        "name": "Unravel",
        "composer": "TK from Ling Tosite Sigure",
        "from": "Tokyo Ghoul",
        "mediaOrigin": "Anime",
        "reference": "https://www.youtube.com/watch?v=Fve_lHIPa-I, https://www.youtube.com/watch?v=sEQf5lcnj_o",
        "performances": [
            {
                "concerts": [
                    3
                ],
                "performers": {
                    "5": [
                        28
                    ]
                },
                "arranger": [
                    "Animenz"
                ],
                "sheetMusic": "#",
                "songType": "Small",
                "link": "https://www.youtube.com/watch?v=IelVOYXLZaA"
            }
        ]
    },
    {
        "id": 24,
        "name": "world.execute(me); (Key Ingredient ver.)",
        "composer": "Mili",
        "reference": "https://www.youtube.com/watch?v=JB5gfmWQzSA",
        "performances": [
            {
                "concerts": [
                    3
                ],
                "performers": {
                    "4": [
                        4
                    ],
                    "5": [
                        2
                    ]
                },
                "arranger": [
                    2
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "id": 25,
        "name": "God Knows",
        "composer": "ENOZ",
        "from": "The Melancholy of Haruhi Suzumiya",
        "mediaOrigin": "Anime",
        "reference": "https://www.youtube.com/watch?v=5QNaSMiZ_-o",
        "performances": [
            {
                "concerts": [
                    3
                ],
                "performers": {
                    "4": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "14": [
                        ""
                    ],
                    "16": [
                        ""
                    ],
                    "31": [
                        ""
                    ]
                },
                "group": "Tokuiten",
                "songType": "Small"
            }
        ]
    },
    {
        "id": 26,
        "name": "Re:Re:",
        "composer": "Asian Kung-Fu Generation",
        "from": "Erased",
        "mediaOrigin": "Anime",
        "reference": "https://www.youtube.com/watch?v=PiIAVnFX2eo, https://www.youtube.com/watch?v=_v_Voe5KD1M",
        "performances": [
            {
                "concerts": [
                    3
                ],
                "performers": {
                    "4": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "14": [
                        ""
                    ],
                    "16": [
                        ""
                    ],
                    "31": [
                        ""
                    ]
                },
                "group": "Tokuiten",
                "songType": "Small"
            }
        ]
    },
    {
        "id": 27,
        "name": "Rockn' Roll, Morning Light Falls on You",
        "composer": "Asian Kung-Fu Generation",
        "from": "Bocchi the Rock",
        "mediaOrigin": "Anime",
        "reference": "https://www.youtube.com/watch?v=E5O0mCrUdAM, https://www.youtube.com/watch?v=rDTFSD9K9dA",
        "performances": [
            {
                "concerts": [
                    3
                ],
                "performers": {
                    "4": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "14": [
                        ""
                    ],
                    "16": [
                        ""
                    ],
                    "31": [
                        ""
                    ]
                },
                "group": "Tokuiten",
                "songType": "Small"
            }
        ]
    },
    {
        "id": 28,
        "name": "Falling Down",
        "composer": "Oasis",
        "from": "Higashi no Eden",
        "mediaOrigin": "Anime",
        "reference": "https://www.youtube.com/watch?v=L5BDyjgbjPU",
        "performances": [
            {
                "concerts": [],
                "performers": {
                    "4": [
                        ""
                    ],
                    "5": [
                        ""
                    ],
                    "8": [
                        ""
                    ],
                    "14": [
                        ""
                    ],
                    "17": [
                        ""
                    ]
                },
                "arranger": [
                    9
                ],
                "songType": "Small",
                "link": "https://www.youtube.com/watch?v=-7cIocnaWuI"
            }
        ]
    },
    {
        "id": 29,
        "name": "Preview of Me",
        "composer": "Tatsuya Kitani",
        "from": "Go! Go! Loser Ranger",
        "mediaOrigin": "Anime",
        "reference": "https://www.youtube.com/watch?v=O3ZYjfMqAsc",
        "performances": [
            {
                "concerts": [],
                "performers": {
                    "10": [
                        5,
                        1
                    ],
                    "22": [
                        6
                    ]
                },
                "songType": "Small",
                "link": "https://www.youtube.com/watch?v=BkWCOBDLsZI"
            }
        ]
    },
    {
        "id": 30,
        "name": "Loonboon",
        "composer": "Laura Shigihara",
        "from": "Plants vs. Zombies",
        "mediaOrigin": "Video Game",
        "reference": "https://www.youtube.com/watch?v=lr4vi_XAjQQ, https://www.youtube.com/watch?v=qVhEcqUU4TI",
        "performances": [
            {
                "concerts": [
                    7
                ],
                "performers": {
                    "5": [
                        28
                    ],
                    "6": [
                        29
                    ],
                    "7": [
                        20
                    ],
                    "14": [
                        21
                    ],
                    "17": [
                        13,
                        12,
                        2
                    ],
                    "21": [
                        9
                    ],
                    "24": [
                        19
                    ],
                    "25": [
                        27
                    ],
                    "27": [
                        16
                    ],
                    "28": [
                        11
                    ],
                    "35": [
                        35
                    ],
                    "36": [
                        10
                    ]
                },
                "arranger": [
                    3,
                    9
                ],
                "sheetMusic": "#",
                "songType": "Large"
            }
        ]
    },
    {
        "id": 31,
        "name": "Rubato",
        "composer": "Yorushika",
        "mediaOrigin": "Anime",
        "reference": "https://www.youtube.com/watch?v=3J5uLk1DJV0",
        "performances": [
            {
                "concerts": [
                    7
                ],
                "performers": {
                    "4": [
                        1,
                        5
                    ],
                    "7": [
                        20
                    ],
                    "13": [
                        23
                    ],
                    "14": [
                        7
                    ],
                    "27": [
                        16
                    ],
                    "28": [
                        11
                    ],
                    "35": [
                        24
                    ],
                    "36": [
                        10
                    ]
                },
                "arranger": [
                    1
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "id": 32,
        "name": "Hive Knight",
        "composer": "Christopher Larkin",
        "from": "Hollow Knight",
        "mediaOrigin": "Video Game",
        "reference": "https://www.youtube.com/watch?v=RVyJmhiJjA8",
        "performances": [
            {
                "concerts": [
                    7
                ],
                "performers": {
                    "5": [
                        28
                    ],
                    "7": [
                        6
                    ],
                    "14": [
                        7
                    ],
                    "17": [
                        2,
                        13
                    ],
                    "27": [
                        16
                    ],
                    "28": [
                        11
                    ],
                    "35": [
                        35,
                        24
                    ],
                    "36": [
                        10
                    ]
                },
                "arranger": [
                    35
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "id": 33,
        "name": "It's Going Down Now",
        "composer": "Atsushi Kitajoh",
        "from": "Persona 3",
        "mediaOrigin": "Video Game",
        "reference": "https://www.youtube.com/watch?v=2KuWjZD6PBA",
        "performances": [
            {
                "concerts": [
                    7
                ],
                "performers": {
                    "4": [
                        5,
                        6
                    ],
                    "5": [
                        2
                    ],
                    "7": [
                        18
                    ],
                    "13": [
                        23
                    ],
                    "14": [
                        7
                    ],
                    "17": [
                        13
                    ],
                    "28": [
                        11
                    ],
                    "35": [
                        10,
                        24
                    ]
                },
                "arranger": [
                    2
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "id": 34,
        "name": "Agniratha, Mechonis Capital",
        "composer": "ACE+",
        "from": "Xenoblade Chronicles",
        "mediaOrigin": "Video Game",
        "reference": "https://youtu.be/Jln_KBWFvfw?si=AV1oPH5PuyghLSO6",
        "performances": [
            {
                "concerts": [
                    7
                ],
                "performers": {
                    "5": [
                        28
                    ],
                    "17": [
                        15
                    ],
                    "21": [
                        9
                    ],
                    "24": [
                        19
                    ],
                    "25": [
                        27
                    ]
                },
                "arranger": [
                    9
                ],
                "songType": "Small",
                "link": "https://www.youtube.com/watch?v=XQHnKNeKknc"
            }
        ]
    },
    {
        "id": 35,
        "name": "Lullaby of Birdland",
        "composer": "Yoko Kanno",
        "from": "Sakamichi no Apollon",
        "mediaOrigin": "Anime",
        "reference": "https://www.youtube.com/watch?v=gDzi8N3BYMw",
        "performances": [
            {
                "concerts": [
                    7
                ],
                "performers": {
                    "4": [
                        13
                    ],
                    "5": [
                        3
                    ],
                    "7": [
                        6
                    ],
                    "14": [
                        21
                    ],
                    "17": [
                        2,
                        12
                    ]
                },
                "arranger": [
                    13
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "id": 36,
        "name": "Beaches of Maceio",
        "composer": "Kaizyu (Original Piece)",
        "reference": "https://www.youtube.com/watch?v=aVASIbpXAWs",
        "performances": [
            {
                "concerts": [
                    7
                ],
                "performers": {
                    "4": [
                        13
                    ],
                    "5": [
                        3
                    ],
                    "7": [
                        6
                    ],
                    "14": [
                        1
                    ],
                    "17": [
                        12
                    ]
                },
                "songType": "Small"
            }
        ]
    },
    {
        "id": 37,
        "name": "My Way",
        "composer": "Jacques Revaux, Gilles Thibaut, & Claude François",
        "reference": "https://www.youtube.com/watch?v=eKN7ffwEBmg, https://www.youtube.com/watch?v=qjpRSREHX1Y",
        "performances": [
            {
                "concerts": [
                    7
                ],
                "performers": {
                    "4": [
                        5,
                        13
                    ],
                    "5": [
                        3
                    ],
                    "7": [
                        20
                    ]
                },
                "songType": "Small"
            }
        ]
    },
    {
        "id": 38,
        "name": "Ano Bando",
        "composer": "Kessoku Band",
        "from": "Bocchi the Rock",
        "mediaOrigin": "Anime",
        "reference": "https://www.youtube.com/watch?v=q-bCp4MxuYU",
        "performances": [
            {
                "concerts": [
                    7
                ],
                "performers": {
                    "4": [
                        1
                    ],
                    "7": [
                        18
                    ],
                    "14": [
                        1
                    ],
                    "16": [
                        8
                    ],
                    "31": [
                        22
                    ]
                },
                "songType": "Small"
            }
        ]
    },
    {
        "id": 39,
        "name": "Black Sheep",
        "composer": "Metric",
        "from": "Scott Pilgrim vs. the World",
        "reference": "https://www.youtube.com/watch?v=1xcSDYy3Dl4",
        "performances": [
            {
                "concerts": [
                    7
                ],
                "performers": {
                    "4": [
                        5,
                        1
                    ],
                    "7": [
                        18
                    ],
                    "14": [
                        1
                    ],
                    "16": [
                        8
                    ],
                    "31": [
                        22
                    ]
                },
                "songType": "Small"
            }
        ]
    },
    {
        "id": 40,
        "name": "La Sentinelle",
        "composer": "Luke",
        "reference": "https://www.youtube.com/watch?v=0NUqL1bvAis",
        "performances": [
            {
                "concerts": [
                    7
                ],
                "performers": {
                    "4": [
                        5
                    ],
                    "7": [
                        20
                    ],
                    "13": [
                        23
                    ],
                    "14": [
                        1
                    ]
                },
                "songType": "Small"
            }
        ]
    },
    {
        "id": 41,
        "name": "Doom Crossing: Eternal Horizons",
        "composer": "The Chalkeaters",
        "mediaOrigin": "Video Game",
        "reference": "https://www.youtube.com/watch?v=U4lz8MN6MQA",
        "performances": [
            {
                "concerts": [
                    7
                ],
                "performers": {
                    "4": [
                        34,
                        5,
                        13
                    ],
                    "7": [
                        20
                    ],
                    "12": [
                        34
                    ],
                    "14": [
                        21
                    ]
                },
                "songType": "Small"
            }
        ]
    },
    {
        "id": 42,
        "name": "JoJo Sono Chi no Kioku ~end of THE WORLD~",
        "composer": "JO☆STARS",
        "from": "JoJo's Bizarre Adventure",
        "mediaOrigin": "Anime",
        "reference": "https://www.youtube.com/watch?v=BPyQM7FmG8g",
        "performances": [
            {
                "concerts": [
                    7
                ],
                "performers": {
                    "4": [
                        5,
                        6,
                        3
                    ],
                    "5": [
                        11
                    ],
                    "7": [
                        20
                    ],
                    "13": [
                        37
                    ],
                    "17": [
                        2,
                        13
                    ]
                },
                "arranger": [
                    3
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "id": 43,
        "name": "NO, Thank You!",
        "composer": "Ho-kago Tea Time",
        "from": "K-On!",
        "mediaOrigin": "Anime",
        "reference": "https://www.youtube.com/watch?v=mpb2pQtGb5A",
        "performances": [
            {
                "concerts": [
                    7
                ],
                "performers": {
                    "4": [
                        ""
                    ],
                    "5": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "14": [
                        ""
                    ],
                    "16": [
                        ""
                    ],
                    "31": [
                        ""
                    ]
                },
                "group": "Tokuiten",
                "songType": "Small"
            }
        ]
    },
    {
        "id": 44,
        "name": "Bremen",
        "composer": "Yorushika",
        "reference": "https://youtu.be/BuBjSciSdO8?si=QsZHQbZb4B7PaNUi",
        "performances": [
            {
                "concerts": [
                    7
                ],
                "performers": {
                    "4": [
                        ""
                    ],
                    "5": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "14": [
                        ""
                    ],
                    "16": [
                        ""
                    ],
                    "31": [
                        ""
                    ]
                },
                "group": "Tokuiten",
                "songType": "Small"
            }
        ]
    },
    {
        "id": 45,
        "name": "Kimi no Shiranai Monogatari",
        "composer": "Supercell",
        "from": "Bakemonogatari",
        "mediaOrigin": "Anime",
        "reference": "https://youtu.be/jpV5jeFlt_E?si=GADr3m-yMBZS5QQ-",
        "performances": [
            {
                "concerts": [
                    7
                ],
                "performers": {
                    "4": [
                        ""
                    ],
                    "5": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "14": [
                        ""
                    ],
                    "16": [
                        ""
                    ],
                    "31": [
                        ""
                    ]
                },
                "group": "Tokuiten",
                "songType": "Small"
            }
        ]
    },
    {
        "id": 46,
        "name": "Louder",
        "composer": "Roselia",
        "from": "BanG Dream!",
        "mediaOrigin": "Anime",
        "reference": "https://www.youtube.com/watch?v=gZqpgrL6JTI",
        "performances": [
            {
                "concerts": [
                    7
                ],
                "performers": {
                    "4": [
                        ""
                    ],
                    "5": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "14": [
                        ""
                    ],
                    "16": [
                        ""
                    ],
                    "31": [
                        ""
                    ]
                },
                "group": "Tokuiten",
                "songType": "Small"
            }
        ]
    },
    {
        "id": 47,
        "name": "Lost in Paradise",
        "composer": "ALI feat. AKLO",
        "from": "Jujustu Kaisen",
        "mediaOrigin": "Anime",
        "reference": "https://www.youtube.com/channel/UCnYvfe8YHnRRly5SCA8mP5A",
        "performances": [
            {
                "concerts": [
                    7
                ],
                "performers": {
                    "4": [
                        5,
                        6
                    ],
                    "5": [
                        36
                    ],
                    "6": [
                        3
                    ],
                    "7": [
                        18
                    ],
                    "13": [
                        22
                    ],
                    "14": [
                        7
                    ],
                    "17": [
                        17,
                        13,
                        12
                    ],
                    "27": [
                        27,
                        16
                    ],
                    "28": [
                        11
                    ],
                    "35": [
                        35,
                        24
                    ]
                },
                "arranger": [
                    2
                ],
                "sheetMusic": "#",
                "songType": "Large"
            }
        ]
    },
    {
        "id": 48,
        "name": "Anarchy Rainbow",
        "composer": "Deep Cut",
        "from": "Splatoon 3",
        "mediaOrigin": "Video Game",
        "reference": "https://www.youtube.com/watch?v=DtMOAvOWTvY",
        "performances": [
            {
                "concerts": [],
                "performers": {
                    "4": [
                        5
                    ],
                    "5": [
                        9
                    ],
                    "11": [
                        1
                    ],
                    "14": [
                        1
                    ],
                    "17": [
                        12
                    ],
                    "21": [
                        9
                    ],
                    "32": [
                        1
                    ]
                },
                "arranger": [
                    9
                ],
                "songType": "Small",
                "link": "https://www.youtube.com/watch?v=zVNVMBZ1kPg"
            }
        ]
    },
    {
        "id": 49,
        "name": "Naimononedari",
        "composer": "KANA-BOON",
        "reference": "https://www.youtube.com/watch?v=R2OvE1oX_fs",
        "performances": [
            {
                "concerts": [],
                "performers": {
                    "4": [
                        1,
                        5
                    ]
                },
                "songType": "Small",
                "link": "https://www.youtube.com/watch?v=jHEf-jMVkFA"
            }
        ]
    },
    {
        "id": 50,
        "name": "Dreamer",
        "composer": "Laufey",
        "performances": [
            {
                "concerts": [
                    9,
                    10
                ],
                "performers": {
                    "4": [
                        13
                    ],
                    "5": [
                        3
                    ],
                    "7": [
                        64
                    ],
                    "14": [
                        60
                    ],
                    "27": [
                        27,
                        48
                    ]
                },
                "arranger": [
                    3
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "id": 51,
        "name": "A Cruel Angel's Thesis",
        "composer": "Hidetoshi Satō",
        "from": "Neon Genesis Evangelion",
        "mediaOrigin": "Anime",
        "reference": "https://www.youtube.com/watch?v=CZQ1pTMAXN0",
        "performances": [
            {
                "concerts": [
                    9
                ],
                "performers": {
                    "5": [
                        3
                    ],
                    "7": [
                        64
                    ],
                    "14": [
                        60
                    ],
                    "27": [
                        27,
                        48
                    ]
                },
                "arranger": [
                    3
                ],
                "songType": "Small"
            },
            {
                "concerts": [
                    10
                ],
                "performers": {
                    "4": [
                        39,
                        13,
                        46,
                        42,
                        40,
                        47,
                        41,
                        44,
                        45
                    ],
                    "5": [
                        3
                    ],
                    "7": [
                        64
                    ],
                    "14": [
                        60
                    ],
                    "16": [
                        54
                    ],
                    "27": [
                        27
                    ],
                    "28": [
                        11
                    ],
                    "31": [
                        58
                    ],
                    "35": [
                        24,
                        35,
                        10
                    ],
                    "36": [
                        53
                    ]
                },
                "arranger": [
                    3
                ],
                "sheetMusic": "#",
                "songType": "Large"
            }
        ]
    },
    {
        "id": 52,
        "name": "AM4:50",
        "composer": "downt",
        "reference": "https://www.youtube.com/watch?v=Gnn7dhnWito",
        "performances": [
            {
                "concerts": [
                    10,
                    13
                ],
                "performers": {
                    "4": [
                        1
                    ],
                    "7": [
                        20
                    ],
                    "14": [
                        33
                    ],
                    "16": [
                        23
                    ],
                    "31": [
                        1
                    ]
                },
                "group": "2group2",
                "songType": "Small"
            }
        ]
    },
    {
        "id": 53,
        "name": "artsick",
        "composer": "tricot",
        "reference": "https://www.youtube.com/watch?v=G9xfiwX803U",
        "performances": [
            {
                "concerts": [
                    10
                ],
                "performers": {
                    "4": [
                        1
                    ],
                    "7": [
                        20
                    ],
                    "14": [
                        33
                    ],
                    "16": [
                        23
                    ],
                    "31": [
                        1
                    ]
                },
                "group": "2group2",
                "songType": "Small"
            }
        ]
    },
    {
        "id": 54,
        "name": "Can't Be Right",
        "composer": "Zutomayo",
        "from": "The Promised Neverland",
        "mediaOrigin": "Anime",
        "reference": "https://www.youtube.com/watch?v=258qUAI7rck",
        "performances": [
            {
                "concerts": [
                    10
                ],
                "performers": {
                    "4": [
                        39
                    ],
                    "5": [
                        2
                    ],
                    "8": [
                        55
                    ],
                    "14": [
                        8
                    ]
                },
                "arranger": [
                    55
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "id": 55,
        "name": "Tank!",
        "composer": "Yoko Kanno",
        "from": "Cowboy Bebop",
        "mediaOrigin": "Anime",
        "reference": "https://www.youtube.com/watch?v=EL-D9LrFJd4",
        "performances": [
            {
                "concerts": [
                    10
                ],
                "performers": {
                    "7": [
                        64
                    ],
                    "14": [
                        33
                    ],
                    "15": [
                        3
                    ],
                    "27": [
                        52
                    ],
                    "28": [
                        11
                    ],
                    "35": [
                        24,
                        35
                    ],
                    "36": [
                        10,
                        53
                    ]
                },
                "arranger": [
                    27
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "id": 56,
        "name": "Baka Mitai",
        "composer": "Mitsuharu Fukuyama",
        "from": "Yakuza",
        "mediaOrigin": "Video Game",
        "reference": "https://www.youtube.com/watch?v=g3jCAyPai2Y",
        "performances": [
            {
                "concerts": [
                    10
                ],
                "performers": {
                    "4": [
                        41,
                        42,
                        3
                    ],
                    "5": [
                        59
                    ],
                    "7": [
                        64
                    ],
                    "14": [
                        52
                    ],
                    "21": [
                        9
                    ],
                    "25": [
                        27
                    ],
                    "27": [
                        48
                    ],
                    "35": [
                        35
                    ],
                    "36": [
                        10
                    ]
                },
                "arranger": [
                    27
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "id": 57,
        "name": "Roki",
        "composer": "Mikito-P",
        "reference": "https://www.youtube.com/watch?v=Xg-qfsKN2_E",
        "performances": [
            {
                "concerts": [
                    10
                ],
                "performers": {
                    "4": [
                        39,
                        44
                    ],
                    "7": [
                        47
                    ],
                    "14": [
                        21
                    ],
                    "16": [
                        44
                    ],
                    "31": [
                        22
                    ]
                },
                "songType": "Small"
            }
        ]
    },
    {
        "id": 58,
        "name": "Tenshi ni Fureta yo!",
        "composer": "Ho-kago Tea Time",
        "from": "K-On!",
        "mediaOrigin": "Anime",
        "reference": "https://www.youtube.com/watch?v=ba0juE9ROCg",
        "performances": [
            {
                "concerts": [
                    10
                ],
                "performers": {
                    "4": [
                        39
                    ],
                    "5": [
                        62
                    ],
                    "7": [
                        47
                    ],
                    "14": [
                        21
                    ],
                    "16": [
                        44
                    ],
                    "31": [
                        22
                    ]
                },
                "songType": "Small"
            }
        ]
    },
    {
        "id": 59,
        "name": "Beginning",
        "composer": "Tenmon",
        "from": "Link Click",
        "mediaOrigin": "Anime",
        "reference": "https://www.youtube.com/watch?v=l8ormx3BVTI",
        "performances": [
            {
                "concerts": [
                    10
                ],
                "performers": {
                    "5": [
                        36
                    ],
                    "17": [
                        2,
                        13
                    ],
                    "21": [
                        9
                    ],
                    "27": [
                        27
                    ]
                },
                "arranger": [
                    27
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "id": 60,
        "name": "Just the Two of Us",
        "composer": "Bill Withers, William Salter, & Ralph MacDonald",
        "reference": "https://www.youtube.com/watch?v=Uw5OLnN7UvM",
        "performances": [
            {
                "concerts": [
                    10
                ],
                "performers": {
                    "4": [
                        43,
                        24
                    ],
                    "5": [
                        3
                    ],
                    "7": [
                        47
                    ],
                    "13": [
                        37
                    ],
                    "14": [
                        52
                    ],
                    "27": [
                        11
                    ]
                },
                "arranger": [
                    3
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "id": 61,
        "name": "Blush",
        "composer": "Zutomayo",
        "from": "Drifting Home",
        "mediaOrigin": "Anime",
        "reference": "https://www.youtube.com/watch?v=OxcnK1s2Fww",
        "performances": [
            {
                "concerts": [
                    10
                ],
                "performers": {
                    "4": [
                        45
                    ],
                    "7": [
                        64
                    ],
                    "14": [
                        60
                    ],
                    "16": [
                        56
                    ],
                    "31": [
                        58
                    ]
                },
                "songType": "Small"
            }
        ]
    },
    {
        "id": 62,
        "name": "Fireworks",
        "composer": "Daoko",
        "from": "Fireworks",
        "mediaOrigin": "Anime",
        "reference": "https://www.youtube.com/watch?v=-tKVN2mAKRI",
        "performances": [
            {
                "concerts": [
                    10
                ],
                "performers": {
                    "4": [
                        46,
                        42,
                        40,
                        45
                    ],
                    "5": [
                        62
                    ],
                    "7": [
                        64
                    ],
                    "14": [
                        36
                    ],
                    "16": [
                        59
                    ],
                    "17": [
                        47,
                        12,
                        49,
                        13
                    ],
                    "25": [
                        51
                    ],
                    "27": [
                        48
                    ],
                    "31": [
                        37
                    ]
                },
                "arranger": [
                    2
                ],
                "sheetMusic": "#",
                "songType": "Large"
            }
        ]
    },
    {
        "id": 63,
        "name": "Hello",
        "composer": "Furui Riho",
        "from": "City the Animation",
        "mediaOrigin": "Anime",
        "reference": "https://www.youtube.com/watch?v=JxyACq69HgA",
        "performances": [
            {
                "concerts": [
                    10
                ],
                "performers": {
                    "4": [
                        45,
                        41
                    ],
                    "5": [
                        63
                    ],
                    "6": [
                        29
                    ],
                    "7": [
                        64
                    ],
                    "13": [
                        59
                    ],
                    "14": [
                        58
                    ],
                    "27": [
                        11
                    ],
                    "35": [
                        10,
                        24
                    ],
                    "36": [
                        53
                    ]
                },
                "arranger": [
                    3
                ],
                "sheetMusic": "#",
                "songType": "Large"
            }
        ]
    },
    {
        "id": 64,
        "name": "Love Like You",
        "composer": "Aivi & Surasshu ft. Rebecca Sugar",
        "from": "Steven Universe",
        "reference": "https://www.youtube.com/watch?v=9vPYLsjVc-M",
        "performances": [
            {
                "concerts": [
                    10
                ],
                "performers": {
                    "4": [
                        13
                    ],
                    "5": [
                        3
                    ],
                    "7": [
                        64
                    ],
                    "8": [
                        57
                    ],
                    "14": [
                        60
                    ]
                },
                "songType": "Small"
            }
        ]
    },
    {
        "id": 65,
        "name": "Autumn Leaves",
        "composer": "Joseph Kosma",
        "performances": [
            {
                "concerts": [
                    10
                ],
                "performers": {
                    "4": [
                        46
                    ],
                    "5": [
                        66
                    ],
                    "7": [
                        64
                    ],
                    "13": [
                        3
                    ],
                    "14": [
                        60
                    ],
                    "27": [
                        27,
                        48
                    ]
                },
                "songType": "Small"
            }
        ]
    },
    {
        "id": 66,
        "name": "Suzume",
        "composer": "Radwimps & Kazuma Jinnouchi ft. Toaka",
        "from": "Suzume",
        "mediaOrigin": "Anime",
        "reference": "https://www.youtube.com/watch?v=Xs0Lxif1u9E",
        "performances": [
            {
                "concerts": [
                    10
                ],
                "performers": {
                    "4": [
                        42
                    ],
                    "5": [
                        28
                    ],
                    "17": [
                        13,
                        50,
                        12,
                        49
                    ]
                },
                "arranger": [
                    9
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "id": 67,
        "name": "Pokemon Wielder Volo",
        "composer": "Go Ichinose, Hitomi Sato & Hiromitsu Maeba",
        "from": "Pokemon Legends: Arceus",
        "mediaOrigin": "Video Game",
        "reference": "https://www.youtube.com/watch?v=0yqm7vrCp-g&t=7s",
        "performances": [
            {
                "concerts": [
                    10
                ],
                "performers": {
                    "5": [
                        36,
                        28
                    ],
                    "13": [
                        46
                    ],
                    "17": [
                        13,
                        50,
                        12,
                        49
                    ],
                    "21": [
                        9
                    ]
                },
                "arranger": [
                    9
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "id": 68,
        "name": "Parfum d'étoiles",
        "composer": "Ichiko Aoba",
        "reference": "https://www.youtube.com/channel/UCcwOodzn176V5S11rufTUgA",
        "performances": [
            {
                "concerts": [
                    10
                ],
                "performers": {
                    "5": [
                        46
                    ],
                    "17": [
                        13,
                        50,
                        12,
                        49
                    ],
                    "21": [
                        9
                    ]
                },
                "arranger": [
                    9
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "id": 69,
        "name": "Sanctuary Suite",
        "composer": "Toby Fox",
        "from": "Deltarune",
        "mediaOrigin": "Video Game",
        "reference": "https://www.youtube.com/watch?v=cNG0Ay3B3Mk, https://www.youtube.com/watch?v=7f1RK1m7qvc",
        "performances": [
            {
                "concerts": [
                    10
                ],
                "performers": {
                    "5": [
                        36
                    ],
                    "7": [
                        64
                    ],
                    "14": [
                        60
                    ],
                    "17": [
                        13,
                        50,
                        12,
                        48,
                        2
                    ],
                    "21": [
                        9
                    ],
                    "27": [
                        11
                    ]
                },
                "arranger": [
                    9
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "id": 70,
        "name": "Sayonara, Mata Itsuka!",
        "composer": "Kenshi Yonezu",
        "from": "The Tiger and Her Wings",
        "reference": "https://www.youtube.com/watch?v=-wb2PAx6aEs",
        "performances": [
            {
                "concerts": [
                    10
                ],
                "performers": {
                    "4": [
                        41
                    ],
                    "5": [
                        28
                    ],
                    "7": [
                        64
                    ],
                    "14": [
                        60
                    ],
                    "17": [
                        13,
                        12,
                        48
                    ],
                    "21": [
                        9
                    ]
                },
                "arranger": [
                    9
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "id": 71,
        "name": "Snow Halation",
        "composer": "μ's",
        "from": "Love Live! School Idol Project",
        "mediaOrigin": "Anime",
        "reference": "https://www.youtube.com/watch?v=OzGVz1ClxIc, https://www.youtube.com/watch?v=Z4KmL4KI0cQ",
        "performances": [
            {
                "concerts": [
                    10
                ],
                "performers": {
                    "5": [
                        28
                    ]
                },
                "arranger": [
                    "Animenz"
                ],
                "sheetMusic": "#",
                "songType": "Small"
            }
        ]
    },
    {
        "id": 72,
        "name": "Taidada",
        "composer": "Zutomayo",
        "from": "Dandadan",
        "mediaOrigin": "Anime",
        "reference": "https://www.youtube.com/watch?v=IeyCdm9WwXM",
        "performances": [
            {
                "concerts": [
                    10
                ],
                "performers": {
                    "4": [
                        44,
                        39
                    ],
                    "5": [
                        36
                    ],
                    "7": [
                        64
                    ],
                    "14": [
                        25
                    ],
                    "16": [
                        57
                    ],
                    "17": [
                        13
                    ],
                    "27": [
                        27
                    ],
                    "28": [
                        11
                    ],
                    "31": [
                        8
                    ],
                    "35": [
                        24,
                        35
                    ],
                    "36": [
                        10
                    ]
                },
                "arranger": [
                    2
                ],
                "sheetMusic": "#",
                "songType": "Large"
            }
        ]
    },
    {
        "id": 73,
        "name": "Hikaru Nara",
        "composer": "Goose House",
        "from": "Your Lie in April",
        "mediaOrigin": "Anime",
        "reference": "https://www.youtube.com/watch?v=c6rCRy6SrtU",
        "performances": [
            {
                "concerts": [
                    10
                ],
                "performers": {
                    "4": [
                        42,
                        40,
                        34,
                        39,
                        41,
                        44
                    ],
                    "5": [
                        38
                    ],
                    "7": [
                        64
                    ],
                    "8": [
                        8
                    ],
                    "14": [
                        45
                    ],
                    "16": [
                        57
                    ],
                    "17": [
                        47,
                        49,
                        12,
                        50,
                        2
                    ],
                    "25": [
                        27,
                        51
                    ],
                    "28": [
                        11
                    ],
                    "31": [
                        22
                    ],
                    "35": [
                        35,
                        24
                    ],
                    "36": [
                        10,
                        53
                    ]
                },
                "arranger": [
                    9
                ],
                "sheetMusic": "#",
                "songType": "Large"
            }
        ]
    },
    {
        "id": 74,
        "name": "Misty",
        "composer": "Erroll Garner",
        "performances": [
            {
                "concerts": [
                    13
                ],
                "performers": {
                    "4": [
                        ""
                    ],
                    "5": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "14": [
                        ""
                    ],
                    "27": [
                        ""
                    ]
                },
                "group": "LMC Jazz Group",
                "songType": "Small"
            }
        ]
    },
    {
        "id": 75,
        "name": "Mr. Eclectic",
        "composer": "Laufey",
        "performances": [
            {
                "concerts": [
                    13
                ],
                "performers": {
                    "4": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "8": [
                        ""
                    ],
                    "14": [
                        ""
                    ]
                },
                "group": "LMC Jazz Group",
                "songType": "Small"
            }
        ]
    },
    {
        "id": 76,
        "name": "Isn't She Lovely",
        "composer": "Stevie Wonder",
        "performances": [
            {
                "concerts": [
                    13
                ],
                "performers": {
                    "4": [
                        ""
                    ],
                    "5": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "13": [
                        ""
                    ],
                    "14": [
                        ""
                    ],
                    "27": [
                        ""
                    ]
                },
                "group": "LMC Jazz Group",
                "songType": "Small"
            }
        ]
    },
    {
        "id": 77,
        "name": "Hit the Road Jack",
        "composer": "Ray Charles",
        "performances": [
            {
                "concerts": [
                    13
                ],
                "performers": {
                    "4": [
                        ""
                    ],
                    "5": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "13": [
                        ""
                    ],
                    "14": [
                        ""
                    ]
                },
                "arranger": [
                    3
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "id": 78,
        "name": "September",
        "composer": "Earth, Wind & Fire",
        "performances": [
            {
                "concerts": [
                    13
                ],
                "performers": {
                    "4": [
                        "Alice",
                        "Emily",
                        "Fiona",
                        "Nicholas",
                        "Gabriel",
                        "David",
                        "Bernice",
                        "Juliana",
                        "Emiri"
                    ]
                },
                "group": "New Resonance Choir",
                "songType": "External"
            }
        ]
    },
    {
        "id": 79,
        "name": "Somewhere Only We Know",
        "composer": "Keane",
        "performances": [
            {
                "concerts": [
                    13
                ],
                "performers": {
                    "4": [
                        "Alice",
                        "Emily",
                        "Fiona",
                        "Nicholas",
                        "Gabriel",
                        "David",
                        "Bernice",
                        "Juliana",
                        "Emiri"
                    ]
                },
                "group": "New Resonance Choir",
                "songType": "External"
            }
        ]
    },
    {
        "id": 80,
        "name": "What It Sounds Like",
        "composer": "HUNTR/X",
        "from": "KPop Demon Hunters",
        "performances": [
            {
                "concerts": [
                    13
                ],
                "performers": {
                    "4": [
                        "Alice",
                        "Emily",
                        "Fiona"
                    ]
                },
                "group": "New Resonance Choir",
                "songType": "External"
            }
        ]
    },
    {
        "id": 81,
        "name": "Landslide (Tiny Habits ver.)",
        "composer": "Fleetwood Mac",
        "performances": [
            {
                "concerts": [
                    13
                ],
                "performers": {
                    "4": [
                        "Nicholas",
                        "Gabriel",
                        "David",
                        "Bernice",
                        "Juliana",
                        "Emiri"
                    ]
                },
                "group": "New Resonance Choir",
                "songType": "External"
            }
        ]
    },
    {
        "id": 82,
        "name": "Layla",
        "composer": "Yostudomenoddy",
        "performances": [
            {
                "concerts": [
                    13,
                    14
                ],
                "performers": {
                    "4": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "13": [
                        ""
                    ],
                    "14": [
                        ""
                    ]
                },
                "group": "2group 2",
                "songType": "Small"
            }
        ]
    },
    {
        "id": 83,
        "name": "Iron Lotus",
        "composer": "Mili",
        "from": "Library of Ruina",
        "mediaOrigin": "Video Game",
        "performances": [
            {
                "concerts": [
                    13
                ],
                "performers": {
                    "4": [
                        ""
                    ],
                    "5": [
                        ""
                    ]
                },
                "songType": "Small"
            }
        ]
    },
    {
        "id": 84,
        "name": "Gone Angels",
        "composer": "Mili",
        "from": "Library of Ruina",
        "mediaOrigin": "Video Game",
        "performances": [
            {
                "concerts": [
                    13
                ],
                "performers": {
                    "4": [
                        ""
                    ],
                    "5": [
                        ""
                    ]
                },
                "songType": "Small"
            }
        ]
    },
    {
        "id": 85,
        "name": "Concerto 1",
        "composer": "Peter Wang (Original Piece)",
        "performances": [
            {
                "concerts": [
                    13
                ],
                "performers": {
                    "5": [
                        ""
                    ]
                },
                "songType": "Small"
            }
        ]
    },
    {
        "id": 86,
        "name": "Relationship",
        "composer": "Kent Watari",
        "from": "Link Click",
        "mediaOrigin": "Anime",
        "performances": [
            {
                "concerts": [
                    13
                ],
                "performers": {
                    "5": [
                        ""
                    ],
                    "17": [
                        ""
                    ],
                    "25": [
                        ""
                    ],
                    "36": [
                        ""
                    ]
                },
                "arranger": [
                    27
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "id": 87,
        "name": "Isabella's Lullaby",
        "composer": "Takahiro Obata",
        "from": "The Promised Neverland",
        "mediaOrigin": "Anime",
        "performances": [
            {
                "concerts": [
                    13
                ],
                "performers": {
                    "4": [
                        ""
                    ],
                    "5": [
                        ""
                    ],
                    "17": [
                        ""
                    ],
                    "25": [
                        ""
                    ]
                },
                "arranger": [
                    27
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "id": 88,
        "name": "ODDS&ENDS",
        "composer": "ryo (supercell) ft. Hatsune Miku",
        "mediaOrigin": "Vocaloid",
        "performances": [
            {
                "concerts": [
                    13
                ],
                "performers": {
                    "4": [
                        ""
                    ],
                    "5": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "13": [
                        ""
                    ],
                    "14": [
                        ""
                    ]
                },
                "group": "39!",
                "songType": "Small"
            }
        ]
    },
    {
        "id": 89,
        "name": "Moonsetter",
        "composer": "Toby Fox",
        "from": "Homestuck",
        "performances": [
            {
                "concerts": [
                    13
                ],
                "performers": {
                    "5": [
                        ""
                    ],
                    "17": [
                        ""
                    ],
                    "25": [
                        ""
                    ]
                },
                "arranger": [
                    9
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "id": 90,
        "name": "Yuri on Ice",
        "composer": "Taro Umebayashi",
        "from": "Yuri!!! on ICE",
        "mediaOrigin": "Anime",
        "performances": [
            {
                "concerts": [
                    13
                ],
                "performers": {
                    "5": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "17": [
                        ""
                    ],
                    "21": [
                        ""
                    ],
                    "25": [
                        ""
                    ]
                },
                "arranger": [
                    9
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "id": 91,
        "name": "Don't Say \"Lazy\"",
        "composer": "Ho-kago Tea Time",
        "from": "K-On!",
        "mediaOrigin": "Anime",
        "performances": [
            {
                "concerts": [
                    13
                ],
                "performers": {
                    "5": [
                        ""
                    ]
                },
                "songType": "Small"
            }
        ]
    },
    {
        "id": 92,
        "name": "Bartender",
        "composer": "Ngọt",
        "performances": [
            {
                "concerts": [
                    13
                ],
                "performers": {
                    "4": [
                        ""
                    ],
                    "5": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "13": [
                        ""
                    ],
                    "14": [
                        ""
                    ]
                },
                "group": "Super Sentai",
                "songType": "Small"
            }
        ]
    },
    {
        "id": 93,
        "name": "Mất Tích",
        "composer": "Ngọt",
        "performances": [
            {
                "concerts": [
                    13
                ],
                "performers": {
                    "4": [
                        ""
                    ],
                    "5": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "13": [
                        ""
                    ],
                    "14": [
                        ""
                    ]
                },
                "group": "Super Sentai",
                "songType": "Small"
            }
        ]
    },
    {
        "id": 94,
        "name": "Mơ Làm Ma",
        "composer": "Ngọt ft. Thỏ Traum",
        "performances": [
            {
                "concerts": [
                    13
                ],
                "performers": {
                    "4": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "13": [
                        ""
                    ],
                    "14": [
                        ""
                    ]
                },
                "group": "Super Sentai",
                "songType": "Small"
            }
        ]
    },
    {
        "id": 95,
        "name": "Fukashigi no Carte",
        "composer": "Kubo Yurika, Minase Inori, Seto Asami, Tanezaki Atsumi, Touyama Nao, & Uchida Maaya",
        "from": "Rascal Does Not Dream of Bunny Girl Senpai",
        "mediaOrigin": "Anime",
        "performances": [
            {
                "concerts": [
                    14
                ],
                "performers": {
                    "1": [
                        39
                    ],
                    "4": [
                        40,
                        34,
                        41,
                        73,
                        11,
                        42
                    ],
                    "5": [
                        36
                    ],
                    "7": [
                        70
                    ],
                    "14": [
                        45
                    ],
                    "17": [
                        2,
                        47,
                        67
                    ],
                    "25": [
                        51
                    ],
                    "36": [
                        53
                    ]
                },
                "arranger": [
                    3
                ],
                "songType": "Large"
            }
        ]
    },
    {
        "id": 96,
        "name": "Sugar Song to Bitter Step",
        "composer": "Unison Square Garden",
        "from": "Kekkai Sensen",
        "mediaOrigin": "Anime",
        "performances": [
            {
                "concerts": [
                    14
                ],
                "performers": {
                    "4": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "13": [
                        ""
                    ],
                    "14": [
                        ""
                    ]
                },
                "songType": "Small"
            }
        ]
    },
    {
        "id": 97,
        "name": "In the Pool",
        "composer": "Kensuke Ushio",
        "from": "Chainsaw Man Movie: Reze Arc",
        "mediaOrigin": "Anime",
        "performances": [
            {
                "concerts": [
                    14
                ],
                "performers": {
                    "5": [
                        ""
                    ]
                },
                "songType": "Small"
            }
        ]
    },
    {
        "id": 98,
        "name": "Dawn in the Adan",
        "composer": "Ichiko Aoba",
        "performances": [
            {
                "concerts": [
                    14
                ],
                "performers": {
                    "4": [
                        ""
                    ],
                    "5": [
                        ""
                    ],
                    "13": [
                        ""
                    ]
                },
                "group": "Bows 4 Belts",
                "songType": "Small"
            }
        ]
    },
    {
        "id": 99,
        "name": "Scarz",
        "composer": "Novulent",
        "performances": [
            {
                "concerts": [
                    14
                ],
                "performers": {
                    "4": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "13": [
                        ""
                    ],
                    "14": [
                        ""
                    ]
                },
                "group": "Bows 4 Belts",
                "songType": "Small"
            }
        ]
    },
    {
        "id": 100,
        "name": "Shinzō wo Sasageyo!",
        "composer": "Linked Horizon",
        "from": "Attack on Titan",
        "mediaOrigin": "Anime",
        "performances": [
            {
                "concerts": [
                    14
                ],
                "performers": {
                    "4": [
                        ""
                    ],
                    "5": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "13": [
                        ""
                    ],
                    "14": [
                        ""
                    ],
                    "17": [
                        ""
                    ],
                    "27": [
                        ""
                    ],
                    "35": [
                        ""
                    ],
                    "36": [
                        ""
                    ]
                },
                "arranger": [
                    27,
                    77
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "id": 101,
        "name": "That's Why I Quit Music",
        "composer": "Yorushika",
        "performances": [
            {
                "concerts": [
                    14
                ],
                "performers": {
                    "4": [
                        ""
                    ],
                    "5": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "13": [
                        ""
                    ],
                    "14": [
                        ""
                    ]
                },
                "songType": "Small"
            }
        ]
    },
    {
        "id": 102,
        "name": "Itte",
        "composer": "Yorushika",
        "performances": [
            {
                "concerts": [
                    14
                ],
                "performers": {
                    "4": [
                        ""
                    ],
                    "5": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "13": [
                        ""
                    ],
                    "14": [
                        ""
                    ]
                },
                "songType": "Small"
            }
        ]
    },
    {
        "id": 103,
        "name": "Delfino Plaza (French Jazz ver.)",
        "composer": "Koji Kondo",
        "from": "Super Mario Sunshine",
        "mediaOrigin": "Video Game",
        "performances": [
            {
                "concerts": [
                    14
                ],
                "performers": {
                    "0": [
                        ""
                    ],
                    "5": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "8": [
                        ""
                    ],
                    "14": [
                        ""
                    ],
                    "17": [
                        ""
                    ],
                    "21": [
                        ""
                    ],
                    "27": [
                        ""
                    ],
                    "28": [
                        ""
                    ],
                    "35": [
                        ""
                    ],
                    "36": [
                        ""
                    ]
                },
                "arranger": [
                    "8-Bit Big Band"
                ],
                "group": "LMC Jazz Group",
                "songType": "Small"
            }
        ]
    },
    {
        "id": 104,
        "name": "Jinsei wa Yume Darake (Ma Vie, Mes Rêves)",
        "composer": "Sheena Ringo",
        "performances": [
            {
                "concerts": [
                    14
                ],
                "performers": {
                    "4": [
                        ""
                    ],
                    "5": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "14": [
                        ""
                    ],
                    "17": [
                        ""
                    ],
                    "21": [
                        ""
                    ],
                    "27": [
                        ""
                    ],
                    "28": [
                        ""
                    ],
                    "35": [
                        ""
                    ],
                    "36": [
                        ""
                    ]
                },
                "arranger": [
                    3
                ],
                "group": "LMC Jazz Group",
                "songType": "Small"
            }
        ]
    },
    {
        "id": 105,
        "name": "Jump Up, Superstar!",
        "composer": "Naoto Kubo",
        "from": "Super Mario Odyssey",
        "mediaOrigin": "Video Game",
        "performances": [
            {
                "concerts": [
                    14
                ],
                "performers": {
                    "4": [
                        ""
                    ],
                    "5": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "13": [
                        ""
                    ],
                    "14": [
                        ""
                    ],
                    "21": [
                        ""
                    ],
                    "27": [
                        ""
                    ],
                    "28": [
                        ""
                    ],
                    "35": [
                        ""
                    ],
                    "36": [
                        ""
                    ]
                },
                "arranger": [
                    "Brandon Douglas"
                ],
                "group": "LMC Jazz Group",
                "songType": "Small"
            }
        ]
    },
    {
        "id": 106,
        "name": "Last Stardust",
        "composer": "Aimer",
        "from": "Fate/Stay Night: Unlimited Blade Works",
        "mediaOrigin": "Anime",
        "performances": [
            {
                "concerts": [
                    14
                ],
                "performers": {
                    "4": [
                        ""
                    ],
                    "5": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "13": [
                        ""
                    ],
                    "14": [
                        ""
                    ]
                },
                "songType": "Small"
            }
        ]
    },
    {
        "id": 107,
        "name": "Love Trial",
        "composer": "40mP ft. Hatsune Miku",
        "mediaOrigin": "Vocaloid",
        "performances": [
            {
                "concerts": [
                    14
                ],
                "performers": {
                    "4": [
                        ""
                    ],
                    "5": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "13": [
                        ""
                    ],
                    "14": [
                        ""
                    ]
                },
                "songType": "Small"
            }
        ]
    },
    {
        "id": 108,
        "name": "Fuyu no Hanashi",
        "composer": "centimillimental",
        "from": "Given",
        "mediaOrigin": "Anime",
        "performances": [
            {
                "concerts": [
                    14
                ],
                "performers": {
                    "4": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "13": [
                        ""
                    ],
                    "14": [
                        ""
                    ]
                },
                "songType": "Small"
            }
        ]
    },
    {
        "id": 109,
        "name": "Theme of Stone Ocean (Jolyne's Theme)",
        "composer": "Yugo Kanno",
        "from": "Jojo's Bizarre Adventure",
        "mediaOrigin": "Anime",
        "performances": [
            {
                "concerts": [
                    14
                ],
                "performers": {
                    "4": [
                        ""
                    ],
                    "5": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "13": [
                        ""
                    ],
                    "14": [
                        ""
                    ],
                    "17": [
                        ""
                    ],
                    "25": [
                        ""
                    ],
                    "27": [
                        ""
                    ],
                    "28": [
                        ""
                    ],
                    "35": [
                        ""
                    ],
                    "36": [
                        ""
                    ]
                },
                "arranger": [
                    27
                ],
                "songType": "Large"
            }
        ]
    },
    {
        "id": 110,
        "name": "I Am Gonna Claw (Out Your Eyes Then Drown You To Death)",
        "composer": "Darren Korb",
        "from": "Hades II",
        "mediaOrigin": "Video Game",
        "performances": [
            {
                "concerts": [
                    14
                ],
                "performers": {
                    "4": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "13": [
                        ""
                    ],
                    "14": [
                        ""
                    ],
                    "36": [
                        ""
                    ]
                },
                "songType": "Small"
            }
        ]
    },
    {
        "id": 111,
        "name": "Plastic Love",
        "composer": "Mariya Takeuchi",
        "performances": [
            {
                "concerts": [
                    14
                ],
                "performers": {
                    "4": [
                        46,
                        34,
                        45,
                        40
                    ],
                    "5": [
                        29
                    ],
                    "7": [
                        71
                    ],
                    "14": [
                        8
                    ],
                    "16": [
                        58
                    ],
                    "17": [
                        2,
                        13
                    ],
                    "25": [
                        11
                    ],
                    "27": [
                        48
                    ],
                    "28": [
                        69
                    ],
                    "31": [
                        59
                    ],
                    "35": [
                        35
                    ]
                },
                "arranger": [
                    9
                ],
                "songType": "Large"
            }
        ]
    },
    {
        "id": 112,
        "name": "Wii Sports Resort Main Theme",
        "composer": "Ryo Nagamatsu",
        "from": "Wii Sports Resort",
        "mediaOrigin": "Video Game",
        "performances": [
            {
                "concerts": [
                    14
                ],
                "performers": {
                    "5": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "9": [
                        ""
                    ],
                    "13": [
                        ""
                    ],
                    "14": [
                        ""
                    ],
                    "17": [
                        ""
                    ],
                    "21": [
                        ""
                    ],
                    "27": [
                        ""
                    ],
                    "35": [
                        ""
                    ],
                    "36": [
                        ""
                    ]
                },
                "arranger": [
                    13
                ],
                "songType": "Large"
            }
        ]
    },
    {
        "id": 113,
        "name": "Battle!!",
        "composer": "Kenji Hiramatsu",
        "from": "Xenoblade Chronicles 2: Torna ~ The Golden Country",
        "mediaOrigin": "Video Game",
        "performances": [
            {
                "concerts": [
                    14
                ],
                "performers": {
                    "5": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "14": [
                        ""
                    ],
                    "17": [
                        ""
                    ],
                    "21": [
                        ""
                    ],
                    "25": [
                        ""
                    ],
                    "28": [
                        ""
                    ]
                },
                "arranger": [
                    9
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "id": 114,
        "name": "Mechonis Field",
        "composer": "ACE+",
        "from": "Xenoblade Chronicles",
        "mediaOrigin": "Video Game",
        "performances": [
            {
                "concerts": [
                    14
                ],
                "performers": {
                    "5": [
                        ""
                    ],
                    "33": [
                        ""
                    ]
                },
                "arranger": [
                    9
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "id": 115,
        "name": "Rogueport",
        "composer": "Yuka Tsujiyoko & Yoshito Sekigawa",
        "from": "Paper Mario: The Thousand-Year Door",
        "mediaOrigin": "Video Game",
        "performances": [
            {
                "concerts": [
                    14
                ],
                "performers": {
                    "2": [
                        ""
                    ],
                    "5": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "15": [
                        ""
                    ],
                    "17": [
                        ""
                    ],
                    "21": [
                        ""
                    ],
                    "25": [
                        ""
                    ],
                    "27": [
                        ""
                    ],
                    "28": [
                        ""
                    ],
                    "32": [
                        ""
                    ],
                    "33": [
                        ""
                    ],
                    "34": [
                        ""
                    ],
                    "35": [
                        ""
                    ]
                },
                "arranger": [
                    9
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "id": 116,
        "name": "Remedy (Metal ver.)",
        "composer": "DYLZAL",
        "from": "Undertale Yellow",
        "mediaOrigin": "Video Game",
        "performances": [
            {
                "concerts": [
                    14
                ],
                "performers": {
                    "5": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "13": [
                        ""
                    ],
                    "14": [
                        ""
                    ],
                    "17": [
                        ""
                    ]
                },
                "arranger": [
                    13
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "id": 117,
        "name": "Kẻ Thù",
        "composer": "Ngọt",
        "performances": [
            {
                "concerts": [
                    14
                ],
                "performers": {
                    "4": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "13": [
                        ""
                    ],
                    "14": [
                        ""
                    ]
                },
                "group": "Masters of Spinjitzu (Formerly Super Sentai)",
                "songType": "Small"
            }
        ]
    },
    {
        "id": 118,
        "name": "Kokudou Slope",
        "composer": "Kinoko Teikoku",
        "performances": [
            {
                "concerts": [
                    14
                ],
                "performers": {
                    "4": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "13": [
                        ""
                    ],
                    "14": [
                        ""
                    ]
                },
                "group": "2group 2",
                "songType": "Small"
            }
        ]
    },
    {
        "id": 119,
        "name": "Last Train at 25 O'Clock",
        "composer": "Lamp",
        "performances": [
            {
                "concerts": [
                    14
                ],
                "performers": {
                    "4": [
                        ""
                    ],
                    "5": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "13": [
                        ""
                    ],
                    "14": [
                        ""
                    ],
                    "17": [
                        ""
                    ],
                    "21": [
                        ""
                    ],
                    "27": [
                        ""
                    ],
                    "36": [
                        ""
                    ]
                },
                "songType": "Small"
            }
        ]
    },
    {
        "id": 120,
        "name": "Moudoku ga Osou",
        "composer": "Hifumi ft. Hatsune Miku",
        "mediaOrigin": "Vocaloid",
        "performances": [
            {
                "concerts": [
                    14
                ],
                "performers": {
                    "4": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "13": [
                        ""
                    ],
                    "14": [
                        ""
                    ]
                },
                "songType": "Small"
            }
        ]
    },
    {
        "id": 121,
        "name": "Aishite Aishite Aishite",
        "composer": "Kikuo ft. Hatsune Miku",
        "mediaOrigin": "Vocaloid",
        "performances": [
            {
                "concerts": [
                    14
                ],
                "performers": {
                    "4": [
                        39,
                        46
                    ],
                    "5": [
                        28
                    ],
                    "7": [
                        64
                    ],
                    "13": [
                        22
                    ],
                    "14": [
                        60
                    ],
                    "17": [
                        12,
                        47,
                        67,
                        2
                    ],
                    "21": [
                        69
                    ],
                    "25": [
                        48,
                        11
                    ],
                    "27": [
                        27,
                        51
                    ],
                    "35": [
                        24,
                        35
                    ],
                    "36": [
                        10
                    ]
                },
                "arranger": [
                    2
                ],
                "songType": "Large"
            }
        ]
    },
    {
        "id": 122,
        "name": "The Rumbling",
        "composer": "SiM",
        "from": "Attack on Titan",
        "mediaOrigin": "Anime",
        "performances": [
            {
                "concerts": [
                    14
                ],
                "performers": {
                    "4": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "13": [
                        ""
                    ],
                    "14": [
                        ""
                    ],
                    "17": [
                        ""
                    ]
                },
                "songType": "Small"
            }
        ]
    },
    {
        "id": 123,
        "name": "Ai Scream!",
        "composer": "Ai Furihata, Aguri Ōnishi, & Wakana Okuma",
        "from": "Love Live!",
        "mediaOrigin": "Anime",
        "performances": [
            {
                "concerts": [
                    14
                ],
                "performers": {
                    "4": [
                        ""
                    ],
                    "5": [
                        ""
                    ],
                    "7": [
                        ""
                    ],
                    "13": [
                        ""
                    ],
                    "14": [
                        ""
                    ],
                    "27": [
                        ""
                    ],
                    "35": [
                        ""
                    ]
                },
                "songType": "Small"
            }
        ]
    }
];

const EVENTS = [
    {
        "id": 0,
        "type": "External",
        "name": "Genshiken Festival 2024",
        "location": "",
        "description": "A one-day anime convention organized by students from a variety of Ontario University Anime Clubs",
        "date": "2024-03-23",
        "setlist": [
            3,
            4,
            5
        ]
    },
    {
        "id": 1,
        "type": "Concert",
        "name": "UT-SAMA 20th Anniversary Event",
        "location": "UTSU Student Commons",
        "description": "",
        "date": "2024-04-04",
        "video": "https://youtu.be/ob0COvRRvDI?si=C6Ghd22rm7d2FAtY",
        "setlist": [
            0,
            3,
            4,
            1,
            5,
            6,
            2,
            7,
            8,
            9,
            10
        ]
    },
    {
        "id": 2,
        "type": "Concert",
        "name": "October 2024 Concert",
        "location": "Cat's Eye",
        "description": "",
        "date": "2024-10-04",
        "time": "19:30-20:30",
        "video": "https://youtu.be/JtuPSpsSQYk?si=frbInyV_qx6DIKQc",
        "setlist": [
            3,
            9,
            4,
            0,
            5,
            6,
            1,
            11,
            8,
            2,
            10
        ]
    },
    {
        "id": 3,
        "type": "Concert",
        "name": "End of Fall 2024 Concert",
        "location": "Cat's Eye",
        "description": "",
        "date": "2025-01-24",
        "time": "19:00-20:30",
        "video": "https://youtu.be/TiStCNPn10s?si=oCxHak2aO2owo2Fh",
        "setlist": [
            13,
            21,
            11,
            20,
            14,
            17,
            16,
            19,
            3,
            4,
            22,
            18,
            23,
            24,
            15,
            25,
            26,
            27
        ]
    },
    {
        "id": 4,
        "type": "Workshop",
        "name": "Chord Theory Workshop 2025",
        "location": "",
        "description": "???",
        "date": "2025-02-13"
    },
    {
        "id": 5,
        "type": "Workshop",
        "name": "Music Production Workshop 2025",
        "location": "OISE 2279",
        "description": "???",
        "date": "2025-02-27"
    },
    {
        "id": 6,
        "type": "Other",
        "name": "Blind Test 2025",
        "location": "OISE C-154",
        "description": "???",
        "date": "2025-03-08",
        "video": "https://www.youtube.com/watch?v=0CJ_9BmtAXY"
    },
    {
        "id": 7,
        "type": "Concert",
        "name": "End of Winter 2025 Concert",
        "location": "OISE G-162",
        "description": "???",
        "date": "2025-04-07",
        "time": "19:00-20:30",
        "video": "https://youtu.be/k1CZLnxSWDc?si=bs4sXQO-8NfzL65J",
        "setlist": [
            [
                30,
                136
            ],
            [
                34,
                536
            ],
            [
                32,
                818
            ],
            [
                33,
                1062
            ],
            [
                35,
                1309
            ],
            [
                36,
                1544
            ],
            [
                37,
                1816
            ],
            [
                38,
                2214
            ],
            [
                39,
                2508
            ],
            [
                19,
                2769
            ],
            [
                40,
                3071
            ],
            [
                41,
                3330
            ],
            [
                42,
                3480
            ],
            [
                43,
                3698
            ],
            [
                44,
                4020
            ],
            [
                45,
                4341
            ],
            [
                46,
                4779
            ],
            [
                31,
                5154
            ],
            [
                47,
                5442
            ]
        ]
    },
    {
        "id": 8,
        "type": "Workshop",
        "name": "Arranging Workshop 2025",
        "location": "OISE C-154",
        "description": "???",
        "date": "2025-11-09"
    },
    {
        "id": 9,
        "type": "External",
        "name": "RCAG Studio Night 2025",
        "location": "",
        "description": "???",
        "date": "2025-11-13",
        "setlist": [
            50,
            51
        ]
    },
    {
        "id": 10,
        "type": "Concert",
        "name": "End of Fall 2025 Concert",
        "location": "OISE G-162",
        "description": "???",
        "date": "2025-11-29",
        "time": "18:00-21:00",
        "video": "https://youtu.be/wuObU4_nbtI?si=Mzomwl0pLPOMRzA-",
        "setlist": [
            [
                51,
                0
            ],
            [
                52,
                244
            ],
            [
                53,
                556
            ],
            [
                54,
                839
            ],
            [
                55,
                1096
            ],
            [
                56,
                1262
            ],
            [
                57,
                1426
            ],
            [
                58,
                1658
            ],
            [
                59,
                1923
            ],
            [
                60,
                2095
            ],
            [
                61,
                2327
            ],
            [
                62,
                2743
            ],
            [
                63,
                3025
            ],
            [
                64,
                3249
            ],
            [
                50,
                3390
            ],
            [
                65,
                3574
            ],
            [
                66,
                3863
            ],
            [
                67,
                4105
            ],
            [
                68,
                4280
            ],
            [
                69,
                4434
            ],
            [
                70,
                4892
            ],
            [
                71,
                5087
            ],
            [
                72,
                5392
            ],
            [
                73,
                5616
            ]
        ]
    },
    {
        "id": 11,
        "type": "External",
        "name": "Hemoglobal Connect Benefit Concert 2026",
        "location": "Trinity-St. Paul's United Church",
        "description": "???",
        "date": "2026-01-23",
        "time": "18:00-20:00"
    },
    {
        "id": 12,
        "type": "Workshop",
        "name": "Sound Equipment Workshop 2026",
        "location": "OISE 5240",
        "description": "???",
        "date": "2026-01-30",
        "time": "16:30-??:??",
        "gallery": "https://drive.google.com/drive/u/1/folders/17TCYimDsYM7geN6iW4BXvJzsWnKGCPMv"
    },
    {
        "id": 13,
        "type": "Concert",
        "name": "Tunes & Treats 2026 Concert",
        "location": "OISE C-154",
        "description": "???",
        "date": "2026-03-06",
        "time": "18:00-21:00",
        "setlist": [
            74,
            75,
            76,
            77,
            78,
            79,
            80,
            81,
            52,
            82,
            83,
            84,
            85,
            86,
            87,
            88,
            89,
            90,
            91,
            92,
            93,
            94
        ]
    },
    {
        "id": 14,
        "type": "Concert",
        "name": "Succession 2026 Concert",
        "location": "OISE G-162",
        "description": "???",
        "date": "2026-04-05",
        "time": "13:00-20:00",
        "setlist": [
            95,
            96,
            97,
            98,
            99,
            100,
            101,
            102,
            103,
            104,
            105,
            106,
            107,
            108,
            109,
            110,
            111,
            112,
            113,
            114,
            115,
            116,
            117,
            82,
            118,
            119,
            120,
            121,
            122,
            123
        ]
    }
];

const FAQ = [
    {
        q: 'Is LMC only for University of Toronto students?',
        a: [
            'No. While most LMC members are UofT St. George students, individuals of any background are free to join as long as they can physically play with us. Members unable to commute to campus are encouraged to participate online through online events and recording projects, which we upload to our YouTube channel.'
        ]
    },
    {
        q: 'Does it cost money to join LMC? Do I need to join UT-SAMA to join LMC?',
        a: [
            'It is free to join and attend LMC rehearsals and smaller events like workshops; however, performing at an LMC-organized concert requires purchasing a UT-SAMA membership. This fee helps us cover venue costs and rent equipment like microphones, cables, and mixers.',
            'You can find more information on UT-SAMA membership costs and perks [here](https://docs.google.com/document/d/1iVwZj_iTLKUyEsz1Sg3CfRNYWkqG4CtydlkU-SGI_Zs/edit?tab=t.0). LMC operates independently from UT-SAMA so you do not have to interact with the main club even as a UT-SAMA member.'
        ]
    },
    {
        q: 'When and where is LMC active? When can I join?',
        a: [
            `LMC operates during UofT's fall and winter semesters (September to April) at the St. George campus. The best way to get a feel for the club is at the University [club fair](https://www.utsu.ca/orientation/) every August or during our first meeting of the term (typically in early September/January), where instructions for signup will be shown.`,
            `Joining at other times is allowed but it comes with less time and opportunities to form/join ensembles and rehearse for concerts. Signups for some songs may also close.`,
        ]
    },
    {
        q: 'Are there auditions? Do I need to be skilled with an instrument?',
        a: [
            'No. People of any skill level are welcome in LMC as long as they are motivated to play music with others. However, LMC will not teach you to how to play your instrument, so you are expected to learn your own parts.',
            'LMC-coordinated music ("large ensembles") is open to everyone but signups close quickly to allow rehearsals to begin promptly. Skill requirements vary per song: it is highly encouraged to talk to large ensemble leads about part difficulty if you’re interested. Smaller ensembles headed by individual members may accept new members at their own discretion.'
        ]
    },
    {
        q: 'Does LMC provide instruments or musical equipment?',
        a: [
            'By default, LMC rehearses in practice spaces with at least one piano. The only equipment that the club actually owns is one microphone; most equipment is generously lent to us by several members for the academic year. We try to have at least one drum kit, amps, and cables available, but please ask the current LMC execs about club inventory.',
            'LMC does not own music stands or spare instruments.',
            'If you would like to keep some equipment in a secure space on campus, please also reach out to one of the LMC Execs.'
        ]
    },
    {
        q: 'How much time would I be expected to commit to LMC?',
        a: [
            "Your expected time commitment depends on your skill level as well as the number of songs you choose to participate in. Different groups will form their own rehearsal schedules and expectations.",
            "If you participate in large ensemble rehearsals, you'll be expected to attend all rehearsals (~1 hour every 2 weeks per song, plus potential dress rehearsals) or at least be able to perfectly play your part. On the other hand, online recording projects are easiest on time commitment since there are no deadlines."
        ]
    },
    {
        q: 'What are the logistics of live rehearsals and recording projects?',
        a: [
            'Large ensemble songs are suggested and voted by LMC members, then decided and arranged at the beginning of the fall/winter semester. People are assigned to songs based on preference and attend weekly rehearsals. Concerts for large ensembles are held at the end of the academic term before exams start.',
            'Interest for small ensemble songs, either for live performances or for recording, is found in the Discord server at #light-music-club-forum. Members may also reach out to each other via DMs or in-person. An ensemble head is assigned to coordinates with the execs to schedule rehearsals, plan concert appearances, create arrangements, find video editors, etc.',
        ]
    },
    {
        q: 'What sorts of club activities does LMC organize?',
        a: [
            'LMC has historically organized workshops, such as for teaching music theory and music production, as well as karaokes, sight-reading challenges, and dinners. We are always open to suggestions for future event ideas!',
        ]
    },
    {
        q: 'I compose/arrange music. Can LMC play my piece?',
        a: [
            "LMC is always looking for people who can arrange music! We are happy to help arrangers find willing performers for their music, but in return we ask that they help with arranging large ensemble pieces if needed.",
            "Composed music has been played at LMC before and is welcome. However, you should consider how thematically similar your music is to typical LMC genres, as it would be performed in a LMC concert.",
        ]
    },
    {
        q: "I don't play an instrument (or don't want to), but I can do XXX. Can I still join?",
        a: [
            "LMC has an acute supply of arrangers, illustrators, audio mixers/engineers, video editors, web developers, and photographers. If you have any of these skillsets, we’d be very happy to work with you! If you think you could contribute to LMC in any other way, please let the LMC execs know.",
            "On the music side, LMC has historically suffered from lack of tenor/bass instruments like violas, cellos, bassoons, and trombones. Any players are highly-encouraged to join us."
        ]
    },
];

const FORM_LINKS = {
    // 'song-suggestion': '',
    // 'song-voting': '',
    // 'ideas-and-feedback': '',
    // 'small-ensemble-registration': '',
    // 'equipment-or-room-requests': '',
    // 'online-project-assistance': '',
    // 'new-member-registration': 'https://docs.google.com/forms/d/e/1FAIpQLSfNEoh9rA4vCyZd9dz-yV35tpFnqDVq3yWQvJjz0NlGMqZ9-Q/viewform'
};

const EMBED_LINKS = {
    'embed-calendar': 'https://calendar.google.com/calendar/embed?src=utsama.lightmusicclub%40gmail.com&ctz=America%2FToronto',

};

const CAROUSEL = [
    {
        url: 'assets/images/carousel 2025-04.webp',
        caption: 'End of Winter <br> Concert <b>2025/04</b>',
        yLims: [300, 1300],
        captionXPosition: '60%',
        captionRight: true,
        captionTopOnMobile: true,
        width: 3171,
        height: 1524
    },
    {
        url: 'assets/images/carousel 2026-04.webp',
        caption: 'Tunes & Treats <br> <b>2026/04</b>',
        yLims: [250, 1150],
        captionXPosition: '70%',
        captionRight: false,
        captionTopOnMobile: true,
        width: 2400,
        height: 1350
    },
    {
        url: 'assets/images/carousel 2025-01.webp',
        caption: 'End of Fall <br> Concert <b>2025/01</b>',
        yLims: [400, 1300],
        captionXPosition: '40%',
        captionRight: true,
        captionTopOnMobile: true,
        width: 2520,
        height: 1418
    },
];
