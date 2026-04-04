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
Toggleables
*********************************************************************/
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
    // If input is a string, treat it like an ID
    if (typeof element === 'string') {
        element = cssGetClass(element)[0];
    }
    const navId = Array.from(element.classList)[0];
    const desktopNav = cssGetFirst(`#nav-page-desktop .${navId}`);

    // No effect on clicking the same tab on mobile
    if (desktopNav.classList.contains('nav-active')) {
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
    window.location.hash = tabId.endsWith('home') ? '#' : `#${tabId.slice(4)}`;

    const footer = cssGetFirst('footer');
    if (['nav-about'].includes(navId)) {
        footer.style.setProperty('background', 'linear-gradient(to bottom, #351c75, #045962)');
    } else {
        footer.style.setProperty('background', 'linear-gradient(to bottom, #20124d, #045962)');
    }
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
function toggleViewerSidebar(element) {
    const sidebar = element.parentElement.parentElement.parentElement.children[0];
    if (element.classList.contains('viewer-hamburger-closed')) {
        element.classList.remove('viewer-hamburger-closed');
        sidebar.classList.remove('viewer-sidebar-closed');
    } else {
        element.classList.add('viewer-hamburger-closed');
        sidebar.classList.add('viewer-sidebar-closed');
    }
}
function genericToggleTab(element, object) {
    for (const tabTitle of element.parentElement.children) {
        tabTitle.classList.remove(`nav-${object}-active`);
    }
    const navClass = element.classList[0];
    element.classList.add(`nav-${object}-active`);

    const tabClass = `tab-${navClass.substring(4)}`;
    for (const tab of element.parentElement.parentElement.parentElement.children) {
        if (!tab.classList.contains(`tab-${object}`)) {
            continue;
        }        
        if (tab.classList.contains(tabClass)) {
            tab.classList.add(`tab-${object}-active`);
        } else {
            tab.classList.remove(`tab-${object}-active`);
        }
    }
} 
function toggleViewerTab(element) {
    return genericToggleTab(element, 'viewer');
}
function toggleSongTab(element) {
    return genericToggleTab(element, 'song');
}
function toggleCarousel(next) {
    CURR_CAROUSEL = (CURR_CAROUSEL + (next ? 1 : -1) + CAROUSEL.length) % CAROUSEL.length;
    cssGetClass('carousel-active')[0].classList.remove('carousel-active');
    cssGetClass('carousel')[CURR_CAROUSEL].classList.add('carousel-active');
    
    cssGetId('carousel-caption').innerHTML = CAROUSEL[CURR_CAROUSEL].caption;
    updateCarousel();
}


/*********************************************************************
Event listeners
*********************************************************************/
let MOUSE_X = 0;
let MOUSE_DOWN_X = 0;
let MOUSE_DOWN = false;
const HOME_GALLERY = cssGetId('section-home-gallery');
const HOME_UPCOMING_EVENTS = cssGetId('upcoming-events-container');
let CURR_ACTIVE = undefined
let CURR_SCROLL = 0;
window.addEventListener('mousemove', (event) => {
    MOUSE_X = event.clientX;

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
function scrollHorizontally(event) {
    const { target, deltaY } = event;
    
    // Don't scroll horizontally if there's nothing to scroll
    if (target.scrollWidth <= target.getBoundingClientRect().width + 1) {
        return;
    }

    event.preventDefault();
    target.scrollLeft += deltaY;
}

window.addEventListener('DOMContentLoaded', () => {
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
    if (json.children) {
        for (const child of json.children) {
            element.appendChild(construct(child));
        }
    }
    return element;
}
async function injectFAQ() {
    const container = cssGetId('faq-container');
    for (const faq of FAQ) {
        const paragraphs = faq.a.map(x => ({ element: 'p', innerText: x }));
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
    for (const [name, link] of Object.entries(FORM_LINKS)) {
        const id = `icon-${name}`;
        const element = cssGetId(id).parentElement;
        element.setAttribute('href', link);
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

injectFAQ();
injectFormLinks();
injectCarousel();

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