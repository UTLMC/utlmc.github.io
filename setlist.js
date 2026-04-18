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
            'Vocals': ['Crystal Y.', 'Eric H.',  'Celina L.', 'Olivia Yip', 'Zachary Pang'],
            'Violin': ['J. Mansia', 'Louis Miguel', 'Sean', 'Ze'],
            'Clarinet': ['Benjamin L.'],
            'Trombone': ['Efren Wang'],
            'Accordion': ['Phillip Hsu'],
            'Piano': ['Johnathan H.'],
            'Bass': ['Leo'],
            'Aux. Percussion': ['Sophia'],
            'Drums': ['Cailyn']
        }
    },
    {
        name: 'Sugar Song to Bitter Step',
        by: 'Unison Square Garden',
        from: 'Kekkai Sensen',
        performers: {
            'Vocals': ['Kai (Kaedan Yu)'],
            'Guitar': ['Han', 'Kae Nguyen'],
            'Bass': ['Sophia'],
            'Drums': ['Julian Gale']
        }
    },
    {
        name: 'In the Pool',
        by: 'Kensuke Ushio',
        from: 'Chainsaw Man Movie: Reze Arc',
        performers: {
            'Piano': ['Johnathan H.']
        }
    },
    {
        name: 'Dawn in the Adan',
        by: 'Ichiko Aoba',
        group: 'Bows 4 Belts',
        performers: {
            'Vocals': ['Fatima Gonsalves'],
            'Piano': ['Fatima Gonsalves'],
            'Guitar': ['Sofia Gondim']
        }
    },
    {
        name: 'Scarz',
        by: 'Novulent',
        group: 'Bows 4 Belts',
        performers: {
            'Vocals': ['Fatima Gonsalves'],
            'Guitar': ['Sofia Gondim'],
            'Bass': ['Fatima Gonsalves'],
            'Drums': ['Julian Gale']
        }
    },
    {
        name: 'Shinzo wo Sasageyo!',
        by: 'Linked Horizon',
        from: 'Attack on Titan',
        arranger: 'Rylen Fong & Hana',
        performers: {
            'Vocals': ['Kae Nguyen'],
            'Backing Vocals': ['A. G. Montejo', 'Hana', 'Kai (Kaedan Yu)', 'Sophia'],
            'Violin': ['Kai (Kaedan Yu)', 'Sean', 'Ze'],
            'Alto Sax': ['Rylen Fong'],
            'Trumpet': ['Hayden Hoffort'],
            'Trombone': ['Mellow'],
            'Piano': ['Carmen'],
            'Guitar': ['William'],
            'Bass': ['Alexis'],
            'Drums': ['Julian Gale']
        }
    },
    {
        name: "That's Why I Quit Music",
        by: 'Yorushika',
        performers: {
            'Vocals': ['Celina L.'],
            'Backing Vocals': ['Carmen'],
            'Piano': ['Johnathan H.'],
            'Guitar': ['Emily', 'Inès Alibay'],
            'Bass': ['Emmett Hartley'],
            'Drums': ['Kahveh']
        }
    },
    {
        name: 'Itte',
        by: 'Yorushika',
        from: '夏草が邪魔をする (The Summer Grass Gets In The Way)',
        performers: {
            'Vocals': ['Celina L.'],
            'Backing Vocals': ['Olivia Yip'],
            'Piano': ['Raekye'],
            'Guitar': ['Emily','Inès Alibay'], 
            'Bass': ['Emmett Hartley'],
            'Drums': ['Kai Kang Nie']
        }
    },
    {
        name: 'Delfino Plaza (French Jazz ver.)',
        by: 'Koji Kondo',
        from: 'Super Mario Sunshine',
        arranger: '8-Bit Big Band',
        group: 'LMC Jazz Group',
        description: 'Featuring Kai as violin soloist',
        performers: {
            'Violin': ['Kai (Kaedan Yu)'],
            'Flute': ['Cathy Z.'],
            'Alto Sax': ['Rylen Fong', 'Simba'],
            'Tenor Sax': ['A. G. Montejo'],
            'Trumpet': ['Charlene Chiang', 'Hayden Hoffort'],
            'Trombone': ['Efren Wang'],
            'Accordion': ['Phillip Hsu'],
            'Piano': ['Paul Y.'],
            'Guitar': ['Prashanth Shyamala'],
            'Bass': ['Emmett Hartley'],
            'Drums': ['Julian Gale']
        }
    },
    {
        name: 'Jinsei wa Yume Darake (Ma Vie, Mes Rêves)',
        by: 'Sheena Ringo',
        arranger: 'Michael Kim',
        group: 'LMC Jazz Group',
        description: 'Featuring Kai as vocal soloist',
        performers: {
            'Vocals': ['Kai (Kaedan Yu)'],
            'Violin': ['Michael Kim', 'Simba'],
            'Flute': ['Cathy Z.'],
            'Alto Sax': ['Rylen Fong'],
            'Tenor Sax': ['A. G. Montejo'],
            'Trumpet': ['Charlene Chiang', 'Hayden Hoffort'],
            'Trombone': ['Efren Wang'],
            'Piano': ['Carmen', 'Heyao Wang'],
            'Bass': ['Emmett Hartley'],
            'Drums': ['Julian Gale']
        }
    },
    {
        name: 'Jump Up, Superstar!',
        from: 'Super Mario Odyssey',
        by: 'Naoto Kubo',
        arranger: 'Brandon Douglas',
        group: 'LMC Jazz Group',
        description: 'Featuring Carmen as vocal soloist',
        performers: {
            'Vocals': ['Carmen'],
            'Flute': ['Cathy Z.'],
            'Alto Sax': ['Rylen Fong', 'Simba'],
            'Tenor Sax': ['A. G. Montejo', 'Daniel Kim'],
            'Trumpet': ['Charlene Chiang', 'Hayden Hoffort'],
            'Trombone': ['Efren Wang'],
            'Piano': ['Paul Y.'],
            'Guitar': ['Prashanth Shyamala'],
            'Bass': ['Emmett Hartley'],
            'Drums': ['Julian Gale']
        }
    },
    {
        name: 'Last Stardust',
        by: 'Aimer',
        from: 'Fate/Stay Night: Unlimited Blade Works',
        description: 'If to feel pain is my fate, then I just have one thing to say',
        performers: {
            'Vocals': ['Sophia'],
            'Piano': ['FH'],
            'Guitar': ['Emily', 'Brian Lin'],
            'Bass': ['James Inneo'],
            'Drums': ['J. Mansia']
        }
    },
    {
        name: 'Love Trial',
        by: '40mP ft. Hatsune Miku',
        description: "Oh! Jesus! Don't look at me like that!",
        performers: {
            'Vocals': ['Sophia'],
            'Piano': ['FH'],
            'Guitar': ['Emily', 'Brian Lin'],
            'Bass': ['James Inneo'],
            'Drums': ['J. Mansia']
        }
    },
    {
        name: 'Fuyu no Hanashi',
        by: 'centimillimental',
        from: 'Given',
        description: 'i like my yaoi DOOMED',
        performers: {
            'Vocals': ['Zachary Pang'],
            'Guitar': ['William'],
            'Bass': ['Emmett Hartley'],
            'Drums': ['J. Mansia']
        }
    },
    {
        name: "Theme of Stone Ocean (Jolyne's Theme)",
        by: 'Yugo Kanno',
        arranger: 'Rylen Fong',
        from: "Jojo's Bizarre Adventure: Stone Ocean",
        performers: {
            'Vocals': ['Eric H.', 'Olivia Yip', 'William'],
            'Violin': ['Sean', 'Ze'],
            'Clarinet': ['A. G. Montejo'],
            'Alto Sax': ['Simba'],
            'Tenor Sax': ['Cathy Z.'],
            'Trumpet': ['Hayden Hoffort'],
            'Trombone': ['Efren Wang'],
            'Piano': ['Leo'],
            'Guitar': ['Alexis'],
            'Bass': ['Sophia'],
            'Drums': ['Kahveh']
        }
    },
    {
        name: 'I Am Gonna Claw (Out Your Eyes Then Drown You To Death)',
        by: 'Darren Korb',
        from: 'Hades II',
        performers: {
            'Vocals': ['A. G. Montejo'],
            'Trombone': ['Mellow'],
            'Guitar': ['Inès Alibay', 'Kae Nguyen'],
            'Bass': ['Emmett Hartley'],
            'Drums': ['Jimin']
        }
    },
    {
        name: 'Plastic Love',
        by: 'Mariya Takeuchi',
        arranger: 'Richard',
        description: 'City pop!!',
        performers: {
            'Vocals': ['Carmen'],
            'Backing Vocals': ['Crystal Y.', 'Eric H.', 'Fatima Gonsalves'],
            'Violin': ['Kai (Kaedan Yu)', 'Sean'],
            'Clarinet': ['A. G. Montejo'],
            'Alto Sax': ['Simba'],
            'Tenor Sax': ['Cathy Z.'],
            'Trumpet': ['Hayden Hoffort'],
            'Piano': ['Angelina'],
            'Guitar': ['Andrew Tan', 'Sofia Gondim'],
            'Bass': ['Inès Alibay'],
            'Drums': ['Kaden Calvert']
        }
    },
    { intermission: true },
    {
        name: 'Wii Sports Resort Main Theme',
        by: 'Ryo Nagamatsu',
        arranger: 'Kai (Kaedan Yu)',
        description:'wii are resorting to violence',
        performers: {
            'Violin': ['Sean', 'Ze'],
            'Flute': ['Cathy Z.', 'Richard'],
            'Trumpet': ['Hayden Hoffort'],
            'Alto Sax': ['Simba'],
            'Trombone': ['Efren Wang', 'Mellow'],
            'Piano': ['Tommy'],
            'Guitar': ['Brian Lin', 'William'],
            'Bass': ['Sophia'],
            'Aux. Percussion': ['Kaden', 'Kai Kang Nie', 'Zachary'],
            'Drums': ['Julian Gale']
        }
    },
    {
        name: 'Battle!!',
        by: 'Kenji Hiramatsu',
        arranger: 'Richard',
        from: 'Xenoblade Chronicles 2: Torna ~ The Golden Country',
        description: 'groovy',
        performers: {
            'Violin': ['Louis Miguel', 'Kai (Kaedan Yu)'],
            'Flute': ['Richard'],
            'Clarinet': ['Rylen Fong'],
            'Tenor Sax': ['A. G. Montejo'],
            'Piano': ['Johnathan H.', 'Raekye'],
            'Bass': ['Emmett Hartley'],
            'Drums': ['Julian Gale']
        }
    },
    {
        name: 'Mechonis Field',
        by: 'ACE+',
        arranger: 'Richard',
        from: 'Xenoblade Chronicles',
        description: 'cool song 👍',
        performers: {
            'Theremin': ['Colin Boothby'],
            'Piano': ['Richard']
        }
    },
    {
        name: 'Rogueport',
        by: 'Yuka Tsujiyoko & Yoshito Sekigawa',
        arranger: 'Richard',
        from: 'Paper Mario: The Thousand-Year Door',
        description: 'cool song 👍',
        performers: {
            'Violin': ['Louis Miguel', 'Sean', 'Simba'],
            'Flute': ['Richard'],
            'Clarinet': ['Benjamin L.'],
            'Alto Sax': ['Brandon Law'],
            'Tenor Sax': ['A. G. Montejo'],
            'Trumpet': ['Hayden Hoffort'],
            'Bagpipes': ['Kai Kang Nie'],
            'Theremin': ['Colin Boothby'],
            'Piano': ['Johnathan H.'],
            'Aux. Percussion': ['Jonathan H.', 'Kai Kang Nie'],
            'Drums': ['Julian Gale']
        }
    },
    {
        name: 'Remedy (Metal ver.)',
        by: 'DYLZAL',
        arranger: 'Kai (Kaedan Yu)',
        from: 'Undertale Yellow',
        performers: {
            'Violin': ['Kai (Kaedan Yu)'],
            'Harpsichord': ['A. G. Montejo'],
            'Guitar': ['William'],
            'Bass': ['Emmett Hartley'],
            'Drums': ['Julian Gale']
        }
    },
    {
        name: 'Kẻ Thù',
        by: 'Ngọt',
        group: 'Masters of Spinjitzu (Formerly Super Sentai)',
        performers: {
            'Vocals': ['Kae Nguyen'],
            'Guitar': ['Emmett Hartley', 'Michael Kim'],
            'Bass': ['Sophia'],
            'Drums': ['Julian Gale']
        }
    },
    {
        name: 'Layla',
        by: 'yotsudome noddy',
        group: '2roup 2',
        performers: {
            'Vocals': ['Alexis'],
            'Guitar': ['Robin', 'Alexis'],
            'Bass': ['Tyrone Fang'],
            'Drums': ['Jimin']
        }
    },
    {
        name: 'Kokudou Slope',
        by: 'kinokoteikoku',
        from: 'ユリーカ (Eureka)',
        group: '2roup 2',
        performers: {
            'Vocals': ['Alexis'],
            'Guitar': ['Robin', 'Alexis'],
            'Bass': ['Tyrone Fang'],
            'Drums': ['Jimin']
        }
    },
    {
        name: "Last Train at 25 O'Clock",
        by: 'Lamp',
        from: 'For Lovers',
        performers: {
            'Vocals': ['Kai (Kaedan Yu)'],
            'Violin': ['Sean'],
            'Flute': ['Cathy Z.'],
            'Alto Sax': ['A. G. Montejo'],
            'Trombone': ['Mellow'],
            'Piano': ['Johnathan H.'],
            'Guitar': ['Inès Alibay'],
            'Bass': ['James Inneo'],
            'Drums': ['Jimin']
        }
    },
    {
        name: 'Moudoku ga Osou',
        by: 'Hifumi ft. Hatsune Miku',
        performers: {
            'Vocals': ['Olivia Yip'],
            'Guitar': ['Robin', 'yams'],
            'Bass': ['Sophia'],
            'Drums': ['Han']
        }
    },
    {
        name: 'Aishite',
        by: 'Kikuo ft. Hatsune Miku',
        arranger: 'Sean',
        performers: {
            'Vocals': ['Carmen', 'Lucia'],
            'Violin': ['Louis Miguel', 'J. Mansia', 'Ze'],
            'Flute': ['Cathy Z.'],
            'Clarinet': ['Benjamin L.', 'Rylen Fong'],
            'Alto Sax': ['Simba'],
            'Trumpet': ['Hayden Hoffort'],
            'Trombone': ['Mellow'],
            'Piano': ['Raekye'],
            'Guitar': ['Emily'],
            'Bass': ['Emmett Hartley'],
            'Drums': ['Cailyn']
        }
    },
    {
        name: 'The Rumbling',
        by: 'SiM',
        from: 'Attack on Titan',
        description: 'rumbling im coming',
        performers: {
            'Vocals': ['Kae Nguyen', 'Kai (Kaedan Yu)'],
            'Backing Vocals': ['Emmett Hartley', 'Julian Gale', 'William'],
            'Violin': ['Sean', 'Simba'],
            'Guitar': ['William'],
            'Bass': ['Emmett Hartley'],
            'Drums': ['Julian Gale']
        }
    },
    {
        name: 'Ai Scream!',
        by: 'Ai Furihata, Aguri Ōnishi, & Wakana Okuma',
        arranger: 'Sean',
        from: 'Love Live!',
        description: '何が好き？LMCよりもあなた！',
        performers: {
            'Vocals': ['Eric H.', 'Sophia', 'Zachary Pang'],
            'Alto Sax': ['A. G. Montejo', 'Simba'],
            'Trumpet': ['Hayden Hoffort'],
            'Piano': ['Sean'],
            'Guitar': ['Brian Lin', 'Inès Alibay'],
            'Bass': ['Tyrone Fang'],
            'Drums': ['Julian Gale']
        }
    }
]


