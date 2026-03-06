/*********************************************************************
Helper Functions
*********************************************************************/
function assert(condition, errorMessage) {
    if (!condition) {
        throw new Error(errorMessage);
    }
}
function cssGetId(id) {
    const result = document.getElementById(id);
    if (!result)
        throw new Error(`Invalid id ${id}`);
    return result;
}
function cssGetClass(className) {
    return document.getElementsByClassName(className);
}
function cssGetFirst(query) {
    const result = document.querySelector(query);
    if (!result)
        throw new Error(`Invalid query ${query}`);
    return result;
}
function cssGetAll(query) {
    const result = document.querySelectorAll(query);
    if (!result)
        throw new Error(`Invalid query ${query}`);
    return result;
}
function cssSetId(id, properties) {
    const element = cssGetId(id);
    for (const key in properties) {
        element.style.setProperty(key, properties[key]);
    }
}


/*********************************************************************
Data
*********************************************************************/
const SONGS = [
    {
        name: 'Misty',
        by: 'Erroll Garner',
        group: 'LMC Jazz Group',
        performers: {
            'Vocals': ['Carmen'],
            'Alto Saxophone': ['Rylen', 'Simba'],
            'Piano': ['Mike'],
            'Bass Guitar': ['Emmett'],
            'Drums': ['Julian']
        }
    },
    {
        name: 'Mr. Eclectic',
        by: 'Laufey',
        group: 'LMC Jazz Group',
        performers: {
            'Vocals': ['Kasey'],
            'Acoustic Guitar': ['Mike'],
            'Bass Guitar': ['Emmett'],
            'Drums': ['Julian']
        }
    },
    {
        name: "Isn't She Lovely",
        by: 'Stevie Wonder',
        group: 'LMC Jazz Group',
        performers: {
            'Vocals': ['Carmen'],
            'Alto Saxophone': ['Rylen', 'Simba'],
            'Piano': ['Mike'],
            'Electric Guitar': ['Jimin'],
            'Bass Guitar': ['Emmett'],
            'Drums': ['Julian']
        }
    },
    {
        name: 'Hit the Road, Jack',
        by: 'Ray Charles',
        arranger: 'Mike',
        performers: {
            'Vocals': ['Emma'],
            'Piano': ['Mike'],
            'Electric Guitar': ['Kae', 'Emmett'],
            'Bass Guitar': ['Sophia'],
            'Drums': ['Julian']
        }
    },
    {
        name: 'September',
        by: 'Earth, Wind & Fire',
        group: 'New Resonance Choir',
        performers: {
            'Vocals': ['Alice', 'Emily', 'Fiona', 'Nicholas', 'Gabriel', 'David', 'Bernice', 'Juliana', 'Emiri']
        }
    },
    {
        name: 'Somewhere Only We Know',
        by: 'Keane',
        group: 'New Resonance Choir',
        performers: {
            'Vocals': ['Alice', 'Emily', 'Fiona', 'Nicholas', 'Gabriel', 'David', 'Bernice', 'Juliana', 'Emiri']
        }
    },
    {
        name: 'What It Sounds Like',
        by: 'HUNTR/X',
        from: 'KPop Demon Hunters',
        group: 'New Resonance Choir',
        performers: {
            'Vocals': ['Alice', 'Emily', 'Fiona']
        }
    },
    {
        name: 'Landslide',
        by: 'Fleetwood Mac (Tiny Habits ver.)',
        group: 'New Resonance Choir',
        performers: {
            'Vocals': ['Nicholas', 'Gabriel', 'David', 'Bernice', 'Juliana', 'Emiri']
        }
    },
    {
        name: 'AM4:50',
        by: 'downt',
        group: '2roup 2',
        performers: {
            'Vocals': ['Alexis'],
            'Electric Guitar': ['Robin', 'Alexis'],
            'Bass Guitar': ['Tyrone'],
            'Drums': ['Jimin']
        }
    },
    {
        name: 'Layla',
        by: 'yotsudomenoddy',
        group: '2roup 2',
        performers: {
            'Vocals': ['Alexis'],
            'Electric Guitar': ['Robin', 'Alexis'],
            'Bass Guitar': ['Tyrone'],
            'Drums': ['Jimin']
        }
    },
    {
        name: 'Iron Lotus',
        by: 'Mili',
        from: 'Library of Ruina',
        performers: {
            'Vocals': ['Kadin'],
            'Piano': ['Michelle']
        }
    },
    {
        name: 'Gone Angels',
        by: 'Mili',
        from: 'Library of Ruina',
        performers: {
            'Vocals': ['Kadin'],
            'Piano': ['Michelle']
        },
        description: "Exhausted? Tired. Want rest? Hungry. Want out?"
    },
    {
        name: 'Concerto 1',
        by: 'Peter Wang (original piece)',
        performers: {
            'Piano': ['Peter Wang']
        }
    },
    {
        name: 'Relationship',
        by: 'Kent Watari',
        from: 'Link Click',
        arranger: 'Rylen',
        performers: {
            'Clarinet': ['Rylen'],
            'Piano': ['Johnathan'],
            'Violin': ['Kai', 'Sean'],
            'Trombone': ['Eloyse']
        },
        description: "A beautiful piece from the Link Click (时光代理人) Season 2 OST."
    },
    {
        name: "Isabella's Lullaby",
        by: 'Takahiro Obata',
        from: 'The Promised Neverland',
        arranger: 'Rylen',
        performers: {
            'Vocals': ['Kasey'],
            'Piano': ['Andrew'],
            'Clarinet': ['Rylen'],
            'Violin': ['Kai', 'Lui']
        },
        description: "A gentle melody from The Promised Neverland OST."
    },
    {
        name: 'ODDS&ENDS',
        by: 'ryo (supercell) ft. Hatsune Miku',
        group: '39!',
        performers: {
            'Vocals': ['Zachary'],
            'Piano': ['Raekye'],
            'Electric Guitar': ['Will'],
            'Bass Guitar': ['Sophia'],
            'Drums': ['Jenna']
        },
        description: "This song is originally produced by ryo (supercell), about his life and struggles being recognized while composing and producing through Vocaloid."
    },
    {
        name: 'Moonsetter',
        by: 'Toby Fox',
        from: 'Homestuck',
        arranger: 'Richard',
        performers: {
            'Piano': ['Angelina'],
            'Violin': ['Lui', 'Ze'],
            'Clarinet': ['Rylen']
        },
        description: "Composed by the creator of Undertale and Deltarune. Homestuck is an interactive webcomic that you can read for free <a href='https://homestuck.com/' target='_blank'>here</a>."
    },
    {
        name: 'Yuri on Ice',
        by: 'Taro Umebayashi',
        from: 'Yuri!!! on ICE',
        arranger: 'Richard',
        performers: {
            'Piano': ['Raekye'],
            'Drums': ['Julian'],
            'Violin': ['Lui'],
            'Flute': ['Richard'],
            'Clarinet': ['Rylen']
        },
        description: "Featuring our amazing pianist Raekye 👍"
    },
    {
        name: `Don't Say "Lazy"`,
        by: 'Ho-kago Tea Time',
        from: 'K-On!',
        performers: {
            'Piano': ['Johnathan']
        },
        description: "A banger 😎"
    },
    {
        name: 'Bartender',
        by: 'Ngọt',
        group: 'Super Sentai',
        performers: {
            'Vocals': ['Kae'],
            'Piano': ['Mike'],
            'Electric Guitar': ['Kae', 'Emmett'],
            'Bass Guitar': ['Sophia'],
            'Drums': ['Julian']
        },
        description: "A late-night attempt to forget about things for a while"
    },
    {
        name: 'Mất Tích',
        by: 'Ngọt',
        group: 'Super Sentai',
        performers: {
            'Vocals': ['Kae', 'Sophia'],
            'Piano': ['Mike'],
            'Electric Guitar': ['Kae'],
            'Bass Guitar': ['Emmett'],
            'Drums': ['Julian']
        },
        description: "When you're surrounded by people, yet feel invisible"
    },
    {
        name: 'Mơ Làm Ma',
        by: 'Ngọt ft. Thỏ Trauma',
        group: 'Super Sentai',
        performers: {
            'Vocals': ['Kae', 'Sophia'],
            'Electric Guitar': ['Mike'],
            'Bass Guitar': ['Emmett'],
            'Drums': ['Julian']
        },
        description: "If you're already a ghost, why not haunt the place?"
    }
]
function mergePerformers(arr) {
    const sets = arr.reduce((acc, o) => {
        for (const [k, vals] of Object.entries(o)) {
            const set = acc[k] ??= new Set();
            for (const v of vals) {
                set.add(v);
            }
        }
        return acc;
    }, {});

    const merged = Object.fromEntries(
        Object.entries(sets).map(([k, s]) => [k, [...s]])
    );
    return merged;
}
function removePerformers(obj, remove) {
    const removeSet = new Set(remove);
    for (const key in obj) {
        obj[key] = obj[key].filter(x => !removeSet.has(x))
    }
}


