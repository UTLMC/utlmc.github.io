/*********************************************************************
Helper Functions
*********************************************************************/
function debounce(fn, delay) {
  let timeoutId;

  return function (...args) {
    const context = this;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}
function runOnce(func) {
    let hasRun = false;
    let output;
    return (args) => {
        if (hasRun) {
            return output;
        }
        output = func(args);
        hasRun = true;
        return output;
    };
}
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

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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

function parseFromTo(start, end) {
  const sameMonth = start.getMonth() === end.getMonth();
  const sameDay = start.getDate() === end.getDate();

  const formatMonthDay = (date) =>
    date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
    });

  if (sameMonth && sameDay) {
    return `${formatMonthDay(start)}, ${parseTimeRange(start, end)}`;
  }

  return `${formatMonthDay(start)}, ${formatTime(start, true)} - ${formatMonthDay(end)}, ${formatTime(end, true)}`;
}

function parseMarkdown(text) {
    // Links
    text = text.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" target="_blank">$1</a>'
    );
    return text;
}


/*********************************************************************
Toggleables
*********************************************************************/
function closeHeaderHamburger() {
    const ids = ['header-hamburger', 'nav-background', 'nav-page-mobile'];
    for (const id of ids) {
        const element = cssGetId(id);
        const className = `${id}-closed`;
        if (!element.classList.contains(className)) {
            element.classList.add(className);
        }
    }
}
function toggleHeaderHamburger() {
    const ids = ['header-hamburger', 'nav-background', 'nav-page-mobile'];
    for (const id of ids) {
        const element = cssGetId(id);
        const className = `${id}-closed`;
        if (element.classList.contains(className)) {
            element.classList.remove(className)
        } else {
            element.classList.add(className);
        }
    }
}
function navigateToTab(name) {
    toggleTab(`nav-${name}`);
    window.location.hash = name.endsWith('home') ? '#' : `#${name}`;
}
function toggleTab(element) {
    // If input is a string (i.e. from loading the URL with a hash), treat it like a class
    if (typeof element === 'string') {
        element = cssGetClass(element)[0];
    } else {
        window.scrollTo(0, 0);
    }
    const navId = Array.from(element.classList)[0];
    const desktopNav = cssGetFirst(`#nav-page-desktop .${navId}`);

    // No effect on clicking the same tab on mobile
    if (desktopNav.classList.contains('nav-active')) {
        closeHeaderHamburger();
        return;
    }

    let parent = element.parentElement;
    while (parent.nodeName !== 'MENU') {
        parent = parent.parentElement;
    }

    cssGetClass('nav-active')[0].classList.remove('nav-active');
    desktopNav.classList.add('nav-active');
    
    cssGetClass('tab-active')[0].classList.remove('tab-active');
    const tabId = `tab-${navId.slice(4)}`;
    cssGetId(tabId).classList.add('tab-active');
    
    // Set URL hash
    window.location.hash = tabId.endsWith('home') ? '#' : `#${tabId.slice(4)}`;

    // Close mobile menu
    if (window.getComputedStyle(cssGetId('nav-page-mobile')).display !== 'none') {
        closeHeaderHamburger();
    }

    // Set footer gradient colour
    const footer = cssGetFirst('footer');
    let startColor;
    if (['nav-about'].includes(navId)) {
        startColor = '#351c75';
        fixTablePersonnelWidth();
    } else if (['nav-get-involved'].includes(navId)) {
        startColor = '#000';
    } else {
        startColor = '#20124d';
    }
    footer.style.setProperty('background', `linear-gradient(to bottom in oklab, ${startColor}, #045962)`);
}
function toggleDetailsSummary(event) {
    event.preventDefault();  // Prevent instant show/hide from <summary>
    let element = event.srcElement;
    while (element.nodeName !== 'DETAILS') {
        element = element.parentElement;
    }
    
    const name = 'details-hidden';
    if (element.classList.contains(name)) {
        element.classList.remove(name);
    } else {
        element.classList.add(name);
    }
}
function toggleEventsSidebar(element) {
    const className ='event-hamburger-closed';
    element.classList.toggle(className);

    const section = cssGetId('section-events');
    section.classList.toggle('section-events-no-sidebar')
}
function genericToggleTab(element, object) {
    const navActiveClass = `nav-${object}-active`;
    cssGetClass(navActiveClass)[0]?.classList.remove(navActiveClass);
    element.classList.add(navActiveClass);

    const tabActiveClass = `tab-${object}-active`;
    const tabActive = `tab-${element.id.substring(4)}`
    for (const tab of cssGetClass(`tab-${object}`)) {
        if (tab.id === tabActive) {
            tab.classList.add(tabActiveClass);
        } else {
            tab.classList.remove(tabActiveClass);
        }
    }
} 
function toggleEventTab(element) {
    const navActiveClass = `nav-events-active`;
    cssGetClass(navActiveClass)[0]?.classList.remove(navActiveClass);
    element.classList.add(navActiveClass);
}
function toggleConcertTab(element) {
    genericToggleTab(element, 'concert');
    
    if (element.id === 'nav-concert-video') {
        // Initialize Youtube iframe API lazily
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
    }
}
// function toggleSongTab(element) {
//     return genericToggleTab(element, 'song');
// }
function toggleCarousel(next) {
    CURR_CAROUSEL = (CURR_CAROUSEL + (next ? 1 : -1) + CAROUSEL.length) % CAROUSEL.length;
    cssGetClass('carousel-active')[0].classList.remove('carousel-active');
    cssGetClass('carousel')[CURR_CAROUSEL].classList.add('carousel-active');
    
    cssGetId('carousel-caption').innerHTML = CAROUSEL[CURR_CAROUSEL].caption;
    updateCarousel();
}

