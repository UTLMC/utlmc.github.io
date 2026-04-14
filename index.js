/*********************************************************************
Helper Functions
*********************************************************************/
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
    
    if (element.id === 'nav-concert-media') {
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
    console.log("HI")
    VIDEO = new YT.Player('concert-media-embed', {
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
    const className = 'concert-media-chapter-active';
    cssGetClass(className)[0]?.classList.remove(className);
    element.classList.add(className);
    
    // TODO: Go to correct timestamp based on active element
    VIDEO.seekTo(100, true);
}


/*********************************************************************
Scrolling
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
})


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

function parseMarkdown(text) {
    // Links
    text = text.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" target="_blank">$1</a>'
    )
    return text;
}
async function injectFAQ() {
    const container = cssGetId('faq-container');
    for (const faq of FAQ) {
        const paragraphs = faq.a.map(x => ({ element: 'p', innerHTML: parseMarkdown(x) }));
        const json = {
            element: 'details',
            attributes: {'open': true},
            classes: ['details-hidden'],
            children: [{
                element: 'summary',
                attributes: {'onclick': 'toggleDetailsSummary(event)'},
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
// const updateConcertPerformers = new ResizeObserver(entries => {
//     for (const entry of entries) {
//         const { target: element } = entry;
//         if (element.offsetWidth === 0) {
//             return;
//         }
//         const minWidth = 180;
//         const columns = Math.ceil(element.offsetWidth / minWidth);
//         element.style.setProperty('column-count', Math.min(6, columns));
//         return;
//     }
// })
// updateConcertPerformers.observe(cssGetId('concert-performers'));

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