/*********************************************************************
Setlist captions
*********************************************************************/
function handleClick(event) {
    const className = 'setlist-caption-active';
    const active = cssGetClass(className);
    if (active.length > 0) {
        // If clicking in a button, do nothing
        for (const element of cssGetAll('.setlist-right button')) {
            if (element.contains(event.target)) {
                return;
            }
        }
        active[0].classList.remove(className);
    }
}
function toggleSetlistCaption(element) {
    const dl = element.children[2];
    const className = 'setlist-caption-active';
    const active = cssGetClass(className);
    if (active.length > 0 && !Array.from(dl.classList).includes(className)) {
        active[0].classList.remove(className);
    }
    dl.classList.toggle(className);
}


/*********************************************************************
Data injection
*********************************************************************/
function construct(json) {
    const element = document.createElement(json.element);
    if (json.attributes) {
        for (const key in json.attributes) {
            element.setAttribute(key, json.attributes[key]);
        }
    }
    if (json.classes) {
        for (const name of json.classes) {
            element.classList.add(name);
        }
    }
    if (json.id) {
        element.id = id;
    }
    if (json.innerText) {
        element.innerText = json.innerText;
    }
    if (json.innerHTML) {
        element.innerHTML = json.innerHTML;
    }
    if (json.children) {
        for (const child of json.children) {
            element.appendChild(construct(child));
        }
    }
    return element;
}