// Fix sizing issue on Firefox
function fixTablePersonnelWidth() {
    const tablePersonnel = cssGetId('table-personnel');
    if (window.innerWidth > 1200) {
        tablePersonnel.style.setProperty('width', `${tablePersonnel.scrollWidth}px`);
    } else {
        tablePersonnel.style.removeProperty('width');
    }
}


/*********************************************************************
Youtube video embed
*********************************************************************/
let VIDEO_POLL;
function videoStateChangeHandler(state) {
    const { target, data } = state;
    
    // Started to play => 1
    if (data === 1) {
        VIDEO_POLL = setInterval(() => {
            const time = target.getCurrentTime();  // in seconds
            // TODO: Highlight the right song in DOM
        }, 1000);
    } else if (VIDEO_POLL) {
        clearInterval(VIDEO_POLL);
        VIDEO_POLL = undefined;
    }
}

// https://developers.google.com/youtube/iframe_api_reference
let VIDEO;
function onYouTubeIframeAPIReady() {
    VIDEO = new YT.Player('concert-video-embed', {
        videoId: 'TiStCNPn10s',
        width: "300",
        height: "200",
        playerVars: {
            origin: window.location.origin
        },
        events: {
            onStateChange: videoStateChangeHandler
        }
    });
}

function goToVideoChapter(element) {
    const className = 'concert-video-chapter-active';
    cssGetClass(className)[0]?.classList.remove(className);
    element.classList.add(className);
    
    // TODO: Go to correct timestamp based on active element
    VIDEO.seekTo(100, true);
}


/*********************************************************************
Mouse events
*********************************************************************/
function scrollHorizontally(event) {
    const { target, deltaX, deltaY } = event;
    
    // Don't scroll horizontally if there's nothing to scroll
    if (target.scrollWidth <= target.getBoundingClientRect().width + 1) {
        return;
    }

    event.preventDefault();
    target.scrollLeft += deltaX !== 0 ? deltaX : deltaY;
}
const handleClick = (() => {
    const button = cssGetFirst('#section-musicians .toolbar .toolbar-filter');
    const window = cssGetId('musicians-filter-menu');

    return (event) => {
        if (!button.contains(event.target) && !window.contains(event.target)) {
            window.classList.add('toolbar-filter-menu-hidden');
        }        
    }
})();


