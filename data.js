const TAGS = {
    "Executive": [
        [
            47,
            7,
            67
        ],
        [
            65,
            41,
            90
        ]
    ],
    "Assistant Executive": [
        [
            47,
            7,
            67
        ],
        [
            65,
            41,
            90
        ]
    ],
    "Logistics": [
        [
            47,
            7,
            67
        ],
        [
            65,
            41,
            90
        ]
    ],
    "Arranger": [
        [
            47,
            7,
            67
        ],
        [
            65,
            41,
            90
        ]
    ],
    "Artist": [
        [
            47,
            7,
            67
        ],
        [
            65,
            41,
            90
        ]
    ],
    "Website": [
        [
            47,
            7,
            67
        ],
        [
            65,
            41,
            90
        ]
    ],
    "OG": [
        [
            137,
            33,
            107
        ],
        [
            218,
            68,
            83
        ]
    ],
    "Ukulele": [
        [
            255,
            150,
            150
        ],
        [
            255,
            100,
            100
        ]
    ],
    "Acoustic Guitar": [
        [
            255,
            150,
            150
        ],
        [
            255,
            100,
            100
        ]
    ],
    "Electric Guitar": [
        [
            255,
            150,
            150
        ],
        [
            255,
            100,
            100
        ]
    ],
    "Bass Guitar": [
        [
            255,
            150,
            150
        ],
        [
            255,
            100,
            100
        ]
    ],
    "Voice": [
        [
            255,
            255,
            255
        ]
    ],
    "Electric Piano": [
        [
            255,
            255,
            255
        ]
    ],
    "Piano": [
        [
            255,
            255,
            255
        ]
    ],
    "Drums": [
        [
            255,
            255,
            255
        ]
    ],
    "Trumpet": [
        [
            255,
            255,
            110
        ],
        [
            255,
            240,
            160
        ]
    ],
    "Trombone": [
        [
            255,
            255,
            110
        ],
        [
            255,
            240,
            160
        ]
    ],
    "Violin": [
        [
            250,
            180,
            50
        ],
        [
            230,
            130,
            50
        ]
    ],
    "Cello": [
        [
            250,
            180,
            50
        ],
        [
            230,
            130,
            50
        ]
    ],
    "Double Bass": [
        [
            250,
            180,
            50
        ],
        [
            230,
            130,
            50
        ]
    ],
    "Piccolo": [
        [
            180,
            180,
            180
        ]
    ],
    "Recorder": [
        [
            180,
            180,
            180
        ]
    ],
    "Flute": [
        [
            180,
            180,
            180
        ]
    ],
    "Oboe": [
        [
            50,
            50,
            50
        ],
        [
            40,
            60,
            50
        ]
    ],
    "Clarinet": [
        [
            50,
            50,
            50
        ],
        [
            40,
            60,
            50
        ]
    ],
    "Bass Clarinet": [
        [
            50,
            50,
            50
        ],
        [
            40,
            60,
            50
        ]
    ],
    "Alto Saxophone": [
        [
            220,
            190,
            70
        ]
    ],
    "Tenor Saxophone": [
        [
            220,
            190,
            70
        ]
    ],
    "Baritone Saxophone": [
        [
            220,
            190,
            70
        ]
    ],
    "Lead Executive": [
        [
            47,
            7,
            67
        ],
        [
            65,
            41,
            90
        ]
    ],
    "Outreach": [
        [
            47,
            7,
            67
        ],
        [
            65,
            41,
            90
        ]
    ],
    "Backend": [
        [
            47,
            7,
            67
        ],
        [
            65,
            41,
            90
        ]
    ]
};

const ROLES = [
    "Executive (23)",
    "Executive (23/24)",
    "Executive (23/25)",
    "Executive (25)",
    "Executive (24)",
    "Assistant Executive (26)",
    "Assistant Executive (25)",
    "Arranger",
    "Artist",
    "Backend",
    "Logistics",
    "Lead Executive (26)",
    "Outreach",
    "Website",
    "OG"
];

const INSTRUMENTS = [
    "Accordion",
    "Aux Percussion???",
    "Bagpipes",
    "Guitar",
    "Voice",
    "Piano",
    "Electric Piano",
    "Drums",
    "Acoustic Guitar",
    "Aux. Percussion???",
    "Backing Voice",
    "Bongos",
    "Ukulele",
    "Electric Guitar",
    "Bass Guitar",
    "Djembe",
    "Lead Electric Guitar",
    "Violin",
    "Cello",
    "Double Bass",
    "Piccolo",
    "Flute",
    "Lead Voice",
    "Recorder",
    "Oboe",
    "Clarinet",
    "Bass Clarinet",
    "Alto Saxophone",
    "Tenor Saxophone",
    "Baritone Saxophone",
    "Harmonica",
    "Rhythm Electric Guitar",
    "Shaker",
    "Theremin",
    "Triangle",
    "Trumpet",
    "Trombone"
];

const CURRENT_EVENT = {
    "id": 2,
    "rvsp": "#",
    "hideBefore": "2025-01-01|12:24",
    "hideAfter": "2026-09-01|00:00",
    "setlistLink": "https://utlmc.github.io/setlist",
    "tickets": "$5, pay in-person",
    "preEventDescription": [
        "The LMC returns this April for its regularly-scheduled end of winter concert, featuring 3 hours of music, XX songs played by XX of our talented musicians!",
        "We'll be playing songs from j-pop, anime, video games, and more! Find the link to the setlist for the concert here."
    ],
    "postEventDescription": [
        "Thank you to all performers and audience for a successful April concert! The next season of LMC operations will begin in September 2026."
    ]
};

const ANNOUNCEMENTS = [
    {
        "type": "alert",
        "text": "This website is currently under construction — some pages are unfinished and there may be bugs.",
        "from": "2025-01-01",
        "until": "2027-01-01"
    },
    {
        "type": "announcement",
        "text": "We’re looking for people with experience in drawing, graphic design, audio mixing, or video editing to help us with recording projects! If you have experience, please consider reaching out to XX on XXX!",
        "from": "2025-01-01",
        "until": "2027-01-01"
    },
    {
        "type": "announcement",
        "text": "The LMC is opening for its 3rd year this 2025-2026 Fall-Winter term! Our first meeting is at XX:XX pm at XXXX on Sept. XX. Come get a better idea of our club. No instruments needed. Click <a href=\"https://docs.google.com/forms/d/e/1FAIpQLSfNEoh9rA4vCyZd9dz-yV35tpFnqDVq3yWQvJjz0NlGMqZ9-Q/viewform\" target=\"_blank\">this link</a> to become a member!",
        "from": "2025-01-01"
    }
].map((x, i) => ({...x, id: i}));

const UPCOMING_EVENTS = [
    {
        "eventId": 0,
        "from": "2025-01-01",
        "until": "2029-01-22",
        "image": "assets/images/locations/oise.webp"
    },
    {
        "eventId": 1,
        "from": "2025-01-01",
        "until": "2029-01-22",
        "image": "assets/images/locations/oise.webp"
    },
    {
        "eventId": 2,
        "from": "2025-01-01",
        "until": "2029-01-22",
        "image": "assets/images/locations/oise.webp"
    }
].map((x, i) => ({...x, id: i}));

