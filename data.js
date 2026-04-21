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
    'piano': 'rgb(255, 255, 255)',
    'drums': 'rgb(255, 255, 255)',
    
    'trumpet': 'linear-gradient(to right in oklab, rgb(255, 255, 110), rgb(255, 240, 160))',
    'trombone': 'linear-gradient(to right in oklab, rgb(255, 255, 110), rgb(255, 240, 160))',
    
    'violin': 'rgb(230, 130, 50)',
    'cello': 'rgb(230, 130, 50)',
    'double bass': 'rgb(230, 130, 50)',

    'piccolo': 'rgb(180, 180, 180)',
    'recorder': 'rgb(180, 180, 180)',
    'flute': 'rgb(180, 180, 180)',
    'oboe': 'linear-gradient(to right in oklab, rgb(50, 50, 50), rgb(40, 60, 50))',
    'clarinet': 'linear-gradient(to right in oklab, rgb(50, 50, 50), rgb(40, 60, 50))',
    'bass clarinet': 'linear-gradient(to right in oklab, rgb(50, 50, 50), rgb(40, 60, 50))',
    'alto saxophone': 'rgb(220, 190, 70)',
    'tenor saxophone': 'rgb(220, 190, 70)',
    'baritone saxophone': 'rgb(220, 190, 70)',
}

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
}

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
]

const MEMBERS = [
    {
        "id": 0,
        "name": "Stone",
        "joined": "Fall 2023",
        "left": "Fall 2024",
        "instruments": [
            "Drums",
            "Piano",
            "Bass Guitar",
            "Electric Guitar",
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
            "Piano",
            "Voice",
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
            "Piano",
            "Voice",
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
            "Piano",
            "Voice",
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
            "Drums",
            "Voice"
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
        "name": "Dimmy ",
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
            "Piano",
            "Voice",
            "Acoustic Guitar",
            "Bass Guitar",
            "Electric Guitar"
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
            "Trombone",
            "Trumpet"
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
            "Piano",
            "Voice",
            "Ukulele",
            "Clarinet",
            "Alto Saxophone",
            "Baritone Saxophone",
            "Tenor Saxophone"
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
            "Piano",
            "Voice",
            "Electric Guitar",
            "Violin"
        ],
        "roles": [
            "Arranger",
            "OG"
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
            "Drums",
            "Piano",
            "Voice",
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
            "Bass Guitar",
            "Electric Guitar",
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
            "Piano",
            "Voice"
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
            "Violin",
            "Vocals"
        ],
        "roles": [],
        "links": {}
    },
    {
        "id": 32,
        "name": "Yuki ",
        "joined": "Fall 2024",
        "left": "Fall 2024",
        "instruments": [
            "Clarinet",
            "Piano/Keyboard"
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
            "Bass Guitar",
            "Electric Guitar"
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
            "Bass Guitar",
            "Electric Guitar"
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
            "Piano",
            "Voice"
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
            "Piano",
            "Voice",
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
            "Piano",
            "Voice",
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
            "Piano",
            "Voice",
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
            "Drums",
            "Piano",
            "Voice",
            "Bass Guitar",
            "Electric Guitar",
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
            "Piano",
            "Voice",
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
            "Piano",
            "Voice",
            "Bass Guitar",
            "Electric Guitar",
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
            "Piano",
            "Voice",
            "Bass Guitar",
            "Electric Guitar"
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
            "Piano",
            "Voice",
            "Bass Guitar",
            "Electric Guitar",
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
            "Piano",
            "Voice"
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
            "Drums",
            "Piano",
            "Voice"
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
            "Drums",
            "Piano",
            "Bass Guitar",
            "Electric Guitar",
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
            "Flute",
            "Piccolo",
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
            "Piano",
            "Voice",
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
            "Trombone",
            "Trumpet"
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

const LARGE_ENSEMBLE = {
    '2025-2026': [

    ],
    '2024-2025': [
        {
            title: 'Let You Down'
        },
        {
            title: 'Midnight Rendezvouz'
        },
        {
            title: "Death by Glamour"
        },
        {
            title: 'Bloody Stream'
        },
        {
            title: 'Wild Side'
        },
        {
            title: 'But Not For Me'
        },
        {
            title: 'Ringo Biyori'
        },
        {
            title: 'Moonlight Stage'
        },
        {

            title: 'From the Start'
        },
        {
            id: 4,
            title: 'Wind'
        },
    ],
    '2023-2024': [
        {
            title: 'Zankyosanka'
        },
        {
            title: 'Renai Circulation'
        },
        {
            title: 'Daddy Daddy Do'
        },
        {
            title: 'Kom Susser Tod'
        },
    ],
};

const SMALL_ENSEMBLE = [
    {
        id: 4,
        title: 'Fly Me to the Moon',
        tags: ['Winter'],
        source: 'Neon Genesis Evangelion ED 1',
        composer: 'Bart Howard',
        arranger: null,
        referenceVideos: [],
        inPerson: {
            rehearsalSchedule: null,
            rehearsalLocation: null,
            rehearsalLead: null
        },
        online: {
            audioMixer: null,
            videoThumbnail: null,
            videoEditor: null,
            videoLink: null
        },
        performers: {
            voice: 'Amako',
            piano: 'Mike',
            bassGuitar: 'Alexis'
        },
    },
    {
        id: 3,
        title: 'Droit dans le soleil',
    },
    {
        id: 2,
        title: 'Deja Vu'
    },
    {  
        id: 1,
        title: "My City's on Fire"
    },
    {
        id: 0,
        title: 'Salt Pepper'
    },
];


const CONCERTS = [

]

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
]

const FORM_LINKS = {
    // 'song-suggestion': '',
    // 'song-voting': '',
    // 'ideas-and-feedback': '',
    // 'small-ensemble-registration': '',
    // 'equipment-or-room-requests': '',
    // 'online-project-assistance': '',
    // 'new-member-registration': 'https://docs.google.com/forms/d/e/1FAIpQLSfNEoh9rA4vCyZd9dz-yV35tpFnqDVq3yWQvJjz0NlGMqZ9-Q/viewform'
}

const EMBED_LINKS = {
    'embed-calendar': 'https://calendar.google.com/calendar/embed?src=utsama.lightmusicclub%40gmail.com&ctz=America%2FToronto',

}

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
]