/*********************************************************************
Event listeners
*********************************************************************/
let MOUSE_X = 0;
let MOUSE_DOWN_X = 0;
let MOUSE_DOWN = false;
let CURR_ACTIVE = undefined;
let CURR_SCROLL = 0;
window.addEventListener('mousemove', (event) => {
    MOUSE_X = event.clientX;

    const HOME_GALLERY = cssGetId('section-home-gallery');
    const HOME_UPCOMING_EVENTS = cssGetId('upcoming-events-container');

    if (HOME_GALLERY.contains(event.target)) {
        CURR_ACTIVE = HOME_GALLERY;
    } else if (HOME_UPCOMING_EVENTS.contains(event.target)) {
        CURR_ACTIVE = HOME_UPCOMING_EVENTS;
    } else {
        return;
    }

    // Left mouse down - dragging behaviour
    if (event.buttons === 1) {
        // First click
        if (!MOUSE_DOWN) {
            MOUSE_DOWN = true;
            MOUSE_DOWN_X = MOUSE_X;
            CURR_SCROLL = CURR_ACTIVE.scrollLeft;
            return;
        }
        CURR_ACTIVE.scrollLeft = Math.max(0, Math.min(CURR_SCROLL + MOUSE_DOWN_X - MOUSE_X, CURR_ACTIVE.scrollWidth));
    } else {
        MOUSE_DOWN = false;
    }
});
window.addEventListener('DOMContentLoaded', () => {  
    injectHomeEvent();
    injectHomeBulletin();
    injectMembers();
    injectFAQ();
    injectFormLinks();
    injectCarousel();

    // Navigate to tab in hash
    const page = window.location.hash.substring(1);
    if (page.length > 0) {
        toggleTab(`nav-${page}`);
    }

    // Set embed calendar mode
    const mode = window.innerWidth > 700 ? 'MONTH' : 'AGENDA';
    for (const element of cssGetClass('embed-calendar')) {
        element.src = `${element.src}&mode=${mode}`;
    }

    // Set home greeting header text based on time of day
    const h = new Date().getHours();
    let introBanner;
    if (h < 6)          introBanner = "👋 Good evening, LMC!";
    else if (h < 12)    introBanner = "👋 Good morning, LMC!";
    else if (h < 18)    introBanner = "👋 Good afternoon, LMC!";
    else                introBanner = "👋 Good evening, LMC!";
    cssGetId('home-banner').innerText = introBanner;
});
window.addEventListener('resize', () => {
    updateCarousel();
    fixTablePersonnelWidth();
})
window.addEventListener('click', handleClick);


/*********************************************************************
Dynamic Content Injection
- This is performed to shield execs as much as possible from having to edit the HTML/CSS/JS
- Functions are asynchronous to prevent lag on initial visit
*********************************************************************/
function construct(json) {
    const element = document.createElement(json.element);
    if (json.attributes) {
        for (const key in json.attributes) {
            element.setAttribute(key, json.attributes[key]);
        }
    }
    if (json.style) {
        for (const key in json.style) {
            element.style.setProperty(key, json.style[key]);
        }
    }
    if (json.classes) {
        for (const name of json.classes) {
            element.classList.add(name);
        }
    }
    if (json.id) {
        element.id = json.id;
    }
    if (json.innerText) {
        element.innerText = json.innerText;
    }
    if (json.innerHTML) {
        element.innerHTML = json.innerHTML;
    }
    if (json.children) {
        for (const child of json.children) {
            if (!child) continue;
            element.appendChild(construct(child));
        }
    }
    return element;
}