const MEMBERS = [
    {
        "name": "Stone",
        "joined": "Fall 2023",
        "left": "Fall 2024",
        "instruments": [
            5,
            7,
            13,
            14,
            19
        ],
        "roles": [
            14,
            0
        ],
        "links": []
    },
    {
        "name": "alpurposeflour",
        "joined": "Fall 2023",
        "instruments": [
            4,
            5,
            8,
            14,
            36
        ],
        "roles": [
            14,
            10,
            1
        ],
        "links": []
    },
    {
        "name": "Sean",
        "joined": "Fall 2023",
        "instruments": [
            5,
            17
        ],
        "roles": [
            14,
            7,
            2
        ],
        "links": [
            [
                "discord",
                "amoguus"
            ],
            [
                "youtube",
                "Deez",
                "https://www.youtube.com/@deez9741"
            ]
        ]
    },
    {
        "name": "Mike",
        "joined": "Winter 2024",
        "instruments": [
            4,
            5,
            8,
            17
        ],
        "roles": [
            14,
            7,
            3
        ],
        "links": [
            [
                "discord",
                "pixelatedmike"
            ],
            [
                "instagram",
                "michaelkim_05"
            ]
        ]
    },
    {
        "name": "Michelle",
        "joined": "Winter 2024",
        "left": "Fall 2024",
        "instruments": [
            4,
            5,
            8
        ],
        "roles": [
            14
        ],
        "links": []
    },
    {
        "name": "Aedhan",
        "joined": "Winter 2024",
        "left": "Winter 2025",
        "instruments": [
            4
        ],
        "roles": [
            14,
            4
        ],
        "links": [
            [
                "youtube",
                "Amako ni Naru",
                "https://www.youtube.com/@amakoninaru8389"
            ]
        ]
    },
    {
        "name": "Bryan",
        "joined": "Winter 2024",
        "left": "Winter 2025",
        "instruments": [
            4,
            7
        ],
        "roles": [
            14
        ],
        "links": [
            [
                "youtube",
                "Cerocune",
                "https://www.youtube.com/@Cerocune"
            ]
        ]
    },
    {
        "name": "Dimmy",
        "joined": "Winter 2024",
        "left": "Winter 2025",
        "instruments": [
            14
        ],
        "roles": [
            14
        ],
        "links": []
    },
    {
        "name": "Inès Alibay",
        "joined": "Winter 2024",
        "instruments": [
            4,
            5,
            8,
            13,
            14
        ],
        "roles": [
            14
        ],
        "links": []
    },
    {
        "name": "Richard",
        "joined": "Winter 2024",
        "instruments": [
            5,
            21
        ],
        "roles": [
            14,
            7,
            13
        ],
        "links": []
    },
    {
        "name": "Mellow",
        "joined": "Winter 2024",
        "instruments": [
            4,
            35,
            36
        ],
        "roles": [
            14,
            8
        ],
        "links": []
    },
    {
        "name": "A. G. Montejo",
        "joined": "Winter 2024",
        "instruments": [
            4,
            5,
            12,
            25,
            27,
            28,
            29
        ],
        "roles": [
            14,
            8
        ],
        "links": []
    },
    {
        "name": "Louis Miguel",
        "joined": "Winter 2024",
        "instruments": [
            17
        ],
        "roles": [
            14
        ],
        "links": []
    },
    {
        "name": "Kai",
        "joined": "Winter 2024",
        "instruments": [
            4,
            5,
            13,
            17
        ],
        "roles": [
            7,
            12,
            5
        ],
        "links": [
            [
                "spotify",
                "Kaizyu",
                "https://open.spotify.com/artist/30UzBgSpF2zQq3cc2uWQiv?si=P1obSR1RRL2tt8kRDC56ng"
            ],
            [
                "youtube",
                "WhyKai",
                "https://www.youtube.com/@WhyKaii"
            ]
        ]
    },
    {
        "name": "Yuki",
        "joined": "Fall 2024",
        "left": "Fall 2024",
        "instruments": [
            25
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Katie",
        "joined": "Fall 2024",
        "left": "Winter 2025",
        "instruments": [
            17
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Daniel",
        "joined": "Fall 2024",
        "left": "Winter 2025",
        "instruments": [
            4,
            27
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Amber",
        "joined": "Fall 2024",
        "left": "Winter 2025",
        "instruments": [
            5,
            17
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Peter",
        "joined": "Fall 2024",
        "left": "Winter 2025",
        "instruments": [
            7
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Edison",
        "joined": "Fall 2024",
        "left": "Winter 2025",
        "instruments": [
            24
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Jimin",
        "joined": "Fall 2024",
        "instruments": [
            4,
            5,
            7,
            13
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "James Inneo",
        "joined": "Fall 2024",
        "instruments": [
            14
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Emily",
        "joined": "Fall 2024",
        "instruments": [
            13
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Robin",
        "joined": "Fall 2024",
        "instruments": [
            8,
            13
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Kasey",
        "joined": "Fall 2024",
        "instruments": [
            4,
            12,
            35
        ],
        "roles": [
            8,
            12,
            5
        ],
        "links": []
    },
    {
        "name": "Anon",
        "joined": "Fall 2024",
        "instruments": [
            13,
            14,
            18
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Han",
        "joined": "Fall 2024",
        "instruments": [
            8,
            13
        ],
        "roles": [
            10,
            6,
            11
        ],
        "links": [
            [
                "discord",
                "saltedh"
            ]
        ]
    },
    {
        "name": "Rylen Fong",
        "joined": "Fall 2024",
        "instruments": [
            8,
            12,
            25,
            27
        ],
        "roles": [
            7,
            9,
            5
        ],
        "links": [
            [
                "youtube",
                "Rayzerfang Music",
                "https://www.youtube.com/channel/UClEvA2YVTvVi-8RUTY5CFFg"
            ]
        ]
    },
    {
        "name": "Raekye",
        "joined": "Fall 2024",
        "instruments": [
            5
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Angelina Zheng",
        "joined": "Fall 2024",
        "instruments": [
            4,
            5
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Tommy",
        "joined": "Fall 2024",
        "instruments": [
            5
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "xx.kamikaze.yasuomaster.69.xx",
        "joined": "Fall 2024",
        "left": "Winter 2025",
        "instruments": [
            4,
            17
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Yuki",
        "joined": "Fall 2024",
        "left": "Fall 2024",
        "instruments": [
            5,
            25
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Tyrone Fang",
        "joined": "Fall 2024",
        "instruments": [
            4,
            8,
            13,
            14
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Crystal Y.",
        "joined": "Winter 2025",
        "instruments": [
            4,
            12
        ],
        "roles": [
            8
        ],
        "links": []
    },
    {
        "name": "Hayden Hoffort",
        "joined": "Winter 2025",
        "instruments": [
            35
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Johnathan H.",
        "joined": "Winter 2025",
        "instruments": [
            5
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Kae",
        "joined": "Winter 2025",
        "instruments": [
            4,
            13,
            14
        ],
        "roles": [
            12,
            5
        ],
        "links": []
    },
    {
        "name": "Michelle",
        "joined": "Fall 2025",
        "instruments": [
            5
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Sophia",
        "joined": "Fall 2025",
        "instruments": [
            4,
            14
        ],
        "roles": [
            6,
            11,
            12
        ],
        "links": [
            [
                "discord",
                "sopha__a"
            ]
        ]
    },
    {
        "name": "Eric",
        "joined": "Fall 2025",
        "instruments": [
            4,
            5
        ],
        "roles": [
            6,
            11,
            9
        ],
        "links": [
            [
                "discord",
                "eeeric_nothing"
            ]
        ]
    },
    {
        "name": "Zachary Pang",
        "joined": "Fall 2025",
        "instruments": [
            4
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Olivia Yip",
        "joined": "Fall 2025",
        "instruments": [
            4,
            8,
            12
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Emma Ethina Islam",
        "joined": "Fall 2025",
        "instruments": [
            4
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Brian Lin",
        "joined": "Fall 2025",
        "instruments": [
            4,
            5,
            13
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Fatima Gonsalves",
        "joined": "Fall 2025",
        "instruments": [
            4,
            5,
            14
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Carmen",
        "joined": "Fall 2025",
        "instruments": [
            4,
            5,
            13
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "J. Mansia",
        "joined": "Fall 2025",
        "instruments": [
            4,
            5,
            7,
            13,
            14,
            17
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Simba",
        "joined": "Fall 2025",
        "instruments": [
            17,
            27
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Skylar",
        "joined": "Fall 2025",
        "left": "Fall 2025",
        "instruments": [
            17,
            21
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Nicole Liu",
        "joined": "Fall 2025",
        "left": "Fall 2025",
        "instruments": [
            5,
            17
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Benjamin L.",
        "joined": "Fall 2025",
        "instruments": [
            25
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Brandon Law",
        "joined": "Fall 2025",
        "instruments": [
            4,
            5,
            27,
            28
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Efren Wang",
        "joined": "Fall 2025",
        "instruments": [
            5,
            36
        ],
        "roles": [
            10,
            5
        ],
        "links": []
    },
    {
        "name": "William",
        "joined": "Fall 2025",
        "instruments": [
            4,
            13
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Ericka",
        "joined": "Fall 2025",
        "instruments": [
            4,
            8
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Alexander Davydenko",
        "joined": "Fall 2025",
        "instruments": [
            13
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Emre",
        "joined": "Fall 2025",
        "instruments": [
            8,
            13
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Sofia Gondim",
        "joined": "Fall 2025",
        "instruments": [
            4,
            5,
            13,
            14,
            26
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Andrew Tan",
        "joined": "Fall 2025",
        "instruments": [
            4,
            5,
            13,
            14
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Emmett Hartley",
        "joined": "Fall 2025",
        "instruments": [
            14
        ],
        "roles": [
            10,
            5
        ],
        "links": []
    },
    {
        "name": "Jonathan",
        "joined": "Fall 2025",
        "instruments": [
            4,
            5,
            13,
            14,
            21
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "FH",
        "joined": "Fall 2025",
        "instruments": [
            5,
            25
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Xianghai (Steven)",
        "joined": "Fall 2025",
        "instruments": [
            30,
            4,
            5
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Julian",
        "joined": "Fall 2025",
        "instruments": [
            4,
            5,
            7
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Joe",
        "joined": "Winter 2026",
        "instruments": [
            5
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Paul Y.",
        "joined": "Winter 2026",
        "instruments": [
            5,
            7,
            13,
            14,
            27
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Ze",
        "joined": "Winter 2026",
        "instruments": [
            17
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Kaveh",
        "joined": "Winter 2026",
        "instruments": [
            7
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Cathy Z.",
        "joined": "Winter 2026",
        "instruments": [
            4,
            20,
            21,
            23,
            27,
            28
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Cailyn",
        "joined": "Winter 2026",
        "instruments": [
            7
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Kaden Calvert",
        "joined": "Winter 2026",
        "instruments": [
            7
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Kai Kang Nie",
        "joined": "Winter 2026",
        "instruments": [
            2,
            4
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Celina L.",
        "joined": "Winter 2026",
        "instruments": [
            4
        ],
        "roles": [
            5,
            12
        ],
        "links": []
    },
    {
        "name": "Lucia",
        "joined": "Winter 2026",
        "instruments": [
            4,
            5,
            13
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Leo",
        "joined": "Winter 2026",
        "instruments": [
            5,
            14
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Phillip Hsu",
        "joined": "Winter 2026",
        "instruments": [
            0,
            8
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Hana",
        "joined": "Winter 2026",
        "instruments": [
            4
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Prashanth Shyamala",
        "joined": "Winter 2026",
        "instruments": [
            13
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Charlene Chiang",
        "joined": "Winter 2026",
        "instruments": [
            5,
            14,
            25,
            35,
            36
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "Colin Boothby",
        "joined": "Winter 2026",
        "instruments": [
            33
        ],
        "roles": [],
        "links": []
    },
    {
        "name": "yams",
        "joined": "Winter 2026",
        "instruments": [
            13
        ],
        "roles": [],
        "links": []
    }
].map((x, i) => ({...x, id: i}));

const MUSIC = [
    {
        "name": "Zankyosanka",
        "composer": "Aimer",
        "from": "Demon Slayer",
        "mediaOrigin": "Anime",
        "references": [
            "https://www.youtube.com/watch?v=tLQLa6lM3Us&pp"
        ],
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
                "id": 0,
                "arrangers": [
                    2
                ],
                "sheetMusic": "#",
                "songType": "Large"
            }
        ]
    },
    {
        "name": "Renai Circulation",
        "composer": "Kana Hanazawa",
        "from": "Bakemonogatari",
        "mediaOrigin": "Anime",
        "references": [
            "https://youtu.be/uKxyLmbOc0Q?si=-Zun1LXR44xKox1Z"
        ],
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
                "id": 0,
                "arrangers": [
                    9
                ],
                "sheetMusic": "#",
                "songType": "Large"
            }
        ]
    },
    {
        "name": "Daddy! Daddy! Do!",
        "composer": "Masayuki Suzuki ft. Airi Suzuki",
        "from": "Kaguya-sama: Love is War",
        "mediaOrigin": "Anime",
        "references": [
            "https://www.youtube.com/watch?v=2Od7QCsyqkE&pp"
        ],
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
                "id": 0,
                "arrangers": [
                    3
                ],
                "sheetMusic": "#",
                "songType": "Large"
            }
        ]
    },
    {
        "name": "Fly Me to the Moon",
        "composer": "Bart Howard",
        "from": "Neon Genesis Evangelion",
        "mediaOrigin": "Anime",
        "references": [
            "https://www.youtube.com/watch?v=w2xi6Qjv8mw"
        ],
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
                "id": 0,
                "songType": "Small",
                "link": "https://www.youtube.com/watch?v=FvuYsi84Sfg"
            }
        ]
    },
    {
        "name": "Moonlight Stage",
        "composer": "GYARI",
        "mediaOrigin": "Vocaloid",
        "references": [
            "<div>https://www.youtube.com/watch?v=TTk6C8ADgcU</div>"
        ],
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
                    ]
                },
                "id": 0,
                "songType": "Small",
                "link": "https://www.youtube.com/watch?v=_f_jcX2gmpQ",
                "arrangers": []
            }
        ]
    },
    {
        "name": "Déja Vu",
        "composer": "Dave Rogers",
        "from": "Initial D",
        "mediaOrigin": "Anime",
        "references": [
            "https://www.youtube.com/watch?v=UT7O7FyUbxA&pp"
        ],
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
                "id": 0,
                "arrangers": [
                    0
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Anytime Anywhere",
        "composer": "Milet",
        "from": "Frieren: Beyond Journey's End",
        "mediaOrigin": "Anime",
        "references": [
            "https://www.youtube.com/watch?v=r105CzDvoo0&pp"
        ],
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
                "id": 0,
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Marigold",
        "composer": "M2U",
        "from": "Deemo",
        "mediaOrigin": "Video Game",
        "references": [
            "https://youtu.be/39EzeqzlwVY?si=vcJtk6j0CIhS97K-"
        ],
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
                "id": 0,
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Salt, Pepper, Birds, and the Thought Police",
        "composer": "Mili",
        "from": "Library Of Ruina",
        "mediaOrigin": "Video Game",
        "references": [
            "https://www.youtube.com/watch?v=Dca9gJyjoAg&pp"
        ],
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
                "id": 0,
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Droit dans le soleil",
        "composer": "Détroit",
        "references": [
            "https://youtu.be/MoXNwGKA8cg?si=oVC4CrezCIxnvGie"
        ],
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
                "id": 0,
                "songType": "Small",
                "link": "https://www.youtube.com/watch?v=d0apOZbRKU4"
            }
        ]
    },
    {
        "name": "Komm, süsser Tod",
        "composer": "Shirō Sagisu",
        "from": "Neon Genesis Evangelion",
        "mediaOrigin": "Anime",
        "references": [
            "https://youtu.be/hoKluzn07eQ?si=QRBOh6tGD1CbTn5M"
        ],
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
                "id": 0,
                "songType": "Small"
            }
        ]
    },
    {
        "name": "My City's on Fire",
        "composer": "Laszlo Vincze",
        "from": "Chicken Police",
        "mediaOrigin": "Video Game",
        "references": [
            "https://youtu.be/9KA-sZSU5iQ?si=aC2VUNUSpc5aAZDG"
        ],
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
                "id": 0,
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Heartache",
        "composer": "Toby Fox",
        "from": "Undertale",
        "mediaOrigin": "Video Game",
        "references": [
            "https://www.youtube.com/watch?v=XJ9XtKJHvjQ"
        ],
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
                "id": 0,
                "arrangers": [
                    9
                ],
                "songType": "Small",
                "link": "https://www.youtube.com/watch?v=oTlV8LhFbxQ"
            }
        ]
    },
    {
        "name": "Death by Glamour",
        "composer": "Toby Fox",
        "from": "Undertale",
        "mediaOrigin": "Video Game",
        "references": [
            "https://www.youtube.com/watch?v=qeDIZCc6Cyo"
        ],
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
                "id": 0,
                "arrangers": [
                    9
                ],
                "sheetMusic": "#",
                "songType": "Large"
            }
        ]
    },
    {
        "name": "Bloody Stream",
        "composer": "CODA",
        "from": "JoJo's Bizarre Adventure",
        "mediaOrigin": "Anime",
        "references": [
            "https://www.youtube.com/watch?v=hmpJqJLsR48"
        ],
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
                "id": 0,
                "arrangers": [
                    3
                ],
                "sheetMusic": "#",
                "songType": "Large"
            }
        ]
    },
    {
        "name": "Zettai Zetsumei",
        "composer": "Cö shu Nie",
        "from": "The Promised Neverland",
        "mediaOrigin": "Anime",
        "references": [
            "https://www.youtube.com/watch?v=6WNk9yMNovs"
        ],
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
                "id": 0,
                "arrangers": [
                    2
                ],
                "sheetMusic": "#",
                "songType": "Large"
            }
        ]
    },
    {
        "name": "Wild Side",
        "composer": "ALI",
        "from": "Beastars",
        "mediaOrigin": "Anime",
        "references": [
            "https://www.youtube.com/watch?v=u5heWZ9occg"
        ],
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
                "id": 0,
                "arrangers": [
                    "OpticWattz"
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "name": "But Not for Me",
        "composer": "Chet Baker",
        "references": [
            "https://www.youtube.com/watch?v=R_f_mMJAezM"
        ],
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
                "id": 0,
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Wind",
        "composer": "Akeboshi",
        "from": "Naruto",
        "mediaOrigin": "Anime",
        "references": [
            "https://www.youtube.com/watch?v=WqGOaOHu5uY"
        ],
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
                "id": 0,
                "arrangers": [
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
                "id": 1,
                "arrangers": [
                    9
                ],
                "sheetMusic": "#",
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Ringo Biyori",
        "composer": "Rocky Chack",
        "from": "Spice and Wolf",
        "mediaOrigin": "Anime",
        "references": [
            "https://www.youtube.com/watch?v=hO5KQgFjIxI"
        ],
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
                "id": 0,
                "arrangers": [
                    3
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Let You Down",
        "composer": "Dawid Podsiadło",
        "from": "Cyberpunk Edgerunners",
        "mediaOrigin": "Anime",
        "references": [
            "https://www.youtube.com/watch?v=yBuHEV44s3Y"
        ],
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
                "id": 0,
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Midnight Rendez-Vous",
        "composer": "CASIOPEA",
        "references": [
            "https://www.youtube.com/watch?v=4Hvvltt7d-U"
        ],
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
                "id": 0,
                "songType": "Small"
            }
        ]
    },
    {
        "name": "From the Start",
        "composer": "Laufey",
        "references": [
            "https://www.youtube.com/watch?v=lSD_L-xic9o"
        ],
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
                "id": 0,
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Unravel",
        "composer": "TK from Ling Tosite Sigure",
        "from": "Tokyo Ghoul",
        "mediaOrigin": "Anime",
        "references": [
            "https://www.youtube.com/watch?v=Fve_lHIPa-I",
            "https://www.youtube.com/watch?v=sEQf5lcnj_o"
        ],
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
                "id": 0,
                "arrangers": [
                    "Animenz"
                ],
                "sheetMusic": "#",
                "songType": "Small",
                "link": "https://www.youtube.com/watch?v=IelVOYXLZaA"
            }
        ]
    },
    {
        "name": "world.execute(me); (Key Ingredient ver.)",
        "composer": "Mili",
        "references": [
            "https://www.youtube.com/watch?v=JB5gfmWQzSA"
        ],
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
                "id": 0,
                "arrangers": [
                    2
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "name": "God Knows",
        "composer": "ENOZ",
        "from": "The Melancholy of Haruhi Suzumiya",
        "mediaOrigin": "Anime",
        "references": [
            "https://www.youtube.com/watch?v=5QNaSMiZ_-o"
        ],
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
                "id": 0,
                "group": "Tokuiten",
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Re:Re:",
        "composer": "Asian Kung-Fu Generation",
        "from": "Erased",
        "mediaOrigin": "Anime",
        "references": [
            "https://www.youtube.com/watch?v=PiIAVnFX2eo",
            "https://www.youtube.com/watch?v=_v_Voe5KD1M"
        ],
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
                "id": 0,
                "group": "Tokuiten",
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Rockn' Roll, Morning Light Falls on You",
        "composer": "Asian Kung-Fu Generation",
        "from": "Bocchi the Rock",
        "mediaOrigin": "Anime",
        "references": [
            "https://www.youtube.com/watch?v=E5O0mCrUdAM",
            "https://www.youtube.com/watch?v=rDTFSD9K9dA"
        ],
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
                "id": 0,
                "group": "Tokuiten",
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Falling Down",
        "composer": "Oasis",
        "from": "Higashi no Eden",
        "mediaOrigin": "Anime",
        "references": [
            "https://www.youtube.com/watch?v=L5BDyjgbjPU"
        ],
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
                "id": 0,
                "arrangers": [
                    9
                ],
                "songType": "Small",
                "link": "https://www.youtube.com/watch?v=-7cIocnaWuI"
            }
        ]
    },
    {
        "name": "Preview of Me",
        "composer": "Tatsuya Kitani",
        "from": "Go! Go! Loser Ranger",
        "mediaOrigin": "Anime",
        "references": [
            "https://www.youtube.com/watch?v=O3ZYjfMqAsc"
        ],
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
                "id": 0,
                "songType": "Small",
                "link": "https://www.youtube.com/watch?v=BkWCOBDLsZI"
            }
        ]
    },
    {
        "name": "Loonboon",
        "composer": "Laura Shigihara",
        "from": "Plants vs. Zombies",
        "mediaOrigin": "Video Game",
        "references": [
            "https://www.youtube.com/watch?v=lr4vi_XAjQQ",
            "https://www.youtube.com/watch?v=qVhEcqUU4TI"
        ],
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
                "id": 0,
                "arrangers": [
                    3,
                    9
                ],
                "sheetMusic": "#",
                "songType": "Large"
            }
        ]
    },
    {
        "name": "Rubato",
        "composer": "Yorushika",
        "mediaOrigin": "Anime",
        "references": [
            "https://www.youtube.com/watch?v=3J5uLk1DJV0"
        ],
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
                "id": 0,
                "arrangers": [
                    1
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Hive Knight",
        "composer": "Christopher Larkin",
        "from": "Hollow Knight",
        "mediaOrigin": "Video Game",
        "references": [
            "https://www.youtube.com/watch?v=RVyJmhiJjA8"
        ],
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
                "id": 0,
                "arrangers": [
                    35
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "name": "It's Going Down Now",
        "composer": "Atsushi Kitajoh",
        "from": "Persona 3",
        "mediaOrigin": "Video Game",
        "references": [
            "https://www.youtube.com/watch?v=2KuWjZD6PBA"
        ],
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
                "id": 0,
                "arrangers": [
                    2
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Agniratha, Mechonis Capital",
        "composer": "ACE+",
        "from": "Xenoblade Chronicles",
        "mediaOrigin": "Video Game",
        "references": [
            "https://youtu.be/Jln_KBWFvfw?si=AV1oPH5PuyghLSO6"
        ],
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
                "id": 0,
                "arrangers": [
                    9
                ],
                "songType": "Small",
                "link": "https://www.youtube.com/watch?v=XQHnKNeKknc"
            }
        ]
    },
    {
        "name": "Lullaby of Birdland",
        "composer": "Yoko Kanno",
        "from": "Sakamichi no Apollon",
        "mediaOrigin": "Anime",
        "references": [
            "https://www.youtube.com/watch?v=gDzi8N3BYMw"
        ],
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
                "id": 0,
                "arrangers": [
                    13
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Beaches of Maceio",
        "composer": "Kaizyu (Original Piece)",
        "references": [
            "https://www.youtube.com/watch?v=aVASIbpXAWs"
        ],
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
                "id": 0,
                "songType": "Small"
            }
        ]
    },
    {
        "name": "My Way",
        "composer": "Jacques Revaux, Gilles Thibaut, & Claude François",
        "references": [
            "https://www.youtube.com/watch?v=eKN7ffwEBmg",
            "https://www.youtube.com/watch?v=qjpRSREHX1Y"
        ],
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
                "id": 0,
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Ano Bando",
        "composer": "Kessoku Band",
        "from": "Bocchi the Rock",
        "mediaOrigin": "Anime",
        "references": [
            "https://www.youtube.com/watch?v=q-bCp4MxuYU"
        ],
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
                "id": 0,
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Black Sheep",
        "composer": "Metric",
        "from": "Scott Pilgrim vs. the World",
        "references": [
            "https://www.youtube.com/watch?v=1xcSDYy3Dl4"
        ],
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
                "id": 0,
                "songType": "Small"
            }
        ]
    },
    {
        "name": "La Sentinelle",
        "composer": "Luke",
        "references": [
            "https://www.youtube.com/watch?v=0NUqL1bvAis"
        ],
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
                "id": 0,
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Doom Crossing: Eternal Horizons",
        "composer": "The Chalkeaters",
        "mediaOrigin": "Video Game",
        "references": [
            "https://www.youtube.com/watch?v=U4lz8MN6MQA"
        ],
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
                "id": 0,
                "songType": "Small"
            }
        ]
    },
    {
        "name": "JoJo Sono Chi no Kioku ~end of THE WORLD~",
        "composer": "JO☆STARS",
        "from": "JoJo's Bizarre Adventure",
        "mediaOrigin": "Anime",
        "references": [
            "https://www.youtube.com/watch?v=BPyQM7FmG8g"
        ],
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
                "id": 0,
                "arrangers": [
                    3
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "name": "NO, Thank You!",
        "composer": "Ho-kago Tea Time",
        "from": "K-On!",
        "mediaOrigin": "Anime",
        "references": [
            "https://www.youtube.com/watch?v=mpb2pQtGb5A"
        ],
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
                "id": 0,
                "group": "Tokuiten",
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Bremen",
        "composer": "Yorushika",
        "references": [
            "https://youtu.be/BuBjSciSdO8?si=QsZHQbZb4B7PaNUi"
        ],
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
                "id": 0,
                "group": "Tokuiten",
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Kimi no Shiranai Monogatari",
        "composer": "Supercell",
        "from": "Bakemonogatari",
        "mediaOrigin": "Anime",
        "references": [
            "https://youtu.be/jpV5jeFlt_E?si=GADr3m-yMBZS5QQ-"
        ],
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
                "id": 0,
                "group": "Tokuiten",
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Louder",
        "composer": "Roselia",
        "from": "BanG Dream!",
        "mediaOrigin": "Anime",
        "references": [
            "https://www.youtube.com/watch?v=gZqpgrL6JTI"
        ],
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
                "id": 0,
                "group": "Tokuiten",
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Lost in Paradise",
        "composer": "ALI feat. AKLO",
        "from": "Jujustu Kaisen",
        "mediaOrigin": "Anime",
        "references": [
            "https://www.youtube.com/watch?v=tLsJQ5srVQA"
        ],
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
                "id": 0,
                "arrangers": [
                    2
                ],
                "sheetMusic": "#",
                "songType": "Large"
            }
        ]
    },
    {
        "name": "Anarchy Rainbow",
        "composer": "Deep Cut",
        "from": "Splatoon 3",
        "mediaOrigin": "Video Game",
        "references": [
            "https://www.youtube.com/watch?v=DtMOAvOWTvY"
        ],
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
                    "14": [
                        1
                    ],
                    "15": [
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
                "id": 0,
                "arrangers": [
                    9
                ],
                "songType": "Small",
                "link": "https://www.youtube.com/watch?v=zVNVMBZ1kPg"
            }
        ]
    },
    {
        "name": "Naimononedari",
        "composer": "KANA-BOON",
        "references": [
            "https://www.youtube.com/watch?v=R2OvE1oX_fs"
        ],
        "performances": [
            {
                "concerts": [],
                "performers": {
                    "4": [
                        1,
                        5
                    ]
                },
                "id": 0,
                "songType": "Small",
                "link": "https://www.youtube.com/watch?v=jHEf-jMVkFA"
            }
        ]
    },
    {
        "name": "Dreamer",
        "composer": "Laufey",
        "references": [
            ""
        ],
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
                "id": 0,
                "arrangers": [
                    3
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "name": "A Cruel Angel's Thesis",
        "composer": "Hidetoshi Satō",
        "from": "Neon Genesis Evangelion",
        "mediaOrigin": "Anime",
        "references": [
            "https://www.youtube.com/watch?v=CZQ1pTMAXN0"
        ],
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
                "id": 0,
                "arrangers": [
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
                "id": 1,
                "arrangers": [
                    3
                ],
                "sheetMusic": "#",
                "songType": "Large"
            }
        ]
    },
    {
        "name": "AM4:50",
        "composer": "downt",
        "references": [
            "https://www.youtube.com/watch?v=Gnn7dhnWito"
        ],
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
                "id": 0,
                "group": "2group2",
                "songType": "Small"
            }
        ]
    },
    {
        "name": "artsick",
        "composer": "tricot",
        "references": [
            "https://www.youtube.com/watch?v=G9xfiwX803U"
        ],
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
                "id": 0,
                "group": "2group2",
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Can't Be Right",
        "composer": "Zutomayo",
        "from": "The Promised Neverland",
        "mediaOrigin": "Anime",
        "references": [
            "https://www.youtube.com/watch?v=258qUAI7rck"
        ],
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
                "id": 0,
                "arrangers": [
                    55
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Tank!",
        "composer": "Yoko Kanno",
        "from": "Cowboy Bebop",
        "mediaOrigin": "Anime",
        "references": [
            "https://www.youtube.com/watch?v=EL-D9LrFJd4"
        ],
        "performances": [
            {
                "concerts": [
                    10
                ],
                "performers": {
                    "7": [
                        64
                    ],
                    "11": [
                        3
                    ],
                    "14": [
                        33
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
                "id": 0,
                "arrangers": [
                    27
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Baka Mitai",
        "composer": "Mitsuharu Fukuyama",
        "from": "Yakuza",
        "mediaOrigin": "Video Game",
        "references": [
            "https://www.youtube.com/watch?v=g3jCAyPai2Y"
        ],
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
                "id": 0,
                "arrangers": [
                    27
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Roki",
        "composer": "Mikito-P",
        "references": [
            "https://www.youtube.com/watch?v=Xg-qfsKN2_E"
        ],
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
                "id": 0,
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Tenshi ni Fureta yo!",
        "composer": "Ho-kago Tea Time",
        "from": "K-On!",
        "mediaOrigin": "Anime",
        "references": [
            "https://www.youtube.com/watch?v=ba0juE9ROCg"
        ],
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
                "id": 0,
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Beginning",
        "composer": "Tenmon",
        "from": "Link Click",
        "mediaOrigin": "Anime",
        "references": [
            "https://www.youtube.com/watch?v=l8ormx3BVTI"
        ],
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
                "id": 0,
                "arrangers": [
                    27
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Just the Two of Us",
        "composer": "Bill Withers, William Salter, & Ralph MacDonald",
        "references": [
            "https://www.youtube.com/watch?v=Uw5OLnN7UvM"
        ],
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
                "id": 0,
                "arrangers": [
                    3
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Blush",
        "composer": "Zutomayo",
        "from": "Drifting Home",
        "mediaOrigin": "Anime",
        "references": [
            "https://www.youtube.com/watch?v=OxcnK1s2Fww"
        ],
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
                "id": 0,
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Fireworks",
        "composer": "Daoko",
        "from": "Fireworks",
        "mediaOrigin": "Anime",
        "references": [
            "https://www.youtube.com/watch?v=-tKVN2mAKRI"
        ],
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
                "id": 0,
                "arrangers": [
                    2
                ],
                "sheetMusic": "#",
                "songType": "Large"
            }
        ]
    },
    {
        "name": "Hello",
        "composer": "Furui Riho",
        "from": "City the Animation",
        "mediaOrigin": "Anime",
        "references": [
            "https://www.youtube.com/watch?v=JxyACq69HgA"
        ],
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
                "id": 0,
                "arrangers": [
                    3
                ],
                "sheetMusic": "#",
                "songType": "Large"
            }
        ]
    },
    {
        "name": "Love Like You",
        "composer": "Aivi & Surasshu ft. Rebecca Sugar",
        "from": "Steven Universe",
        "references": [
            "https://www.youtube.com/watch?v=9vPYLsjVc-M"
        ],
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
                "id": 0,
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Autumn Leaves",
        "composer": "Joseph Kosma",
        "references": [
            ""
        ],
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
                "id": 0,
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Suzume",
        "composer": "Radwimps & Kazuma Jinnouchi ft. Toaka",
        "from": "Suzume",
        "mediaOrigin": "Anime",
        "references": [
            "https://www.youtube.com/watch?v=Xs0Lxif1u9E"
        ],
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
                "id": 0,
                "arrangers": [
                    9
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Pokemon Wielder Volo",
        "composer": "Go Ichinose, Hitomi Sato & Hiromitsu Maeba",
        "from": "Pokemon Legends: Arceus",
        "mediaOrigin": "Video Game",
        "references": [
            "https://www.youtube.com/watch?v=0yqm7vrCp-g&t=7s"
        ],
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
                "id": 0,
                "arrangers": [
                    9
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Parfum d'étoiles",
        "composer": "Ichiko Aoba",
        "references": [
            "https://www.youtube.com/watch?v=G3_WW8XRqes"
        ],
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
                "id": 0,
                "arrangers": [
                    9
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Sanctuary Suite",
        "composer": "Toby Fox",
        "from": "Deltarune",
        "mediaOrigin": "Video Game",
        "references": [
            "https://www.youtube.com/watch?v=cNG0Ay3B3Mk",
            "https://www.youtube.com/watch?v=7f1RK1m7qvc"
        ],
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
                "id": 0,
                "arrangers": [
                    9
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Sayonara, Mata Itsuka!",
        "composer": "Kenshi Yonezu",
        "from": "The Tiger and Her Wings",
        "references": [
            "https://www.youtube.com/watch?v=-wb2PAx6aEs"
        ],
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
                "id": 0,
                "arrangers": [
                    9
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Snow Halation",
        "composer": "μ's",
        "from": "Love Live! School Idol Project",
        "mediaOrigin": "Anime",
        "references": [
            "https://www.youtube.com/watch?v=OzGVz1ClxIc",
            "https://www.youtube.com/watch?v=Z4KmL4KI0cQ"
        ],
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
                "id": 0,
                "arrangers": [
                    "Animenz"
                ],
                "sheetMusic": "#",
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Taidada",
        "composer": "Zutomayo",
        "from": "Dandadan",
        "mediaOrigin": "Anime",
        "references": [
            "https://www.youtube.com/watch?v=IeyCdm9WwXM"
        ],
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
                "id": 0,
                "arrangers": [
                    2
                ],
                "sheetMusic": "#",
                "songType": "Large"
            }
        ]
    },
    {
        "name": "Hikaru Nara",
        "composer": "Goose House",
        "from": "Your Lie in April",
        "mediaOrigin": "Anime",
        "references": [
            "https://www.youtube.com/watch?v=c6rCRy6SrtU"
        ],
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
                "id": 0,
                "arrangers": [
                    9
                ],
                "sheetMusic": "#",
                "songType": "Large"
            }
        ]
    },
    {
        "name": "Misty",
        "composer": "Erroll Garner",
        "references": [
            ""
        ],
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
                "id": 0,
                "group": "LMC Jazz Group",
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Mr. Eclectic",
        "composer": "Laufey",
        "references": [
            ""
        ],
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
                "id": 0,
                "group": "LMC Jazz Group",
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Isn't She Lovely",
        "composer": "Stevie Wonder",
        "references": [
            ""
        ],
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
                "id": 0,
                "group": "LMC Jazz Group",
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Hit the Road Jack",
        "composer": "Ray Charles",
        "references": [
            ""
        ],
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
                "id": 0,
                "arrangers": [
                    3
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "name": "September",
        "composer": "Earth, Wind & Fire",
        "references": [
            ""
        ],
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
                "id": 0,
                "group": "New Resonance Choir",
                "songType": "External"
            }
        ]
    },
    {
        "name": "Somewhere Only We Know",
        "composer": "Keane",
        "references": [
            ""
        ],
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
                "id": 0,
                "group": "New Resonance Choir",
                "songType": "External"
            }
        ]
    },
    {
        "name": "What It Sounds Like",
        "composer": "HUNTR/X",
        "from": "KPop Demon Hunters",
        "references": [
            ""
        ],
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
                "id": 0,
                "group": "New Resonance Choir",
                "songType": "External"
            }
        ]
    },
    {
        "name": "Landslide (Tiny Habits ver.)",
        "composer": "Fleetwood Mac",
        "references": [
            ""
        ],
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
                "id": 0,
                "group": "New Resonance Choir",
                "songType": "External"
            }
        ]
    },
    {
        "name": "Layla",
        "composer": "Yostudomenoddy",
        "references": [
            ""
        ],
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
                "id": 0,
                "group": "2group 2",
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Iron Lotus",
        "composer": "Mili",
        "from": "Library of Ruina",
        "mediaOrigin": "Video Game",
        "references": [
            ""
        ],
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
                "id": 0,
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Gone Angels",
        "composer": "Mili",
        "from": "Library of Ruina",
        "mediaOrigin": "Video Game",
        "references": [
            ""
        ],
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
                "id": 0,
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Concerto 1",
        "composer": "Peter Wang (Original Piece)",
        "references": [
            ""
        ],
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
                "id": 0,
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Relationship",
        "composer": "Kent Watari",
        "from": "Link Click",
        "mediaOrigin": "Anime",
        "references": [
            ""
        ],
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
                "id": 0,
                "arrangers": [
                    27
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Isabella's Lullaby",
        "composer": "Takahiro Obata",
        "from": "The Promised Neverland",
        "mediaOrigin": "Anime",
        "references": [
            ""
        ],
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
                "id": 0,
                "arrangers": [
                    27
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "name": "ODDS&ENDS",
        "composer": "ryo (supercell) ft. Hatsune Miku",
        "mediaOrigin": "Vocaloid",
        "references": [
            ""
        ],
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
                "id": 0,
                "group": "39!",
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Moonsetter",
        "composer": "Toby Fox",
        "from": "Homestuck",
        "references": [
            ""
        ],
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
                "id": 0,
                "arrangers": [
                    9
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Yuri on Ice",
        "composer": "Taro Umebayashi",
        "from": "Yuri!!! on ICE",
        "mediaOrigin": "Anime",
        "references": [
            ""
        ],
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
                "id": 0,
                "arrangers": [
                    9
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Don't Say \"Lazy\"",
        "composer": "Ho-kago Tea Time",
        "from": "K-On!",
        "mediaOrigin": "Anime",
        "references": [
            ""
        ],
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
                "id": 0,
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Bartender",
        "composer": "Ngọt",
        "references": [
            ""
        ],
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
                "id": 0,
                "group": "Super Sentai",
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Mất Tích",
        "composer": "Ngọt",
        "references": [
            ""
        ],
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
                "id": 0,
                "group": "Super Sentai",
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Mơ Làm Ma",
        "composer": "Ngọt ft. Thỏ Traum",
        "references": [
            ""
        ],
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
                "id": 0,
                "group": "Super Sentai",
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Fukashigi no Carte",
        "composer": "Kubo Yurika, Minase Inori, Seto Asami, Tanezaki Atsumi, Touyama Nao, & Uchida Maaya",
        "from": "Rascal Does Not Dream of Bunny Girl Senpai",
        "mediaOrigin": "Anime",
        "references": [
            ""
        ],
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
                "id": 0,
                "arrangers": [
                    3
                ],
                "songType": "Large"
            }
        ]
    },
    {
        "name": "Sugar Song to Bitter Step",
        "composer": "Unison Square Garden",
        "from": "Kekkai Sensen",
        "mediaOrigin": "Anime",
        "references": [
            ""
        ],
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
                "id": 0,
                "songType": "Small"
            }
        ]
    },
    {
        "name": "In the Pool",
        "composer": "Kensuke Ushio",
        "from": "Chainsaw Man Movie: Reze Arc",
        "mediaOrigin": "Anime",
        "references": [
            ""
        ],
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
                "id": 0,
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Dawn in the Adan",
        "composer": "Ichiko Aoba",
        "references": [
            ""
        ],
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
                "id": 0,
                "group": "Bows 4 Belts",
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Scarz",
        "composer": "Novulent",
        "references": [
            ""
        ],
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
                "id": 0,
                "group": "Bows 4 Belts",
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Shinzō wo Sasageyo!",
        "composer": "Linked Horizon",
        "from": "Attack on Titan",
        "mediaOrigin": "Anime",
        "references": [
            ""
        ],
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
                "id": 0,
                "arrangers": [
                    27,
                    77
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "name": "That's Why I Quit Music",
        "composer": "Yorushika",
        "references": [
            ""
        ],
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
                "id": 0,
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Itte",
        "composer": "Yorushika",
        "references": [
            ""
        ],
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
                "id": 0,
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Delfino Plaza (French Jazz ver.)",
        "composer": "Koji Kondo",
        "from": "Super Mario Sunshine",
        "mediaOrigin": "Video Game",
        "references": [
            ""
        ],
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
                "id": 0,
                "arrangers": [
                    "8-Bit Big Band"
                ],
                "group": "LMC Jazz Group",
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Jinsei wa Yume Darake (Ma Vie, Mes Rêves)",
        "composer": "Sheena Ringo",
        "references": [
            ""
        ],
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
                "id": 0,
                "arrangers": [
                    3
                ],
                "group": "LMC Jazz Group",
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Jump Up, Superstar!",
        "composer": "Naoto Kubo",
        "from": "Super Mario Odyssey",
        "mediaOrigin": "Video Game",
        "references": [
            ""
        ],
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
                "id": 0,
                "arrangers": [
                    "Brandon Douglas"
                ],
                "group": "LMC Jazz Group",
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Last Stardust",
        "composer": "Aimer",
        "from": "Fate/Stay Night: Unlimited Blade Works",
        "mediaOrigin": "Anime",
        "references": [
            ""
        ],
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
                "id": 0,
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Love Trial",
        "composer": "40mP ft. Hatsune Miku",
        "mediaOrigin": "Vocaloid",
        "references": [
            ""
        ],
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
                "id": 0,
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Fuyu no Hanashi",
        "composer": "centimillimental",
        "from": "Given",
        "mediaOrigin": "Anime",
        "references": [
            ""
        ],
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
                "id": 0,
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Theme of Stone Ocean (Jolyne's Theme)",
        "composer": "Yugo Kanno",
        "from": "Jojo's Bizarre Adventure",
        "mediaOrigin": "Anime",
        "references": [
            ""
        ],
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
                "id": 0,
                "arrangers": [
                    27
                ],
                "songType": "Large"
            }
        ]
    },
    {
        "name": "I Am Gonna Claw (Out Your Eyes Then Drown You To Death)",
        "composer": "Darren Korb",
        "from": "Hades II",
        "mediaOrigin": "Video Game",
        "references": [
            ""
        ],
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
                "id": 0,
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Plastic Love",
        "composer": "Mariya Takeuchi",
        "references": [
            ""
        ],
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
                "id": 0,
                "arrangers": [
                    9
                ],
                "songType": "Large"
            }
        ]
    },
    {
        "name": "Wii Sports Resort Main Theme",
        "composer": "Ryo Nagamatsu",
        "from": "Wii Sports Resort",
        "mediaOrigin": "Video Game",
        "references": [
            ""
        ],
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
                "id": 0,
                "arrangers": [
                    13
                ],
                "songType": "Large"
            }
        ]
    },
    {
        "name": "Battle!!",
        "composer": "Kenji Hiramatsu",
        "from": "Xenoblade Chronicles 2: Torna ~ The Golden Country",
        "mediaOrigin": "Video Game",
        "references": [
            ""
        ],
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
                "id": 0,
                "arrangers": [
                    9
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Mechonis Field",
        "composer": "ACE+",
        "from": "Xenoblade Chronicles",
        "mediaOrigin": "Video Game",
        "references": [
            ""
        ],
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
                "id": 0,
                "arrangers": [
                    9
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Rogueport",
        "composer": "Yuka Tsujiyoko & Yoshito Sekigawa",
        "from": "Paper Mario: The Thousand-Year Door",
        "mediaOrigin": "Video Game",
        "references": [
            ""
        ],
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
                    "11": [
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
                "id": 0,
                "arrangers": [
                    9
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Remedy (Metal ver.)",
        "composer": "DYLZAL",
        "from": "Undertale Yellow",
        "mediaOrigin": "Video Game",
        "references": [
            ""
        ],
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
                "id": 0,
                "arrangers": [
                    13
                ],
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Kẻ Thù",
        "composer": "Ngọt",
        "references": [
            ""
        ],
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
                "id": 0,
                "group": "Masters of Spinjitzu (Formerly Super Sentai)",
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Kokudou Slope",
        "composer": "Kinoko Teikoku",
        "references": [
            ""
        ],
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
                "id": 0,
                "group": "2group 2",
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Last Train at 25 O'Clock",
        "composer": "Lamp",
        "references": [
            ""
        ],
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
                "id": 0,
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Moudoku ga Osou",
        "composer": "Hifumi ft. Hatsune Miku",
        "mediaOrigin": "Vocaloid",
        "references": [
            ""
        ],
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
                "id": 0,
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Aishite Aishite Aishite",
        "composer": "Kikuo ft. Hatsune Miku",
        "mediaOrigin": "Vocaloid",
        "references": [
            ""
        ],
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
                "id": 0,
                "arrangers": [
                    2
                ],
                "songType": "Large"
            }
        ]
    },
    {
        "name": "The Rumbling",
        "composer": "SiM",
        "from": "Attack on Titan",
        "mediaOrigin": "Anime",
        "references": [
            ""
        ],
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
                "id": 0,
                "songType": "Small"
            }
        ]
    },
    {
        "name": "Ai Scream!",
        "composer": "Ai Furihata, Aguri Ōnishi, & Wakana Okuma",
        "from": "Love Live!",
        "mediaOrigin": "Anime",
        "references": [
            ""
        ],
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
                "id": 0,
                "songType": "Small"
            }
        ]
    }
].map((x, i) => ({...x, id: i}));

const EVENTS = [
    {
        "type": "External",
        "name": "Genshiken Festival 2024",
        "location": "University of Guelph",
        "description": [
            "A one-day anime convention organized by students from a variety of Ontario University Anime Clubs"
        ],
        "start": "2024-03-23|00:00",
        "end": "2024-03-23|23:59",
        "setlist": [
            {
                "id": 3
            },
            {
                "id": 4
            },
            {
                "id": 5
            }
        ]
    },
    {
        "type": "Concert",
        "name": "UT-SAMA 20th Anniversary Event",
        "location": "UTSU Student Commons",
        "address": "230 College Street, Toronto",
        "description": [
            ""
        ],
        "start": "2024-04-04|00:00",
        "end": "2024-04-04|23:59",
        "video": "https://youtu.be/ob0COvRRvDI",
        "setlist": [
            {
                "id": 0
            },
            {
                "id": 3
            },
            {
                "id": 4
            },
            {
                "id": 1
            },
            {
                "id": 5
            },
            {
                "id": 6
            },
            {
                "id": 2
            },
            {
                "id": 7
            },
            {
                "id": 8
            },
            {
                "id": 9
            },
            {
                "id": 10
            }
        ]
    },
    {
        "type": "Concert",
        "name": "October 2024 Concert",
        "location": "The Cat's Eye",
        "address": "150 Charles Street West, Toronto",
        "description": [
            ""
        ],
        "start": "2024-10-04|19:30",
        "end": "2024-10-04|20:30",
        "video": "https://youtu.be/JtuPSpsSQYk",
        "poster": "assets/images/posters/concert 2024-10.webp",
        "setlist": [
            {
                "id": 3,
                "setlistDescription": "Hi"
            },
            {
                "id": 9,
                "setlistDescription": "BYE"
            },
            {
                "id": 4
            },
            {
                "id": 0
            },
            {
                "id": 5
            },
            {
                "id": 6
            },
            {
                "id": 1
            },
            {
                "id": 11
            },
            {
                "id": 8
            },
            {
                "id": 2
            },
            {
                "id": 10
            }
        ],
        "setlistTheme": "Dark Cold"
    },
    {
        "type": "Concert",
        "name": "End of Fall 2024 Concert",
        "location": "The Cat's Eye",
        "address": "150 Charles Street West, Toronto",
        "description": [
            ""
        ],
        "start": "2025-01-24|19:00",
        "end": "2025-01-24|20:30",
        "video": "https://youtu.be/TiStCNPn10s",
        "poster": "assets/images/posters/concert 2025-01.webp",
        "setlist": [
            {
                "id": 13
            },
            {
                "id": 21
            },
            {
                "id": 11
            },
            {
                "id": 20
            },
            {
                "id": 14
            },
            {
                "id": 17
            },
            {
                "id": 16
            },
            {
                "id": 19
            },
            {
                "id": 3
            },
            {
                "id": 4
            },
            {
                "id": 22
            },
            {
                "id": 18
            },
            {
                "id": 23
            },
            {
                "id": 24
            },
            {
                "id": 15
            },
            {
                "id": 25
            },
            {
                "id": 26
            },
            {
                "id": 27
            }
        ],
        "setlistTheme": "Dark Warm"
    },
    {
        "type": "Workshop",
        "name": "Chord Theory Workshop 2025",
        "location": "N/A",
        "description": [
            "???"
        ],
        "start": "2025-02-13|00:00",
        "end": "2025-02-13|23:59",
        "link": "https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2YvcyFBcXRza3RqZjc2MlJqUFVRT1VpTVB0c2N6eXctSlE&id=91ADEFDFD8926CAB%21211600&cid=91ADEFDFD8926CAB"
    },
    {
        "type": "Workshop",
        "name": "Music Production Workshop 2025",
        "location": "OISE 2279",
        "address": "252 Bloor Street West, Toronto",
        "description": [
            "???"
        ],
        "start": "2025-02-27|00:00",
        "end": "2025-02-27|23:59",
        "link": "https://drive.google.com/embeddedfolderview?id=1wguvdNtcvz-foduMNA7m-U_HUemQTCIo"
    },
    {
        "type": "Other",
        "name": "Blind Test 2025",
        "location": "OISE C-154",
        "address": "252 Bloor Street West, Toronto",
        "description": [
            "???"
        ],
        "start": "2025-03-08|00:00",
        "end": "2025-03-08|23:59",
        "link": "https://www.youtube.com/watch?v=0CJ_9BmtAXY"
    },
    {
        "type": "Concert",
        "name": "End of Winter 2025 Concert",
        "location": "OISE G-162",
        "address": "252 Bloor Street West, Toronto",
        "description": [
            "???"
        ],
        "start": "2025-04-07|19:00",
        "end": "2025-04-07|20:30",
        "video": "https://youtu.be/k1CZLnxSWDc",
        "poster": "assets/images/posters/concert 2025-04.webp",
        "setlist": [
            {
                "id": 30,
                "seconds": 136
            },
            {
                "id": 34,
                "seconds": 536
            },
            {
                "id": 32,
                "seconds": 818
            },
            {
                "id": 33,
                "seconds": 1062
            },
            {
                "id": 35,
                "seconds": 1309
            },
            {
                "id": 36,
                "seconds": 1544
            },
            {
                "id": 37,
                "seconds": 1816
            },
            {
                "id": 38,
                "seconds": 2214
            },
            {
                "id": 39,
                "seconds": 2508
            },
            {
                "id": 19,
                "seconds": 2769
            },
            {
                "id": 40,
                "seconds": 3071
            },
            {
                "id": 41,
                "seconds": 3330
            },
            {
                "id": 42,
                "seconds": 3480
            },
            {
                "id": 43,
                "seconds": 3698
            },
            {
                "id": 44,
                "seconds": 4020
            },
            {
                "id": 45,
                "seconds": 4341
            },
            {
                "id": 46,
                "seconds": 4779
            },
            {
                "id": 31,
                "seconds": 5154
            },
            {
                "id": 47,
                "seconds": 5442
            }
        ],
        "setlistTheme": "Light Cold"
    },
    {
        "type": "Workshop",
        "name": "Arranging Workshop 2025",
        "location": "OISE C-154",
        "address": "252 Bloor Street West, Toronto",
        "description": [
            "???"
        ],
        "start": "2025-11-09|00:00",
        "end": "2025-11-09|23:59"
    },
    {
        "type": "External",
        "name": "RCAG Studio Night 2025",
        "location": "N/A",
        "description": [
            "???"
        ],
        "start": "2025-11-13|00:00",
        "end": "2025-11-13|23:59",
        "setlist": [
            {
                "id": 50
            },
            {
                "id": 51
            }
        ]
    },
    {
        "type": "Concert",
        "name": "End of Fall 2025 Concert",
        "location": "OISE G-162",
        "address": "252 Bloor Street West, Toronto",
        "description": [
            "???"
        ],
        "start": "2025-11-29|18:00",
        "end": "2025-11-29|21:00",
        "video": "https://youtu.be/wuObU4_nbtI",
        "poster": "assets/images/posters/concert 2025-11.webp",
        "setlist": [
            {
                "id": 51,
                "seconds": 0
            },
            {
                "id": 52,
                "seconds": 244
            },
            {
                "id": 53,
                "seconds": 556
            },
            {
                "id": 54,
                "seconds": 839
            },
            {
                "id": 55,
                "seconds": 1096
            },
            {
                "id": 56,
                "seconds": 1262
            },
            {
                "id": 57,
                "seconds": 1426
            },
            {
                "id": 58,
                "seconds": 1658
            },
            {
                "id": 59,
                "seconds": 1923
            },
            {
                "id": 60,
                "seconds": 2095
            },
            {
                "id": 61,
                "seconds": 2327
            },
            {
                "id": 62,
                "seconds": 2743
            },
            {
                "id": 63,
                "seconds": 3025
            },
            {
                "id": 64,
                "seconds": 3249
            },
            {
                "id": 50,
                "seconds": 3390
            },
            {
                "id": 65,
                "seconds": 3574
            },
            {
                "id": 66,
                "seconds": 3863
            },
            {
                "id": 67,
                "seconds": 4105
            },
            {
                "id": 68,
                "seconds": 4280
            },
            {
                "id": 69,
                "seconds": 4434
            },
            {
                "id": 70,
                "seconds": 4892
            },
            {
                "id": 71,
                "seconds": 5087
            },
            {
                "id": 72,
                "seconds": 5392
            },
            {
                "id": 73,
                "seconds": 5616
            }
        ],
        "setlistTheme": "Light Warm"
    },
    {
        "type": "External",
        "name": "Hemoglobal Connect Benefit Concert 2026",
        "location": "Trinity-St. Paul's United Church",
        "description": [
            "???"
        ],
        "start": "2026-01-23|18:00",
        "end": "2026-01-23|20:00"
    },
    {
        "type": "Workshop",
        "name": "Sound Equipment Workshop 2026",
        "location": "OISE 5240",
        "description": [
            "???"
        ],
        "start": "2026-01-30|16:30",
        "end": "2026-01-30|??:??",
        "link": "https://drive.google.com/drive/u/1/folders/17TCYimDsYM7geN6iW4BXvJzsWnKGCPMv"
    },
    {
        "type": "Concert",
        "name": "Tunes & Treats 2026 Concert",
        "location": "OISE C-154",
        "description": [
            "???"
        ],
        "address": "252 Bloor Street West, Toronto",
        "start": "2026-03-06|18:00",
        "end": "2026-03-06|21:00",
        "poster": "assets/images/posters/concert 2026-03.webp",
        "setlist": [
            {
                "id": 74,
                "url": "youtu.be/FQG_6O1DpPI"
            },
            {
                "id": 75,
                "url": "youtu.be/yLPmJX9PT-s"
            },
            {
                "id": 76,
                "url": "youtu.be/tWwNLzy9S44"
            },
            {
                "id": 77
            },
            {
                "id": 78
            },
            {
                "id": 79
            },
            {
                "id": 80
            },
            {
                "id": 81
            },
            {
                "id": 52
            },
            {
                "id": 82
            },
            {
                "id": 83
            },
            {
                "id": 84
            },
            {
                "id": 85
            },
            {
                "id": 86
            },
            {
                "id": 87
            },
            {
                "id": 88
            },
            {
                "id": 89
            },
            {
                "id": 90
            },
            {
                "id": 91
            },
            {
                "id": 92
            },
            {
                "id": 93
            },
            {
                "id": 94
            }
        ],
        "setlistTheme": "Light Cold",
        "setlistStylizedTitle": "Tunes & Treats",
        "link": "https://drive.google.com/drive/u/1/folders/17TCYimDsYM7geN6iW4BXvJzsWnKGCPMv"
    },
    {
        "type": "Concert",
        "name": "Succession 2026 Concert",
        "location": "OISE G-162",
        "address": "252 Bloor Street West, Toronto",
        "description": [
            "???"
        ],
        "start": "2026-04-05|17:00",
        "end": "2026-04-05|20:00",
        "poster": "assets/images/posters/concert 2026-04.webp",
        "setlist": [
            {
                "id": 95
            },
            {
                "id": 96
            },
            {
                "id": 97
            },
            {
                "id": 98
            },
            {
                "id": 99
            },
            {
                "id": 100
            },
            {
                "id": 101
            },
            {
                "id": 102
            },
            {
                "id": 103
            },
            {
                "id": 104
            },
            {
                "id": 105
            },
            {
                "id": 106
            },
            {
                "id": 107
            },
            {
                "id": 108
            },
            {
                "id": 109
            },
            {
                "id": 110
            },
            {
                "id": 111
            },
            {
                "id": 112
            },
            {
                "id": 113
            },
            {
                "id": 114
            },
            {
                "id": 115
            },
            {
                "id": 116
            },
            {
                "id": 117
            },
            {
                "id": 82
            },
            {
                "id": 118
            },
            {
                "id": 119
            },
            {
                "id": 120
            },
            {
                "id": 121
            },
            {
                "id": 122
            },
            {
                "id": 123
            }
        ],
        "setlistTheme": "Dark Cold",
        "setlistStylizedTitle": "Succession"
    }
].map((x, i) => ({...x, id: i}));

const FAQ = [
    {
        "q": "Is LMC only for University of Toronto students?",
        "a": [
            "No. While most LMC members are UofT St. George students, individuals of any background are free to join as long as they can physically play with us. Members unable to commute to campus are encouraged to participate online through online events and projects, which we upload to our YouTube channel."
        ]
    },
    {
        "q": "Does it cost money to join LMC? Do I need to join UT-SAMA to join LMC?",
        "a": [
            "It is free to join and attend LMC rehearsals and smaller events like workshops; however, performing at an LMC-organized concert requires purchasing a UT-SAMA membership. This fee helps us cover venue costs and rent equipment like microphones, cables, and mixers.",
            "You can find more information on UT-SAMA membership costs and perks [here](https://docs.google.com/document/d/1iVwZj_iTLKUyEsz1Sg3CfRNYWkqG4CtydlkU-SGI_Zs/edit?tab=t.0). LMC operates independently from UT-SAMA so you do not have to interact with the main club even as a UT-SAMA member."
        ]
    },
    {
        "q": "When and where is LMC active? When can I join?",
        "a": [
            "LMC operates during UofT's fall and winter semesters (September to April) at the St. George campus. The best way to get a feel for the club is at the University [club fair](https://www.utsu.ca/orientation/) every August or during our first meeting of the term (typically in early September/January), where instructions for signup will be shown.",
            "Joining at other times is allowed but it comes with less time and opportunities to form/join ensembles and rehearse for concerts. Signups for some songs may also close."
        ]
    },
    {
        "q": "Are there auditions? Do I need to be skilled with an instrument?",
        "a": [
            "No. People of any skill level are welcome in LMC as long as they are motivated to play music with others. However, LMC will not teach you to how to play your instrument, so you are expected to learn your own parts.",
            "LMC-coordinated music (\"large ensembles\") is open to everyone but signups close quickly to allow rehearsals to begin promptly. Skill requirements vary per song: it is highly encouraged to talk to large ensemble leads about part difficulty if you’re interested. Smaller ensembles headed by individual members may accept new members at their own discretion."
        ]
    },
    {
        "q": "Does LMC provide instruments or musical equipment?",
        "a": [
            "By default, LMC rehearses in practice spaces with at least one piano. The only equipment that the club actually owns is one microphone; most equipment is generously lent to us by several members for the academic year. We try to have at least one drum kit, amps, and cables available, but please ask the current LMC execs about club inventory.",
            "LMC does not own music stands or spare instruments.",
            "If you would like to keep some equipment in a secure space on campus, please also reach out to one of the LMC Execs."
        ]
    },
    {
        "q": "How much time would I be expected to commit to LMC?",
        "a": [
            "Your expected time commitment depends on your skill level as well as the number of songs you choose to participate in. Different groups will form their own rehearsal schedules and expectations.",
            "If you participate in large ensemble rehearsals, you'll be expected to attend all rehearsals (~1 hour every 2 weeks per song, plus potential dress rehearsals) or at least be able to perfectly play your part. On the other hand, online recording projects are easiest on time commitment since there are no deadlines."
        ]
    },
    {
        "q": "What are the logistics of live rehearsals and recording projects?",
        "a": [
            "Large ensemble songs are suggested and voted by LMC members, then decided and arranged at the beginning of the fall/winter semester. People are assigned to songs based on preference and attend weekly rehearsals. Concerts for large ensembles are held at the end of the academic term before exams start.",
            "Interest for small ensemble songs, either for live performances or for recording, is found in the Discord server at #light-music-club-forum. Members may also reach out to each other via DMs or in-person. An ensemble head is assigned to coordinates with the execs to schedule rehearsals, plan concert appearances, create arrangements, find video editors, etc."
        ]
    },
    {
        "q": "What sorts of club activities does LMC organize?",
        "a": [
            "LMC has historically organized workshops, such as for teaching music theory and music production, as well as karaokes, sight-reading challenges, and dinners. We are always open to suggestions for future event ideas!"
        ]
    },
    {
        "q": "I compose/arrange music. Can LMC play my piece?",
        "a": [
            "LMC is always looking for people who can arrange music! We are happy to help arrangers find willing performers for their music, but in return we ask that they help with arranging large ensemble pieces if needed.",
            "Composed music has been played at LMC before and is welcome. However, you should consider how thematically similar your music is to typical LMC genres, as it would be performed in a LMC concert."
        ]
    },
    {
        "q": "I don't play an instrument (or don't want to), but I can do XXX. Can I still join?",
        "a": [
            "LMC has an acute supply of arrangers, illustrators, audio mixers/engineers, video editors, web developers, and photographers. If you have any of these skillsets, we’d be very happy to work with you! If you think you could contribute to LMC in any other way, please let the LMC execs know.",
            "On the music side, LMC has historically suffered from lack of tenor/bass instruments like violas, cellos, bassoons, and trombones. Any players are highly-encouraged to join us."
        ]
    }
].map((x, i) => ({...x, id: i}));

const RESOURCES = [
    {
        "type": "LMC",
        "name": "Sheet Music Archive",
        "description": "All past large ensemble LMC music",
        "link": "https://drive.google.com/drive/u/3/folders/1wguvdNtcvz-foduMNA7m-U_HUemQTCIo"
    },
    {
        "type": "LMC",
        "name": "Materials",
        "description": "Workshops, slides, etc.",
        "link": "https://drive.google.com/drive/u/3/folders/1wguvdNtcvz-foduMNA7m-U_HUemQTCIo"
    },
    {
        "type": "General",
        "name": "Tuner",
        "description": "Intonation",
        "link": "https://tuner.ninja/"
    },
    {
        "type": "General",
        "name": "Metronome",
        "description": "Timing",
        "link": "https://www.musicca.com/metronome"
    },
    {
        "type": "General",
        "name": "muted.io",
        "description": "Miscellaneous tools and diagrams. Chords, intervals, fretboards, tuners, etc.",
        "link": "https://muted.io/"
    },
    {
        "type": "General",
        "name": "Musescore",
        "description": "Online sheet music repository.",
        "link": "https://musescore.com/"
    },
    {
        "type": "Arranging",
        "name": "Vienna Symphonic Library",
        "description": "Orchestra instrument wiki",
        "link": "https://www.vsl.co.at/academy"
    },
    {
        "type": "Arranging",
        "name": "Orchestration Online",
        "description": "Orchestration video lessons",
        "link": "https://www.youtube.com/@OrchestrationOnline/videos"
    },
    {
        "type": "Arranging",
        "name": "Instrument Studies for Eyes and Ears",
        "description": "Orchestra instrument audio guide",
        "link": "https://isfee.music.indiana.edu/"
    },
    {
        "type": "Arranging",
        "name": "Young Person’s Guide to the Orchestra",
        "description": "Orchestral piece featuring all instruments",
        "link": "https://www.youtube.com/watch?v=rbUbx9cJPX0"
    },
    {
        "type": "Arranging",
        "name": "Drum-Writing Guide #1",
        "description": "By 8-bit Music Theory",
        "link": "https://www.youtube.com/watch?v=FoMmVlAvjmM"
    },
    {
        "type": "Arranging",
        "name": "Drum-Writing Guide #2",
        "description": "By 12tone",
        "link": "https://www.youtube.com/watch?v=MdOV8I4n6v8"
    },
    {
        "type": "Music Theory",
        "name": "Adam Neely",
        "description": "Video essays, music theory",
        "link": "https://www.youtube.com/@AdamNeely/videos"
    },
    {
        "type": "Music Theory",
        "name": "Cadence Hira",
        "description": "Music theory concepts explained through video game music",
        "link": "https://www.youtube.com/@CadenceHira/videos"
    },
    {
        "type": "Music Theory",
        "name": "8-bit Music Theory",
        "description": "Analyses of video game music",
        "link": "https://www.youtube.com/@8bitMusicTheory/videos"
    },
    {
        "type": "Music Theory",
        "name": "12tone",
        "description": "Music theory",
        "link": "https://www.youtube.com/@12tone/videos"
    },
    {
        "type": "Music Theory",
        "name": "David Bruce",
        "description": "Classical music and music theory",
        "link": "https://www.youtube.com/@DBruce/videos"
    },
    {
        "type": "Music Theory",
        "name": "Japanese Pop Music Cliches",
        "description": "Music theory of J-pop music",
        "link": "https://www.youtube.com/watch?v=-IyBwwMkw90"
    },
    {
        "type": "Music Production",
        "name": "Jazen Sounds",
        "description": "Tutorials on sound design & creating electronic music instruments",
        "link": "https://www.youtube.com/@jazensounds453/videos"
    },
    {
        "type": "Music Production",
        "name": "Synthet",
        "description": "Short videos on music production in digital audio workstations",
        "link": "https://www.youtube.com/@synthet7/videos"
    }
].map((x, i) => ({...x, id: i}));

const LINKS = {
    "formUTSAMA": "https://docs.google.com/forms/d/e/1FAIpQLSfWb-du-EgTdqi19aOW4tSGwe0i6YVbJp_AzfeVhxrHfowsPw/viewform",
    "formNewMember": "https://docs.google.com/forms/d/e/1FAIpQLSfNEoh9rA4vCyZd9dz-yV35tpFnqDVq3yWQvJjz0NlGMqZ9-Q/viewform",
    "linkPlaylist": "#",
    "embedSheetMusic": "https://drive.google.com/embeddedfolderview?id=1wguvdNtcvz-foduMNA7m-U_HUemQTCIo",
    "embedSchedule": "https://calendar.google.com/calendar/embed?src=utsama.lightmusicclub%40gmail.com&ctz=America%2FToronto",
    "embedLargeEnsembleLocation": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1443.0128620829312!2d-79.39986402188697!3d43.66843482050036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b35e3e82fb861%3A0xef695b0943f77b70!2sOISE%20Library!5e0!3m2!1sen!2sca!4v1756700291348!5m2!1sen!2sca",
    "descriptionLargeEnsemble": [
        "Large ensemble rehearsals take place at the Ontario Institute for Studies in Education (OISE) at 252 Bloor Street West, in room C-154 underground.",
        "The building is directly connected to the subway via the Bedford Road exit at St. George station, which leads to floor C. There is also vehicle parking and bicycle parking. See the <a href=\"https://www.oise.utoronto.ca/about/cao/OISEBuildingAccess\" target=\"_blank\">OISE website</a> for details and <a href=\"https://www.classfind.com/toronto/room/OIC154\" target=\"_blank\">this website</a> for visual directions.",
        "LMC observes UofT time, with rehearsals starting 10 minutes after scheduled. The first 10 minutes should be used for setting up your instrument and warming up."
    ]
};

const CAROUSEL = [
    {
        "url": "assets/images/carousel/carousel 2025-04.webp",
        "caption": "End of Winter Concert <b>2025/04</b>",
        "anchor": [
            0.52,
            0.6
        ]
    },
    {
        "url": "assets/images/carousel/carousel 2026-04.webp",
        "caption": "Tunes & Treats <b>2026/04</b>",
        "anchor": [
            0.52,
            0.5
        ]
    },
    {
        "url": "assets/images/carousel/carousel 2025-01.webp",
        "caption": "End of Fall Concert <b>2025/01</b>",
        "anchor": [
            0.6,
            0.7
        ]
    }
].map((x, i) => ({...x, id: i}));

const EXEC_PICTURES = {};

const GALLERY = [
    {
        "link": "assets/images/carousel/carousel 2025-01.webp",
        "caption": "Test 1"
    },
    {
        "link": "assets/images/carousel/carousel 2025-04.webp",
        "caption": "Test 2"
    },
    {
        "link": "assets/images/carousel/carousel 2026-04.webp",
        "caption": "Test 3"
    },
    {
        "link": "assets/images/carousel/carousel 2025-01.webp",
        "caption": "Test 4"
    },
    {
        "link": "assets/images/carousel/carousel 2025-04.webp",
        "caption": "Test 5"
    }
].map((x, i) => ({...x, id: i}));
