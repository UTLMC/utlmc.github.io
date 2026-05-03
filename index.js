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
function extractRGB(str) {
    const regex = /rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/gi;
    const results = [];
    let match = regex.exec(str);
    while (match) {
        const r = parseInt(match[1], 10);
        const g = parseInt(match[2], 10);
        const b = parseInt(match[3], 10);
        results.push([r, g, b]);
        match = regex.exec(str);
    }

    return results;
}
function dateToString(date = new Date(), delimiter = '-') {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return [year, month, day].join(delimiter);
}
function parseDate(str) {
    let date;
    for (const delimiter of ['-', '/', '\\', ' ', '.']) {
        date = str.split(delimiter);
        if (date.length === 3) {
            break;
        }
    }
    if (date.length !== 3) { return ''; }
    let [year, month, day] = date.map(x => parseInt(x, 10));
    if (isNaN(year) || isNaN(month) || isNaN(day)) { return ''; }

    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
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
    const oldActiveElement = cssGetClass(navActiveClass)[0];
    if (oldActiveElement === element) {
        return;
    }
    oldActiveElement?.classList.remove(navActiveClass);
    element.classList.add(navActiveClass);
    TABLE_EVENTS.active = parseInt(element.id.substring(element.id.lastIndexOf('-') + 1), 10);
    injectEventBody();
    // setTimeout(() => {
    //     element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // }, 200);
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
// timestamps is a list of ascending numbers, target is a number
// Find index of nearest timestamp to given target that is earlier than target. If not exists, return -1
function findClosestTimestamp(timestamps, target) {
    let left = 0;
    let right = timestamps.length - 1;
    let result = -1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (timestamps[mid] < target) {
            result = mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return result;
}

let VIDEO_POLL;
function videoStateChangeHandler(state) {
    const { target, data } = state;
    
    // Started to play => 1
    if (data === 1) {
        const { setlist } = EVENTS[TABLE_EVENTS.active];
        const timestamps = setlist.map(x => x[1]);

        VIDEO_POLL = setInterval(() => {
            const time = target.getCurrentTime();  // in seconds
            const i = findClosestTimestamp(timestamps, time);
            if (i === -1) {
                clearVideoChapter();
            } else {
                goToVideoChapter(cssGetId('concert-video-chapters').children[i], undefined)
            }

        }, 1000);
    } else if (VIDEO_POLL) {
        clearInterval(VIDEO_POLL);
        VIDEO_POLL = undefined;
    }
}

// https://developers.google.com/youtube/iframe_api_reference
let CURR_VIDEO_ID = 'TiStCNPn10s';
let VIDEO;
function onYouTubeIframeAPIReady() {
    VIDEO = new YT.Player('concert-video-embed', {
        videoId: CURR_VIDEO_ID,
        width: "300",
        height: "200",
        playerVars: { origin: window.location.origin },
        events: { onStateChange: videoStateChangeHandler, onError: console.log }
    });
}

function loadYoutubeVideo(url) {
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);

    if (match) {
        CURR_VIDEO_ID = match[1];
        VIDEO?.cueVideoById({
            videoId: CURR_VIDEO_ID,
        })
    } else {
        throw new Error(`Couldn't parse youtube URL ${url}.`);
    }
}

function clearVideoChapter() {
    const className = 'concert-video-chapter-active';
    cssGetClass(className)[0]?.classList.remove(className);
}

function goToVideoChapter(element, seconds) {
    if (!VIDEO) return;

    const className = 'concert-video-chapter-active';
    cssGetClass(className)[0]?.classList.remove(className);
    element.classList.add(className);
    
    if (seconds !== undefined) {
        VIDEO.seekTo(seconds, true);
    }
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

/**
 * Ensures that clicks outside of a filter menu will close it
 */
const handleClick = (() => {
    const button1 = cssGetFirst('#section-musicians .toolbar .toolbar-filter');
    const window1 = cssGetId('musicians-filter-menu');

    const button2 = cssGetFirst('#section-music-archive .toolbar .toolbar-filter');
    const window2 = cssGetId('music-filter-menu');

    const button3 = cssGetFirst('#section-events .toolbar .toolbar-filter');
    const window3 = cssGetId('events-filter-menu');

    return (event) => {
        if (!button1.contains(event.target) && !window1.contains(event.target)) {
            window1.classList.add('toolbar-filter-menu-hidden');
        }
        if (!button2.contains(event.target) && !window2.contains(event.target)) {
            window2.classList.add('toolbar-filter-menu-hidden');
        }
        if (!button3.contains(event.target) && !window3.contains(event.target)) {
            window3.classList.add('toolbar-filter-menu-hidden');
        }
        const container = cssGetClass('concert-performers-caption-active')[0];
        if (container && !container.contains(event.target)) {
            const caption = container.children[1].getBoundingClientRect();
            const outOfCaption = event.clientX < caption.left || event.clientX > caption.right || event.clientY < caption.top || event.clientY > caption.bottom;
            if (outOfCaption) {
                container.classList.remove('concert-performers-caption-active');
            }
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
    updateEventsSidebar();
    injectEventBody();
    updateMusicTable();

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

    if (window.innerWidth < 900) {
        cssGetId('nav-events-sidebar').style.setProperty('height', ``);
    }
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

const TABLE_MUSICIANS = {
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
function filterMusician(x) {
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
        const tags = new Set([...x.roles.map(x => x.slice(0, x.includes(" (") ? x.indexOf(' (') : undefined)), ...x.instruments].map(x => x.toLowerCase()));
        if (includeTags && includeTags.split(',').map(x => x.toLowerCase().trim()).some(x => !tags.has(x))) return false;
        if (excludeTags && excludeTags.split(',').map(x => x.toLowerCase().trim()).some(x => tags.has(x))) return false;
    }

    return true;
}
function constructMusicianRow(member) {
    return construct({
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
                    innerText: x.text,
                    style: getTagColour(x.text)
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
const updateMusiciansTable = (() => {
    const idToRow = {};
    const table = cssGetFirst('#table-musicians tbody');
    const pageCount = cssGetId('table-page-count');
    let prevMembers = undefined;

    return async (reFilter=true) => {
        const members = (reFilter || !prevMembers) ? MEMBERS.filter(filterMusician) : prevMembers;
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
                row = constructMusicianRow(member);
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
const toggleButtonMemberTagType = (() => {
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
}, 300);

function getTagColour(name) {
    name = name.toLowerCase();
    if (name.includes(' (')) {
        name = name.slice(0, name.indexOf(' ('));
    }
    const background = TAGS[name];
    if (background) {
        const rgbs = extractRGB(background);
        const color = rgbs.flat().reduce((a, b) => a + b) / (rgbs.length * 3) > 128 ? 'black' : 'white';
        if (background.startsWith('linear-gradient')) {
            return { color, 'background-image': background }
        } else if (background.startsWith('rgb')) {
            return { color, 'background-color': background }
        } else {
            throw new Error(background);
        }
    }
    return {};
}

async function injectMembers() {
    // Get personnel - instruments + specific roles
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

    // Render personnel
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
                        innerText: x,
                        style: getTagColour(x)
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

const TABLE_MUSIC = {
    filters: {
        performance: 'all',
        mediaOrigin: 'all',
        filterSheetMusic: false,
        title: '',
        composer: '',
        arranger: '',
        from: '',
        performed: '',
        includeInstruments: '',
        excludeInstruments: ''
    }
}
function toggleButtonMusicPerformances(element) {
    if (TABLE_MUSIC.filters.performance === 'all') {
        TABLE_MUSIC.filters.performance = 'large';
        element.innerText = 'Large Ensembles';
    } else if (TABLE_MUSIC.filters.performance === 'large') {
        TABLE_MUSIC.filters.performance = 'small';
        element.innerText = 'Small Ensembles';
    } else if (TABLE_MUSIC.filters.performance === 'small') {
        TABLE_MUSIC.filters.performance = 'recording';
        element.innerText = 'Recording Projects';
    } else if (TABLE_MUSIC.filters.performance === 'recording') {
        TABLE_MUSIC.filters.performance = 'external';
        element.innerText = 'External Groups';
    } else {
        TABLE_MUSIC.filters.performance = 'all';
        element.innerText = 'All Performances';
    }
    updateMusicTable();
};
function toggleButtonMusicMediaOrigin(element) {
    if (TABLE_MUSIC.filters.mediaOrigin === 'all') {
        TABLE_MUSIC.filters.mediaOrigin = 'anime';
        element.innerText = 'Anime Music';
    } else if (TABLE_MUSIC.filters.mediaOrigin === 'anime') {
        TABLE_MUSIC.filters.mediaOrigin = 'vg';
        element.innerText = 'Video Game Music';
    } else if (TABLE_MUSIC.filters.mediaOrigin === 'vg') {
        TABLE_MUSIC.filters.mediaOrigin = 'vocaloid';
        element.innerText = 'Vocaloid Music';
    } else {
        TABLE_MUSIC.filters.mediaOrigin = 'all';
        element.innerText = 'All Media Origins';
    }
    updateMusicTable();
}
function toggleButtonMusicLinkType(element) {
    element.innerText = TABLE_MUSIC.filters.filterSheetMusic ? 'All Link Types' : 'Has Sheet Music';
    TABLE_MUSIC.filters.filterSheetMusic = !TABLE_MUSIC.filters.filterSheetMusic;
    updateMusicTable();
}
function getInstrumentationFromPerformers(performers) {
    return Object.entries(performers).map(([instrument, players]) => (
        players.length > 1 ? `${instrument} (${players.length})` : instrument
    ));
}
function initMusicTable() {
    const table = cssGetFirst('#table-music-archive tbody');
    const rows = [];
    let j = 0;
    const originalRow = {};

    MUSIC.forEach((x, i) => {
        // Create multiple versions of the same song if the song has multiple arrangements, as judged by
        // - Different sheet music links
        // - Different instrumentation or arranger (if applicable)

        let versions = {};
        const first = x.performances[0];
        if (!first) {
            throw new Error(`No performances found: ${x}`);
        }
        const firstData = {
            instrumentation: getInstrumentationFromPerformers(first.performers),
            concerts: first.concerts,
            songType: first.songType
        };
        if (first.arranger) {
            firstData.arranger = first.arranger.map(y => typeof(y) === 'number' ? MEMBERS[y].name : y).join(', ');
        }
        if (first.sheetMusic) { firstData.sheetMusic = first.sheetMusic }
        if (first.link) {
            firstData.link = [first.link];
            firstData.concerts.push('Recording');
        }

        // Index performances by sheet music/instrumentation
        if (first.sheetMusic) {
            versions[first.sheetMusic] = firstData
        } else {
            versions[getInstrumentationFromPerformers(first.performers).join('|')] = firstData;
        }

        // If performances match a pre-existing one, append the concert
        for (const performance of x.performances.slice(1)) {
            const i1 = versions[performance.sheetMusic]?.instrumentation.join('|');
            const i2 = getInstrumentationFromPerformers(performance.performers).join('|');
            const a1 = versions[performance.sheetMusic]?.arranger.join('|');
            const a2 = performance.arranger.join('|');

            if (performance.sheetMusic && versions[performance.sheetMusic]) {
                if (i1 !== i2) { throw new Error(`[${x.name}] Expected performances with same sheet music to have same instrumentation`); }
                if (a1 !== a2) { throw new Error(`[${x.name}] Expected performances with same sheet music to have same arranger`); }
                versions[performance.sheetMusic].concerts.push(...performance.concerts);
                if (performance.link) {
                    if (!version[performance.sheetMusic].link) {
                        version[performance.sheetMusic].link = [];
                    }
                    version[performance.sheetMusic].link.push(performance.link);
                    version[performance.sheetMusic].concerts.push('Recording');
                }

            } else if (i1 === i2 && a1 === a2) {
                versions[i1].concerts.push(...performance.concerts);
                if (performance.link) {
                    if (!version[i1].link) {
                        version[i1].link = [];
                    }
                    version[i1].link.push(performance.link);
                    version[i1].concerts.push('Recording');
                }
            } else {
                const indexer = performance.sheetMusic || i2;
                const newData = {
                    instrumentation: getInstrumentationFromPerformers(performance.performers),
                    concerts: performance.concerts,
                    songType: performance.songType
                };
                if (performance.arranger) {
                    newData.arranger = performance.arranger.map(y => typeof(y) === 'number' ? MEMBERS[y].name : y).join(', ');
                }
                if (performance.sheetMusic) { newData.sheetMusic = performance.sheetMusic; }
                if (performance.link) {
                    newData.link = [performance.link];
                    newData.concerts.push('Recording');
                }
                versions[indexer] = newData;
            }
        }
        versions = Object.values(versions);
        for (let k = 0; k < versions.length; k++) {
            originalRow[k + j] = i;
        }
        j += versions.length;
        rows.push(...versions);
    });

    return [table, rows, originalRow];
}
function constructMusicTableRow(version, x) {
    const links = [
        ['table-music-archive-reference', x.reference],
        ...version.link?.map(x => ['table-music-archive-recording',  x]) ?? [],
        ['table-music-archive-sheet-music', version.sheetMusic]
    ].filter(link => !!link[1]);

    return construct({
        element: 'tr',
        children: [{
            element: 'td',
            innerText: x.name,
        }, {
            element: 'td',
            innerText: x.composer
        }, {
            element: 'td',
            innerText: version.arranger
        }, {
            element: 'td',
            innerText: x.from
        }, {
            element: 'td',
            children: [{
                element: 'div',
                classes: ['table-music-archive-links'],
                children: links.map(([className, link]) => ({
                    element: 'a',
                    classes: [className],
                    attributes: {
                        href: link,
                        target: '_blank'
                    }
                }))
            }]
        }, {
            element: 'td',
            children: [{
                element: 'p',
                classes: ['tag-container'],
                children: version.concerts.map(concert => {
                    let name = parseInt(concert, 10);
                    name = !isNaN(name) ? EVENTS[name].name : concert;
                    return {
                        element: 'span',
                        innerText: name
                    };
                })
            }]
        }, {
            element: 'td',
            children: [{
                element: 'p',
                classes: ['tag-container'],
                children: version.instrumentation.map(instrument => {
                    let name = parseInt(instrument, 10);
                    name = !isNaN(name) ? INSTRUMENTS[name] : instrument;
                    let innerHTML = name;
                    if (instrument.includes('(')) {
                        name = instrument.slice(0, instrument.lastIndexOf('(')).trim();
                        name = !isNaN(parseInt(name, 10)) ? INSTRUMENTS[parseInt(name, 10)] : name;
                        const count = instrument.slice(instrument.lastIndexOf('(') + 1, instrument.lastIndexOf(')'));
                        innerHTML = `${name} <em>×${count}</em>`
                    }

                    return {
                        element: 'span',
                        innerHTML,
                        style: getTagColour(name)
                    }
                })
            }]
        }]
    });
}
function toggleMenuFilterMusic() {
    cssGetId('music-filter-menu').classList.toggle('toolbar-filter-menu-hidden');
}
const changeFilterMusic = debounce(() => {
    TABLE_MUSIC.filters.title = cssGetId('music-filter-title').value;
    TABLE_MUSIC.filters.composer = cssGetId('music-filter-composer').value;
    TABLE_MUSIC.filters.arranger = cssGetId('music-filter-arranger').value;
    TABLE_MUSIC.filters.from = cssGetId('music-filter-from').value;
    TABLE_MUSIC.filters.performed = cssGetId('music-filter-performed').value;
    TABLE_MUSIC.filters.includeInstruments = cssGetId('music-filter-include-instruments').value;
    TABLE_MUSIC.filters.excludeInstruments = cssGetId('music-filter-exclude-instruments').value;
    updateMusicTable();
}, 300);
function filterMusic(version, x) {
    if (TABLE_MUSIC.filters.performance !== 'all') {
        if (TABLE_MUSIC.filters.performance === 'large' && version.songType !== 'Large') return true;
        if (TABLE_MUSIC.filters.performance === 'small' && version.songType !== 'Small') return true;
        if (TABLE_MUSIC.filters.performance === 'external' && version.songType !== 'External') return true;
        if (TABLE_MUSIC.filters.performance === 'recording' && ! version.concerts.includes('Recording')) return true;
    }
    if (TABLE_MUSIC.filters.mediaOrigin !== 'all') {
        if (TABLE_MUSIC.filters.mediaOrigin === 'anime' && x.mediaOrigin !== 'Anime') return true;
        if (TABLE_MUSIC.filters.mediaOrigin === 'vg' && x.mediaOrigin !== 'Video Game') return true;
        if (TABLE_MUSIC.filters.mediaOrigin === 'vocaloid' && x.mediaOrigin !== 'Vocaloid') return true;
    }
    if (TABLE_MUSIC.filters.filterSheetMusic && !version.sheetMusic) return true;

    if (TABLE_MUSIC.filters.title && !x.name.toLowerCase().includes(TABLE_MUSIC.filters.title.toLowerCase())) return true;
    if (TABLE_MUSIC.filters.composer && !x.composer.toLowerCase().includes(TABLE_MUSIC.filters.composer.toLowerCase())) return true;
    if (TABLE_MUSIC.filters.arranger && (!version.arranger || !version.arranger.toLowerCase().includes(TABLE_MUSIC.filters.arranger.toLowerCase()))) return true;
    if (TABLE_MUSIC.filters.from && (!x.from || !x.from.toLowerCase().includes(TABLE_MUSIC.filters.from.toLowerCase()))) return true;
    
    if (TABLE_MUSIC.filters.performed && !version.concerts.some(y => (
        y.toLowerCase().includes(TABLE_MUSIC.filters.performed.toLowerCase())
    ))) {
        return true;
    }

    if (TABLE_MUSIC.filters.includeInstruments || TABLE_MUSIC.filters.excludeInstruments) {
        const instruments = new Set(version.instrumentation.map(i => INSTRUMENTS[parseInt(i, 10)].toLowerCase()));
        if (TABLE_MUSIC.filters.includeInstruments) {
            const filter = TABLE_MUSIC.filters.includeInstruments.split(',').map(x => x.trim().toLowerCase());
            if (filter.some(y => !instruments.has(y))) return true;
        }
        if (TABLE_MUSIC.filters.excludeInstruments) {
            const filter = TABLE_MUSIC.filters.excludeInstruments.split(',').map(x => x.trim().toLowerCase());
            if (filter.some(y => instruments.has(y))) return true;
        }
    }
    return false;
}
const updateMusicTable = (() => {
    const [table, rows, originalRow] = initMusicTable();   
    const elements = {};

    return async () => {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < rows.length; i++) {
            const version = rows[i];
            const x = MUSIC[originalRow[i]];

            if (filterMusic(version, x)) {
                continue;
            }

            if (!elements[i]) {
                elements[i] = constructMusicTableRow(version, x);
            }
            fragment.appendChild(elements[i]);
        }
        table.replaceChildren(fragment);
    }
})();

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
                children: paragraphs.length > 0 ? paragraphs : { element: 'p', innerText: '???' }
            }]
        };
        container.appendChild(construct(json));
    }
}

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

const TABLE_EVENTS = {
    active: EVENTS[EVENTS.length - 1].id,
    filters: {
        type: 'All',
        name: '',
        before: '',
        after: '',
        location: '',
    }
}
function toggleButtonEventType(element) {
    if (TABLE_EVENTS.filters.type === 'All') {
        TABLE_EVENTS.filters.type = 'Concert';
        element.innerText = 'Concerts';
    } else if (TABLE_EVENTS.filters.type === 'Concert') {
        TABLE_EVENTS.filters.type = 'Workshop';
        element.innerText = 'Workshops';
    } else if (TABLE_EVENTS.filters.type === 'Workshop') {
        TABLE_EVENTS.filters.type = 'External';
        element.innerText = 'External Events';
    } else if (TABLE_EVENTS.filters.type === 'External') {
        TABLE_EVENTS.filters.type = 'Other';
        element.innerText = 'Miscellaneous Events';
    } else {
        TABLE_EVENTS.filters.type = 'All';
        element.innerText = 'All Event Types';
    }
    updateEventsSidebar();
}
function toggleMenuFilterEvent() {
    cssGetId('events-filter-menu').classList.toggle('toolbar-filter-menu-hidden');
}
const changeFilterEvents = debounce(() => {
    TABLE_EVENTS.filters.name = cssGetId('event-filter-name').value;
    TABLE_EVENTS.filters.before = cssGetId('event-filter-before').value;
    TABLE_EVENTS.filters.after = cssGetId('event-filter-after').value;
    TABLE_EVENTS.filters.location = cssGetId('event-filter-location').value;
    updateEventsSidebar();
}, 300);
function filterEvent(event) {
    if (TABLE_EVENTS.filters.type && TABLE_EVENTS.filters.type !== 'All' && TABLE_EVENTS.filters.type !== event.type) return true; 
    if (TABLE_EVENTS.filters.name && !event.name.toLowerCase().includes(TABLE_EVENTS.filters.name.toLowerCase())) return true;
    if (TABLE_EVENTS.filters.before) {
        const d = parseDate(TABLE_EVENTS.filters.before);
        if (!d || d <= event.date) return true;
    }
    if (TABLE_EVENTS.filters.after) {
        const d = parseDate(TABLE_EVENTS.filters.after);
        if (!d || d >= event.date) return true;
    }
    if (TABLE_EVENTS.filters.location && !event.location.toLowerCase().includes(TABLE_EVENTS.filters.location.toLowerCase())) return true;
    return false;
}
const updateEventsSidebar = (() => {
    const sidebar = cssGetId('nav-events');
    const container = cssGetId('nav-events-sidebar');
    const body = cssGetId('event-body');

    // Set sidebar height to match height event body content
    const bodyStyle = getComputedStyle(cssGetId('event-body'));
    const gap = parseInt(bodyStyle.gap, 10);
    const padding = parseInt(bodyStyle.padding, 10);
    const observer = new ResizeObserver(entries => {
        if (window.innerWidth < 900) {
            container.style.setProperty('height', ``);
            return;
        }
        for (let entry of entries) {
            if (!entry.target.classList.contains('tab-concert-active')) {
                continue;
            }
            let height = Array.from(body.children).slice(0, 3).map(x => x.scrollHeight).reduce((a, b) => a + b + gap)
            height += gap + entry.target.scrollHeight + padding * 2;
            container.style.setProperty('height', `${Math.max(height, window.innerHeight)}px`);
            break;
        }
    });
    Array.from(cssGetClass('tab-concert')).forEach(x => observer.observe(x));
    const sortedEvents = EVENTS.toSorted((a, b) => b.date.localeCompare(a.date));

    const elements = {};
    return async () => {
        const fragment = document.createDocumentFragment();
        sortedEvents.forEach(row => {
            if (filterEvent(row)) {
                return;
            }
            const classes = [];
            if (dateToString() <= row.date) { classes.push('nav-events-upcoming'); }

            if (!elements[row.id]) {
                elements[row.id] = construct({
                    element: 'li',
                    id: `nav-events-${row.id}`,
                    attributes: { onclick: 'toggleEventTab(this)'},
                    classes,
                    children: [{
                        element: 'span',
                        innerText: row.name
                    }, {
                        element: 'span',
                        innerText: row.date
                    }]
                });
            }
            if (row.id === TABLE_EVENTS.active) {
                elements[row.id].classList.add('nav-events-active');
            } else {
                elements[row.id].classList.remove('nav-events-active');
            }
            fragment.appendChild(elements[row.id]);
        })
        sidebar.replaceChildren(fragment);
    }
})();

function toggleSongPerformersCaption(element) {
    const className = 'concert-performers-caption-active';
    const active = cssGetClass(className)[0];
    active?.classList.remove(className);
    if (active !== element) {
        element.classList.add(className);
    }
}
const constructSetlistItem = (() => {
    const cache = {};

    // (song info, setlist number, event id)
    return (song, i, id) => {
        const key = `${song.id}|${i}`;

        let performanceInfo;
        for (const performance of song.performances) {
            if (performance.concerts.includes(id)) {
                performanceInfo = performance;
                break;
            }
        }
        if (!performanceInfo) {
            throw new Error(`Setlist for '${EVENTS[id].name}' includes '${song.name}' which has no performance info for that concert`)
        }

        if (!cache[key]) {
            let name = song.name;
            let bracket = '';
            if (name.includes('(') && name.includes(')')) {
                const ind = name.lastIndexOf('(');
                bracket = name.slice(ind, name.lastIndexOf(')') + 1);
                name = name.slice(0, ind);

                bracket = `<span class="concert-item-title-bracket">${bracket}</span> `
            }
            const number = `<span class="concert-item-title-number">// ${String(i + 1).padStart(2, '0')}</span>`

            const performanceBlocks = [{
                element: 'h4',
                innerHTML: `${name} ${bracket}${number}`
            }, {
                element: 'p',
                innerHTML: `<span>by</span> ${song.composer}`
            }, performanceInfo.arranger ? {
                element: 'p',
                innerHTML: `<span>arranged by</span> ${performanceInfo.arranger.map(x => MEMBERS[x]?.name ?? x).join(', ')}`
            } : undefined, song.from ? {
                element: 'p',
                innerHTML: `<span>from</span> ${song.from}`
            } : undefined];

            cache[key] = construct({
                element: 'li',
                classes: ['concert-item'],
                children: [{
                    element: 'hgroup',
                    children: performanceBlocks
                }, {
                    element: 'div',
                    children: [performanceInfo.group ? {
                        element: 'span',
                        classes: ['concert-item-group-name'],
                        innerText: performanceInfo.group
                    } : undefined, {
                        element: 'span',
                        classes: ['concert-item-button', 'concert-performers-button'],
                        attributes: {
                            onclick: 'toggleSongPerformersCaption(this)'
                        },
                        children: [{
                            element: 'img',
                            attributes: {
                                src: 'assets/icons/users.svg'
                            }
                        }, {
                            element: 'dl',
                            children: Object.entries(performanceInfo.performers).map(([instrumentId, performersId]) => (
                                performersId
                                    .map(performerId => MEMBERS[performerId]?.name ?? performerId)
                                    .toSorted()
                                    .map(performerId => [{
                                        element: 'dt',
                                        innerText: INSTRUMENTS[instrumentId]
                                    }, {
                                        element: 'dd',
                                        innerText: MEMBERS[performerId]?.name ?? performerId 
                                    }])
                            )).flat(2)
                        }]
                    }, performanceInfo.sheetMusic ? {
                        element: 'a',
                        classes: ['concert-item-button'],
                        attributes: {
                            href: performanceInfo.sheetMusic,
                            target: '_blank'
                        },
                        children: [{
                            element: 'img',
                            attributes: {
                                src: 'assets/icons/logos/drive.svg'
                            }
                        }]
                    } : undefined]
                }]
            })
        }
        return cache[key];
    }
})()
function getPerformances(setlist) {
    return setlist.map(info => {
        // Filter out timestamps
        const id = Array.isArray(info) ? info[0] : info;
        return MUSIC[id].performances.map(x => x.performers)
    }).flat();
}
function constructPerformers(performances) {
    // Map instruments to unique performers
    const performers = {};
    for (const performance of performances) {
        for (const instrumentId in performance) {
            if (!performers[instrumentId]) {
                performers[instrumentId] = new Set();
            }
            for (const performerId of performance[instrumentId]) {
                performers[instrumentId].add(performerId);
            }
        }
    }
    return Object.entries(performers).map(([instrumentId, performerIds]) => construct({
        element: 'li',
        children: [{
            element: 'h4',
            innerText: INSTRUMENTS[instrumentId]
        }, ...Array.from(performerIds).map(id => ({
            element: 'p',
            innerText: MEMBERS[id]?.name ?? "???"
        }))]
    }))
}
function injectEventBody() {
    const { id, name, type, location, description, date, time, setlist, video, gallery } = EVENTS[TABLE_EVENTS.active];

    // Parse event time
    let from, to;
    if (time) {
        [from, to] = time?.split('-');

        let [h1, m1] = to.split(':');
        h1 = parseInt(h1, 10);
        if (h1 > 12) { to = `${h1 - 12}:${m1} pm`; }
        else if (h1 === 0) { to = `12:${m1} am`; }
        else { to = `${h1}:${m1} am`; }
        
        let [h0, m0] = from.split(':');
        h0 = parseInt(h0, 10);
        if ((h0 > 12) === (h1 > 12)) { from = `${h0 - 12}:${m0}`; }
        else if (h0 > 12) { from = `${h0 - 12}:${m0} pm`; }
        else if (h0 === 0) { from = `12:${m0} am`; }
        else { from = `${h0}:${m0} am`; }
    }

    const navConcert = cssGetFirst('#event-body nav');
    const tabConcert = Array.from(cssGetClass('tab-concert'));
    VIDEO?.pauseVideo();

    // Show/hide concert widget
    if (type === 'Concert' && setlist) {
        navConcert.style.setProperty('display', '');
        tabConcert.forEach(x => x.style.setProperty('display', ''));

        // Setlist inner tab
        let fragment = document.createDocumentFragment();
        setlist.forEach((info, i) => {
            const setlistId = Array.isArray(info) ? info[0] : info;
            fragment.appendChild(constructSetlistItem(MUSIC[setlistId], i, id));
        })
        cssGetId('concert-items').replaceChildren(fragment);

        // Performers inner tab
        fragment = document.createDocumentFragment();
        const performances = getPerformances(setlist);
        constructPerformers(performances).forEach(x => {
            fragment.appendChild(x);
        });
        cssGetId('concert-performers').replaceChildren(fragment);

        // Video inner tab
        const navConcertVideo = cssGetId('nav-concert-video');
        if (video) {
            navConcertVideo.style.setProperty('display', '');
            loadYoutubeVideo(video);
            
            // Video timestamps
            const concertVideoChapters = cssGetId('concert-video-chapters');
            const timestamps = setlist.map((x, i) => [x, i + 1]).filter(x => Array.isArray(x[0]));
            if (timestamps?.length > 0) {
                concertVideoChapters.style.setProperty('display', '');
                
                fragment = document.createDocumentFragment();
                timestamps.forEach(([[songId, seconds], i]) => {
                    fragment.appendChild(construct({
                        element: 'li',
                        attributes: {
                            onclick: `goToVideoChapter(this, ${seconds})`
                        },
                        innerHTML: `<span>${String(i).padStart(2, '0')} //</span> ${MUSIC[songId].name}`
                    }))
                });
                concertVideoChapters.replaceChildren(fragment);                
            } else {
                concertVideoChapters.style.setProperty('display', 'none');
            }
        } else {
            navConcertVideo.style.setProperty('display', 'none');
            
            // If video tab is focused + clicked video-less concert, switch to setlist inner tab 
            if (navConcertVideo.classList.contains('nav-concert-active')) {
                toggleConcertTab(cssGetId('nav-concert-setlist'));
            }
        }

        // Gallery inner tab
        const navConcertGallery = cssGetId('nav-concert-gallery');
        if (gallery) {
            navConcertGallery.href = gallery;
            navConcertGallery.style.setProperty('display', '');
        } else {
            navConcertGallery.style.setProperty('display', 'none');
        }
    } else {
        navConcert.style.setProperty('display', 'none');
        tabConcert.forEach(x => x.style.setProperty('display', 'none'));
    }

    cssGetFirst('#event-title h3').innerHTML = `${name} <span>// ${date}</span>`;
    cssGetFirst('#event-title p').innerText = `${from || '???'} − ${to || '???'} @ ${location || '???'}`;
    
    // Show/hide event description
    const eventDescription = cssGetId('event-description');
    if (description) {
        eventDescription.style.setProperty('display', '');
        eventDescription.innerText = description;
    } else {
        eventDescription.style.setProperty('display', 'none');
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