async function injectHomeEvent() {
    const now = new Date();

    if (!CURRENT_EVENT || !CURRENT_EVENT.type || now > CURRENT_EVENT.hideAfter) {
        cssGetId('section-home-event').style.setProperty('display', 'none');
    } else if (CURRENT_EVENT.type === 'concert') {
        const {
            links: { poster, rvsp, setlist, recording },
            title,
            dateStart,
            dateEnd,
            location,
            tickets,
            preConcertDescription,
            postConcertDescription
        } = CURRENT_EVENT;
        cssGetFirst('#home-event-poster img').src = poster;
        cssGetFirst('#home-event-text hgroup h3').innerText = title;
        cssGetId('home-event-date').innerText = parseFromTo(dateStart, dateEnd);
        cssGetId('home-event-location').innerText = location;
        cssGetId('home-event-tickets').innerText = tickets;

        const text = now > dateEnd ? postConcertDescription : preConcertDescription;
        const paragraphs = text.map(x => construct({ element: 'p', innerText: x }));

        const buttons = construct({ element: 'div', id: 'home-event-buttons' });
        if (rvsp && now < dateStart) {
            buttons.appendChild(construct({
                element: 'a',
                classes: ['home-event-button'],
                innerText: 'RVSP',
                attributes: { href: rvsp, target: '_blank' }
            }));
        }
        if (setlist) {
            buttons.appendChild(construct({
                element: 'a',
                classes: ['home-event-button'],
                innerText: 'See the setlist',
                attributes: { href: setlist, target: '_blank' }
            }));
        }
        if (recording) {
            buttons.appendChild(construct({
                element: 'a',
                classes: ['home-event-button'],
                innerText: 'Watch the recording',
                attributes: { href: recording, target: '_blank' }
            }));
        }

        const container = cssGetId('home-event-text');
        paragraphs.forEach(x => container.appendChild(x));
        container.appendChild(buttons);
    } else {
        throw new Error(CURRENT_EVENT.type);
    }
}
async function injectHomeBulletin() {
    const sectionAnnouncements = cssGetId('section-announcements');
    const sectionUpcoming = cssGetId('section-upcoming-events');
    const containerAnnouncements = cssGetId('announcement-container');
    const containerUpcoming = cssGetId('upcoming-events-container');

    if (ANNOUNCEMENTS.length > 0) {
        ANNOUNCEMENTS.forEach(({ type, text }) => {
            containerAnnouncements.appendChild(construct({
                element: 'aside',
                classes: ['announcement'],
                children: [{
                    element: 'div',
                    classes: [type === 'alert' ? 'icon-alert' : 'icon-announcement']
                }, {
                    element: 'p',
                    innerHTML: parseMarkdown(text)
                }]
            }));
        });
    }
    if (UPCOMING_EVENTS.length > 0) {
        UPCOMING_EVENTS.forEach(({ dateStart, dateEnd, location, title, image }) => {
            containerUpcoming.appendChild(construct({
                element: 'li',
                style: {
                    'background-image': `url('${image}')`
                },
                children: [{
                    element: 'hgroup',
                    children: [{
                        element: 'h4',
                        classes: ['upcoming-event-date'],
                        innerHTML: `<span>${dateStart.getDate()}</span> ${MONTHS[dateStart.getMonth()].slice(0, 3)}`
                    }, {
                        element: 'p',
                        classes: ['upcoming-event-location'],
                        innerText: location
                    }, {
                        element: 'p',
                        classes: ['upcoming-event-time'],
                        innerText: parseTimeRange(dateStart, dateEnd)
                    }]
                }, {
                    element: 'h4',
                    classes: ['upcoming-event-name'],
                    innerText: title
                }]
            }))
        })
    }
    
    if (ANNOUNCEMENTS.length === 0 && UPCOMING_EVENTS.length === 0) {
        sectionAnnouncements.style.setProperty('display', 'none');
        sectionUpcoming.style.setProperty('display', 'none');
    } else if (ANNOUNCEMENTS.length === 0) {
        sectionAnnouncements.style.setProperty('display', 'none');
        sectionUpcoming.style.setProperty('width', '100%');
    } else if (UPCOMING_EVENTS.length === 0) {
        sectionAnnouncements.style.setProperty('width', '100%');
        sectionAnnouncements.classList.add('section-announcements-full');
        sectionUpcoming.style.setProperty('display', 'none');
    }
}

