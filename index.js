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
    const active = typeof event === "string" ? cssGetId(event): event.srcElement;
    for (const tabTitle of active.parentElement.children) {
        tabTitle.classList.remove('nav-active');
    }
    active.classList.add('nav-active');

    const activeId = `tab-${active.id.slice(active.id.indexOf('-') + 1)}`;
    for (const tab of cssGetAll('main article')) {
        if (activeId === tab.id) {
            tab.classList.add('tab-active');
        } else {
            tab.classList.remove('tab-active');
        }
    }
}
function toggleCollapsible(event) {
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