function mergePerformers(arr) {
    arr = arr.filter(x => !!x);
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
            if (child) {
                element.appendChild(construct(child));
            }
        }
    }
    return element;
}

async function constructPerformers() {
    const PERFORMERS = mergePerformers(SONGS.map(x => x.performers));
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

    let numIntermissions = 0;
    for (let i = 0; i < SONGS.length; i++) {
        const song = SONGS[i];
        const songNum = i + 1 - numIntermissions;

        if (song.intermission) {
            numIntermissions += 1;
            const html = {
                element: 'article',
                classes: ['setlist-item', 'setlist-intermission'],
                children: [{
                    element: 'p',
                    innerText: 'INTERMISSION'
                }]
            }
            setlist.appendChild(construct(html));
            setlist.appendChild(construct(hr));
            continue;
        }

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

        const findBracket = /\(([^()]*)\)/;
        const match = song.name.match(findBracket);
        const name = match ? song.name.replace(findBracket, '') : song.name;
        const brackets = match ? {
            element: 'h2',
            classes: ['song-name-bracket'],
            innerText: `(${match[1]})`
        } : undefined;

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
                                    classes: ['song-name'],
                                    innerHTML: name
                                },
                                brackets,
                                {
                                    element: 'h3',
                                    innerText: `// ${songNum < 10 ? `0${songNum}` : songNum}`
                                },
                                {
                                    element: 'p',
                                    innerHTML: `<span>by</span> ${song.by}`
                                },
                                song.arranger ? {
                                    element: 'p',
                                    innerHTML: `<span>arranged by</span> ${song.arranger}`
                                } : undefined,
                                {
                                    element: 'p',
                                    innerHTML: song.from ? `<span>from</span> ${song.from}` : undefined
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
                                            innerText: 'Performers'
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