let TABLE_MUSICIANS = {
    pageSize: 10,
    tags: 'all',
    filters: {
        memberType: 'current',
        page: 0,
        name: '',
        joinedBefore: '',
        joinedAfter: '',
        includeTags: '',
        excludeTags: ''
    }
}
const updateMusiciansTable = (() => {
    const idToRow = {};
    const table = cssGetFirst('#table-musicians tbody');
    const pageCount = cssGetId('table-page-count');
    let prevMembers = undefined;

    // filters: name, joined before/after/equal, tag include/exclude
    return async (reFilter=true) => {
        const members = (reFilter || !prevMembers) ? MEMBERS.filter(x => {
            const { filters: { memberType, name, joinedBefore, joinedAfter, includeTags, excludeTags } } = TABLE_MUSICIANS;
            if (memberType === 'current' && x.left) return false;
            if (memberType === 'past' && !x.left) return false;
            if (name && !x.name.toLowerCase().includes(name.toLowerCase())) return false;
            
            if (joinedBefore || joinedAfter) {
                const [month, year] = x.joined.split(' ');
                const joined = new Date(parseInt(year, 10), month === 'Fall' ? 9 : 0);
                if (joinedBefore) {
                    const before = joinedBefore.split(' ');
                    if (before.length !== 2) return false;

                    const yearBefore = parseInt(before[1], 10);
                    if (!yearBefore) return false;
                    
                    const monthBefore = before[0].toLowerCase();
                    if (monthBefore !== 'fall' && monthBefore !== 'winter') return false;

                    if (new Date(yearBefore, monthBefore === 'fall' ? 9 : 0) < joined) return false;
                }
                if (joinedAfter) {
                    const after = joinedAfter.split(' ');
                    if (after.length !== 2) return false;

                    const yearAfter = parseInt(after[1], 10);
                    if (!yearAfter) return false;
                    
                    const monthAfter = after[0].toLowerCase();
                    if (monthAfter !== 'fall' && monthAfter !== 'winter') return false;

                    if (new Date(yearAfter, monthAfter === 'fall' ? 9 : 0) > joined) return false;
                }
            }
            if (includeTags || excludeTags) {
                const tags = new Set([...x.roles, ...x.instruments].map(x => x.toLowerCase()));
                if (includeTags && includeTags.split(',').map(x => x.toLowerCase().trim()).some(x => !tags.has(x))) return false;
                if (excludeTags && excludeTags.split(',').map(x => x.toLowerCase().trim()).some(x => tags.has(x))) return false;
            }

            return true;
        }) : prevMembers;
        prevMembers = members;

        // Update pagination display
        let start = 0;
        let end = 0;
        if (members.length === 0) {
            pageCount.innerHTML = `0-0 of 0`
        } else {
            const n = Math.ceil(members.length / TABLE_MUSICIANS.pageSize);
            TABLE_MUSICIANS.filters.page = (TABLE_MUSICIANS.filters.page + n) % n;
            start = TABLE_MUSICIANS.filters.page * TABLE_MUSICIANS.pageSize;
            end = Math.min(members.length, (TABLE_MUSICIANS.filters.page + 1) * TABLE_MUSICIANS.pageSize);
            pageCount.innerHTML = `${start + 1}-${end} of ${members.length}`
        }

        // Re-generate rows
        const fragment = document.createDocumentFragment();
        const nextIdToRow = {};
        for (const member of members.slice(start, end)) {
            let row = idToRow[member.id];
            if (!row) {
                row = construct({
                    element: 'tr',
                    id: `section-musician-${member.id}`,
                    children: [{
                        element: 'td',
                        innerText: member.name
                    }, {
                        element: 'td',
                        children: [{
                            element: 'p',
                            classes: ['tag-container'],
                            children: [
                                ...member.instruments.map(x => ({ text: x, type: 'instrument' })),
                                ...member.roles.map(x => ({ text: x, type: 'role' }))
                            ].map(x => ({
                                element: 'span',
                                classes: [`li-${x.type}`],
                                innerText: x.text
                            }))
                        }]
                    }, {
                        element: 'td',
                        innerText: member.joined
                    }, {
                        element: 'td',
                        children: [{
                            element: 'ul',
                            classes: ['list-social-media'],
                            children: Object.entries(member.links).map(([site, info]) => ({
                                element: 'li',
                                classes: [`li-${site}`],
                                innerText: Array.isArray(info) ? '' : info,
                                children: Array.isArray(info) ? [{
                                    element: 'a',
                                    innerText: info[0],
                                    attributes: {
                                        href: info[1],
                                        target: '_blank'
                                    }
                                }] : []
                            }))
                        }]
                    }]
                });
            }
            fragment.appendChild(row);
            nextIdToRow[member.id] = row;
        }
        for (const id in idToRow) {
            if (!nextIdToRow[id]) {
                idToRow[id].remove();
            }
            delete idToRow[id];
        }

        Object.assign(idToRow, nextIdToRow);
        table.appendChild(fragment);
    } 
})();