async function constructPerformers() {
    const PERFORMERS = mergePerformers(SONGS.map(x => x.performers));
    const choir = Array.from(new Set(SONGS.filter(x => x.group === 'New Resonance Choir').map(x => x.performers.Vocals).flat()));
    removePerformers(PERFORMERS, choir);
    PERFORMERS['New Resonance Choir'] = choir;

    const table = cssGetId('credits-table');
    const sorted = Object.entries(PERFORMERS).sort((a, b) => a[0].localeCompare(b[0]));

    for (const [name, performers] of sorted) {
        const html = {
            element: 'div',
            classes: ['credits-group'],
            children: [
                {
                    element: 'h3',
                    innerText: name
                },
                {
                    element: 'span',
                    children: performers.sort().map(name => ({
                        element: 'p',
                        innerText: name
                    }))
                }
            ]
        }
        table.appendChild(construct(html));
    }
}

async function constructSetlist() {
    const setlist = cssGetId('setlist');

    const hr = {
        element: 'hr',
        classes: ['setlist-hr']
    };

    for (let i = 0; i < SONGS.length; i++) {
        const song = SONGS[i];
        const songNum = i + 1;

        const description = song.description ? [{
            element: 'p',
            classes: ['setlist-desc'],
            innerHTML: song.description
        }] : [];

        const group = song.group ? [{
            element: 'p',
            innerText: song.group
        }] : [];

        const performers = [];
        const sorted = Object.entries(song.performers).sort((a, b) => a[0].localeCompare(b[0]))
        for (const [instrument, names] of sorted) {
            for (const name of names) {
                performers.push({
                    element: 'dt',
                    innerText: instrument
                }, {
                    element: 'dd',
                    innerText: name
                })
            }
        }

        const html = {
            element: 'article',
            classes: ['setlist-item'],
            children: [
                {
                    element: 'div',
                    classes: ['setlist-title'],
                    children: [
                        {
                            element: 'hgroup',
                            classes: ['setlist-left'],
                            children: [
                                {
                                    element: 'h2',
                                    innerText: song.name
                                },
                                {
                                    element: 'h3',
                                    innerText: `// ${songNum < 10 ? `0${songNum}` : songNum}`
                                },
                                {
                                    element: 'p',
                                    innerText: song.arranger ? `By ${song.by} (arr. ${song.arranger})` : `By ${song.by}`
                                },
                                {
                                    element: 'p',
                                    innerText: song.from ? `From ${song.from}` : undefined
                                }
                            ]
                        },
                        {
                            element: 'div',
                            classes: ['setlist-right'],
                            children: [
                                {
                                    element: 'button',
                                    attributes: {
                                        onclick: "toggleSetlistCaption(this)"
                                    },
                                    children: [
                                        {
                                            element: 'img',
                                            attributes: {
                                                src: "assets/icons/users.svg"
                                            }
                                        },
                                        {
                                            element: 'span',
                                            innerText: 'Show Performers'
                                        },
                                        {
                                            element: 'dl',
                                            children: performers
                                        }
                                    ]
                                },
                                ...group
                            ]
                        }
                    ]
                },
                ...description
            ]
        }
        setlist.appendChild(construct(html));
        setlist.appendChild(construct(hr));
    }
}

constructPerformers();
constructSetlist();