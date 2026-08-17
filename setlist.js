/*********************************************************************
Helper Functions
*********************************************************************/
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
    cssSetElement(cssGetId(id), properties);
}
function cssSetElement(element, properties) {
    for (const key in properties) {
        element.style.setProperty(key, properties[key]);
    }
}

/**
 * Convert a date (new Date()) into a formatted HH:MM string
 * includePeriod controls whether am/pm shows
 */
function formatTime(date, includePeriod = true) {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "pm" : "am";

  hours = hours % 12 || 12;
  const minuteStr = minutes.toString().padStart(2, "0");

  return includePeriod
    ? `${hours}:${minuteStr} ${period}`
    : `${hours}:${minuteStr}`;
}

/**
 * Convert two dates (new Date()) into a formatted "X to Y" string
 * The formatted string includes times
 */
function parseTimeRange(start, end) {
  const startPeriod = start.getHours() >= 12 ? "pm" : "am";
  const endPeriod = end.getHours() >= 12 ? "pm" : "am";

  // Same AM/PM → only show once at end
  if (startPeriod === endPeriod) {
    return `${formatTime(start, false)} - ${formatTime(end, true)}`;
  }

  // Different AM/PM → show both
  return `${formatTime(start, true)} - ${formatTime(end, true)}`;
}

/**
 * Convert "YYYY-MM-DD|HH:MM" or "YYYY-MM-DD" into a datetime object
 */
function parseDate(datetime) {
    const [date, time] = datetime.split('|');
    const [year, month, day] = date.split('-').map(x => parseInt(x, 10));
    const [hour, minute] = time?.split(':').map(x => parseInt(x, 10)) ?? [0, 0];
    return new Date(year, month - 1, day, hour, minute);
}

function formatDate(date) {
    const weekday = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
    const day = new Intl.DateTimeFormat("en-US", { day: "numeric" }).format(date);
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
    const year = new Intl.DateTimeFormat("en-US", { year: "numeric" }).format(date);
    return `${weekday}, ${day} ${month} ${year}`;
}

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