function toggleMenuFilterMusician() {
    cssGetId('musicians-filter-menu').classList.toggle('toolbar-filter-menu-hidden');
}
function toggleButtonMemberType(element) {
    if (TABLE_MUSICIANS.filters.memberType === 'current') {
        TABLE_MUSICIANS.filters.memberType = 'past';
        element.innerText = 'Past Members';
    } else if (TABLE_MUSICIANS.filters.memberType === 'past') {
        TABLE_MUSICIANS.filters.memberType = 'all';
        element.innerText = 'All Members';
    } else {
        TABLE_MUSICIANS.filters.memberType = 'current';
        element.innerText = 'Current Members';
    }
    TABLE_MUSICIANS.filters.page = 0;
    updateMusiciansTable();
}
const toggleButtonTagType = (() => {
    const style = document.createElement('style');
    document.head.appendChild(style);

    return (element) => {
        if (TABLE_MUSICIANS.tags === 'all') {
            TABLE_MUSICIANS.tags = 'instruments';
            element.innerText = 'Instrument Tags';
            style.textContent = '.li-role { display: none }';
        } else if (TABLE_MUSICIANS.tags === 'instruments') {
            TABLE_MUSICIANS.tags = 'roles';
            element.innerText = 'Role Tags';
            style.textContent = '.li-instrument { display: none }';
        } else {
            TABLE_MUSICIANS.tags = 'all';
            element.innerText = 'All Tags';
            style.textContent = '';
        }
    }
})();
function musiciansPageChange(delta) {
    TABLE_MUSICIANS.filters.page += delta;
    updateMusiciansTable(false);
}
const changeFilterMusicians = debounce(() => {
    TABLE_MUSICIANS.filters.name = cssGetId('musician-filter-name').value;
    TABLE_MUSICIANS.filters.joinedBefore = cssGetId('musician-filter-joined-before').value;
    TABLE_MUSICIANS.filters.joinedAfter = cssGetId('musician-filter-joined-after').value;
    TABLE_MUSICIANS.filters.includeTags = cssGetId('musician-filter-include-tags').value;
    TABLE_MUSICIANS.filters.excludeTags = cssGetId('musician-filter-exclude-tags').value;
    updateMusiciansTable();
}, 500);

async function injectMembers() {
    const instruments = MEMBERS.filter(x => !x.left).map(x => x.instruments).flat();
    let total = 0;
    const personnel = {};
    for (const instrument of instruments) {
        if (!personnel[instrument]) {
            personnel[instrument] = 0;
        }
        personnel[instrument] += 1;
    }
    const personnelRoles = new Set(['Arranger', 'Artist', 'Video Editor']);
    for (const role of personnelRoles) {
        for (const member of MEMBERS) {
            if (member.roles.includes(role)) {
                if (!personnel[role]) {
                    personnel[role] = 0;
                }
                personnel[role] += 1;
            }
        }
    }
    personnel.Total = MEMBERS.filter(x => !x.left).length;
    personnelRoles.add('Total');

    const nameSubstitutions = {
        'Alto Saxophone': 'Alto Sax',
        'Tenor Saxophone': 'Tenor Sax',
        'Baritone Saxophone': 'Baritone Sax',
    }
    const tablePersonnel = cssGetId('table-personnel');
    Object.entries(personnel).sort((a, b) => {
        const [nameA, countA] = a;
        const [nameB, countB] = b;

        // Put total at end
        if (nameA === 'Total') { return 1; }
        else if (nameB === 'Total') { return -1; }
        
        if (countA === countB) {
            return nameA.localeCompare(nameB);
        }
        return countB - countA;
    }).forEach(([name, count]) => {
        const cardClasses = [
            'personnel-card',
            `personnel-${name.toLowerCase().replace(' ', '-')}`,
        ];
        if (personnelRoles.has(name)) {
            cardClasses.push('personnel-notinstrument');
        }
        const displayName = nameSubstitutions[name] ? nameSubstitutions[name] : name;

        tablePersonnel.appendChild(construct({
            element: 'li',
            children: [{
                element: 'div',
                classes: cardClasses,
                children: [{
                    element: 'span',
                    classes: ['personnel-title'],
                    innerText: displayName
                }, {
                    element: 'span',
                    classes: ['personnel-count'],
                    innerText: `×${count}`
                }]
            }]
        }));
    });
    
    // Update executive team to the latest year at August (if it doesn't exist, stick to last year)
    const now = new Date();
    let year = now.getMonth() >= 7 ? now.getFullYear() : now.getFullYear() - 1;
    let execTeam = MEMBERS.filter(x => x.roles.some(role => role.includes(String(year).slice(2))));
    while (execTeam.length === 0) {
        year -= 1;
        execTeam = MEMBERS.filter(x => x.roles.some(role => role.includes(String(year).slice(2))));
        if (year === 2022) {
            throw new Error("WTF");
        }
    }
    cssGetId('exec-team-year').innerText = `${year}-${year + 1}`;

    // Inject executive team
    const digit = String(year).slice(2);
    const execTeamProfile = cssGetId('exec-team-profile');
    execTeam.sort((a, b) => {
        // Order of display: executives, then alphabetically by role, then by real name
        let roleA = a.roles.find(role => role.includes(digit));
        let roleB = b.roles.find(role => role.includes(digit));
        roleA = roleA.slice(0, roleA.indexOf(' ('));
        roleB = roleB.slice(0, roleB.indexOf(' ('));

        const execA = roleA === 'Executive';
        const execB = roleB === 'Executive';
        if (execA && !execB) {
            return -1;
        } else if (!execA && execB) {
            return 1;
        }
        if (roleA === roleB) {
            return a.name.localeCompare(b.name);
        }        
        return roleA.localeCompare(roleB);
    }).forEach(x => {
        const execRole = x.roles.find(role => role.includes(digit));
        const nonExecRoles = [...x.instruments, ...x.roles.filter(role => !role.includes(" ("))];

        execTeamProfile.appendChild(construct({
            element: 'li',
            classes: ['exec-team-card'],
            children: [{
                element: 'img',
                attributes: { src: 'assets/images/asanoha.webp' }
            }, {
                element: 'div',
                children: [{
                    element: 'hgroup',
                    children: [{
                        element: 'h4',
                        innerText: x.name
                    }, {
                        element: 'p',
                        innerText: execRole.slice(0, execRole.indexOf(" ("))
                    }]
                }, {
                    element: 'p',
                    classes: ['tag-container'],
                    children: nonExecRoles.map(x => ({
                        element: 'span',
                        innerText: x
                    }))
                }, {
                    element: 'ul',
                    classes: ['list-social-media'],
                    children: Object.entries(x.links).map(([site, info]) => {
                        let url, username;
                        if (Array.isArray(info)) {
                            [username, url] = info;
                        } else {
                            username = info;
                        }
                        return {
                            element: 'li',
                            classes: [`li-${site}`],
                            innerText: url ? '' : username,
                            children: url ? [{
                                element: 'a',
                                attributes: { target: '_blank', href: url },
                                innerText: username
                            }] : []
                        };
                    })
                }]
            }]
        }));
    });

    const outreachOptions = new Set(['discord', 'instagram']);
    const homeOutreach = cssGetId('home-outreach');
    execTeam
        .filter(x => x.roles.some(role => role.startsWith('Executive')))
        .sort((a, b) => a.name.localeCompare(b.name))
        .forEach(x => {
            homeOutreach.appendChild(construct({
                element: 'h4',
                innerText: x.name
            }))
            homeOutreach.appendChild(construct({
                element: 'ul',
                classes: ['list-social-media'],
                children: Object.entries(x.links).filter(([site]) => outreachOptions.has(site)).map(([site, info]) => ({
                    element: 'li',
                    classes: [`li-${site}`],
                    innerHTML: info
                }))
            }))
        });

    updateMusiciansTable();
}

