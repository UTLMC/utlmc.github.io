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
    const result = document.getElementsByClassName(className);
    if (!result)
        throw new Error(`Invalid class ${className}`);
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
    const id = `${event.srcElement.id.substring(4)}`;

    toggle(`tab-${id}`, 'tab-active');
    toggle(`nav-${id}`, 'nav-active');
}
function toggle(id, activeClass) {
    const active = cssGetClass(activeClass)[0];
    active.classList.remove(activeClass);
    cssGetId(id).classList.add(activeClass);
}

function toggleCheckbox(event) {
    const element = event.srcElement;
    const className = 'checkbox-checked';
    if (element.classList.contains(className))
        element.classList.remove('checkbox-checked');
    else
        element.classList.add('checkbox-checked');
}

function downloadData() {
    console.log("Download");
}
function uploadData() {
    console.log("Upload");
}