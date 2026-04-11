const NOTIFICATIONS = [

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

const MEMBERS = [
    {
        id: 4,
        name: 'Mike',
        joined: '2023-01',
        left: null,
        picture: null,
        tags: [
            'Piano',
            'Arranger',
            'Executive (2025)'
        ],
        socialMedia: {
            discord: ['@pixelatedmike'],
        }
    },
    {
        id: 3,
        name: 'Aedhan',
        joined: '2023-01',
        left: '2025-09',
        tags: [
            'Voice',
            'Executive (2024)'
        ],
        socialMedia: {
            discord: ['@Amako']
        }
    },
    {
        id: 2,
        name: 'Sean',
        joined: '2023-01',
        left: null,
        picture: null,
        tags: [
            'Piano',
            'Violin',
            'Arranger',
            'Executive (2023, 2025)'
        ],
        socialMedia: {
            discord: ['@amoguus']
        }
    },
    {
        id: 1,
        name: 'Alexis',
        joined: '2023-01',
        left: '2025-09',
        tags: [
            'Bass Guitar',
            'Executive (2023, 2024)'
        ],
        socialMedia: {
            discord: ['@alpurposeflour']
        }
    },
    {
        id: 0,
        name: 'Stone',
        joined: '2023-01',
        left: '2025-09',
        tags: [
            'Drums',
            'Bass Guitar',
            'Electric Guitar',
            'Executive (2023)'
        ],
        socialMedia: {
            discord: ['@imkonfusedauhrg']
        }
    },
]

const FAQ = [
    {
        q: 'Is LMC only for University of Toronto students?',
        a: [
            'No. While most LMC members are UofT St. George students, individuals of any background are free to join as long as they can physically play with us. Members unable to commute to campus are encouraged to participate online through online events and recording projects, which we upload to our YouTube channel.'
        ]
    },
    {
        q: 'Is LMC free to join? Do I need to join UT-SAMA to join LMC?',
        a: [
            'It is free to join and attend LMC rehearsals and smaller events like workshops; however, performing at an LMC-organized concert requires purchasing a UT-SAMA membership. This fee helps us cover venue costs and rent equipment like microphones, cables, and mixers.',
            'You can find more information on UT-SAMA membership costs and perks [here](https://docs.google.com/document/d/1iVwZj_iTLKUyEsz1Sg3CfRNYWkqG4CtydlkU-SGI_Zs/edit?tab=t.0). LMC operates independently from UT-SAMA so you do not have to interact with the main club even as a UT-SAMA member.'
        ]
    },
    {
        q: 'When is LMC active? When can I join?',
        a: [
            `LMC operates during UofT's fall and winter semesters (September to April). The best way to get a feel for the club and sign up is at the University [club fair](https://www.utsu.ca/orientation/) every August or during our first meeting of the term (typically in early September/January).`,
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
            "LMC is always looking for people who can arrange music! We are happy to help arrangers find willing performers for their music, but in return we also ask that they help with arranging large ensemble pieces if needed.",
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
    'calendar': '',

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