async function injectFAQ() {
    const container = cssGetId('faq-container');
    for (const faq of FAQ) {
        const paragraphs = faq.a.map(x => ({ element: 'p', innerHTML: parseMarkdown(x) }));
        const json = {
            element: 'details',
            attributes: { 'open': true },
            classes: ['details-hidden'],
            children: [{
                element: 'summary',
                attributes: { 'onclick': 'toggleDetailsSummary(event)' },
                children: [{
                    element: 'h4',
                    innerText: faq.q
                }, {
                    element: 'div',
                    classes: ['summary-triangle']
                }]
            }, {
                element: 'div',
                classes: ['summary-body'],
                children: paragraphs.length > 0 ? paragraphs : { element: 'p', innerText: '[TODO]' }
            }]
        };
        container.appendChild(construct(json));
    }
}

const TAGS = {};
async function injectFormLinks() {
    for (const [id, link] of Object.entries(FORM_LINKS)) {
        cssGetId(id).setAttribute('href', link);
    }
}

let CURR_CAROUSEL = 0;
async function injectCarousel() {
    const carouselContainer = cssGetId('section-carousel');
    for (let i = 0; i < CAROUSEL.length; i++) {
        const classes = ['carousel'];
        if (i == 0) {
            classes.push('carousel-active');
        }
        carouselContainer.appendChild(construct({
            element: 'img',
            classes,
            attributes: {
                decoding: 'async',
                loading: i === 0 ? 'eager' : 'lazy',
                src: CAROUSEL[i].url
            }
        }));
    }
    cssGetId('carousel-caption').innerHTML = CAROUSEL[CURR_CAROUSEL].caption;
    updateCarousel();
}
function updateCarousel() {
    const carouselContainer = cssGetId('section-carousel');
    const carousel = cssGetClass('carousel-active')[0];
    const caption = cssGetId('carousel-caption');
    const { captionRight, captionTopOnMobile, yLims: [y0, y1], captionXPosition, height, width } = CAROUSEL[CURR_CAROUSEL];

    const scale = window.innerWidth / width;
    const minHeight = (y1 - y0) * scale;
    const targetHeight = 0.5 * window.innerHeight;
    const minWidth = width * targetHeight / height;

    if (captionRight) {
        caption.style.setProperty('text-align', 'right');
        caption.style.setProperty('left', 'auto');
        caption.style.setProperty('right', 'max(35px, 6vw)');
        caption.style.setProperty('transform', 'rotate(-3deg)');
    } else {
        caption.style.setProperty('text-align', 'left');
        caption.style.setProperty('right', 'auto');
        caption.style.setProperty('left', 'max(35px, 6vw)');
        caption.style.setProperty('transform', 'rotate(3deg)');
    }

    // Wide screen -> force wide image dimensions
    if (minHeight >= targetHeight) {
        carouselContainer.style.setProperty('height', `${minHeight}px`);    
        carousel.style.setProperty('height', `${height * scale}px`);
        carousel.style.setProperty('margin-top', `-${y0 * scale}px`);

        if (captionTopOnMobile) {
            caption.style.setProperty('bottom', 'max(20px, 2vw)');
            caption.style.setProperty('top', 'auto');
        }

    // As screen width decreases, extra vertical space is added to image
    } else if (window.innerWidth > minWidth ) {
        const extraVisible = targetHeight - (y1 - y0) * scale;
        const topRaw = y0;
        const bottomRaw = height - y1;
        const totalRaw = topRaw + bottomRaw;
        const topShare = topRaw / totalRaw;
        const extraTop = extraVisible * topShare;

        carouselContainer.style.setProperty('height', `${targetHeight}px`);
        carousel.style.setProperty('height', `${height * scale}px`);
        carousel.style.setProperty('margin-top', `-${(y0 * scale) - extraTop}px`);

        if (captionTopOnMobile) {
            caption.style.setProperty('bottom', 'max(20px, 2vw)');
            caption.style.setProperty('top', 'auto');
        }
    
    // Mobile screen -> zoom in to cover screen
    } else {
        carouselContainer.style.setProperty('height', `${targetHeight}px`);
        carousel.style.setProperty('height', `${targetHeight}px`);
        carousel.style.setProperty('object-position', `${captionXPosition} 50%`);
        carousel.style.setProperty('margin-top', `0px`);

        if (captionTopOnMobile) {
            caption.style.setProperty('top', 'max(30px, 6.5vw)');
            caption.style.setProperty('bottom', 'auto');   
        }
    }
}

