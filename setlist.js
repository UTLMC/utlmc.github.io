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
        name: 'Fukashigi no Karte',
        by: 'fox capture plan',
        from: 'Rascal Does Not Dream of Bunny Girl Senpai',
        arranger: 'Michael Kim',
        performers: {
            'Vocals': ['Crystal Y.', 'Eric H.',  'miluqi', 'Olivia Yip', 'Zachary Pang'],
            'Violin': ['J. Mansia', 'Louis Miguel', 'Sean', 'Ze']
            'Flute': ['Richard']
            'Clarinet': ['Benjamin L.']
            'Trombone': ['Efren Wang']
            'Accordion': ['Phillip Hsu']
            'Piano': ['Johnathan H.']
            'Bass': ['Fatima Gonsalves']
            'Aux Percussion': ['Sophia']
            'Drums': ['Cailyn']
        }
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
