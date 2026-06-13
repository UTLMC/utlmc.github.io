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
 * Convert two dates (new Date()) into a formatted "X to Y" string
 * The formatted string includes dates + times
 */
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

/**
 * Convert any "YYYY-MM-DD" with a [-/\ .] delimiter into "YYYY-MM-DD"
 */
function normalizeDateString(str) {
    let date;
    for (const delimiter of ['-', '/', '\\', ' ', '.']) {
        date = str.split(delimiter);
        if (date.length === 3) { break; }
    }
    if (date.length !== 3) { return ''; }
    let [year, month, day] = date.map(x => parseInt(x, 10));
    if (isNaN(year) || isNaN(month) || isNaN(day)) { return ''; }

    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
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

function parseMarkdown(text) {
    // Links
    text = text.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" target="_blank">$1</a>'
    );
    return text;
}

function isSubstring(parent, child) {
    return parent.toLowerCase().includes(child.toLowerCase());
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
    section.classList.toggle('section-events-no-sidebar');

    cssGetFirst('#nav-events-sidebar .toolbar').classList.toggle('nav-events-sidebar-closed');
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
function toggleEventTab(element, id) {
    const navActiveClass = `nav-events-active`;
    const oldActiveElement = cssGetClass(navActiveClass)[0];
    if (oldActiveElement === element) {
        return;
    }
    oldActiveElement?.classList.remove(navActiveClass);
    element.classList.add(navActiveClass);
    TABLE_EVENTS.active = id;
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
function toggleCarousel(next) {
    CURR_CAROUSEL = (CURR_CAROUSEL + (next ? 1 : -1) + CAROUSEL.length) % CAROUSEL.length;
    cssGetClass('carousel-active')[0].classList.remove('carousel-active');
    cssGetClass('carousel')[CURR_CAROUSEL].classList.add('carousel-active');
    
    cssGetId('carousel-caption').innerHTML = CAROUSEL[CURR_CAROUSEL].caption;
    updateCarousel();
}

// Fix sizing issue on Firefox
// There's a glitch where it doesn't resize properly as screen width changes
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
    const button1 = cssGetFirst('#section-members .toolbar .toolbar-filter');
    const window1 = cssGetId('members-filter-dropdown');

    const button2 = cssGetFirst('#section-music-archive .toolbar .toolbar-filter');
    const window2 = cssGetId('music-filter-dropdown');

    const button3 = cssGetFirst('#section-events .toolbar .toolbar-filter');
    const window3 = cssGetId('events-filter-dropdown');

    return (event) => {
        if (!button1.contains(event.target) && !window1.contains(event.target)) {
            window1.classList.add('toolbar-filter-dropdown-hidden');
        }
        if (!button2.contains(event.target) && !window2.contains(event.target)) {
            window2.classList.add('toolbar-filter-dropdown-hidden');
        }
        if (!button3.contains(event.target) && !window3.contains(event.target)) {
            window3.classList.add('toolbar-filter-dropdown-hidden');
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


async function injectFormLinks() {
    for (const [id, link] of Object.entries(FORM_LINKS)) {
        cssGetId(id).setAttribute('href', link);
    }
}


/*********************************************************************
Home tab - image carousel
*********************************************************************/
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


/*********************************************************************
Home tab - current event promotion
*********************************************************************/
function injectHomeConcert(now) {
    const {
        id,
        links: { poster, rvsp, setlist },
        location,
        tickets,
        preConcertDescription,
        postConcertDescription,
    } = CURRENT_EVENT;

    const { name: title, start, end, video } = EVENTS[id];
    const dateStart = parseDate(start);
    const dateEnd = parseDate(end);

    cssGetFirst('#home-event-poster img').src = poster;
    cssGetFirst('#home-event-text hgroup h3').innerText = title;
    cssGetId('home-event-date').innerText = parseFromTo(dateStart, dateEnd);
    cssGetId('home-event-location').innerText = location;
    cssGetId('home-event-tickets').innerText = tickets;

    const text = now > dateEnd ? postConcertDescription : preConcertDescription;
    const paragraphs = text.map(x => construct({ element: 'p', innerText: x }));

    // Render call-to-action buttons
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
    if (video) {
        buttons.appendChild(construct({
            element: 'a',
            classes: ['home-event-button'],
            innerText: 'Watch the recording',
            attributes: { href: video, target: '_blank' }
        }));
    }

    const container = cssGetId('home-event-text');
    paragraphs.forEach(x => container.appendChild(x));
    container.appendChild(buttons);
}
async function injectHomeEvent() {
    const now = new Date();

    // Only concerts are supported right now
    if (!CURRENT_EVENT || now > parseDate(CURRENT_EVENT.hideAfter) || now < parseDate(CURRENT_EVENT.hideBefore)) {
        cssGetId('section-home-event').style.setProperty('display', 'none');
    } else if (EVENTS[CURRENT_EVENT.id].type === 'Concert') {
        injectHomeConcert(now);
    } else {
        throw new Error(EVENTS[CURRENT_EVENT.id].type);
    }
}


/*********************************************************************
Home tab - announcements + upcoming events
*********************************************************************/
async function injectHomeBulletin() {
    const sectionAnnouncements = cssGetId('section-announcements');
    const sectionUpcoming = cssGetId('section-upcoming-events');
    const containerAnnouncements = cssGetId('announcement-container');
    const containerUpcoming = cssGetId('upcoming-events-container');

    const now = new Date();
    const visibilityCheck = ({ from, until }) => {
        if (from && now < parseDate(from)) { return false; }
        if (until && now > parseDate(until)) { return false }
        return true;
    }

    const announcements = ANNOUNCEMENTS.filter(visibilityCheck);
    const upcomingEvents = UPCOMING_EVENTS.filter(visibilityCheck);

    for (const { type, text } of ANNOUNCEMENTS) {
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
    }

    for (const { id, image } of UPCOMING_EVENTS) {
        const { name: title, start, end, location } = EVENTS[id];
        const dateStart = parseDate(start);
        const dateEnd = parseDate(end);

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
        }));
    }
    
    // Formatting for edge cases (i.e. at least one of the two sections is blank)
    if (announcements.length === 0 && upcomingEvents.length === 0) {
        sectionAnnouncements.style.setProperty('display', 'none');
        sectionUpcoming.style.setProperty('display', 'none');
    } else if (announcements.length === 0) {
        sectionAnnouncements.style.setProperty('display', 'none');
        sectionUpcoming.style.setProperty('width', '100%');
    } else if (upcomingEvents.length === 0) {
        sectionAnnouncements.style.setProperty('width', '100%');
        sectionAnnouncements.classList.add('section-announcements-full');
        sectionUpcoming.style.setProperty('display', 'none');
    }
}


/*********************************************************************
About tab - members table
*********************************************************************/
function getTagColourStyle(name) {
    if (name.includes(' (')) {
        name = name.slice(0, name.indexOf(' ('));
    }
    const rgbs = TAGS[name];
    if (rgbs) {
        const color = rgbs.flat().reduce((a, b) => a + b) / rgbs.flat().length > 128 ? 'black' : 'white';
        if (rgbs.length === 2) {
            const [c0, c1] = rgbs.map(x => x.join(','))
            return { color, 'background-image': `linear-gradient(to right in oklab, rgb(${c0}), rgb(${c1}))` }
        } else if (rgbs.length === 1) {
            const [r, g, b] = rgbs[0];
            return { color, 'background-color': `rgb(${r}, ${g}, ${b})` }
        } else {
            throw new Error(background);
        }
    }
    return {};
}

const TABLE_MEMBERS = {
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

/**
 * Return true iff member x passes the filters in TABLE_MEMBERS 
 */
function filterMember(x) {
    const { filters: { memberType, name, joinedBefore, joinedAfter, includeTags, excludeTags } } = TABLE_MEMBERS;
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
        const tags = new Set([...x.roles.map(x => x.slice(0, x.includes(" (") ? x.indexOf(' (') : undefined)), ...x.instruments.map(x => INSTRUMENTS[x].toLowerCase())]);
        if (includeTags && includeTags.split(',').map(x => x.toLowerCase().trim()).some(x => !tags.has(x))) return false;
        if (excludeTags && excludeTags.split(',').map(x => x.toLowerCase().trim()).some(x => tags.has(x))) return false;
    }

    return true;
}
function constructMemberRow(member) {
    return construct({
        element: 'tr',
        children: [{
            element: 'td',
            innerText: member.name
        }, {
            element: 'td',
            children: [{
                element: 'p',
                classes: ['tag-container'],
                children: [
                    ...member.instruments.map(x => ({ text: INSTRUMENTS[x], type: 'instrument' })),
                    ...member.roles.map(x => ({ text: x, type: 'role' }))
                ].map(x => ({
                    element: 'span',
                    classes: [`li-${x.type}`],
                    innerText: x.text,
                    style: getTagColourStyle(x.text)
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
const updateMembersTable = (() => {
    const idToRow = {};
    const table = cssGetFirst('#table-members tbody');
    const pageCount = cssGetId('table-page-count');
    let prevMembers = undefined;

    return async (reFilter=true) => {
        const members = (reFilter || !prevMembers) ? MEMBERS.filter(filterMember) : prevMembers;
        prevMembers = members;

        // Update pagination display
        let start = 0;
        let end = 0;
        if (members.length === 0) {
            pageCount.innerHTML = `0-0 of 0`
        } else {
            const n = Math.ceil(members.length / TABLE_MEMBERS.pageSize);
            TABLE_MEMBERS.filters.page = (TABLE_MEMBERS.filters.page + n) % n;
            start = TABLE_MEMBERS.filters.page * TABLE_MEMBERS.pageSize;
            end = Math.min(members.length, (TABLE_MEMBERS.filters.page + 1) * TABLE_MEMBERS.pageSize);
            pageCount.innerHTML = `${start + 1}-${end} of ${members.length}`
        }

        // Re-generate rows
        const fragment = document.createDocumentFragment();
        const nextIdToRow = {};
        for (const member of members.slice(start, end)) {
            let row = idToRow[member.id];
            if (!row) {
                row = constructMemberRow(member);
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
function toggleDropdownFilterMember() {
    cssGetId('members-filter-dropdown').classList.toggle('toolbar-filter-dropdown-hidden');
}
function toggleButtonMemberType(element) {
    if (TABLE_MEMBERS.filters.memberType === 'current') {
        TABLE_MEMBERS.filters.memberType = 'past';
        element.innerText = 'Past Members';
    } else if (TABLE_MEMBERS.filters.memberType === 'past') {
        TABLE_MEMBERS.filters.memberType = 'all';
        element.innerText = 'All Members';
    } else {
        TABLE_MEMBERS.filters.memberType = 'current';
        element.innerText = 'Current Members';
    }
    TABLE_MEMBERS.filters.page = 0;
    updateMembersTable();
}
const toggleButtonMemberTagType = (() => {
    const style = document.createElement('style');
    document.head.appendChild(style);

    return (element) => {
        if (TABLE_MEMBERS.tags === 'all') {
            TABLE_MEMBERS.tags = 'instruments';
            element.innerText = 'Instrument Tags';
            style.textContent = '.li-role { display: none }';
        } else if (TABLE_MEMBERS.tags === 'instruments') {
            TABLE_MEMBERS.tags = 'roles';
            element.innerText = 'Role Tags';
            style.textContent = '.li-instrument { display: none }';
        } else {
            TABLE_MEMBERS.tags = 'all';
            element.innerText = 'All Tags';
            style.textContent = '';
        }
    }
})();
function membersTablePageChange(delta) {
    TABLE_MEMBERS.filters.page += delta;
    updateMembersTable(false);
}
const changeFilterMembers = debounce(() => {
    TABLE_MEMBERS.filters.name = cssGetId('member-filter-name').value;
    TABLE_MEMBERS.filters.joinedBefore = cssGetId('member-filter-joined-before').value;
    TABLE_MEMBERS.filters.joinedAfter = cssGetId('member-filter-joined-after').value;
    TABLE_MEMBERS.filters.includeTags = cssGetId('member-filter-include-tags').value;
    TABLE_MEMBERS.filters.excludeTags = cssGetId('member-filter-exclude-tags').value;
    updateMembersTable();
}, 300);

function getPersonnel() {
    const instruments = MEMBERS.filter(x => !x.left).map(x => x.instruments.map(y => INSTRUMENTS[y])).flat();
    let total = 0;
    const personnel = {};  // { instrument1: count1, ... }
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
    return [personnel, personnelRoles]
}

function injectPersonnel(personnel, personnelRoles) {
    function personnelSorter(a, b) {
        const [nameA, countA] = a;
        const [nameB, countB] = b;

        // Put total at end
        if (nameA === 'Total') { return 1; }
        else if (nameB === 'Total') { return -1; }
        
        if (countA === countB) {
            return nameA.localeCompare(nameB);
        }
        return countB - countA;
    }

    const nameSubstitutions = {
        'Alto Saxophone': 'Alto Sax',
        'Tenor Saxophone': 'Tenor Sax',
        'Baritone Saxophone': 'Baritone Sax',
    }
    const tablePersonnel = cssGetId('table-personnel');

    Object.entries(personnel).sort(personnelSorter).forEach(([name, count]) => {
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
}

function getExecTeam() {
    // Before August 20XX, use executive team from 20XX - 1
    // After August 20XX, update executive team to 20XX
    // If execs for 20XX don't exist, use the largest existing year 
    const now = new Date();
    let currYear = now.getMonth() >= 7 ? now.getFullYear() : now.getFullYear() - 1;

    const isExecForYear = (x, year) => x.roles.some(role => role.includes(String(year).slice(2)));
    let execTeam = MEMBERS.filter(x => isExecForYear(x, currYear));
    while (execTeam.length === 0) {
        currYear -= 1;
        execTeam = MEMBERS.filter(x => isExecForYear(x, currYear));
        if (currYear === 2022) {
            throw new Error("WTF");
        }
    }
    return [execTeam, currYear];
}

function injectExecTeam(execTeam, year) {
    function execTeamSorter(a, b) {
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
    }

    cssGetId('exec-team-year').innerText = `${year}-${year + 1}`;
    
    const digit = String(year).slice(2);
    const execTeamProfile = cssGetId('exec-team-profile');
    execTeam.sort(execTeamSorter).forEach(x => {
        const execRole = x.roles.find(role => role.includes(digit));
        const nonExecRoles = [
            ...x.instruments.map(y => INSTRUMENTS[y]),
            ...x.roles.filter(role => !role.includes(" ("))
        ];

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
                        style: getTagColourStyle(x)
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
}

function injectHomeOutreach(execTeam) {
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
}

async function injectMembers() {
    const [personnel, personnelRoles] = getPersonnel();
    injectPersonnel(personnel, personnelRoles);
    const [execTeam, year] = getExecTeam();
    injectExecTeam(execTeam, year);
    injectHomeOutreach(execTeam);
    updateMembersTable();
}


/*********************************************************************
Music archive tab/table
*********************************************************************/
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

/**
 * Given a performer list ({instrument1: [performer1, ...], ...}), return a list of
 * strings summarizing the instrumentation
 */
function getInstrumentationFromPerformers(performers) {
    return Object.entries(performers).map(([instrument, players]) => (
        players.length > 1 ? `${instrument} (${players.length})` : instrument
    ));
}

/**
 * Given an arranger list (list of indices or names), format them into a single string
 */
function parseArrangers(arrangers) {
    return arrangers.map(y => MEMBERS[y]?.name ?? y).join(', ');
}

/**
 * Given a performance, extract & parse the fields inside.
 * Also return a key that identifies it as unique in the music table
 */
function extractPerformanceInfo(p) {
    const data = {
        instrumentation: getInstrumentationFromPerformers(p.performers),
        concerts: p.concerts,
        songType: p.songType
    };
    if (p.arranger) {
        data.arranger = parseArrangers(p.arranger);
    }
    if (p.link) {
        data.link = [p.link];
        data.concerts.push('Recording');
    }

    let key;
    if (p.sheetMusic) {
        data.sheetMusic = p.sheetMusic;
        key = data.sheetMusic;
    } else {
        key = `${data.instrumentation.join('|')}|${data.arranger}`;
    }
    return [key, data];
}

function initMusicTable() {
    const rows = [];
    let rowIdx = 0;
    const rowToMUSIC = {};  // Map `rows` indices to `MUSIC` indices

    MUSIC.forEach((x, i) => {
        // Collapse multiple performances of the "same arrangement" of a song, as defined by:
        // - IF same sheet music link, THEN SAME
        // - ELSE IF same instrumentation & arranger (or they both lack arrangers), THEN SAME
        // - OTHERWISE DIFFERENT

        let songVersions = {};  // { sheetMusic or instrumentation/arranger: { ...songInfo }, ... }
        const firstPerformance = x.performances[0];
        if (!firstPerformance) {
            throw new Error(`No performances found: ${x}`);
        }
        const [key, firstData] = extractPerformanceInfo(firstPerformance);
        songVersions[key] = firstData;
        
        // Append performance info to a value of songVersions
        const appendToSongVersion = (existingSong, p) => {
            existingSong.concerts.push(...p.concerts);
            if (p.link) {
                if (!existingSong.link) {
                    existingSong.concerts.push('Recording');
                    existingSong.link = [];
                }
                existingSong.link.push(p.link);
            }
        }

        // If performance matches a pre-existing one, append to songVersion
        for (const p of x.performances.slice(1)) {
            let existingSong = songVersions[p.sheetMusic];
            const existingInstrumentation = existingSong?.instrumentation.join('|');
            const existingArranger = existingSong?.arranger;

            const instrumentation = getInstrumentationFromPerformers(p.performers).join('|');
            const arranger = parseArrangers(p.arranger);
            
            if (p.sheetMusic && existingSong) {
                if (existingInstrumentation !== instrumentation) {
                    throw new Error(`[${x.name}] Expected performances with same sheet music to have same instrumentation`);
                }
                if (existingArranger !== arranger) {
                    throw new Error(`[${x.name}] Expected performances with same sheet music to have same arranger`);
                }
                appendToSongVersion(existingSong, p);
            } else if (existingInstrumentation === instrumentation && existingArranger === arranger) {
                existingSong = songVersions[`${instrumentation}|${arranger}`];
                appendToSongVersion(existingSong, p);
            } else {
                const [key, performanceInfo] = extractPerformanceInfo(p);
                songVersions[key] = performanceInfo;
            }
        }

        // Different song versions get separate rows
        songVersions = Object.values(songVersions);
        for (let k = 0; k < songVersions.length; k++) {
            rowToMUSIC[k + rowIdx] = i;
        }
        rowIdx += songVersions.length;
        rows.push(...songVersions);
    });

    return [rows, rowToMUSIC];
}

/**
 * Construct the HTML for a music table row given the
 * specific songVersion info (version) and generic song info (x)
 */
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
                children: version.concerts.map(concert => ({
                    element: 'span',
                    innerText: EVENTS[parseInt(concert, 10)]?.name ?? concert
                }))
            }]
        }, {
            element: 'td',
            children: [{
                element: 'p',
                classes: ['tag-container'],
                children: version.instrumentation.map(instrument => {
                    // name format can be "instrumentName", "instrumentName (123)", "1234", "123 (456)"
                    let name = INSTRUMENTS[parseInt(instrument, 10)] ?? instrument;
                    let innerHTML = name;
                    if (instrument.includes('(')) {
                        name = instrument.slice(0, instrument.lastIndexOf('(')).trim();
                        name = INSTRUMENTS[parseInt(name, 10)] ?? name;
                        const count = instrument.slice(instrument.lastIndexOf('(') + 1, instrument.lastIndexOf(')'));
                        innerHTML = `${name} <em>×${count}</em>`
                    }

                    return {
                        element: 'span',
                        innerHTML,
                        style: getTagColourStyle(name)
                    }
                })
            }]
        }]
    });
}
function toggleDropdownFilterMusic() {
    cssGetId('music-filter-dropdown').classList.toggle('toolbar-filter-dropdown-hidden');
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

/**
 * Given the specific songVersion info (version) and generic song info (x),
 * return whether the song should be filtered out of the music table
 */
function filterOutMusicRow(version, x) {
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

    if (TABLE_MUSIC.filters.title    && !isSubstring(x.name, TABLE_MUSIC.filters.title)) return true;
    if (TABLE_MUSIC.filters.composer && !isSubstring(x.composer, TABLE_MUSIC.filters.composer)) return true;
    if (TABLE_MUSIC.filters.arranger && (!version.arranger || !isSubstring(version.arranger, TABLE_MUSIC.filters.arranger))) return true;
    if (TABLE_MUSIC.filters.from     && (!x.from || !isSubstring(x.from, TABLE_MUSIC.filters.from))) return true;
    
    if (TABLE_MUSIC.filters.performed && !version.concerts.some(id => (
        isSubstring(EVENTS[id]?.name ?? id, TABLE_MUSIC.filters.performed)
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
    const table = cssGetFirst('#table-music-archive tbody');
    const [rows, originalRow] = initMusicTable();   
    const elements = {};

    return async () => {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < rows.length; i++) {
            const version = rows[i];
            const x = MUSIC[originalRow[i]];

            if (filterOutMusicRow(version, x)) {
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


/*********************************************************************
Get involved tab - FAQ list
*********************************************************************/
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


/*********************************************************************
Events tab - event widget
*********************************************************************/
const TABLE_EVENTS = {
    active: EVENTS.length - 1,
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
function toggleDropdownFilterEvent() {
    cssGetId('events-filter-dropdown').classList.toggle('toolbar-filter-dropdown-hidden');
}
const changeFilterEvents = debounce(() => {
    TABLE_EVENTS.filters.name = cssGetId('event-filter-name').value;
    TABLE_EVENTS.filters.before = cssGetId('event-filter-before').value;
    TABLE_EVENTS.filters.after = cssGetId('event-filter-after').value;
    TABLE_EVENTS.filters.location = cssGetId('event-filter-location').value;
    updateEventsSidebar();
}, 300);
function filterOutEventRow(event) {
    if (TABLE_EVENTS.filters.type && TABLE_EVENTS.filters.type !== 'All' && TABLE_EVENTS.filters.type !== event.type) return true; 
    if (TABLE_EVENTS.filters.name && !isSubstring(event.name, TABLE_EVENTS.filters.name)) return true;
    if (TABLE_EVENTS.filters.before) {
        const d = normalizeDateString(TABLE_EVENTS.filters.before);
        if (!d || d <= event.start.split('|')[0]) return true;
    }
    if (TABLE_EVENTS.filters.after) {
        const d = normalizeDateString(TABLE_EVENTS.filters.after);
        if (!d || d >= event.start.split('|')[0]) return true;
    }
    if (TABLE_EVENTS.filters.location && !isSubstring(event.location, TABLE_EVENTS.filters.location)) return true;
    return false;
}

/**
 * CSS cannot force the event sidebar height to match the event body height
 * So we match the height with JS
 */
function initEventSidebarHeightAdjuster() {
    const container = cssGetId('nav-events-sidebar');
    const body = cssGetId('event-body');

    const bodyStyle = getComputedStyle(body);
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
}

function createEventRow(event) {
    return construct({
        element: 'li',
        attributes: { onclick: `toggleEventTab(this, ${event.id})`},
        children: [{
            element: 'span',
            innerText: event.name
        }, {
            element: 'span',
            innerText: event.start.split("|")[0]
        }]
    });
}

const updateEventsSidebar = (() => {
    initEventSidebarHeightAdjuster();

    const sidebar = cssGetId('nav-events');
    const sortedEvents = EVENTS.toSorted((a, b) => b.end.localeCompare(a.end));

    const elements = {};
    return async () => {
        let now = new Date();

        const fragment = document.createDocumentFragment();
        sortedEvents.forEach(row => {
            if (filterOutEventRow(row)) {
                return;
            }
            if (!elements[row.id]) {
                elements[row.id] = createEventRow(row);
            }
            
            if (now <= parseDate(row.end)) {
                elements[row.id].classList.add('nav-events-upcoming');
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

function constructSetlistTabSongItem(performanceInfo, song, i) {
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

    return construct({
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
    });
}

const constructSetlistTabSong = (() => {
    const cache = {};

    // (song info, setlist index, event id)
    return (song, i, eventId) => {
        const performanceInfo = song.performances.find(x => x.concerts.includes(eventId));
        if (!performanceInfo) {
            throw new Error(`Setlist for '${EVENTS[eventId].name}' includes '${song.name}' which has no performance info for that concert`)
        }
        const key = `${song.id}|${i}`;
        if (!cache[key]) {
            cache[key] = constructSetlistTabSongItem(performanceInfo, song, i);
        }
        return cache[key];
    }
})();

function constructPerformersTab(performances) {
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
            innerText: MEMBERS[id]?.name ?? id
        }))]
    }))
}

function getPerformers(setlist) {
    return setlist.map(info => {
        // Filter out timestamps
        const id = Array.isArray(info) ? info[0] : info;
        return MUSIC[id].performances.map(x => x.performers)
    }).flat();
}

function constructVideoTimestamps(setlist) {
    const concertVideoChapters = cssGetId('concert-video-chapters');
    const timestamps = setlist.map((x, i) => [x, i + 1]).filter(x => Array.isArray(x[0]));

    if (timestamps?.length === 0) {
        concertVideoChapters.style.setProperty('display', 'none');
        return;
    }
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
}

function injectEventBodyConcert(id, setlist, video, gallery) {
    const navConcert = cssGetFirst('#event-body nav');
    const tabConcert = Array.from(cssGetClass('tab-concert'));

    navConcert.style.setProperty('display', '');
    tabConcert.forEach(x => x.style.setProperty('display', ''));

    // Setlist inner tab
    let fragment = document.createDocumentFragment();
    setlist.forEach((info, i) => {
        const setlistId = Array.isArray(info) ? info[0] : info;
        fragment.appendChild(constructSetlistTabSong(MUSIC[setlistId], i, id));
    })
    cssGetId('concert-items').replaceChildren(fragment);

    // Performers inner tab
    fragment = document.createDocumentFragment();
    const performers = getPerformers(setlist);
    constructPerformersTab(performers).forEach(x => {
        fragment.appendChild(x);
    });
    cssGetId('concert-performers').replaceChildren(fragment);

    // Video inner tab
    const navConcertVideo = cssGetId('nav-concert-video');
    if (video) {
        navConcertVideo.style.setProperty('display', '');
        loadYoutubeVideo(video);
        constructVideoTimestamps(setlist);
    } else {
        navConcertVideo.style.setProperty('display', 'none');
        
        // If video tab is focused & switched to a videoless concert, switch to setlist inner tab 
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
}

function injectEventBody() {
    const { id, name, type, location, description, start, end, setlist, video, gallery } = EVENTS[TABLE_EVENTS.active];

    const [startDate] = start.split('|');
    const [endDate] = end.split('|');
    const sameDayEvent = startDate === endDate;
    const fromToFull = parseFromTo(parseDate(start), parseDate(end));
    const fromTo = sameDayEvent ? fromToFull.split(', ')[1] : fromToFull;

    const navConcert = cssGetFirst('#event-body nav');
    const tabConcert = Array.from(cssGetClass('tab-concert'));
    VIDEO?.pauseVideo();

    // Concert widget
    if (type === 'Concert' && setlist) {
        injectEventBodyConcert(id, setlist, video, gallery);
    } else {
        navConcert.style.setProperty('display', 'none');
        tabConcert.forEach(x => x.style.setProperty('display', 'none'));
    }

    // Event title
    cssGetFirst('#event-title h3').innerHTML = `${name} <span>// ${startDate}</span>`;
    cssGetFirst('#event-title p').innerText = `${fromTo} @ ${location || '???'}`;
    
    // Event description
    const eventDescription = cssGetId('event-description');
    if (description) {
        eventDescription.style.setProperty('display', '');
        eventDescription.innerText = description;
    } else {
        eventDescription.style.setProperty('display', 'none');
    }
}


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