// Github pages CORS test
async function corsTest(link) {
    const response = await fetch(link);
    console.log(response);
    const body = await response.text();
    console.log(body);
}
// corsTest('index.html');


/*********************************************************************
Export
*********************************************************************/
function stringToCSV(str, title) {
    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + str);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${title}.csv`);
    link.click();
    link.remove();
}
function exportMembers() {
    const headers = ['id', 'name', 'joined', 'left', 'tags', 'socialMedia'];
    function formatMember(x) {
        const socialMedia = [];
        for (const [key, value] of Object.entries(x.socialMedia)) {
            socialMedia.push(`${key}: ${value[0]}`);
        }
        return [`${x.id}`, x.name, x.joined, x.left, `"${x.tags.join(', ')}"`, `${socialMedia.join(', ')}`].join(',');
    }
    const header = headers.join(',');
    const csv = `${header}\n${MEMBERS.map(formatMember).join('\n')}`;
    stringToCSV(csv, 'members');    
}
function exportPersonnel() {
    const tags = Object.keys(TAGS).filter(x => !x.includes('Executive')).sort();
    function formatMember(x) {
        const row = [x.id, x.name];
        const xTags = new Set(x.tags);
        row.push(...tags.map(x => xTags.has(x) ? 'X' : null));
        return row.join(',')
    }
    const header = `id,name,${tags.join(',')}`;
    const csv = `${header}\n${MEMBERS.map(formatMember).join('\n')}`;
    stringToCSV(csv, 'personnel');
}
// exportMembers();
// exportTags();