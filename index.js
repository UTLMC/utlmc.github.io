/*********************************************************************
Helper Functions
*********************************************************************/
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