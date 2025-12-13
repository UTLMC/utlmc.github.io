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
}
window.addEventListener('DOMContentLoaded', () => {
    const page = window.location.hash.substring(1);
    if (page.length > 0) {
        toggleTab(`nav-${page}`);
    }
    const mode = screen.width > 700 ? 'MONTH' : 'AGENDA';
    for (const element of cssGetClass('embed-calendar')) {
        element.src = `${element.src}&mode=${mode}`;
    }
});
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
function toggleViewerSidebar(event) {
    let element = event.srcElement;
    while (element.nodeName !== 'svg') {
        element = element.parentElement;
    }
    const sidebar = element.parentElement.parentElement.parentElement.children[0];
    if (element.classList.contains('viewer-hamburger-closed')) {
        element.classList.remove('viewer-hamburger-closed');
        sidebar.classList.remove('viewer-sidebar-closed');
    } else {
        element.classList.add('viewer-hamburger-closed');
        sidebar.classList.add('viewer-sidebar-closed');
    }
}
function genericToggleTab(event, object) {
    const element = event.srcElement;
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
function toggleViewerTab(event) {
    return genericToggleTab(event, 'viewer');
}
function toggleSongTab(event) {
    return genericToggleTab(event, 'song');
}


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
const INACTIVE_SUBGROUPS = [];
async function injectSubgroups() {
    const container = cssGetId('card-subgroup-container');
    for (const subgroup of SUBGROUPS) {
        const fields = [{ element: 'dt',
                          innerText: 'Leader' }, 
                        { element: 'dd',
                          innerText: subgroup.leader },
                        { element: 'dt',
                          innerText: 'Created' },
                        { element: 'dd',
                          innerText: subgroup.created },
                        { element: 'dt',
                          innerText: 'Open to Join' },
                        { element: 'dd',
                          innerText: subgroup.openToJoin ? 'Yes' : 'No' }];
        if (subgroup.openToJoin) {
            fields.push({ element: 'dt',
                          innerText: 'Looking For' },
                        { element: 'dd',
                          innerText: subgroup.lookingFor.join(', ') });
        }

        const json = {
            element: 'div',
            classes: ['card-subgroup'],
            children: [{
                element: 'h2',
                innerText: subgroup.name
            }, {
                element: 'dl',
                classes: ['table-subgroup'],
                children: fields
            }, {
                element: 'p',
                innerText: subgroup.description
            }]
        };
        if (subgroup.ended === null) {
            container.appendChild(construct(json));
        } else {
            INACTIVE_SUBGROUPS.push(construct(json));
        }
    }
}
const TAGS = {};
const INACTIVE_MEMBERS = [];
async function injectMembers() {
    const container = cssGetId('card-member-container');
    for (const member of MEMBERS) {
        for (const tag of member.tags) {
            if (!TAGS[tag]) {
                TAGS[tag] = [];
            }
            TAGS[tag].push(member.id);
        }
        const json = {
            element: 'div',
            classes: ['card-member'],
            children: [{
                element: 'div',
                classes: ['card-member-img']
            }, {
                element: 'div',
                classes: ['card-member-text'],
                children: [{
                    element: 'h3',
                    innerText: member.name
                }, {
                    element: 'p',
                    innerText: member.joined
                }, {
                    element: 'span',
                    classes: ['tag-container'],
                    children: member.tags.map(x => ({
                        element: 'span',
                        classes: ['tag'],
                        innerText: x
                    }))
                }, {
                    element: 'ul',
                    classes: ['list-social-media'],
                    children: Object.entries(member.socialMedia).map(([key, value]) => ({
                        element: 'li',
                        classes: [`li-${key}`],
                        innerText: value.length == 1 ? value : {
                            element: 'a',
                            attributes: { href: value[1] },
                            innerText: value[0]
                        }
                    }))
                }]
            }]
        };
        if (member.left === null) {
            container.appendChild(construct(json));
        } else {
            INACTIVE_MEMBERS.push(construct(json));
        }
    }
}
function injectFormLinks() {
    for (const [name, link] of Object.entries(FORM_LINKS)) {
        const id = `icon-${name}`;
        const element = cssGetId(id).parentElement;
        element.setAttribute('href', link);
    }
}

injectFAQ();
injectSubgroups();
injectMembers();
injectFormLinks();



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