function getExecTeam() {
    const yearString = EVENT.start.split('|')[0].split('-')[0];
    const year = yearString.slice(-2)
    return MEMBERS.filter(x => x.roles?.some(role => ROLES[role].includes(year)));
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

function constructIntro(title) {
    const [year, month] = EVENT.start.split("|")[0].split("-");
    const monthNames = {
        '01': 'January',
        '02': 'February',
        '03': 'March',
        '04': 'April',
        '05': 'May',
        '06': 'June',
        '07': 'July',
        '08': 'August',
        '09': 'September',
        '10': 'October',
        '11': 'November',
        '12': 'December',
    }
    cssGetId('intro-subtitle').children[0].innerText = `${year} ${monthNames[month]} Concert`;

    if (EVENT.setlistStylizedTitle) {
        cssGetId("title").innerHTML = title;
    } else {
        cssSetId('intro-title-banner', { display: 'none' });
        cssSetId('intro-subtitle', { 'margin-top': '0px' });
    }

    cssGetId('poster').src = EVENT.poster;
    
    const start = parseDate(EVENT.start);
    const end = parseDate(EVENT.end);
    const where = cssGetId('intro-where');
    where.children[0].innerText = formatDate(start);
    where.children[1].innerText = parseTimeRange(start, end);

    const when = cssGetId('intro-when');
    when.children[0].innerText = EVENT.location;
    when.children[1].innerText = EVENT.address;
}

function constructPerformers(performances) {
    const PERFORMERS = mergePerformers(performances.map((p) => p.performers));
    const table = cssGetId('credits-table');
    const sorted = Object.entries(PERFORMERS).sort((a, b) => INSTRUMENTS[a[0]].localeCompare(INSTRUMENTS[b[0]]));

    for (const [instrument, performers] of sorted) {
        const html = {
            element: 'div',
            classes: ['credits-group'],
            children: [
                {
                    element: 'h3',
                    innerText: INSTRUMENTS[instrument]
                },
                {
                    element: 'span',
                    children: performers.map(name => MEMBERS[name].name).sort().map(name => ({
                        element: 'p',
                        innerText: name
                    }))
                }
            ]
        }
        table.appendChild(construct(html));
    }

    const execs = getExecTeam();
    cssGetId('credits-execs').lastChild.textContent = ` ${execs.map(x => x.name).join(', ')}`;
}

function constructSetlist() {
    const setlist = cssGetId('setlist');

    const hr = {
        element: 'hr',
        classes: ['setlist-hr']
    };

    const performances = [];
    let numIntermissions = 0;
    for (let i = 0; i < EVENT.setlist.length; i++) {
        const { id, setlistDescription } = EVENT.setlist[i];
        const songNum = i + 1 - numIntermissions;

        if (id === -1) {
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

        const song = MUSIC[id];
        const p = song.performances.find(x => x.concerts.includes(EVENT.id));
        performances.push(p);

        const description = setlistDescription ? [{
            element: 'p',
            classes: ['setlist-desc'],
            innerHTML: setlistDescription
        }] : [];

        const group = p.group ? [{
            element: 'p',
            innerText: p.group
        }] : [];

        const performers = [];
        const sorted = Object.entries(p.performers).sort((a, b) => INSTRUMENTS[a[0]].localeCompare(INSTRUMENTS[b[0]]))
        for (const [instrument, names] of sorted) {
            for (const name of names) {
                performers.push({
                    element: 'dt',
                    innerText: INSTRUMENTS[instrument]
                }, {
                    element: 'dd',
                    innerText: MEMBERS[name].name
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
                                    innerHTML: `<span>by</span> ${song.composer}`
                                },
                                p.arranger ? {
                                    element: 'p',
                                    innerHTML: `<span>arranged by</span> ${p.arrangers}`
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
    return performances;
}

function getDefaultConcert() {
    const concert = EVENTS[CURRENT_EVENT.id];
    if (!concert?.setlistTheme) {
        return;
    }
    return concert;
}
function getConcert() {
    const id = parseInt(new URLSearchParams(window.location.search).get('id'), 10);
    if (isNaN(id) || id < 0) {
        return getDefaultConcert();
    }
    const event = EVENTS[id];
    if (!event?.setlistTheme) {
        return;
    }
    return event;
}
// Add <span></span> around unimportant words in a title
function stylizeTitle(title) {
    const words = title.split(" ");
    const newTitle = [];
    for (const word of words) {
        let className;
        if (word === '&') {
            className = 'ampersand';
        } else if (word[0] === word[0].toLowerCase()) {
            className = 'lowercase';
        } else {
            className = 'default';
        }
        newTitle.push(`<span class="title-${className}">${word}</span>`);
    }
    return newTitle.join(" ");
}
function resizeTitle() {
    const container = cssGetId('intro-title-banner');
    const title = cssGetId('title');
    const img1 = cssGetId('music-note-1');
    const img2 = cssGetId('music-note-2');

    // Iterate from largest to smallest size. If title becomes >1 line long, move to smaller size
    const classes = ['', 'size-1', 'size-2', 'size-3'];
    for (let i = 0; i < classes.length; i++) {
        const className = classes[i];
        container.classList = className;
        if (i === classes.length - 1) {
            break;
        }
        cssSetElement(title, { 'text-wrap': 'wrap' });
        const { height: h1 } = title.getBoundingClientRect();
        cssSetElement(title, { 'text-wrap': `nowrap` });
        const { height: h2 } = title.getBoundingClientRect();
        if (h1 === h2) {
            break;
        }
    };
    cssSetElement(title, { 'text-wrap': `balance` });

    // Iterate through spans of title, get "real" bounding box, position music notes accordingly
    const note1 = cssGetId('music-note-1');
    const note2 = cssGetId('music-note-2');
    if (!container.classList.contains('size-3')) {
        cssSetElement(note1, { right: '' });
        cssSetElement(note2, { left: '' });
        return;
    }
    let l = 1e100;
    let r = -1e100;
    for (const span of title.children) {
        const { left, right } = span.getBoundingClientRect();
        l = Math.min(l, left);
        r = Math.max(r, right);
    }
    const { left, right } = title.getBoundingClientRect();
    cssSetElement(note1, { right: `calc(100% - ${l - left}px)` });
    cssSetElement(note2, { left: `calc(100% - ${right - r}px)` });
}
function setupAnimations() {
    const map = new Map();
    const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                const left = map.get(entry.target);
                if (left === true) {
                    entry.target.classList.add("slide-in-left");
                } else if (left === false) {
                    entry.target.classList.add("slide-in-right");
                } else {
                    entry.target.classList.add("slide-in-bottom");
                }
                map.delete(entry.target);
                observer.unobserve(entry.target);
            }
        }
    });
    let left = true;
    for (const setlistItem of cssGetClass('setlist-item')) {
        map.set(setlistItem, left);
        observer.observe(setlistItem);
        left = !left;
    }
    for (const creditsGroup of cssGetClass('credits-group')) {
        observer.observe(creditsGroup);
    }
}

// Get event to make setlist of
const EVENT = getConcert();
if (EVENT) {
    const title = stylizeTitle(EVENT.setlistStylizedTitle);
    constructIntro(title);
    cssGetId('screen-main').classList.add(`theme-${EVENT.setlistTheme.toLowerCase().replaceAll(' ', '-')}`)
    const performances = constructSetlist();
    constructPerformers(performances);

    setupAnimations();
    
    setTimeout(() => {
        resizeTitle();
        window.addEventListener('resize', resizeTitle);
    }, 100);
} else {
    cssSetId('screen-main', { display: 'none' });
    cssSetId('screen-404', { display: 'flex' });
}
