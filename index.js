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


/*********************************************************************
Toggleables
*********************************************************************/
function toggleTab(event) {
    // If event is a string, treat it like an ID
    const element = typeof event === "string" ? cssGetId(event): event.srcElement;
    for (const tabTitle of element.parentElement.children) {
        tabTitle.classList.remove('nav-active');
    }
    element.classList.add('nav-active');

    const id = `tab-${element.id.slice(element.id.indexOf('-') + 1)}`;
    for (const tab of cssGetAll('main article')) {
        if (id === tab.id) {
            tab.classList.add('tab-active');
        } else {
            tab.classList.remove('tab-active');
        }
    }
    window.location.hash = id.endsWith('home') ? '#' : `#${id.substring(4)}`;
}
window.addEventListener('DOMContentLoaded', () => {
    const page = window.location.hash.substring(1);
    if (page.length > 0) {
        toggleTab(`nav-${page}`);
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

function injectFAQ() {
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
function injectSubgroups() {
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
                        { element: 'dt',
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
const INACTIVE_MEMBERS = [];
function injectMembers() {
    const container = cssGetId('card-member-container');
    for (const member of MEMBERS) {
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
                        innerText: value
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



injectFAQ();
injectSubgroups();
injectMembers();


// Github pages CORS test
async function corsTest(link) {
    const response = await fetch(link);
    console.log(response);
    const body = await response.text();
    console.log(body);
}
// corsTest('index.html');