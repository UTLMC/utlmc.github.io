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
    ]
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
        }
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
            discord: ['@pixellatedmike'],
        }
    },
    {
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
        name: 'Alexis',
        joined: '2023-01',
        left: '2025-09',
        tags: [
            'Bass Guitar',
            'Executive (2023, 2024)'
        ],
        socialMedia: {
            discord: ['alpurposeflour']
        }
    }
]

const SUBGROUPS = [
    {
        name: 'Dark Music Club',
        leader: 'Nootnoot Dootman',
        created: '2025-05',
        openToJoin: true,
        lookingFor: ['Bass Guitar', 'Voice'],
        description: 'We are a rock band and we like to perform anime OPS or something.'
    },
    {
        name: 'LMC Orchestra',
        leader: 'I dunno',
        created: '2024-01',
        openToJoin: false,
        lookingFor: [],
        description: 'We play orchestral pieces from video games like XX and YY or from anime like ZZ and WW.'
    }
]

const FAQ = [
    {
        question: 'Is LMC only for University of Toronto students?',
        answer: [
            'Though we’re mostly comprised of students from UofT, students from any campus and any university (worldwide? just Toronto?) is fine, but you’ll have to be able to reach St. George Campus to participate in weekly rehearsals and other live events. Otherwise, remote recordings.'
        ]
    },
    {
        question: 'When is LMC active? When can I join?',
        answer: [
            "LMC activities are built around the University of Toronto's Fall-Winter semesters. We boot up in September (with club fairs and other announcements in late August), hold weekly rehearsals, and usually perform at the end of each semester (December and April).",
            "[WHEN ARE PEOPLE ALLOWED TO JOIN LMC?]"
        ]
    },
    {
        question: 'Are there auditions? Do I need to be skilled with an instrument?',
        answer: [
            'There are no auditions. People of any skill level, from beginner to professional musician, are welcome to join LMC. We however have no formal system for teaching how to play instruments, so technical improvement on your instrument can only be self-guided.'
        ]
    },
    {
        question: 'Does LMC provide instruments or musical equipment?',
        answer: [
            'LMC has a single electric drum kit (borrowed from XXX) for use in rehearals as well as a small locker (??), but we unfortunately do not have any budget, so there are no storage spaces or equipment like music stands.'
        ]
    },
    {
        question: 'How much time would I be expected to commit to LMC?',
        answer: [
            "Your expected time commitment depends on your skill level as well as the number of songs you choose to participate in. If you participate in large ensemble rehearsals, you'll be expected to attend all rehearsals (typically 1 hour / week for each song, although we may hold more rehearsals before the concert) or at least be able to perfectly play your part of the piece. Different subgroups will form their own rehearsal schedules and expectations. Online recording projects are generally easiest on time commitment, as they are remote and recordings can be done any time over a few months.",
        ]
    },
    {
        question: 'What are the logistics of live rehearsals and recording projects?',
        answer: [
            'Large ensemble songs are suggested and voted on typically during the end of winter term or summer, then announced at the beginning of the fall semester. People are assigned into different songs based on a form of their preferences, and attend weekly rehearsals. More rehearsals may be held before the concert.',
            'Interest for small ensemble pieces, either live projects or online recording projects, is decided in the Discord server at #<channel-name or by people reaching out to each other by DMs or in-person. After speaking with the execs, a group is created and a song head, who will organize rehearsals, arrangements, video editing, etc. in coordination with the execs. Groups can choose to perform or screen their videos at concerts.',
        ]
    },
    {
        question: 'What sorts of club activities does LMC organize?',
        answer: [
            'LMC has historically organized workshops for teaching music theory and music production as well as karaokes during reading week and dinners after concerts. We hope to organize more activities in the future based on what our members are interested in.',
        ]
    },
    {
        question: 'I compose/arrange music. Can LMC play my piece?',
        answer: [
            "Arrangers are of great importance for giving LMC a repertoire to perform! [I'm not actually sure - would they have to suggest their piece in votes?] Keep in mind we typically focus on music from video games, anime or J-pop, so that type of music will be prioritized.",
        ]
    },
    {
        question: "I don't play an instrument (or don't want to), but I can do XXX. Can I still join?",
        answer: [
            "Apart from musicians, LMC also has an acute supply of (and is very interested in) arrangers, illustrators (for thumbnails and branding), audio mixers, audio engineers, and video editors, so we'd be very interested if you have these skillsets. If you don't but you think you could contribute to LMC, contact XXX and we'll let you know.",
        ]
    }
]