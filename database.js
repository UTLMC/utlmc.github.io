/*********************************************************************
Helper Functions
*********************************************************************/
function assert(condition, errorMessage) {
    if (!condition) {
        throw new Error(errorMessage);
    }
}
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
function clamp(x, min, max) {
    return Math.max(Math.min(x, max), min);
}
function cssGetId(id) {
    const result = document.getElementById(id);
    if (!result)
        throw new Error(`Invalid id ${id}`);
    return result;
}
function cssSetId(id, properties) {
    cssSetElement(cssGetId(id), properties);
}
function cssSetElement(element, properties) {
    for (const key in properties) {
        element.style.setProperty(key, properties[key]);
    }
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
// Convert HH:MM:SS, MM:SS, or SS into time in seconds.
function timestampToSeconds(timestamp) {
    const parts = timestamp.split(':').map(x => parseInt(x, 10));

    if (parts.some(isNaN)) {
        throw new Error(timestamp);
    }

    if (parts.length === 3) {
        // HH:MM:SS
        const [hours, minutes, secs] = parts;
        return hours * 3600 + minutes * 60 + secs;
    } else if (parts.length === 2) {
        // MM:SS
        const [minutes, secs] = parts;
        return minutes * 60 + secs;
    } else if (parts.length === 1) {
        // SS
        return parts[0];
    } else {
        throw new Error(timestamp);
    }
}
function secondsToTimestamp(seconds) {
    if (seconds < 60 * 60) {
        const m = String(Math.floor(seconds / 60));
        const s = String(seconds % 60);
        return `${m}:${s.padStart(2, '0')}`;
    }
    const h = String(Math.floor(seconds / 3600));
    const m = String(Math.floor((seconds % 3600) / 60));
    const s = String(seconds % 60);
    return `${h}:${m.padStart(2, '0')}:${s.padStart(2, '0')}`;
}
function capitalize(str) {
    if (!str) return str;
    return str.split(' ').map(x => x[0].toUpperCase() + x.slice(1)).join(' ');
}
function rgbToHex(r, g, b) {
    return "#" + [r, g, b].map(value => value.toString(16).padStart(2, "0")).join("").toUpperCase();
}
function hexToRgb(hex) {
    hex = hex.replace(/^#/, "");
    return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)];
}
function hsvToRgb(h, s = 1, v = 1) {
    h = (h % 1 + 1) % 1; // ensure wrap-around 0..1

    const i = Math.floor(h * 6);
    const f = h * 6 - i;

    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    let r, g, b;

    switch (i % 6) {
        case 0: [r, g, b] = [v, t, p]; break;
        case 1: [r, g, b] = [q, v, p]; break;
        case 2: [r, g, b] = [p, v, t]; break;
        case 3: [r, g, b] = [p, q, v]; break;
        case 4: [r, g, b] = [t, p, v]; break;
        case 5: [r, g, b] = [v, p, q]; break;
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
function rgbToHsv(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;

    let h = 0;
    let s = 0;
    let v = max;

    if (diff !== 0) {
        if (max === r) {        h = ((g - b) / diff) % 6; }
        else if (max === g) {   h = ((b - r) / diff) + 2; } 
        else {                  h = ((r - g) / diff) + 4; }
    }
    h /= 6;
    if (h < 0) h += 1;
    s = max === 0 ? 0 : diff / max;
    return [h, s, v];
}
function isSubstring(parent, child) {
    return parent.toLowerCase().includes(child.toLowerCase());
}
function reassignObject(oldObj, newObj) {
    for (const key in oldObj) {
        delete oldObj[key];
    }
    const forbidden = new Set(["__proto__", "prototype", "constructor"]);
    for (const key of Object.keys(newObj)) {
        if (!forbidden.has(key)) {
            oldObj[key] = newObj[key];
        }
    }
}
function reassignList(oldList, newList) {
    oldList.length = 0;
    oldList.push(...newList);
}
function parseYoutubeVideo(url) {
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);

    if (match) {
        return `youtu.be/${match[1]}`;
    }
}


/*********************************************************************
Data
*********************************************************************/
function getDataApi(list) {
    let map = new Map(list.map(x => [x.id, x]));
    return {
        length: () => list.length,
        getAll: () => list,
        get: (id) => map.get(id),
        set: (id, fields) => {
            Object.assign(map.get(id), fields);
        },
        insert: (data) => {
            map.set(data.id, data);
            list.push(data);
        },
        delete: (id) => {
            map.delete(id);
        },
        resetData: (newList) => {
            reassignList(list, newList);
            map = new Map(list.map(x => [x.id, x]));
        }
    } 
} 
function getEventsApi() {
    const api = {
        ...getDataApi(EVENTS),
        addToSetlist(eventId, musicId) {
            const event = api.get(eventId);
            if (!event.setlist) {
                event.setlist = [];
            }
            event.setlist.push(musicId);
        },
        removeFromSetlist(eventId, musicId) {
            // Scales poorly but we'll never have >100 songs per concert so who cares
            const event = api.get(eventId);
            event.setlist = event.setlist.filter(x => x !== musicId);
        }
    }
    return api;
}

function getMusicApi() {
    let map = new Map(MUSIC.map(song => {
        song.performances = new Map(song.performances.map(performance => [performance.id, performance]));
        return [song.id, song];
    }));

    return {
        length: () => MUSIC.length,
        getAll: () => MUSIC,
        get: (id) => map.get(id),
        getAllSubrows: (id) => Array.from(map.get(id).performances.values()),
        getSubrow: (id, subId) => map.get(id).performances.get(subId),
        set: (id, fields) => {
            Object.assign(map.get(id), fields);
        },
        setSubrow: (id, subId, fields) => {
            Object.assign(map.get(id).performances.get(subId), fields);
        },
        insert: (data) => {
            if (String(data.performances) === '[object Object]') {
                data.performances = new Map(data.performances.map(x => [x.id, x]));
            }
            map.set(data.id, data);
            MUSIC.push(data);
        },
        insertSubrow: (id, data) => {
            map.get(id).performances.set(data.id, data);
        },
        delete: (id) => {
            for (const subId in map.get(id).performances) {
                for (const concert of map.get(id).performances.get(subId).concerts) {
                    API.EVENTS.removeFromSetlist(concert, id);
                }
            }
            map.delete(id);
        },
        deleteSubrow: (id, subId) => {
            for (const concert of map.get(id).performances.get(subId).concerts) {
                API.EVENTS.removeFromSetlist(concert, id);
            }
            map.get(id).performances.delete(subId);
        },
        resetData: (newList, sublists) => {
            if (sublists) {
                for (let i = 0; i < newList.length; i++) {
                    newList[i].performances = sublists[i];
                }
            }
            reassignList(MUSIC, newList);
            map = new Map(MUSIC.map(song => {
                if (Array.isArray(song.performances)) {
                    song.performances = new Map(song.performances.map(performance => [performance.id, performance]));
                }
                return [song.id, song];
            }));
        },
        getCanonical: () => {
            return MUSIC.map(song => ({
                ...song,
                performances: Array.from(song.performances.values())
            }));
        },
        iterateSubrows: function*() {
            for (const [id, song] of map) {
                for (const [subId, performance] of song.performances) {
                    yield [id, subId, song, performance];
                }
            }
        }
    }
}

function getEnumApi(list) {
    let map = new Map(list.map((x, i) => [x, i]));
    let i = list.length;

    return {
        getAll: () => list,
        index: (name) => map.get(name),
        add: (name) => {
            map.set(name, i);
            list.push(name);
            i += 1;
            return i - 1;
        },
        resetData: (newList) => {
            reassignList(list, newList);
            map = new Map(list.map((x, i) => [x, i]));
            i = list.length;
        }
    }
}

const API = {
    MEMBERS: getDataApi(MEMBERS),
    ANNOUNCEMENTS: getDataApi(ANNOUNCEMENTS),
    UPCOMING_EVENTS: getDataApi(UPCOMING_EVENTS),
    FAQ: getDataApi(FAQ),
    EVENTS: getEventsApi(),
    MUSIC: getMusicApi(),
    INSTRUMENTS: getEnumApi(INSTRUMENTS),
    ROLES: getEnumApi(ROLES)
}

function getCurrentEvent() {
    return CURRENT_EVENT;
}
function setCurrentEvent(kv) {
    Object.assign(CURRENT_EVENT, kv);
}

function getTags() {
    return TAGS;
}
function getTag(name) {
    return TAGS[name ?? cssGetClass('tag-preview-active')[0].innerText];
}
function setTag(source, modifyTAGS) {
    function setTagColour(element, rgb) {
        const color = rgb.reduce((a, b) => a + b) / 3 > 128 ? 'black' : 'white';
        cssSetElement(element, {
            'background': '',
            'background-color': `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`,
            'color': color
        });
        if (!modifyTAGS)
            return;
        else if (rgb.every((_, i) => rgb[i] === DEFAULT_TAG_COLOUR[i]))
            delete TAGS[element.innerText];
        else
            TAGS[element.innerText] = [rgb];
    }
    function setTagGradient(element, rgb0, rgb1) {
        const color = [...rgb0, ...rgb1].reduce((a, b) => a + b) / 6 > 128 ? 'black' : 'white';
        const background = `linear-gradient(to right in oklab, rgb(${rgb0.join(',')}), rgb(${rgb1.join(',')}))`;
        cssSetElement(element, {
            'background': background,
            'background-color': '',
            'color': color
        })
        TAGS[element.innerText] = [rgb0, rgb1];
    }
    const element = cssGetClass('tag-preview-active')[0];
    const left = cssGetId('colour-widget-gradient-left');
    const right = cssGetId('colour-widget-gradient-right');

    if (source.gradient && source.colour) {
        const [rgb0, rgb1] = source.gradient;
        if (GRADIENT_LEFT_SELECTED) {
            setTagGradient(element, source.colour, rgb1);
            setTagColour(left, source.colour);
            setTagColour(right, rgb1);
        } else {
            setTagGradient(element, rgb0, source.colour);
            setTagColour(left, rgb0);
            setTagColour(right, source.colour);    
        }
    } else if (source.gradient) {
        const [rgb0, rgb1] = source.gradient;
        setTagGradient(element, rgb0, rgb1);
        setTagColour(left, rgb0);
        setTagColour(right, rgb1);
    } else if (source.colour) {
        setTagColour(element, source.colour, true);
    } else {
        throw new Error();
    }
}

/*********************************************************************
Toggleables
*********************************************************************/
function setActiveClass(element, className) {
    const active = cssGetClass(className)[0];
    active.classList.remove(className);
    element.classList.add(className);
}

function reorderTabContent(id) {
    if (id === 'bulletin') {
        TABLE_OPERATIONS['table-announcements'].reorder();
        TABLE_OPERATIONS['table-upcoming-events'].reorder();
    } else if (['members', 'music', 'events', 'faq'].includes(id)) {
        TABLE_OPERATIONS[`table-${id}`].reorder();
    }
}

function destroyTabContent(id) {
    if (id === 'tags') {
        cssGetId('tag-previews-instruments').replaceChildren();
        cssGetId('tag-previews-roles').replaceChildren();
    } else if (id === 'bulletin') {
        cssGetFirst('#table-announcements tbody').replaceChildren();
        cssGetFirst('#table-upcoming-events tbody').replaceChildren();
    } else if (['members', 'music', 'events', 'faq'].includes(id)) {
        cssGetFirst(`#table-${id} tbody`).replaceChildren();
    }
}

function toggleTab(element, forceRefresh) {
    const id = `${element.id.substring(4)}`;
    const active = cssGetClass('tab-active')[0];
    if (!forceRefresh && cssGetId(`tab-${id}`) === active) {
        return;
    }
    setActiveClass(cssGetId(`tab-${id}`), 'tab-active');
    setActiveClass(cssGetId(`nav-${id}`), 'nav-active');

    setTimeout(() => {
        reorderTabContent(active.id.slice(4));
        destroyTabContent(active.id.slice(4));
        
        if (id === 'tags') {
            constructTagTab();
        } else if (id === 'bulletin') {
            if (TABLE_OPERATIONS['table-announcements']) {
                TABLE_OPERATIONS['table-announcements'].init();
            } else {
                constructCurrentEvent();
                TABLE_OPERATIONS['table-announcements'] = constructAnnouncements();
            }
            if (TABLE_OPERATIONS['table-upcoming-events']) {
                TABLE_OPERATIONS['table-upcoming-events'].init();
            } else {
                TABLE_OPERATIONS['table-upcoming-events'] = constructUpcomingEvents();
            }
        } else if (id === 'members') {
            if (TABLE_OPERATIONS['table-members']) {
                TABLE_OPERATIONS['table-members'].init();
            } else {
                TABLE_OPERATIONS['table-members'] = constructMembers();
            }
        } else if (id === 'music') {
            if (TABLE_OPERATIONS['table-music']) {
                TABLE_OPERATIONS['table-music'].init();
            } else {
                TABLE_OPERATIONS['table-music'] = constructMusicTable();
            }
        } else if (id === 'events') {
            if (TABLE_OPERATIONS['table-events']) {
                TABLE_OPERATIONS['table-events'].init();
            } else {
                TABLE_OPERATIONS['table-events'] = constructEventTable();
            }
        } else if (id === 'faq') {
            if (TABLE_OPERATIONS['table-faq']) {
                TABLE_OPERATIONS['table-faq'].init();
            } else {
                TABLE_OPERATIONS['table-faq'] = constructFaq();
            }
        }
    }, 0);

    // Clear out page specific details
    TAG_COLOUR_CACHE = undefined;
}

// If event is given, turn off. Otherwise, toggle normally
function closeModals(event) {
    if (event) {
        const modals = cssGetClass('modal');
        for (const element of modals) {
            if (element.contains(event.target)) {
                return;
            }
        }
    }
    const modals = cssGetClass('modal');
    for (const element of modals) {
        cssSetElement(element, { display: 'none' });
        element.querySelector('.validation-text')?.style.setProperty('display', '');
    }
    MODAL_INFO = undefined;
    cssSetElement(cssGetId('modal-container'), { display: 'none' });
}
function openModal(id) {
    const modalContainer = cssGetId('modal-container');
    const modalOn = modalContainer.style.display === 'flex';
    cssSetElement(modalContainer, { display: modalOn ? 'none' : 'flex' });
    cssSetId(id, { display: 'flex' });
}

// Button for hiding/showing subrows
function toggleCellDetails(element) {
    const visible = element.src.endsWith('show.svg');
    element.src = `${element.src.slice(0, element.src.lastIndexOf('/'))}/${visible ? 'hide.svg' : 'show.svg'}`;

    let curr = element.closest('tr');
    curr = curr.nextElementSibling;
    while (isSubrow(curr)) {
        cssSetElement(curr, { display: visible ? 'none' : 'table-row' });
        curr = curr.nextElementSibling;
    }
}

// Concert setlist modal, toggle video type
function toggleConcertSetlistType(element) {
    setActiveClass(element, 'concert-setlist-type-active');
    
    const videoDisplay = element.id === 'concert-setlist-type-one-video' ? 'flex' : 'none';
    cssSetId('concert-setlist-video', { display: videoDisplay });

    let cellDisplay = element.id === 'concert-setlist-type-one-video' ? 'table-cell' : 'none';
    for (const element of cssGetClass('concert-setlist-timestamp')) {
        cssSetElement(element, { display: cellDisplay });
    }

    cellDisplay = element.id === 'concert-setlist-type-videos' ? 'table-cell' : 'none';
    for (const element of cssGetClass('concert-setlist-song-video')) {
        cssSetElement(element, { display: cellDisplay });
    }
}

// Announcements table, toggle announcment type
function toggleAnnouncementType(element) {
    if (element.src.endsWith("alert-triangle.svg")) {
        element.src = 'assets/icons/megaphone.svg';
    } else {
        element.src = 'assets/icons/alert-triangle.svg';
    }
    syncData(element);
}

let TAG_COLOUR_CACHE;
let TAG_IS_GRADIENT_MODE;
const DEFAULT_TAG_COLOUR = [100, 100, 100];

/**
 * Toggle colour picker between solid/gradient mode
 * - `element`: The LI element being selected
 * - `isSwitchingTags`: If the function is being called because the user selected a new tag
 */
function toggleColourWidgetMode(element, isSwitchingTags) {
    setActiveClass(element, 'colour-widget-mode-active');

    const toGradientMode = element.id === 'colour-widget-mode-gradient';
    cssSetId('colour-widget-gradient-button', { display: toGradientMode ? 'flex' : 'none' });
    cssSetId('colour-widget-text', { 'padding-bottom': toGradientMode ? '5px' : '15px' });
    TAG_IS_GRADIENT_MODE = toGradientMode;

    if (isSwitchingTags) {
        TAG_COLOUR_CACHE = undefined;
    }

    const rgbs = getTag() ?? [DEFAULT_TAG_COLOUR];
    if (toGradientMode) {
        const gradient = isSwitchingTags ? rgbs : (TAG_COLOUR_CACHE ?? [rgbs[0], rgbs[0]]);
        syncTagInputsFromSource({ gradient });
    } else {
        const colour = TAG_COLOUR_CACHE?.[0];
        const backupColour = isSwitchingTags || GRADIENT_LEFT_SELECTED ? rgbs[0] : rgbs[1];
        syncTagInputsFromSource({ rgb: colour ?? backupColour });
    }
    if (!isSwitchingTags) {
        TAG_COLOUR_CACHE = rgbs;
    }
}


/*********************************************************************
Table row/subrow selection
- Selections are stored in (SUB)ROW_SELECTION
- Subrows and rows cannot be simultaneously selected
*********************************************************************/
function clickAggregateCheckbox(element) {
    const tableId = element.closest('.table').id;
    if (!ROW_SELECTION[tableId]) {
        ROW_SELECTION[tableId] = new Set();
    }
    if (element.checked) {
        for (const row of cssGetAll(`#${tableId} > div > table > tbody > tr:not(.subtable-row)`)) {
            ROW_SELECTION[tableId].add(row.id.split('-').at(-1));
            row.querySelector('td:first-child input').checked = true;
        }
        toggleSubrowSelectionEnabled(false, tableId);
    } else {
        ROW_SELECTION[tableId].clear();
        for (const row of cssGetAll(`#${tableId} > div > table > tbody > tr:not(.subtable-row)`)) {
            row.querySelector('td:first-child input').checked = false;
        }
        toggleSubrowSelectionEnabled(true, tableId);
    }
    updateTableToolbar(ROW_SELECTION, tableId);
}
function toggleRowSelect(event, element) {
    const button = element.children[0];
    if (button.disabled) {
        return;
    }

    const rowId = element.parentElement.id.split('-').at(-1);
    const tableId = element.closest('.table').id;

    // Clicking checkbox directly
    if (event.target.nodeName === 'INPUT') {
        return onRowSelect(event.target.checked, rowId, tableId);
    }

    // Clicking surrounding area in TD
    button.checked = !button.checked;
    onRowSelect(button.checked, rowId, tableId);
}
function toggleSubrowSelect(event, element) {
    // Ignore clicks to the rest of the LI
    if (event.target.closest('.datalist')) {
        return;
    }

    const button = element.children[0];
    if (button.disabled) {
        return;
    }

    const tr = element.parentElement.parentElement.id.split('-');
    const [rowId, subrowId] = tr.slice(-2).map(Number);
    const tableId = element.closest('.table').id;

    // Clicking checkbox directly
    if (event.target.nodeName === 'INPUT') {
        return onSubrowSelect(event.target.checked, subrowId, rowId, tableId);
    }

    // Clicking surrounding area in LI
    button.checked = !button.checked;
    onSubrowSelect(button.checked, subrowId, rowId, tableId);
}

let ROW_SELECTION = {};
function onRowSelect(checked, rowId, tableId) {
    if (!ROW_SELECTION[tableId]) {
        ROW_SELECTION[tableId] = new Set();
    }
    const set = ROW_SELECTION[tableId];
    let aggregatedCheckbox;
    try {
        aggregatedCheckbox = cssGetFirst(`#${tableId} .aggregate-checkbox`);
    } catch {
        aggregatedCheckbox = {};
    }

    if (checked) {
        if (set.size === 0) {
            toggleSubrowSelectionEnabled(false, tableId);
            aggregatedCheckbox.indeterminate = true;
        } else if (set.size === TABLE_OPERATIONS[tableId].length() - 1) {
            aggregatedCheckbox.indeterminate = false;
            aggregatedCheckbox.checked = true;
        }
        set.add(rowId);
    } else {
        set.delete(rowId);
        if (set.size === 0) {
            toggleSubrowSelectionEnabled(true, tableId);
            aggregatedCheckbox.indeterminate = false;
            aggregatedCheckbox.checked = false;
        } else {
            aggregatedCheckbox.indeterminate = true;
        }
    }
    updateTableToolbar(ROW_SELECTION, tableId);
}

let SUBROW_SELECTION = {};
function onSubrowSelect(checked, subrowId, rowId, tableId) {
    if (!SUBROW_SELECTION[tableId]) {
        SUBROW_SELECTION[tableId] = new Set();
    }
    const set = SUBROW_SELECTION[tableId];

    if (checked) {
        if (set.size === 0) {
            toggleRowSelectionEnabled(false, tableId);
        }
        set.add(`${rowId}-${subrowId}`);
    } else {
        set.delete(`${rowId}-${subrowId}`);
        if (set.size === 0) {
            toggleRowSelectionEnabled(true, tableId);
        }
    }
    updateTableToolbar(SUBROW_SELECTION, tableId);
}

function toggleRowSelectionEnabled(on, tableId) {
    cssGetFirst(`#${tableId} .aggregate-checkbox`).disabled = !on;
    for (const row of cssGetAll(`#${tableId} > div > table > tbody > tr:not(.subtable-row) > td:first-child > input`)) {
        row.disabled = !on;
    }
}
function toggleSubrowSelectionEnabled(on, tableId) {
    for (const row of cssGetAll(`#${tableId} .subtable > input:first-child`)) {
        row.disabled = !on;
    }
}


/*********************************************************************
Table toolbar row operations
*********************************************************************/
function isSubrow(tr) {
    return tr?.classList.contains('subtable-row');
}

function updateTableToolbar(set, tableId) {
    const setSize = set[tableId].size;
    const className = 'table-toolbar-disabled';

    const toggleClassBy = (query, condition) => {
        const element = cssGetFirst(query);
        if (condition) {
            element.classList.remove(className);
        } else {
            element.classList.add(className);
        }
    };

    toggleClassBy(`#${tableId} .table-toolbar-remove`, setSize >= 1);
    toggleClassBy(`#${tableId} .table-toolbar-add`, setSize <= 1);
    toggleClassBy(`#${tableId} .table-toolbar-move-up`, setSize >= 1);
    toggleClassBy(`#${tableId} .table-toolbar-move-down`, setSize >= 1);
    toggleClassBy(`#${tableId} .table-toolbar-move-top`, setSize >= 1);
    toggleClassBy(`#${tableId} .table-toolbar-move-bottom`, setSize >= 1);
    toggleClassBy(`#${tableId} .table-toolbar-copy`, setSize === 1);
}

function getTableToolbarContext(element, asSelectionList) {
    const tableId = element.closest('.table').id;
    const isSubrow = SUBROW_SELECTION[tableId]?.size > 0;

    let selected;
    if (isSubrow) {
        const ids = Array.from(SUBROW_SELECTION[tableId]);
        if (ids.length === 1 && !asSelectionList) {
            selected = cssGetId(`${tableId}-${ids[0]}`);
        } else {
            selected = ids;
        }
    } else if (ROW_SELECTION[tableId]?.size > 0) {
        const ids = Array.from(ROW_SELECTION[tableId]);
        if (ids.length === 1 && !asSelectionList) {
            selected = cssGetId(`${tableId}-${ids[0]}`);
        } else {
            selected = ids;
        }
    }
    return [tableId, isSubrow, selected];
}
function tableToolbarAdd(element) {
    if (element.classList.contains('table-toolbar-disabled'))
        return;
    const [tableId, isSubrow, selectedElement] = getTableToolbarContext(element);
    TABLE_OPERATIONS[tableId][isSubrow ? 'subrowAdd' : 'rowAdd'](selectedElement);
}
function tableToolbarCopy(element) {
    if (element.classList.contains('table-toolbar-disabled'))
        return;
    const [tableId, isSubrow, selectedElement] = getTableToolbarContext(element);
    TABLE_OPERATIONS[tableId][isSubrow ? 'subrowAdd' : 'rowAdd'](selectedElement, true);
}
function tableToolbarRemove(element) {
    if (element.classList.contains('table-toolbar-disabled'))
        return;
    const [tableId, isSubrow, ids] = getTableToolbarContext(element, true);

    const err = TABLE_OPERATIONS[tableId][isSubrow ? 'subrowDelete' : 'rowDelete'](ids);
    if (err) {
        setHelperText(err);
    } else {
        updateTableToolbar(isSubrow ? SUBROW_SELECTION : ROW_SELECTION, tableId);
    }
}
function tableToolbarMoveUp(element) {
    if (element.classList.contains('table-toolbar-disabled'))
        return;
    const [tableId, isSubrow] = getTableToolbarContext(element);
    TABLE_OPERATIONS[tableId][isSubrow ? 'subrowMove' : 'rowMove'](true);
}
function tableToolbarMoveDown(element) {
    if (element.classList.contains('table-toolbar-disabled'))
        return;
    const [tableId, isSubrow] = getTableToolbarContext(element);
    TABLE_OPERATIONS[tableId][isSubrow ? 'subrowMove' : 'rowMove'](false);
}
function tableToolbarMoveTop(element) {
    if (element.classList.contains('table-toolbar-disabled'))
        return;
    const [tableId, isSubrow] = getTableToolbarContext(element);
    TABLE_OPERATIONS[tableId][isSubrow ? 'subrowMoveToEnd' : 'rowMoveToEnd'](true);
}
function tableToolbarMoveBottom(element) {
    if (element.classList.contains('table-toolbar-disabled'))
        return;
    const [tableId, isSubrow] = getTableToolbarContext(element);
    TABLE_OPERATIONS[tableId][isSubrow ? 'subrowMoveToEnd' : 'rowMoveToEnd'](false);
}


/*********************************************************************
Event listeners
*********************************************************************/
document.addEventListener('mousemove', onMouseMove);
document.addEventListener('mousedown', () => onMouseDown(true));
document.addEventListener('mouseup', () => onMouseDown(false));

function setHelperText(text) {
    const helperText = cssGetId('helper-text');
    if (text) {
        cssSetElement(helperText, { display: 'block' });
        helperText.innerText = text;
    } else {
        cssSetElement(helperText, { display: '' });
        helperText.innerText = '';
    }
}

const hoverHelperText = (() => {
    let exitedTr = false;
    return (event) => {
        let tr = event.target.closest('.table tbody tr');
        if (tr) {
            exitedTr = false;
            if (!tr.id) {
                tr = tr.parentElement.closest('.table tbody tr');
            }
            const [id, subId] = tr.id.split('-').map(x => parseInt(x, 10)).filter(x => !isNaN(x));
            setHelperText(typeof(subId) === 'number' ? `Hover on subrow #${subId}, row #${id}` : `Hover on row #${id}`);
        } else if (!exitedTr) {
            exitedTr = true;
            setHelperText();
        }
    }
})()

let MOUSE_X, MOUSE_Y, MOUSE_DOWN;
function onMouseMove(event) {
    const { clientX, clientY } = event;
    MOUSE_X = clientX;
    MOUSE_Y = clientY;

    if (PICKER_MODE === 'colour') {
        updateColourFromPicker();
    } else if (PICKER_MODE === 'hue') {
        updateHueFromPicker();
    }
    
    if (MODAL_INFO === undefined) {
        return hoverHelperText(event)
    }
}
function onMouseDown(down) {
    MOUSE_DOWN = down;
    if (!down) {
        PICKER_MODE = undefined;
    }
}


/*********************************************************************
Colour picker widget
*********************************************************************/
let PICKER_MODE;
let LAST_VALID_COLOUR = DEFAULT_TAG_COLOUR;
let COLOUR_PICKER_PRIMARY = [255, 0, 0];
function pickColourMouseDown(event) {
    event.preventDefault();
    PICKER_MODE = 'colour';
    updateColourFromPicker();
}
function pickHueMouseDown(event) {
    event.preventDefault();
    PICKER_MODE = 'hue';
    updateHueFromPicker();
}

// Convert colourpicker position (0-1) to RGB value (0-255)
function xyToRgb(x, y) {
    const [r, g, b] = COLOUR_PICKER_PRIMARY;
    return [
        Math.round((1 - y) * ((1 - x) * 255 + x * r)),
        Math.round((1 - y) * ((1 - x) * 255 + x * g)),
        Math.round((1 - y) * ((1 - x) * 255 + x * b))
    ];
}

// Convert RGB value (0-255) to colourpicker position (0-1)
function rgbToXy(r, g, b) {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    const value = max / 255;
    const saturation = max === 0 ? 0 : (max - min) / max;

    return [saturation, 1 - value];
}

// Get colourpicker position (0-1)
function getCurrentPickerXY() {
    const container = cssGetId('colour-widget-picker');
    const rect = container.getBoundingClientRect();
    const circle = cssGetId('colour-widget-picker-circle');
    
    let left = parseFloat(circle.style.left);
    if (isNaN(left)) {
        left = rect.left;
    }
    let top = parseFloat(circle.style.top);
    if (isNaN(top)) {
        top = rect.top;
    }

    return [left / rect.width, top / rect.height];
}

// Move the hue picker based on the given hue (0-1)
function moveHuePicker(hue) {
    // Update hue picker circle
    const container = cssGetId('colour-widget-hue');
    const rect = container.getBoundingClientRect();
    cssSetId('colour-widget-hue-circle', { left: `${hue * rect.width}px`});

    // Update gradient
    const [r, g, b] = COLOUR_PICKER_PRIMARY;
    cssSetId('colour-widget-picker', {
        background: `linear-gradient(transparent, black), linear-gradient(to right, white, transparent), rgb(${r}, ${g}, ${b})`
    });
}

// Move the colour picker based on the given position (0-1)
function moveColourPicker(x, y) {
    const container = cssGetId('colour-widget-picker');
    const size = container.getBoundingClientRect().width || 275;
    cssSetId('colour-widget-picker-circle', {
        left: `${x * size}px`,
        top: `${y * size}px`
    });
}

// Sync every input in the colour picker widget based on a source of truth
function syncTagInputsFromSource(source) {
    let r, g, b;

    if (source.hue) {
        assert(typeof source.hue === 'number' && source.hue >= 0 && source.hue <= 1, source.hue);
        COLOUR_PICKER_PRIMARY = hsvToRgb(source.hue, 1, 1);
        [r, g, b] = xyToRgb(...getCurrentPickerXY());
        moveHuePicker(source.hue);

    } else if (source.xy) {
        assert(Array.isArray(source.xy) && source.xy.length === 2 && source.xy[0] >= 0 && source.xy[0] <= 1 && source.xy[1] >= 0 && source.xy[1] <= 1, source.xy);
        const [x, y] = source.xy;
        [r, g, b] = xyToRgb(x, y);
        moveColourPicker(x, y);

    } else if (source.rgb) {
        assert(Array.isArray(source.rgb) && source.rgb.length === 3 && source.rgb[0] >= 0 && source.rgb[0] <= 255 && source.rgb[1] >= 0 && source.rgb[1] <= 255 && source.rgb[2] >= 0 && source.rgb[2] <= 255, source.rgb);
        [r, g, b] = source.rgb;

    } else if (source.hex) {
        assert(typeof source.hex === 'string' && source.hex.length >= 6 && source.hex.length <= 7, source.hex);
        [r, g, b] = hexToRgb(source.hex);

    } else if (source.gradient) {
        assert(Array.isArray(source.gradient) && source.gradient.length === 2 && source.gradient[0].length === 3 && source.gradient[1].length === 3, source.gradient);
        [r, g, b] = source.gradient[GRADIENT_LEFT_SELECTED ? 0 : 1];
    }

    if (source.rgb || source.hex || source.gradient) {
        const hue = rgbToHsv(r, g, b)[0];
        COLOUR_PICKER_PRIMARY = hsvToRgb(hue, 1, 1);
        moveHuePicker(hue);
        moveColourPicker(...rgbToXy(r, g, b));
    }
    cssGetId('colour-widget-hex').value = rgbToHex(r, g, b);
    cssGetId('colour-widget-rgb').value = `rgb(${r}, ${g}, ${b})`;
    
    LAST_VALID_COLOUR = [r, g, b];
    if (source.gradient) {
        setTag({ gradient: source.gradient });
    } else {
        if (TAG_IS_GRADIENT_MODE) {
            setTag({ gradient: getTag(), colour: LAST_VALID_COLOUR })
        } else {
            setTag({ colour: LAST_VALID_COLOUR })
        }
    }
}

// Update colour after moving hue picker
function updateHueFromPicker() {
    const container = cssGetId('colour-widget-hue');
    const rect = container.getBoundingClientRect();
    const hue = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    
    syncTagInputsFromSource({ hue });
}

// Update colour after moving colour picker
function updateColourFromPicker() {
    const container = cssGetId('colour-widget-picker');
    const rect = container.getBoundingClientRect();
    const x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    const y = clamp((event.clientY - rect.top) / rect.height, 0, 1);

    syncTagInputsFromSource({ xy: [x, y] });
}

// Update colour after changing RGB input
const updateColourFromRgb = (() => {
    const input = cssGetId('colour-widget-rgb');
    const rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i;

    return () => {
        const value = input.value.trim();
        const match = value.match(rgbRegex);
        if (!match) {
            const [r, g, b] = LAST_VALID_COLOUR;
            input.value = `rgb(${r}, ${g}, ${b})`;
            return;
        }
        let [r, g, b] = match.slice(1).map(x => clamp(Number(x), 0, 255));
        input.value = `rgb(${r}, ${g}, ${b})`;
        syncTagInputsFromSource({ rgb: [r, g, b] });
    };
})();

// Update colour after changing hex input
const updateColourFromHex = (() => {
    const input = cssGetId('colour-widget-hex');
    const hexRegex = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

    return () => {
        let value = input.value.trim();
        if (!hexRegex.test(value)) {
            const [r, g, b] = LAST_VALID_COLOUR;
            input.value = rgbToHex(r, g, b);
            return;
        }
        value = value.replace("#", "");

        // Expand shorthand #abc -> #aabbcc
        if (value.length === 3) {
            value = value.split("").map(c => c + c).join("");
        }
        input.value = "#" + value.toUpperCase();
        syncTagInputsFromSource({ hex: value });
    }
})();

/**
 * Select a tag and refresh the colour widget with its colour/gradient
 * - `element` The LI tag element
 * - `forceRefresh` Forcefully refesh the colour widget 
 */
function selectTag(element, forceRefresh) {
    const active = cssGetClass('tag-preview-active')[0];
    if (element === active && !forceRefresh) {
        return;
    }
    active?.classList.remove('tag-preview-active');
    element.classList.add('tag-preview-active');

    // Go to solid/gradient mode depending on tag
    const isGradientMode = getTag()?.length > 1;
    const id = `colour-widget-mode-${isGradientMode ? 'gradient' : 'solid'}`;
    toggleColourWidgetMode(cssGetId(id), true);
}

// Choose the left/right gradient colour button
let GRADIENT_LEFT_SELECTED = true;
function selectGradientColour(element) {
    const active = cssGetClass('colour-widget-gradient-button-active')[0];
    active.classList.remove('colour-widget-gradient-button-active');
    element.classList.add('colour-widget-gradient-button-active');
    GRADIENT_LEFT_SELECTED = element.id === 'colour-widget-gradient-left';
    
    syncTagInputsFromSource({ gradient: getTag() });
}

function swapGradientColour() {
    const rgbs = getTag();
    syncTagInputsFromSource({ gradient: [rgbs[1], rgbs[0]]});
}


/*********************************************************************
Draggable setlist
*********************************************************************/
let CURR_DRAGGING;
function onDragStart(element) {
    CURR_DRAGGING = element.parentElement;
    element.parentElement.classList.add('draggable-list-active');
}
function onDragEnd(element) {
    element.parentElement.classList.remove('draggable-list-active');
    for (const element of cssGetClass('draggable-list-destination')) {
        element.classList.remove('draggable-list-destination');
    }
    CURR_DRAGGING = undefined;
}
function onDragEnter(element) {
    if (element !== CURR_DRAGGING) {
        element.parentElement.classList.add('draggable-list-destination');
    }
}
function onDragLeave(element) {
    element.parentElement.classList.remove('draggable-list-destination');
}
function onDragOver(event) {
    // Default behaviour: mouse UI treats the element as an un-droppable destination
    event.preventDefault();
}
function onDrop(element) {
    if (element === CURR_DRAGGING) {
        return;
    }
    const tbody = element.parentElement.parentElement;
    const rows = [...tbody.children];
    const draggedIndex = rows.indexOf(CURR_DRAGGING);
    const targetIndex = rows.indexOf(element.parentElement);

    if (draggedIndex < targetIndex) {
        element.parentElement.after(CURR_DRAGGING);
    } else {
        element.parentElement.before(CURR_DRAGGING);
    }
}


/*********************************************************************
Input suggestions
*********************************************************************/
function memberSorter(a, b) {
    if (a.left && !b.left) {
        return 1;
    } else if (!a.left && b.left) {
        return -1;
    }
    const [a0, a1] = a.joined.split(' ');
    const [b0, b1] = b.joined.split(' ');
    if (a1 === b1) {
        if (a0 === b0) {
            return a.name.localeCompare(b.name);
        } else {
            return a0 > b0 ? -1 : 1;
        }
    } else {
        return Number(a1) - Number(b1);
    }
}

let INPUT_CHANGED = false;
function inputInput(event) {
    INPUT_CHANGED = true;
    updateInputSuggestion(event);
}

const updateInputSuggestion = debounce(async (event) => {
    /*
    TODO: optimize for speed.
    - Store a cache of the most recent filter for each event.target
    - If entering characters, filter from the existing filter list.
    
    - For taglist, hide already-added suggestions
    */ 
    const input = event.target;
    const container = input.closest('.input').children[1];
    const value = input.value;
    if (!value) {
        return container.replaceChildren();
    }

    let candidates, infoGetter;
    let nameGetter = x => x.name;
    let prioritizeStartsWith = true;  // Whether to prioritize candidates that start with input text

    if (input.classList.contains('input-type-event')) {
        candidates = API.EVENTS.getAll().toSorted((a, b) => b.start.localeCompare(a.start));
        infoGetter = x => [x.id, x.start.slice(0, x.start.lastIndexOf('-'))];

    } else if (input.classList.contains('input-type-concert')) {
        candidates = API.EVENTS.getAll().filter(x => x.type === 'Concert').toSorted((a, b) => b.start.localeCompare(a.start));
        infoGetter = x => [x.id, x.start.slice(0, x.start.lastIndexOf('-'))];

    } else if (['member', 'arranger', 'performer'].some(x => input.classList.contains(`input-type-${x}`))) {
        if (input.classList.contains('input-type-member')) {
            candidates = API.MEMBERS.getAll().toSorted(memberSorter);

        } else if (input.classList.contains('input-type-arranger')) {
            prioritizeStartsWith = false;
            candidates = API.MEMBERS.getAll().toSorted((a, b) => {
                const aArranger = a.roles?.some(i => ROLES[i] === 'Arranger');
                const bArranger = b.roles?.some(i => ROLES[i] === 'Arranger');
                if (aArranger && !bArranger)
                    return -1;
                else if (!aArranger && bArranger)
                    return 1;
                return memberSorter(a, b);
            });

        } else if (input.classList.contains('input-type-performer')) {
            prioritizeStartsWith = false;
            const instruments = API.INSTRUMENTS.getAll();
            const instrumentRow = input.closest('td').previousElementSibling;
            const instrument = instrumentRow.children[0].children[0].lastElementChild.value;
            candidates = API.MEMBERS.getAll().toSorted((a, b) => {
                const aPerformer = a.instruments.some(i => instruments[i] === instrument);
                const bPerformer = b.instruments.some(i => instruments[i] === instrument);
                if (aPerformer && !bPerformer)
                    return -1;
                else if (!aPerformer && bPerformer)
                    return 1;
                return memberSorter(a, b);
            });
        }
        infoGetter = x => {
            const [season, year] = x.joined.split(' ');
            let info = `${season.slice(0, 1)}${year.slice(2)}`;
            if (x.left) {
                const [season, year] = x.left.split(' ');
                info = `${info}-${season.slice(0, 1)}${year.slice(2)}`;
            }
            return [x.id, info];
        }
    } else if (input.classList.contains('input-type-instrument')) {
        candidates = API.INSTRUMENTS.getAll();
        nameGetter = x => x;
        infoGetter = x => [API.INSTRUMENTS.index(x)]
    } else if (input.classList.contains('input-type-music')) {
        candidates = API.MUSIC.getAll();
        infoGetter = x => [x.id, x.composer];
    } else if (input.classList.contains('input-type-role')) {
        candidates = API.ROLES.getAll();
        nameGetter = x => x;
        infoGetter = x => [API.ROLES.index(x)];
    } else {
        throw new Error(String(Array.from(input.classList)));
    }

    const fragment = document.createDocumentFragment();
    let i = 0;
    const lowPriorityCandidates = [];
    for (const candidate of candidates) {
        const name = nameGetter(candidate);
        if (isSubstring(name, value)) {
            const result = infoGetter(candidate);
            const element = construct({
                element: 'li',
                attributes: { onclick: `clickSuggestion(this)` },
                children: [{
                    element: 'span',
                    innerText: name
                }, result ? {
                    element: 'span',
                    classes: result.length === 1 ? ['input-suggestions-hidden'] : [],
                    innerHTML: result.length === 2 ? `<em>${result[1]}</em> <em>(#${result[0]})</em>` : `<em>(#${result[0]})</em>`
                } : undefined]
            });
            if (!prioritizeStartsWith || name.toLowerCase().startsWith(value.toLowerCase())) {
                fragment.appendChild(element);
            } else {
                lowPriorityCandidates.push(element);
            }
            i += 1;
            if (i >= 10) {
                break;
            }
        }
    }
    for (const element of lowPriorityCandidates) {
        fragment.appendChild(element);
    }
    container.replaceChildren(fragment);
    container.scrollIntoView({ behavior: 'smooth', block: 'center' });
}, 0);

function toggleShowInputSuggestion(suggestions, show) {
    cssSetElement(suggestions, { display: show ? 'flex' : 'none' });
}

function extractId(text) {
    return Number(text.slice(text.indexOf('(#') + 2, text.indexOf(')')))
}

function extractSuggestionId(suggestion) {
    return extractId(suggestion.lastElementChild.lastElementChild.innerText);
}

/**
 * If there is only one possible suggestion or an exact match, retrieve its id and value
 * strictness = 1 -> only find exact matches
 * strictness = 0 -> do not find matches
 */
function getSuggestionIfExists(inputContainer, input, newValue) {
    const strictness = inputStrictness(input);
    let id, value;

    const suggestions = inputContainer.lastElementChild;
    if (suggestions.classList.contains('input-suggestions')) {
        let suggestion;
        if (strictness > 1 && suggestions.children.length === 1) {
            suggestion = suggestions.children[0];
        } else if (strictness > 0) {
            const exactMatches = Array.from(suggestions.children).filter(x => x.children[0].innerText.toLowerCase() === newValue.toLowerCase());
            if (exactMatches.length === 1) {
                suggestion = exactMatches[0];
            }
        }
        if (!suggestion)
            return [id, value];
        value = suggestion.children[0].innerText;
        id = extractSuggestionId(suggestion);
    }
    return [id, value];
}


/*********************************************************************
Inputs
*********************************************************************/
// 0 = Accept custom values
// 1 = Accept custom values, but all values must be unique (case-insensitive)
// 2 = Accept only predefined values
function inputStrictness(input) {
    if (['member', 'arranger', 'performer'].some(x => input.classList.contains(`input-type-${x}`)))
        return 0;
    if (['instrument', 'role'].some(x => input.classList.contains(`input-type-${x}`)))
        return 1;
    return 2;
}
function focusInput(event) {
    const inputContainer = event.target.closest('.input');

    // Clear suggestions before suggesting new ones
    inputContainer.children[1].replaceChildren();

    toggleShowInputSuggestion(event.target.parentElement.nextElementSibling, true);
    updateInputSuggestion(event, true);
}

let BLUR_DUE_TO_INPUT_EDIT = false;
function blurInput(event) {
    const input = event.target;
    const inputContainer = input.parentElement.parentElement;
    const newValue = input.value;
    const suggestions = input.parentElement.nextElementSibling;

    // If blurring input due to focusing into suggestions, do nothing
    if (event.relatedTarget === suggestions)
        return;

    toggleShowInputSuggestion(suggestions, false);
    closeNewTagButton(inputContainer);

    if (!INPUT_CHANGED)
        return;
    INPUT_CHANGED = false;

    // Clearing input hidden before sync
    const isRegularInput = !isInputAndTaglist(inputContainer) && !isTaglistButton(inputContainer);
    if (isRegularInput && !newValue) {
        input.previousElementSibling.value = '';
    }

    syncData(input);

    if (BLUR_DUE_TO_INPUT_EDIT)
        return;
    
    const row = inputContainer.closest('tr');
    if (!row)
        return;

    // promote row if editing a preview row
    // or trigger editInput if the value was changed for a regular input
    const isPreviewRow = row.classList.contains('modal-datalist-preview');
    if (newValue) {
        if (isPreviewRow || isRegularInput) {  // e.g. modal performances
            const [id, canonicalValue] = getSuggestionIfExists(inputContainer, input, newValue);
            return editInput(input, inputContainer, newValue, id, canonicalValue);
        }
        input.value = '';
        return;
    }

    // delete row if it is now empty
    // e.g. performances modal
    const rowInputsEmpty = Array.from(row.querySelectorAll('input:not([type="hidden"])')).every(x => !x.value);
    const rowTagsEmpty = Array.from(row.querySelectorAll('.taglist')).every(x => x.children.length === 1);
    if (!isPreviewRow && rowInputsEmpty && rowTagsEmpty) {
        setTimeout(() => { row.remove(); }, 0);
    }
}

function clickXButton(element) {
    const tagList = element.closest('.taglist');
    const modalDatalist = element.closest('.modal-datalist');

    if (tagList) {
        if (modalDatalist) {
            // If deleting a tag makes the row empty, delete the row (e.g. deleting performer)
            const row = element.closest('tr');
            if (row && Array.from(row.querySelectorAll('input')).every(x => !x.value)
                    && Array.from(row.querySelectorAll('.taglist')).every(x => x.children.length === 2)) {
                setTimeout(() => {
                    row.remove();
                    syncData(modalDatalist);
                }, 0);
                return;
            }
        }
        setTimeout(() => {  // e.g. deleting arranger
            element.parentElement.remove();
            syncData(tagList);
        }, 0);
    } else if (modalDatalist) {
        setTimeout(() => {  // e.g. deleting row in member links
            element.parentElement.parentElement.remove();
            syncData(modalDatalist);
        }, 0);
    } else {
        throw new Error('wtf');
    }
}

function keyDownTd(event) {
    if (event.key !== 'Enter')
        return;
    const td = event.target;
    event.preventDefault();
    td.blur();
}

// Handles creating/deleting rows when a TD is edited (e.g. member links)
function blurTd(element) {
    const tr = element.parentElement;
    const tds = Array.from(tr.children).slice(1);
    
    if (!tr.classList.contains('modal-datalist-preview')) {
        // Remove row if content is all empty
        if (tds.every(td => {
            if (td.children[0]?.nodeName === 'SELECT') {
                return true;
            } else if (td.getAttribute('contenteditable')) {
                return !td.innerText;
            }
        })) {
            tr.remove();
        }
        return;
    }

    if (!element.innerText) {
        return;
    }

    // Create new row if content is edited
    const temp = element.innerText;
    element.innerText = '';
    const newRow = tr.cloneNode(true);
    tr.after(newRow);
    tr.classList.remove('modal-datalist-preview');
    for (const td of tds) {
        if (td !== element && td.getAttribute('contenteditable')) {
            td.innerText = '';
        }
    }
    element.innerText = temp;
}

/**
 * Find the datalist row where `element` belongs and (if existent) copy it below.
 */
function ifInDatalistAddRowBelow(inputContainer, input) {
    const tr = inputContainer.closest('.modal-datalist-preview');
    if (!tr) {
        return;
    }

    let suggestion = inputContainer.lastElementChild;
    if (suggestion?.classList.contains('input-suggestions')) {
        toggleShowInputSuggestion(suggestion, false);
    }
    closeNewTagButton(inputContainer);

    const newRow = tr.cloneNode(true);
    tr.after(newRow);
    tr.classList.toggle('modal-datalist-preview');

    expandNewTagButton(inputContainer);
}

function duplicateTagExists(taglist, newValue, id) {
    const existingTags = new Set(Array.from(taglist.children).map(x => {
        if (x.children.length === 3)
            return extractId(x.children[1].innerText);
        return x.children[0].innerText;
    }));
    return existingTags.has(id === undefined ? newValue : id);
}

function duplicateInstrumentExists(inputContainer, newValue) {
    const datalist = inputContainer.closest('.modal-datalist tbody')
    if (!datalist) {
        return false;
    }
    const instruments = API.INSTRUMENTS.getAll();
    const existingInstruments = new Set(Array.from(datalist.children).map(x => {
        const value = x.children[1].children[0].children[0].children[2].value;
        return parseInt(value, 10) ? instruments[parseInt(value, 10)] : value;
    }));
    return existingInstruments.has(newValue);
} 

function isInputAndTaglist(inputContainer) {
    const taglist = inputContainer.nextElementSibling;
    if (taglist?.classList.contains('taglist')) {
        return taglist;
    }
}
function isTaglistButton(inputContainer) {
    return inputContainer.classList.contains('taglist-add');
}

/**
 * Handle creating/deleting row/tags when an input is edited.
 * - `input` The <input>
 * - `inputContainer` The ancestor class holding the <input> and related elements (e.g. suggestions)
 * - `newValue` The new value of the <input>
 * - `id` The id of the new value (blank for custom values)
 * - `canonicalValue` The full name of the new value (blank for custom values)
 */
function editInput(input, inputContainer, newValue, id, canonicalValue) {
    input.value = '';
    if (input.previousElementSibling.type === 'hidden') {
        input.previousElementSibling.value = '';
    }
    const strictness = inputStrictness(input);
    if (strictness === 2 && typeof id !== 'number') {
        return;
    } else if (strictness === 1 && newValue.toLowerCase() === canonicalValue?.toLowerCase()) {
        newValue = canonicalValue;
    }
    const value = strictness === 2 ? canonicalValue : newValue;
    
    // Separate input and tag list -> filling an input suggestion adds a tag
    const taglist = isInputAndTaglist(inputContainer);
    if (taglist) {
        if (duplicateTagExists(taglist, value, id))
            return;

        const hideId = ['instrument', 'role'].some(x => input.classList.contains(`input-type-${x}`));
        taglist.appendChild(construct(createInputTag(value, id, hideId)));
        return;
    }
    
    // Input suggestion inside a (+) button -> add tag
    if (isTaglistButton(inputContainer)) {
        setTimeout(() => {
            if (duplicateTagExists(inputContainer.parentElement, value, id))
                return;

            ifInDatalistAddRowBelow(inputContainer, input);
            inputContainer.before(construct(createInputTag(value, id)));
        }, 0);
        return;
    }

    if (duplicateInstrumentExists(inputContainer, value))
        return;

    // Regular input suggestion -> fill input
    ifInDatalistAddRowBelow(inputContainer, input);
    input.value = value;
    if (input.previousElementSibling.type === 'hidden') {
        input.previousElementSibling.value = id ?? '';
    }
}

function clickInputPlus(element) {
    keyDownInput(element);
}
function keyDownInput(eventOrElement) {
    let input;
    if (eventOrElement.key) {
        if (eventOrElement.key !== 'Enter')
            return;
        input = eventOrElement.target;
    } else {
        input = eventOrElement.nextElementSibling;
    }
    const inputContainer = input.parentElement.parentElement;
    const newValue = input.value;
    if (!newValue) {
        return;
    }

    const [id, canonicalValue] = getSuggestionIfExists(inputContainer, input, newValue);
    editInput(input, inputContainer, newValue, id, canonicalValue);
    setTimeout(() => {
        BLUR_DUE_TO_INPUT_EDIT = true;
        input.blur();
        expandNewTagButton(inputContainer);
        input.focus();

        // current/upcoming event, performances modal
        if (!isInputAndTaglist(inputContainer) && !isTaglistButton(inputContainer))
            input.blur();
        BLUR_DUE_TO_INPUT_EDIT = false;
    }, 0);
}
function clickSuggestion(element) {
    const inputContainer = element.parentElement.parentElement;
    const input = inputContainer.children[0].lastElementChild;
    const newValue = element.children[0].innerText;

    const id = extractSuggestionId(element);
    editInput(input, inputContainer, newValue, id, newValue);
    setTimeout(() => {
        BLUR_DUE_TO_INPUT_EDIT = true;
        input.blur();
        input.focus();
        
        // current/upcoming event, performances modal
        if (!isInputAndTaglist(inputContainer) && !isTaglistButton(inputContainer))
            input.blur();
        BLUR_DUE_TO_INPUT_EDIT = false;
    }, 0);
}

function expandNewTagButton(container) {
    const name = 'taglist-add-clicked';
    if (container.classList.contains('taglist-add') && !container.classList.contains(name)) {
        container.classList.add(name);
        container.children[0].children[1].focus();
    }
}
function closeNewTagButton(container) {
    const name = 'taglist-add-clicked';
    if (container.classList.contains(name)) {
        container.classList.remove(name);
    }
}

function scrollInputYear(event) {
    if (event.target.value !== '0' && !event.target.value) {
        return;
    }
    event.preventDefault();
    const oldValue = Number(event.target.value);

    const offset = event.deltaY > 0 ? -1 : 1;
    const currYear = (new Date()).getFullYear();
    const newValue = clamp(Number(event.target.value) + offset, 2023, currYear + 10);
    event.target.value = newValue;
    
    if (oldValue !== newValue) {
        syncData(event.target);
    }
}


/*********************************************************************
Input table filtering
*********************************************************************/
const filterInput = debounce(async (event) => {
    const id = event.target.closest('.table').id;
    let data;
    if (id === 'table-members') {
        data = API.MEMBERS.getAll();
    } else if (id === 'table-music') {
        data = API.MUSIC.getAll();
    } else if (id === 'table-events') {
        data = API.EVENTS.getAll();
    } else {
        throw new Error(id);
    }
    const filter = x => isSubstring(x.name, event.target.value);

    applyTableFilter(id, data, filter);
}, 0);

function applyTableFilter(tableId, list, filter) {
    for (const item of list) {
        const visible = filter(item);
        const display = visible ? '' : 'none';

        // Set visibility of row
        const row = cssGetId(`${tableId}-${item.id}`);
        cssSetElement(row, { display });
        
        // Pass subrows, hiding them if row is hidden
        let curr = row.nextElementSibling;
        while (isSubrow(curr)) {
            if (!visible) {
                cssSetElement(curr, { display });
            }
            curr = curr.nextElementSibling;
        }
    }
}


/*********************************************************************
Input syncing
*********************************************************************/
function parseInnerHTML(text) {
    const paragraphs = [];

    let i = text.search('<div>|<br>');
    while (i >= 0) {
        if (i === 0) {
            if (text.startsWith('<br>')) {
                paragraphs.push('');
                text = text.slice(4);
            } else {
                const j = text.indexOf('</div>');
                let line = text.slice(i + 5, j);
                if (line.endsWith('<br>')) {
                    line = line.slice(0, -4);
                }
                paragraphs.push(...line.split("<br>"));
                text = text.slice(j + 6);
            }
        } else {
            const line = text.slice(0, i);
            paragraphs.push(line);
            text = text.slice(i);
            if (text.startsWith('<br>')) {
                text = text.slice(4);
            }
        }
        i = text.search('<div>|<br>');
    }
    if (text) paragraphs.push(...text.split("<br>"));
    return paragraphs;
}
function syncCurrentEvent(element) {
    if (element.id === 'current-event-visible-from') {
        setCurrentEvent({ hideBefore: element.value.replace("T", "|") });
    } else if (element.id === 'current-event-visible-until') {
        setCurrentEvent({ hideAfter: element.value.replace("T", "|") });
    } else if (element.id === 'current-event-rvsp') {
        setCurrentEvent({ rvsp: element.innerText });
    } else if (element.id === 'current-event-tickets') {
        setCurrentEvent({ tickets: element.innerText });
    } else if (element.id === 'current-event-location') {
        setCurrentEvent({ location: element.innerText });
    } else if (cssGetId('current-event-id').contains(element)) {
        const hidden = element.previousElementSibling;
        if (!element.value) {
            hidden.value = '';
        }
        setCurrentEvent({ id: hidden.value ? Number(hidden.value) : undefined });
    } else {
        console.warn(element);
        throw new Error("WHUH");
    }
}
function syncCurrentEventDescription(element) {
    if (cssGetId('preconcert-description').contains(element))
        return setCurrentEvent({ preConcertDescription: parseInnerHTML(element.innerHTML) });
    
    if (cssGetId('postconcert-description').contains(element))
        return setCurrentEvent({ postConcertDescription: parseInnerHTML(element.innerHTML) });
    
    console.warn(element);
    throw new Error("HUH");
}

function parseTaglist(element) {
    const list = [];
    const set = new Set();
    for (const li of element.children) {
        if (li.classList.contains('taglist-add'))
            continue;
        if (li.children.length === 3)
            list.push(extractId(li.children[1].innerText));
        else
            set.add(li.children[0].innerText);
    }
    return [list, set];
}
function refreshInputModalOpener(td, items) {
    const p = td.children[0].children[0];
    p.innerHTML = `${items.map(x => `<span>${x}</span>`).join(' · ')} <span class="count">(${items.length})</span>`;
}

function syncData(element) {
    if (element.closest('.modal')) {
        return;
    }
    if (element.closest('#datalist-current-event')) {
        return syncCurrentEvent(element);
    }
    if (element.closest('#current-event-description-container')) {
        return syncCurrentEventDescription(element);
    }
    const tableId = element.closest('.table').id;
    if (!tableId) {
        console.warn(element);
        throw new Error('where');
    }
    const subrow = element.closest('.subtable-row');
    if (subrow) {
        return TABLE_OPERATIONS[tableId].subrowEdit([subrow]);
    }
    const row = element.closest('tr');
    TABLE_OPERATIONS[tableId].rowEdit([row]);
}



/*********************************************************************
Input validation
*********************************************************************/
function parseMarkdown(text) {
    // Links
    text = text.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" target="_blank">$1</a>'
    );
    return text;
}
function validateInput(element, richText) {
    const field = richText ? 'innerHTML' : 'innerText';
    let value = element[field];
    value = value.replaceAll(/\n|\r|<br>/g, '').trim();
    if (richText) {
        value = parseMarkdown(value);
    }
    element[field] = value;
    syncData(element);
}
function validateMultilineInput(element) {
    let value = element.innerHTML;
    value = value.replace(/[\r\n]+/g, '').trim();
    value = parseMarkdown(value);
    element.innerHTML = value;
    syncData(element);
}
function validateAsset(link, allowExternal) {
    if (link.includes('://')) {
        if (!allowExternal) {
            return `'${link}' is an external link. If this asset will be reused often, download it as a local asset instead.`;
        }
    } else if (!/^.+\.[a-zA-Z]+$/.test(link)) {
        return `'${link}' is not a proper path to a file.`;
    } else if (!link.endsWith('.webp')) {
        return `'${link}' is not a WEBP file. Please convert it to a WEBP to optimize for size and loading time.`;
    } else if (!link.startsWith('assets/images')) {
        return `'${link}' should be moved inside assets/images.`;
    }
}
function validateInputAsset(element) {
    let value = element.innerText;
    value = value.replace(/[\r\n]+/g, '').trim();
    element.innerText = value;

    const validation = (element.closest('.table') || element.closest('.datalist')).nextElementSibling;
    if (!value) {
        cssSetElement(validation, { display: 'none' });
        return;
    }
    cssSetElement(validation, { display: 'block' });
    const err = validateAsset(value);
    if (err) {
        validation.innerText = err;
    } else {
        cssSetElement(validation, { display: 'none' });
    }
    syncData(element);
}
function validateInputTimestamp(element) {
    let value = element.innerText;
    value = value.replace(/[\r\n]+/g, '').trim();

    const timestampRegex = /^(?:\?\?:\?\?|\d+:[0-5]\d:[0-5]\d|(?:[0-5]?\d):[0-5]\d)$/;
    value = timestampRegex.test(value) ? value : '';
    element.innerText = value;
    syncData(element);
}
function validateInputYear(element, optional) {
    if (!element.value && optional) {
        syncData(element);
        return;
    }
    const value = parseInt(element.value, 10);
    const currYear = (new Date()).getFullYear();
    element.value = isNaN(value) ? (optional ? '' : currYear) : clamp(value, 2023, currYear + 10);
    syncData(element);
}
function validateInputLinks(element) {
    element.innerHTML = element.innerHTML.split("<br>").filter(x => !!x).map(x => x.trim()).join("<br>");
    syncData(element);
}
function validateInputEventLink(element) {
    const linkType = parseEventLink(element.innerText.trim());
    element.className = linkType ? `td-link td-link-${linkType}` : '';
    syncData(element);
}


/*********************************************************************
Exporting and uploading data
*********************************************************************/
function saveAsJS(filename, text) {
    const blob = new Blob([text], {
        type: "application/javascript",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function minify(x) {
    function _minify(x, depth) {
        if (Array.isArray(x)) {
            for (let i = x.length - 1; i >= 0; i--) {
                const v = x[i];

                if (v === undefined || v === null || v === '') {
                    x.splice(i, 1);
                    continue;
                }

                if (typeof v === 'object') {
                    _minify(v, depth + 1);
                }
                // if (typeof v === 'object' && _minify(v, depth + 1)) {
                //     x.splice(i, 1);
                // }
            }

            return x.length === 0;
        }

        if (depth === 1) {
            delete x.id;
        }

        for (const key of Object.keys(x)) {
            const v = x[key];

            if (v === undefined || v === null || v === '') {
                delete x[key];
                continue;
            }

            if (typeof v === 'object') {
                _minify(v, depth + 1)
            }
            // if (typeof v === 'object' && _minify(v, depth + 1)) {
            //     delete x[key];
            // }
        }

        return Object.keys(x).length === 0;
    }
    const copy = structuredClone(x);
    _minify(copy, 0);
    return JSON.stringify(copy, null, 4);
}

function sanityCheckData() {
    const outreachOptions = new Set(['discord', 'instagram']);
    const year = getExpectedSchoolYear();
    let hasExecsForYear = false;
    let hasOutreach = false;

    const notPerformed = new Set();
    const roles = API.ROLES.getAll();
    for (const member of API.MEMBERS.getAll()) {
        if (member.left) {
            const [joinedM, joinedY] = member.joined.split(' ');
            const [leftM, leftY] = member.left.split(' ');
            if (leftY < joinedY) {
                return `Invalid joined/left year for member '${member.name}' (#${member.id})`;
            } else if (leftY === joinedY && leftM === 'Winter' && joinedM === 'Fall') {
                return `Invalid joined/left time for member '${member.name}' (#${member.id})`;
            }
        }
        if (member.instruments.length === 0 && member.roles.length === 0) {
            console.warn(`Member '${member.name}' (#${member.id}) has no tags`);
        }
        notPerformed.add(member.id);
        if (member.roles.some(x => roles[x].includes("(") && roles[x].includes(`${String(year).slice(-2)}`))) {
            hasExecsForYear = true;
            if (member.links.some(x => outreachOptions.has(x[0]))) {
                hasOutreach = true;
            }
        }
    }
    if (!hasExecsForYear)
        return `No members found with an executive tag for current school year ${year}`;
    if (!hasOutreach)
        return `No executives for current school year ${year} have outreach contacts (accepted: ${Array.from(outreachOptions).join(', ')})`;

    for (const [id, subId, music, p] of API.MUSIC.iterateSubrows()) {
        if (!p.link && !(p.concerts?.length > 0))
            return `Performance of '${music.name}' (#${id}) in subrow #${subId} has no link or concert`;
        if (!p.performers || Object.values(p.performers).length === 0)
            return `No performers for '${music.name}' (#${id}) in subrow #${subId}`;
        if (p.references?.some(x => x.includes('spotify.com')))
            return `Spotify reference link in '${music.name}'. Please use a website with publicly-accessible songs.`
        Object.values(p.performers).forEach(x => {
            const i = parseInt(x, 10);
            if (!isNaN(i)) {
                notPerformed.delete(i);
            }
        });
    }
    if (notPerformed.size > 0) {
        const members = Array.from(notPerformed).map(x => {
            const { name, id } = API.MEMBERS.get(x);
            return `- ${name} (#${id})`;
        });
        console.warn(`${notPerformed.size} member(s) found with no performances:\n${members.join('\n')}`)
    }

    for (const event of API.EVENTS.getAll()) {
        if (event.type === 'Concert' && event.setlist.length === 0) {
            console.warn(`Concert '${event.name}' (#${event.id}) has nothing in its setlist`);
        }
        if (event.poster) {
            const err = validateAsset(event.poster);
            if (err) return `Event '${event.name}' (#${event.id}): ${err}`;
        }
    }
    
    const event = API.EVENTS.get(getCurrentEvent().id);
    if (event && !event.poster) {
        return `Current event '${event.name}' (#${event.id}) has no poster image`;
    }

    for (const upcoming of API.UPCOMING_EVENTS.getAll()) {
        if (typeof upcoming.eventId !== 'number') {
            return `Upcoming event in row #${upcoming.id} has no event`;
        }
        const err = validateAsset(upcoming.image, true);
        if (err) return `Upcoming event '${event.name}' (#${event.id}): ${err}`;
    }
}

function getExportCodeTemplate(data) {
    return `const TAGS = ${minify(data.tags)};

const ROLES = ${minify(data.roles)};

const INSTRUMENTS = ${minify(data.instruments)};

const CURRENT_EVENT = ${minify(data.currentEvent)};

const ANNOUNCEMENTS = ${minify(data.announcements)}.map((x, i) => ({...x, id: i}));

const UPCOMING_EVENTS = ${minify(data.upcomingEvents)}.map((x, i) => ({...x, id: i}));

const MEMBERS = ${minify(data.members)}.map((x, i) => ({...x, id: i}));

const MUSIC = ${minify(data.music)}.map((x, i) => ({...x, id: i}));

const EVENTS = ${minify(data.events)}.map((x, i) => ({...x, id: i}));

const FAQ = ${minify(data.faq)}.map((x, i) => ({...x, id: i}));

const CAROUSEL = [
    {
        "url": "assets/images/carousel 2025-04.webp",
        "caption": "End of Winter <br> Concert <b>2025/04</b>",
        "yLims": [300, 1300],
        "captionXPosition": "60%",
        "captionRight": true,
        "captionTopOnMobile": true,
        "width": 3171,
        "height": 1524
    },
    {
        "url": "assets/images/carousel 2026-04.webp",
        "caption": "Tunes & Treats <br> <b>2026/04</b>",
        "yLims": [250, 1150],
        "captionXPosition": "70%",
        "captionRight": false,
        "captionTopOnMobile": true,
        "width": 2400,
        "height": 1350
    },
    {
        "url": "assets/images/carousel 2025-01.webp",
        "caption": "End of Fall <br> Concert <b>2025/01</b>",
        "yLims": [400, 1300],
        "captionXPosition": "40%",
        "captionRight": true,
        "captionTopOnMobile": true,
        "width": 2520,
        "height": 1418
    }
];
`;
}

/**
 * getExportCodeTemplate remaps every index to [0, n - 1]
 * However it doesn't touch foreign keys, so we must adjust them here
 */
function remapForeignKeyIndices() {
    // Keep existing instruments & roles
    const newMemberIndices = {};
    const instrumentSet = new Set();
    const roleSet = new Set();
    const members = structuredClone(API.MEMBERS.getAll());
    members.forEach((member, i) => {
        for (const instrument of member.instruments) {
            instrumentSet.add(instrument);
        }
        for (const role of member.roles) {
            roleSet.add(role);
        }
        newMemberIndices[member.id] = i;
    });
    
    // Recreate instruments list
    const oldInstruments = API.INSTRUMENTS.getAll();
    const newInstruments = Array.from(instrumentSet).map(i => oldInstruments[i]).sort(instrumentSorter);
    const newInstrumentIndices = Object.fromEntries(newInstruments.map((x, i) => [API.INSTRUMENTS.index(x), i]));

    // Recreate roles list
    const oldRoles = API.ROLES.getAll();
    const newRoles = Array.from(roleSet).map(i => oldRoles[i]).sort(roleSorter);
    const newRoleIndices = Object.fromEntries(newRoles.map((x, i) => [API.ROLES.index(x), i]));

    // Remap instruments & roles
    for (const member of members) {
        member.instruments = member.instruments.map(i => newInstrumentIndices[i]);
        member.roles = member.roles.map(i => newRoleIndices[i]);
    }

    const newEventIndices = {};
    const events = structuredClone(API.EVENTS.getAll());
    events.forEach((event, i) => {
        newEventIndices[event.id] = i;
    });

    // Remap member/event indices
    const newMusicIndices = {};
    const music = structuredClone(API.MUSIC.getCanonical());
    music.forEach((song, i) => {
        for (const p of song.performances) {
            p.concerts = p.concerts.map(ind => newEventIndices[ind] ?? ind);  // temporary
            p.arrangers = p.arrangers?.map(ind => newMemberIndices[ind] ?? ind);
            p.performers = Object.fromEntries(
                Object.entries(p.performers).map(([instrument, members]) => [
                    newInstrumentIndices[instrument],
                    members.map(member => newMemberIndices[member] ?? member)
                ])
            );
        }
        newMusicIndices[song.id] = i;
    });

    // Remap song indices
    for (const event of events) {
        event.setlist = event.setlist?.map(i => newMusicIndices[i]);
    }

    return { members, music, events, instruments: newInstruments, roles: newRoles };
}

function exportData() {
    const err = sanityCheckData();
    if (err)
        return setHelperText(`Data check failed: ${err}`);
    setHelperText();

    reorderTabContent(cssGetClass('tab-active')[0].id.slice(4));

    const { members, music, events, instruments, roles } = remapForeignKeyIndices();

    const text = getExportCodeTemplate({
        tags: getTags(),
        roles,
        instruments,
        currentEvent: getCurrentEvent(),
        announcements: API.ANNOUNCEMENTS.getAll(),
        upcomingEvents: API.UPCOMING_EVENTS.getAll(),
        members,
        music,
        events,
        faq: API.FAQ.getAll()
    });
    saveAsJS('data.js', text);
}
async function importData(element) {
    if (element.files.length === 0)
        return;
    const [file] = element.files
    const content = await file.text();

    const regex = /const\s+(\w+)\s*=\s*([\s\S]*?);(?=\s*const|\s*$)/g;
    const matches = [...content.matchAll(regex)];
    
    for (const [, name, code] of matches) {
        const end = '.map((x, i) => ({...x, id: i}))';
        const value = code.endsWith(end) ? code.slice(0, -end.length) : code;
        if (name === 'TAGS') {
            reassignObject(TAGS, JSON.parse(value));
        } else if (name === 'CURRENT_EVENT') {
            reassignObject(CURRENT_EVENT, JSON.parse(value));
        } else if (name === 'CAROUSEL') {
            reassignList(CAROUSEL, JSON.parse(value));
        } else {
            const data = JSON.parse(value);
            if (data.length >= 1 && String(data[0]) === '[object Object]') {
                for (let i = 0; i < data.length; i++) {
                    data[i].id = i;
                }
            }
            API[name].resetData(data);
        }
    }

    setHelperText(`Successfully imported '${file.name}'`);
    toggleTab(cssGetClass('tab-active')[0], true);
}


/*********************************************************************
Parsing CSV data
*********************************************************************/
function parseCSV(csv) {
    const rows = [];
    let current = [];
    let field = "";
    let inQuotes = false;

    csv = csv.replace(/[‘’]/g, "'")

    for (let i = 0; i < csv.length; i++) {
        const char = csv[i];
        const nextChar = csv[i + 1];

        if (inQuotes) {
            if (char === '"' && nextChar === '"') {
                field += '"'; // Escaped quote
                i++; // Skip next quote
            } else if (char === '"') {
                inQuotes = false; // End of quoted field
            } else {
                field += char;
            }
        } else {
            if (char === '"') {
                inQuotes = true;
            } else if (char === ',') {
                current.push(field);
                field = "";
            } else if (char === '\n') {
                current.push(field);
                rows.push(current);
                current = [];
                field = "";
            } else if (char === '\r') {
                // Ignore CR (handles Windows \r\n)
            } else {
                field += char;
            }
        }
    }

    // Push last field/row if needed
    if (field.length > 0 || current.length > 0) {
        current.push(field);
        rows.push(current);
    }

    return rows.map(x => x.map(y => y.trim()));
}

function validateSeason(season) {
    const [name, year] = season.split(' ');
    const names = ['Fall', 'Winter'];
    if (!names.includes(name)) {
        throw new Error(`Got '${name}', expected one of [${names}]`);
    }
    const yearInt = parseInt(year, 10);
    if (yearInt < 2000 || year > 3000) {
        throw new Error(`Invalid year '${year}'`);
    }
    return season;
}

function parseLinks(discord, links) {
    const data = [];
    if (discord) {
        data.push(['discord', discord]);
    }

    for (const link of links) {
        const match = link.trim().match(/^(.*)\s*\(([^()]*)\)$/);
        if (!match) {
            throw new Error(`Expected format 'name (site, optional url)', got ${link}`);
        }
        const [, username, source] = match;
        if (source.includes(',')) {
            const [site, url] = source.split(',').map(x => x.trim());
            data.push([site.toLowerCase(), username.trim(), url]);
        } else {
            data.push([source.toLowerCase(), username.trim()]);
        }
        
    }
    return data;
}

const instrumentOrder = {
    'alto saxophone': '5.1',
    'tenor saxophone': '5.2',
    'baritone saxophone': '5.3',
    
    'oboe': '4.1',
    'english horn': '4.2',
    'clarinet': '4.3',
    'bass clarinet': '4.4',
    'bassoon': '4.5',

    'piccolo': '3.1',
    'recorder': '3.3',
    'flute': '3.2',

    'trumpet': '6.1',
    'french horn': '6.2',
    'trombone': '6.3',
    'euphonium': '6.4',
    'tuba': '6.5',

    'ukulele': '1.1',
    'acoustic guitar': '1.1',
    'electric guitar': '1.2',
    'bass guitar': '1.3',

    'violin': '2.1',
    'viola': '2.2',
    'cello': '2.3',
    'double bass': '2.4',

    'voice': '0.1',
    'piano': '0.2',
    'electric piano': '0.3',
    'drums': '0.4',
}
function instrumentSorter(a, b) {
    const groupA = instrumentOrder[a.toLowerCase()];
    const groupB = instrumentOrder[b.toLowerCase()];
    if (!groupA || !groupB) {
        return a.localeCompare(b);
    } else if (!groupA) {
        return -1;
    } else if (!groupB) {
        return 1;
    }
    const i = groupA.localeCompare(groupB);
    if (i === 0) {
        return a.localeCompare(b);
    }
    return i;
}
const roleOrder = {
    'executive': '0',
    'assistant executive': '1',
    'logistics': '2',
    'arranger': '2',
    'artist': '2',
    'website': '2',
    'og': '3',
}
function roleSorter(a, b) {
    a = parseRole(a.toLowerCase());
    b = parseRole(b.toLowerCase());

    const groupA = a.includes('executive') ? String(Math.min(Number(roleOrder[a]), 1)) : roleOrder[a];
    const groupB = b.includes('executive') ? String(Math.min(Number(roleOrder[b]), 1)) : roleOrder[b];
    if (!groupA || !groupB) {
        return a.localeCompare(b);
    } else if (!groupA) {
        return 1;
    } else if (!groupB) {
        return -1;
    }
    const i = groupA.localeCompare(groupB);
    if (i === 0) {
        return a.localeCompare(b);
    }
    return i;
}

function getExpectedSchoolYear() {
    const now = new Date();
    return now.getMonth() >= 8 ? now.getFullYear() : now.getFullYear() - 1;
}
function getCurrentSchoolYear(indices, members) {
    let year = getExpectedSchoolYear();

    const memberswithYears = members.filter(row => row[indices['Roles']].includes("("))
    while (!memberswithYears.some(row => row[indices['Roles']].includes(String(year).slice(2)))) {
        year -= 1;
        if (year === 2022) {
            throw new Error("WTF");
        }
    } 
    return year;
}

async function uploadMembers(element) {
    if (element.files.length === 0) {
        throw new Error(`No members CSV uploaded`);
    }
    const raw = await element.files[0].text();
    const data = parseCSV(raw);
    
    if (data.length <= 1) {
        console.log('[]');
        return [];
    }

    for (let i = 1; i < data.length; i++) {
        if (data[0].length !== data[i].length) {
            throw new Error(`Mismatch in number of rows. Column 1 = ${data[0].length} != ${data[i].length} = Column ${i + 1}`);
        }
    }

    // Map column to row index
    const rows = new Set(['Discord', 'Public Name', 'Instruments', 'Roles', 'Season Start', 'Season End', 'Personal Links']);
    const indices = {};
    for (let i = 0; i < data[0].length; i++) {
        if (rows.has(data[0][i])) {
            indices[data[0][i]] = i;
        }
    }

    // Filter for real members
    const members = data.filter((row, i) => (
        i > 0 && row[indices['Public Name']] && row[indices['Season Start']] && row[indices['Discord']]
    ));

    // Get current year
    const year = getCurrentSchoolYear(indices, members);

    let allRoles = members.map(row => row[indices['Roles']]?.split(',').map(x => x.trim()).filter(x => x).flat() ?? []).flat();
    allRoles = Array.from(new Set(allRoles)).sort(roleSorter);
    const rowIndexer = Object.fromEntries(allRoles.map((x, i) => [x, i]));

    const parsed = members.map((row, i) => {
        // Only show Discord of current execs
        const rawRoles = row[indices['Roles']];
        const isExec = rawRoles.includes(` (`) && rawRoles.includes(`${String(year).slice(2)}`);
        const discord = isExec ? row[indices['Discord']] : undefined;
        const roles = rawRoles?.split(',').map(x => rowIndexer[x.trim()]).filter(x => x !== undefined) ?? [];
        
        return {
            id: i,
            name: row[indices['Public Name']],
            joined: validateSeason(row[indices['Season Start']]),
            left: row[indices['Season End']],
            instruments: row[indices['Instruments']].split(',').map(x => x.trim()).sort(instrumentSorter),
            roles,
            links: parseLinks(discord, row[indices['Personal Links']] ? row[indices['Personal Links']].split('\n') : [])
        }
    });

    const discords = members.map(row => row[indices['Discord']]);
    return [parsed, discords, allRoles];
}

async function uploadMusic(element) {
    if (element.files.length === 0) {
        throw new Error(`No music CSV uploaded`);
    }
    const raw = await element.files[0].text();
    const data = parseCSV(raw);
    
    if (data.length <= 1) {
        console.log('[]');
        return [];
    }

    for (let i = 1; i < data.length; i++) {
        if (data[0].length !== data[i].length) {
            throw new Error(`Mismatch in number of rows. Column 1 = ${data[0].length} != ${data[i].length} = Column ${i + 1}`);
        }
    }

    // Map column to row index
    const rows = new Set(['Name', 'Artist', 'From', 'Media Origin', 'References']);
    const indices = {};
    for (let i = 0; i < data[0].length; i++) {
        if (rows.has(data[0][i])) {
            indices[data[0][i]] = i;
        }
    }

    const parsed = data.slice(1).map((row, i) => {
        const from = row[indices['From']];
        const mediaOrigin = row[indices['Media Origin']];
        const references = row[indices['References']].split('\n');
        const data = {
            id: i,
            name: row[indices['Name']],
            composer: row[indices['Artist']]
        }
        if (from) { data.from = from }
        if (mediaOrigin) { data.mediaOrigin = mediaOrigin }
        if (references) { data.references = references }
        return data;
    });
    
    return parsed;
}

function parseSetlistInfo(info) {
    const url = parseYoutubeVideo(info)
    if (url) return url;
    return timestampToSeconds(info);
}

async function uploadPerformances(element, memberData, discords, musicData, eventData) {
    if (element.files.length === 0) {
        throw new Error(`No performances CSV uploaded`);
    }

    musicData = Object.fromEntries(musicData.map(x => [x.name, x]));

    const raw = await element.files[0].text();
    let [header, ...data] = parseCSV(raw);

    for (let i = 0; i < data.length; i++) {
        if (header.length !== data[i].length) {
            throw new Error(`Mismatch in number of rows. Column 1 = ${header.length} != ${data[i].length} = Column ${i + 1}`);
        }
    }

    // Map column to row index
    const rows = new Set(['Name', 'Arrangers', 'Sheet Music', 'Concerts', 'Song Type', 'Group', 'Instrumentation', 'Performers']);
    const indices = {};
    for (let i = 0; i < header.length; i++) {
        if (rows.has(header[i])) {
            indices[header[i]] = i;
        }
    }

    const split = x => x.split('\n').map(x => x.trim());
    const setlists = {};

    // Members data
    const discordToIdMap = Object.fromEntries(memberData.map((x, i) => [discords[i], x.id]));
    const discordToId = x => discordToIdMap[x] ?? x;
    let instruments = memberData.map(x => x.instruments).flat();
    instruments.push(...data.map(row => split(row[indices['Instrumentation']]).flat()).flat())
    instruments = Array.from(new Set(instruments)).sort(instrumentSorter);
    const instrumentToId = Object.fromEntries(instruments.map((x, i) => [x, i]));

    // Event data
    const eventToIdMap = Object.fromEntries(eventData.map(x => [x.name, x.id]));
    const eventToId = x => eventToIdMap[x] ?? x;

    for (const row of data) {
        const name = row[indices['Name']];
        if (!musicData[name]) {
            throw new Error(`Performance found for non-existent song "${name}".`);
        }

        if (!musicData[name].performances) {
            musicData[name].performances = [];
        }
        let instrumentation = split(row[indices['Instrumentation']]);
        let performers = split(row[indices['Performers']]).map(x => x.split(',').map(y => y.trim()));
        const inds = instrumentation.map((_, i) => i).sort((a, b) => instrumentSorter(instrumentation[a], instrumentation[b]));
        instrumentation = inds.map(i => instrumentToId[instrumentation[i]]);
        performers = inds.map(i => performers[i]?.map(performer => discordToId(performer)));

        const concerts = split(row[indices['Concerts']]);

        // Fill out concert setlist info
        let recordingUrl;
        const concertNames = [];
        for (const concert of concerts) {
            let concertName = concert;
            let p1, p2;

            // <name> [<setlist order>, <setlist timestamp/video>]
            // <name> [<setlist order>]
            // Recording [<link>]
            if (concert.includes('[') && concert.includes(']')) {
                concertName = concert.slice(0, concert.lastIndexOf('[')).trim();
                p1 = concert.slice(concert.lastIndexOf('[') + 1, concert.lastIndexOf(']'));
            
                if (p1.includes(',')) {
                    [p1, p2] = p1.split(',').map(x => x.trim());
                    p2 = parseSetlistInfo(p2);
                }
            }
            if (p1) {
                if (concertName === 'Recording') {
                    // Recording [<p1>]
                    recordingUrl = p1;
                    continue;
                }
                
                if (!setlists[concertName]) {
                    setlists[concertName] = {};
                }
                const number = parseInt(p1, 10) - 1;
                if (isNaN(number)) {
                    console.warn(`[${name}] ${concert}`)
                } else {
                    // <name> [<p1>] or <name> [<p1>, <p2>]
                    if (p2 !== undefined) {
                        setlists[concertName][number] = [musicData[name].id, p2];
                    } else {
                        setlists[concertName][number] = musicData[name].id;
                    }
                }
            } else {
                // <name>
                if (!setlists[concertName]) {
                    setlists[concertName] = [];
                }
                setlists[concertName].push(musicData[name].id);
            }
            concertNames.push(concertName);
        }

        // Fill out song performance info
        const newData = {
            concerts: concertNames.map(eventToId),
            performers: Object.fromEntries(instrumentation.map((x, i) => [x, performers[i] ?? ['']])),
            id: musicData[name].performances.length
        }
        const arrangers = row[indices['Arrangers']]
        const sheetMusic = row[indices['Sheet Music']];
        const group = row[indices['Group']];
        const songType = row[indices['Song Type']];
        if (arrangers) { newData.arrangers = arrangers.split(',').map(x => discordToId(x.trim())); };
        if (sheetMusic) { newData.sheetMusic = sheetMusic };
        if (group) { newData.group = group };
        if (songType) { newData.songType = songType };
        if (recordingUrl) { newData.link = recordingUrl };

        musicData[name].performances.push(newData);
    };

    musicData = Object.values(musicData);

    for (const name in setlists) {
        if (Array.isArray(setlists[name])) {
            continue;
        }
        setlists[name] = Object.values(setlists[name]);
    }

    return [musicData, setlists, instruments];
}

async function uploadEvents(element) {
    if (element.files.length === 0) {
        throw new Error(`No event CSV uploaded`);
    }

    const raw = await element.files[0].text();
    let [header, ...data] = parseCSV(raw);

    for (let i = 0; i < data.length; i++) {
        if (header.length !== data[i].length) {
            throw new Error(`Mismatch in number of rows. Column 1 = ${header.length} != ${data[i].length} = Column ${i + 1}`);
        }
    }

    // Map column to row index 
    const rows = new Set(['Name', 'Type', 'Start', 'End', 'Location', 'Description', 'Link', 'Poster', 'Concert Video']);
    const indices = {};
    for (let i = 0; i < header.length; i++) {
        if (rows.has(header[i])) {
            indices[header[i]] = i;
        }
    }

    const parsed = data.map((row, i) => {
        const result = {
            id: i,
            type: row[indices['Type']],
            name: row[indices['Name']],
            location: row[indices['Location']],
            description: row[indices['Description']].split('\n'),
            start: row[indices['Start']].replace(', ', '|'),
            end: row[indices['End']].replace(', ', '|'),
        };
        for (const [fieldName, colName] of [['link', 'Link'], ['video', 'Concert Video'], ['poster', 'Poster']]) {
            const value = row[indices[colName]];
            if (value) result[fieldName] = value;
        }
        return result;
    }) 
    return parsed;
}

function enrichEventData(events, setlists) {
    const map = Object.fromEntries(events.map(x => [x.name, x]));
    for (const name in setlists) {
        let setlist = setlists[name];
        if (!setlist) {
            continue;
        }
        if (!map[name]) {
            console.warn(`Unknown concert: '${name}'\nExpected something from:\n${events.map(x => `- ${x.name}`).join('\n')}`);
            continue;
        }
        map[name].setlist = setlist;
    }
    return events;
}

function enrichMemberData(members, instruments) {
    const indexer = Object.fromEntries(instruments.map((x, i) => [x, i]));
    for (let i = 0; i < members.length; i++) {
        members[i].instruments = members[i].instruments.map(x => indexer[x]);
    }
}

async function parseData() {
    try {
        const [memberData, discords, roles] = await uploadMembers(cssGetId('upload-members'));
        const musicData = await uploadMusic(cssGetId('upload-music'));
        const eventData = await uploadEvents(cssGetId('upload-events'));

        const [performancesData, setlists, instruments] = await uploadPerformances(cssGetId('upload-performances'), memberData, discords, musicData, eventData);
        const fullEventData = enrichEventData(eventData, setlists);
        enrichMemberData(memberData, instruments);

        console.log(roles);
        console.log(instruments);
        console.log(memberData);
        console.log(fullEventData);
        console.log(performancesData);

        const text = getExportCodeTemplate({
            tags: getTags(),
            roles,
            instruments,
            currentEvent: getCurrentEvent(),
            announcements: API.ANNOUNCEMENTS.getAll(),
            upcomingEvents: API.UPCOMING_EVENTS.getAll(),
            members: memberData,
            music: performancesData,
            events: fullEventData,
            faq: API.FAQ.getAll()
        });
        saveAsJS('data.js', text);

        cssGetId('parse-data-validation').innerText = '';
    } catch(error) {
        cssGetId('parse-data-validation').innerText = String(error);
        throw error;
    }
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
    if (json.value) {
        element.value = json.value;
    }
    return element;
}

const X_BUTTON = {
    element: 'img',
    classes: ['x-button'],
    attributes: {
        src: 'assets/icons/add.svg',
        onclick: 'clickXButton(this)',
    }
}
function createRowCheckbox(checked) {
    const attributes = { type: 'checkbox' };
    if (checked) {
        attributes.checked = true;
    }

    return {
        element: 'input',
        classes: ['checkbox'],
        attributes
    }
}
const INPUT_ATTRIBUTES = {
    default: {
        contenteditable: 'plaintext-only',
        onblur: 'validateInput(this, false)',
    },
    defaultRichText: {
        contenteditable: 'true',
        onblur: 'validateInput(this, true)'
    },
    multiline: {
        contenteditable: 'true',
        onblur: 'validateMultilineInput(this)',
    },
    asset: {
        contenteditable: 'plaintext-only',
        onblur: 'validateInputAsset(this)'
    },
    timestamp: {
        contenteditable: 'plaintext-only',
        onblur: 'validateInputTimestamp(this)'
    },
    links: {
        contenteditable: 'plaintext-only',
        onblur: 'validateInputLinks(this)'
    },
    eventLink: {
        contenteditable: 'plaintext-only',
        onblur: 'validateInputEventLink(this)'
    }
}
function createDropdown(value, options) {
    const children = options.map(x => ({
        element: 'option',
        innerText: x
    }));
    return {
        element: 'select',
        value,
        attributes: { onblur: 'syncData(this)' },
        children
    };
}
function createInputsStartEnd(data, type, from, until) {
    let parser = x => x;
    if (type === 'datetime-local') {
        parser = x => x.replace('|', 'T')
    }
    return [{
        element: 'p',
        innerHTML: `From <input type="${type}" ${data[from] ? `value=${parser(data[from])}` : ''} onblur="syncData(this)" />`
    }, {
        element: 'p',
        innerHTML: `Until <input type="${type}" ${data[until] ? `value=${parser(data[until])}` : ''} onblur="syncData(this)" />`
    }]
}
function createInputText(iconPath, placeholder, value, id, suggestionType) {
    const icon = iconPath ? {
        element: 'img',
        attributes: { src: iconPath }
    } : undefined;

    const hidden = {
        element: 'input',
        attributes: {
            type: 'hidden',
            value: id,
        }
    };

    const input = {
        element: 'input',
        classes: [`input-type-${suggestionType}`],
        attributes: {
            type: 'text',
            placeholder,
            onfocus: 'focusInput(event)',
            onblur: 'blurInput(event)',
            oninput: `inputInput(event)`,
            onkeydown: `keyDownInput(event)`,
            value
        }
    };

    return {
        element: 'div',
        classes: ['input'],
        children: [{
            element: 'div',
            children: [icon, hidden, input]
        }, {
            element: 'ul',
            attributes: { tabIndex: 0 },
            classes: ['input-suggestions']
        }]
    }
}
function createInputTag(name, id, hideId) {
    const existingId = typeof(id) === 'number';
    return {
        element: 'li',
        classes: existingId ? [] : ['tag-custom'],
        children: [{
            element: 'span',
            innerText: name
        }, existingId ? {
            element: 'span',
            classes: ['taglist-id'],
            innerText: `(#${id})`,
            style: hideId ? { display: 'none' } : {}
        } : undefined, X_BUTTON]
    };
}
function createInputTags(tags, placeholder, suggestionType) {
    const tagList = tags.map(([id, name], i) => createInputTag(name, id));

    const addInput = {
        element: 'div',
        children: [{
            element: 'img',
            attributes: { src: 'assets/icons/add.svg' }
        }, {
            element: 'input',
            classes: [`input-type-${suggestionType}`],
            attributes: {
                type: 'text',
                placeholder,
                onfocus: 'focusInput(event)',
                onblur: 'blurInput(event)',
                oninput: `inputInput(event)`,
                onkeydown: `keyDownInput(event)`,
            }
        }]
    };

    const addInputSuggestions = {
        element: 'ul',
        attributes: { tabIndex: 0 },
        classes: ['input-suggestions'],
    }

    return {
        element: 'ul',
        classes: ['taglist'],
        children: [...tagList, {
            element: 'li',
            classes: ['input', 'taglist-add'],
            attributes: { onclick: 'expandNewTagButton(this)' },
            children: [addInput, addInputSuggestions]
        }]
    }
}
function createInputModalOpener(onclick, items, disabled, disabledMessage) {
    const classes = ['cell-details-button'];
    if (disabled) {
        classes.push('cell-details-button-disabled');
    }
    return {
        element: 'div',
        classes: ['cell-details'],
        children: [items ? {
            element: 'p',
            innerHTML: `${items.map(x => `<span>${x}</span>`).join(' · ')} <span class="count">(${items.length})</span>`
        } : undefined, {
            element: 'img',
            classes,
            attributes: {
                src: `assets/icons/edit.svg`,
                onclick: disabled ? `setHelperText("${disabledMessage}")` : onclick
            }
        }]
    }
}
function createInputSubrowOpener(items) {
    return {
        element: 'div',
        classes: ['cell-details'],
        children: [items ? {
            element: 'p',
            innerHTML: `${items.map(x => `<span>${x}</span>`).join(' · ')} <span class="count">(${items.length})</span>`
        } : undefined, {
            element: 'img',
            classes: ['cell-details-button'],
            attributes: {
                src: 'assets/icons/hide.svg',
                onclick: 'toggleCellDetails(this)'
            }
        }]
    }
}
function createDatalist(mappings) {
    return {
        element: 'table',
        classes: ['datalist'],
        children: [{
            element: 'tbody',
            children: mappings.map(([title, content]) => ({
                element: 'tr',
                children: [{
                    element: 'td',
                    innerText: title
                }, content]
            }))
        }]
    }
}
function createInputSeason(seasonYear, optional) {
    const [season, year] = seasonYear.split(' ');

    const options = optional ? ['', 'Fall', 'Winter'] : ['Fall', 'Winter'];
    const seasonInput = createDropdown(season, options);

    const yearInput = {
        element: 'div',
        classes: ['input'],
        children: [{
            element: 'div',
            children: [{
                element: 'input',
                value: year,
                classes: ['input-year'],
                attributes: {
                    type: 'text',
                    onblur: optional ? 'validateInputYear(this, true)' : 'validateInputYear(this)',
                    onmousewheel: 'scrollInputYear(event)'
                }
            }]
        }]
    };

    return {
        element: 'div',
        classes: ['input-season'],
        children: [seasonInput, yearInput]
    };
}

// Helper function for constructTable. Construct a single table row
function constructTableRow(tableId, id, row) {
    const checked = ROW_SELECTION[tableId]?.has(String(id));
    return construct({
        element: 'tr',
        id: `${tableId}-${id}`,
        children: [{
            element: 'td',
            attributes: {
                onclick: 'toggleRowSelect(event, this)'
            },
            children: [createRowCheckbox(checked)]
        }, ...row]
    });
}

// Helper function for constructTable. Construct a single table subrow
function constructTableSubrow(tableId, id, subrow, colspan, noSubtableCheckbox) {
    const checked = SUBROW_SELECTION[tableId]?.has(id);
    return construct({
        element: 'tr',
        style: { display: 'none' },
        id: `${tableId}-${id}`,
        classes: ['subtable-row'],
        children: [{
            element: 'td'
        }, {
            element: 'td',
            classes: ['subtable-container'],
            attributes: { colspan },
            children: [{
                element: 'div',
                classes: ['subtable'],
                attributes: noSubtableCheckbox ? {} : { onclick: 'toggleSubrowSelect(event, this)' },
                children: noSubtableCheckbox ? [subrow] : [createRowCheckbox(checked), subrow]
            }]
        }]
    });
}

let AUTOINCREMENT = {};

/**
 * Function for constructing a table and its contents. Auto-constructs a checkbox in the first column.
 * - `tableID (string)`: CSS id of the table
 * - `api`: Object with get/insert/delete methods to interact with internal data (e.g. API.MEMBERS)
 * - `templateData (T)`: Placeholder data for adding blank rows
 * - `dataParser (T => <td>[])`: Takes in your list item, outputs row HTML.
 * - `rowSyncer ((id, <td>[]) => void)`: Takes in row id & HTML, updates the API data 
 * - `deleteChecker (id => str)`: Takes in row id, return string if row can't be deleted safely. Optional
 * 
 * Output is an object of table operations. 
 */
function constructTable(tableId, api, templateData, dataParser, rowSyncer, deleteChecker) {
    function parseRowId(element) {
        return Number(element.id.split('-').at(-1));
    }

    const scroller = cssGetId(tableId).lastElementChild;
    const table = scroller.children[0].lastElementChild;
    let scrollPosition = 0;
    const operations = {
        length: () => api.length(),
        init: () => {
            const fragment = document.createDocumentFragment();
            let maxId = -1;
            for (const data of api.getAll()) {
                const row = dataParser(data);
                fragment.appendChild(constructTableRow(tableId, data.id, row));
                maxId = Math.max(data.id, maxId);
            }
            table.replaceChildren(fragment);
            AUTOINCREMENT[tableId] = maxId;
            scroller.scrollTop = scrollPosition;
        },
        reorder: () => {
            scrollPosition = scroller.scrollTop;

            const newList = [];
            for (const row of cssGetFirst(`#${tableId} tbody`).children) {
                newList.push(api.get(parseRowId(row)));
            }
            api.resetData(newList);
        },
        rowAdd: (row, copyRow) => {
            AUTOINCREMENT[tableId] += 1;
            const id = AUTOINCREMENT[tableId];

            const data = structuredClone(copyRow ? api.get(parseRowId(row)) : templateData);
            data.id = id;
            api.insert(data);
            const tr = constructTableRow(tableId, id, dataParser(data));

            if (row) row.after(tr);
            else table.appendChild(tr);

            tr.scrollIntoView({ behavior: 'smooth', block: 'center' });
        },
        rowDelete: (ids) => {
            const err = deleteChecker?.(ids);
            if (err)
                return err;
            for (const id of ids) {
                cssGetId(`${tableId}-${id}`).remove();
                api.delete(id);
                ROW_SELECTION[tableId].delete(id);
                if (AUTOINCREMENT[tableId] === Number(id)) {
                    AUTOINCREMENT[tableId] -= 1;
                }
            }
        },
        rowEdit: (elements) => {
            for (const tr of elements) {
                const id = parseRowId(tr);
                rowSyncer(id, Array.from(tr.children).slice(1));
            }
        },
        rowMoveToEnd: (moveTop) => {
            const fragment = document.createDocumentFragment();
            Array.from(ROW_SELECTION[tableId])
                .map(id => cssGetId(`${tableId}-${id}`))
                .sort((a, b) => a.sectionRowIndex - b.sectionRowIndex)
                .forEach(x => fragment.appendChild(x));
            if (moveTop) {
                table.prepend(fragment);
                table.children[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                table.appendChild(fragment);
                table.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        },
        rowMove: (moveUp) => {
            const rows = Array.from(ROW_SELECTION[tableId])
                .map(id => cssGetId(`${tableId}-${id}`))
                .sort((a, b) => a.sectionRowIndex - b.sectionRowIndex);
            const notMoved = new Set(rows.map(x => x.id));

            if (moveUp) {
                for (let i = 0; i < rows.length; i++) {
                    const prev = table.children[rows[i].sectionRowIndex - 1];
                    if (prev && !notMoved.has(prev.id)) {
                        prev.before(rows[i]);
                        notMoved.delete(prev.id);
                    }
                }
            } else {
                for (let i = rows.length - 1; i >= 0; i--) {
                    const next = table.children[rows[i].sectionRowIndex + 1];
                    if (next && !notMoved.has(next.id)) {
                        next.after(rows[i]);
                        notMoved.delete(next.id);
                    }
                }
            }
            const middle = Math.floor(rows.length / 2);
            rows[middle].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    operations.init();
    return operations;
}

/**
 * Like `contructTable` but for tables containing subrows. A few differences:
 * - `dataParser` outputs a tuple [row, subrows]
 *     - T1 => [<td>[], <?>[]]
 * - `dataParserSubrow` is a subrow constructor for `templateSubdata`. If undefined, table has no checkboxes 
 *     - T2 => <?>[]
 * - `rowSyncer` syncs rows as well as individual subrows
 *     - (id, <td>[], subIds, <?>[]) => void (sync row and subrows)
 *     - (id, undefined, subId, <?>) => void (sync a subrow)
 */
function constructTableWithSubrows(tableId, api, templateData, templateSubdata, dataParser, dataParserSubrow, rowSyncer, deleteChecker) {
    const noSubtableCheckbox = !dataParserSubrow || !templateSubdata;
    let rowLength; 
    const tree = {};
    
    function createRowAndSubrows(data) {
        const fragment = document.createDocumentFragment();

        const [row, subrows] = dataParser(data);
        const newRow = constructTableRow(tableId, data.id, row);
        fragment.appendChild(newRow);
        tree[data.id] = { max: -1, children: new Set() };
        rowLength = row.length;

        const subIds = api.getAllSubrows?.(data.id).map(x => x.id) ?? [0];
        subrows.forEach((subrow, i) => {
            const id = `${data.id}-${subIds[i]}`;
            fragment.appendChild(constructTableSubrow(tableId, id, subrow, row.length, noSubtableCheckbox));
            tree[data.id].max = Math.max(tree[data.id].max, i);
            tree[data.id].children.add(id);
        });
        return [fragment, newRow];
    }
    function createSubrow(subdata, rowId) {
        const subrow = dataParserSubrow(subdata);
        const id = `${rowId}-${subdata.id}`;
        const tr = constructTableSubrow(tableId, id, subrow, rowLength, noSubtableCheckbox);
        tree[rowId].children.add(id);
        return tr;
    }
    function parseRowId(row) {
        if (isSubrow(row)) {
            return Number(row.id.split('-').at(-2));
        }
        return Number(row.id.split('-').at(-1));
    }

    const scroller = cssGetId(tableId).lastElementChild;
    const table = scroller.children[0].lastElementChild;
    let scrollPosition = 0;
    const operations = {
        length: () => api.length(),
        init: () => {
            // Construct rows of table
            const fragment = document.createDocumentFragment();
            let maxId = -1;
            for (const data of api.getAll()) {
                fragment.appendChild(createRowAndSubrows(data)[0]);
                maxId = Math.max(data.id, maxId);
            }
            table.replaceChildren(fragment);
            AUTOINCREMENT[tableId] = maxId;
            scroller.scrollTop = scrollPosition;

            // Show already-checked subrows & refresh checkbox restrictions
            const rowsToShow = Array.from(SUBROW_SELECTION[tableId] ?? []).map(id => id.slice('-')[0]);
            if (rowsToShow.length > 0) {
                toggleRowSelectionEnabled(false, tableId);
                for (const id of new Set(rowsToShow)) {
                    toggleCellDetails(cssGetFirst(`#${tableId}-${id} .cell-details-button`));
                }
            } else if (ROW_SELECTION[tableId]?.size > 0) {
                toggleSubrowSelectionEnabled(false, tableId);
            }
        },
        reorder: (list) => {
            scrollPosition = scroller.scrollTop;

            const newList = [];
            const sublists = [];

            let sublist = [];
            for (const row of cssGetFirst(`#${tableId} tbody`).children) {
                if (isSubrow(row)) {
                    if (noSubtableCheckbox)
                        continue;
                    const [rowId, subrowId] = row.id.split('-').slice(-2).map(Number);
                    sublist.push(api.getSubrow(rowId, subrowId));
                } else {
                    if (sublist.length > 0 && !noSubtableCheckbox) {
                        sublists.push(sublist);
                        sublist = [];
                    }
                    newList.push(api.get(parseRowId(row)));
                }
            }
            sublists.push(sublist);
            api.resetData(newList, noSubtableCheckbox ? undefined : sublists);
        },
        rowAdd: (row, copyRow) => {
            AUTOINCREMENT[tableId] += 1;
            const id = AUTOINCREMENT[tableId];

            const data = structuredClone(copyRow ? api.get(parseRowId(row)) : templateData);
            data.id = id;
            api.insert(data);
            const [fragment, tr] = createRowAndSubrows(data);

            if (row) {
                const anchor = table.children[row.sectionRowIndex + tree[parseRowId(row)].children.size];
                anchor.after(fragment);
            } else {
                table.appendChild(fragment);
            }

            if (!noSubtableCheckbox) {
                toggleCellDetails(tr.querySelector('.cell-details img[src="assets/icons/hide.svg"]'));
            }
            tr.scrollIntoView({ behavior: 'smooth', block: 'center' });
        },
        rowDelete: (ids) => {
            const err = deleteChecker?.(ids);
            if (err)
                return err;

            for (const id of ids) {
                for (const childId of tree[id].children) {
                    cssGetId(`${tableId}-${childId}`).remove();
                }
                delete tree[id];

                cssGetId(`${tableId}-${id}`).remove();
                api.delete(id);
                ROW_SELECTION[tableId].delete(id);
                if (AUTOINCREMENT[tableId] === Number(id)) {
                    AUTOINCREMENT[tableId] -= 1;
                }
            }
            toggleSubrowSelectionEnabled(true, tableId);
        },
        rowEdit: (elements) => {
            for (const tr of elements) {
                const row = Array.from(tr.children).slice(1);
                const id = parseRowId(tr);
                const subIds = Array.from(tree[id].children);
                const subrows = subIds.map(subId => {
                    const subrow = cssGetId(`${tableId}-${subId}`);
                    return subrow.querySelector('.subtable').lastElementChild;
                });
                rowSyncer(id, row, subIds, subrows);
            }
        },
        rowMoveToEnd: (moveTop) => {
            const fragment = document.createDocumentFragment();
            let lastRow;
            Array.from(ROW_SELECTION[tableId])
                .map(id => cssGetId(`${tableId}-${id}`))
                .sort((a, b) => a.sectionRowIndex - b.sectionRowIndex)
                .forEach((x, i, arr) => {
                    if (i === arr.length - 1) {
                        lastRow = x;
                    }
                    fragment.appendChild(x);
                    for (const y of tree[parseRowId(x)].children) {
                        fragment.appendChild(cssGetId(`${tableId}-${y}`));
                    }
                });
            if (moveTop) {
                table.prepend(fragment);
                table.children[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                table.appendChild(fragment);
                lastRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        },
        rowMove: (moveUp) => {
            const rows = Array.from(ROW_SELECTION[tableId])
                .map(id => cssGetId(`${tableId}-${id}`))
                .sort((a, b) => a.sectionRowIndex - b.sectionRowIndex);
            const notMoved = new Set(rows.map(x => x.id));

            if (moveUp) {
                for (let i = 0; i < rows.length; i++) {
                    const rowId = parseRowId(rows[i]);
                    const prevTr = table.children[rows[i].sectionRowIndex - 1];
                    if (!prevTr) continue;
                    const prev = cssGetId(`${tableId}-${parseRowId(prevTr)}`);

                    if (!notMoved.has(prev.id)) {
                        const fragment = document.createDocumentFragment();
                        fragment.appendChild(rows[i]);
                        for (const id of tree[rowId].children) {
                            fragment.appendChild(cssGetId(`${tableId}-${id}`));
                        }

                        prev.before(fragment);
                        notMoved.delete(prev.id);
                    }
                }
            } else {
                for (let i = rows.length - 1; i >= 0; i--) {
                    const rowId = parseRowId(rows[i]);
                    
                    let next = table.children[rows[i].sectionRowIndex + tree[rowId].children.size + 1];
                    if (!next) continue;
                    const nextId = next.id;
                    next = table.children[next.sectionRowIndex + tree[parseRowId(next)].children.size];
                    
                    if (next && !notMoved.has(nextId)) {
                        const fragment = document.createDocumentFragment();
                        fragment.appendChild(rows[i]);
                        for (const id of tree[rowId].children) {
                            fragment.appendChild(cssGetId(`${tableId}-${id}`));
                        }

                        next.after(fragment);
                        notMoved.delete(nextId);
                    }
                }
            }
            const middle = Math.floor(rows.length / 2);
            rows[middle].scrollIntoView({ behavior: 'smooth', block: 'center' });
        },
        subrowAdd: (subrow, copySubrow) => {
            let [rowId, copiedSubrowId] = subrow.id.split('-').slice(-2).map(Number);
            const subdata = structuredClone(copySubrow ? api.getSubrow(rowId, copiedSubrowId) : templateSubdata);
            
            // When deleting the last subrow, it is re-added, so a row is passed into `subrow`
            // So `[rowId, copiedSubrowId] = [NaN, actualRowId]`
            if (!copySubrow && isNaN(rowId)) {
                rowId = copiedSubrowId;
            }

            tree[rowId].max += 1;
            const newId = tree[rowId].max;
            subdata.id = newId;
            api.insertSubrow(rowId, subdata);

            const tr = createSubrow(subdata, rowId);
            subrow.after(tr);
            cssSetElement(tr, { display: subrow.style.display });
            tr.scrollIntoView({ behavior: 'smooth', block: 'center' });  
        },
        subrowDelete: (ids) => {
            for (const id of ids) {
                const [rowId, subrowId] = id.split('-').map(Number);
                cssGetId(`${tableId}-${id}`).remove();
                SUBROW_SELECTION[tableId].delete(id);
                api.deleteSubrow(rowId, subrowId);

                tree[rowId].children.delete(id);
                if (subrowId === tree[rowId].max) {
                    tree[rowId].max -= 1;
                }

                // If no subrows remain after deletion, create a blank one
                if (tree[rowId].children.size === 0) {
                    operations.subrowAdd(cssGetId(`${tableId}-${rowId}`));
                }
            }
            toggleRowSelectionEnabled(true, tableId);
        },
        subrowEdit: (elements) => {
            for (const tr of elements) {
                const [id, subId] = tr.id.split('-').slice(-2).map(Number);
                const subrow = tr.querySelector('.subtable').lastElementChild;
                rowSyncer(id, undefined, subId, subrow);
            }
        },
        subrowMoveToEnd: (moveTop) => {
            const fragments = {};
            Array.from(SUBROW_SELECTION[tableId])
                .map(id => cssGetId(`${tableId}-${id}`))
                .sort((a, b) => a.sectionRowIndex - b.sectionRowIndex)
                .forEach(x => {
                    const rowId = parseRowId(x);
                    if (!fragments[rowId]) {
                        fragments[rowId] = document.createDocumentFragment();
                    }
                    fragments[rowId].appendChild(x);
                });

            for (const rowId in fragments) {
                const row = cssGetId(`${tableId}-${rowId}`);
                const fragment = fragments[rowId];
                if (moveTop) {
                    row.after(fragment);
                } else {
                    const nextId = Number(rowId) + 1;
                    if (tree[nextId]) {
                        cssGetId(`${tableId}-${nextId}`).before(fragment);
                    } else {
                        table.appendChild(fragment);
                    }
                }
            }
            const row = cssGetId(`${tableId}-${Array.from(SUBROW_SELECTION[tableId])[0]}`);
            row.scrollIntoView({ behavior: 'smooth', block: 'center' });
        },
        subrowMove: (moveUp) => {
            const rows = Array.from(SUBROW_SELECTION[tableId])
                .map(id => cssGetId(`${tableId}-${id}`))
                .sort((a, b) => a.sectionRowIndex - b.sectionRowIndex);
            const notMoved = new Set(rows.map(x => x.id));

            if (moveUp) {
                for (let i = 0; i < rows.length; i++) {
                    const prev = table.children[rows[i].sectionRowIndex - 1];
                    if (prev && isSubrow(prev) && !notMoved.has(prev.id)) {
                        prev.before(rows[i]);
                        notMoved.delete(prev.id);
                    }
                }
            } else {
                for (let i = rows.length - 1; i >= 0; i--) {
                    const next = table.children[rows[i].sectionRowIndex + 1];
                    if (next && isSubrow(next) && !notMoved.has(next.id)) {
                        next.after(rows[i]);
                        notMoved.delete(next.id);
                    }
                }
            }
            const middle = Math.floor(rows.length / 2);
            rows[middle].scrollIntoView({ behavior: 'smooth', block: 'center' });
        },
    };
    operations.init();
    return operations;
}


/*********************************************************************
Data injection - Bulletin
*********************************************************************/
function getTemplateDateString(showHourSecond) {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    if (showHourSecond) {
        return `${y}-${m}-${d}|00:00`;
    }
    return `${y}-${m}-${d}`;
}

function constructAnnouncements() {
    const ymd = getTemplateDateString();
    const template = {
        type: 'alert',
        text: 'Placeholder',
        from: ymd,
        until: ymd,
    }

    const dataParser = (x) => [{
        element: 'td',
        children: [{
            element: 'img',
            attributes: {
                src: `assets/icons/${x.type === 'alert' ? 'alert-triangle.svg' : 'megaphone.svg'}`,
                onclick: 'toggleAnnouncementType(this)',
            },
            classes: ['table-announcements-icon'],
        }]
    }, {
        element: 'td',
        children: createInputsStartEnd(x, 'date', 'from', 'until')
    }, {
        element: 'td',
        attributes: INPUT_ATTRIBUTES.defaultRichText,
        innerHTML: x.text
    }];

    const rowSyncer = (id, tds) => {
        API.ANNOUNCEMENTS.set(id, {
            type: tds[0].children[0].src.endsWith('alert-triangle.svg') ? 'alert' : 'announcement',
            text: tds[2].innerHTML.trim(),
            from: tds[1].children[0].children[0].value,
            until: tds[1].children[1].children[0].value
        })
    }
    
    return constructTable('table-announcements', API.ANNOUNCEMENTS, template, dataParser, rowSyncer);
}
function constructUpcomingEvents() {
    const ymd = getTemplateDateString();
    const template = {   
        location: 'Placeholder',
        from: ymd,
        until: ymd,
        image: 'assets/images/locations/???.webp'
    }

    const dataParser = (x) => [{
        element: 'td',
        children: [createInputText(
            'assets/icons/events-filled.svg',
            'Select by name...',
            API.EVENTS.get(x.eventId)?.name ?? '',
            x.id,
            'event'
        )]
    }, {
        element: 'td',
        children: createInputsStartEnd(x, 'date', 'from', 'to')
    }, {
        element: 'td',
        attributes: INPUT_ATTRIBUTES.asset,
        innerText: x.image
    }];

    const rowSyncer = (id, tds) => {
        const eventId = tds[0].children[0].children[0].children[1].value;
        API.UPCOMING_EVENTS.set(id, {
            eventId: eventId ? Number(eventId) : undefined,
            from: tds[1].children[0].lastElementChild.value,
            until: tds[1].children[1].lastElementChild.value,
            image: tds[2].innerText
        })
    }

    return constructTable('table-upcoming-events', API.UPCOMING_EVENTS, template, dataParser, rowSyncer);
}
function constructCurrentEvent() {
    const currentEvent = getCurrentEvent();
    const event = API.EVENTS.get(currentEvent.id);
    const { rvsp, tickets, hideBefore, hideAfter, location, preConcertDescription, postConcertDescription } = currentEvent;

    const container = cssGetId('current-event-id');
    const input = container.children[0].lastElementChild;
    input.previousElementSibling.value = currentEvent.id ?? '';
    input.value = event?.name ?? '';

    if (hideBefore) { cssGetId('current-event-visible-from').value = hideBefore.replace('|', 'T'); }
    if (hideAfter) { cssGetId('current-event-visible-until').value = hideAfter.replace('|', 'T'); }
    cssGetId('current-event-location').innerText = location;
    cssGetId('current-event-tickets').innerText = tickets;
    cssGetId('current-event-rvsp').innerText = rvsp;
}


/*********************************************************************
Data injection - FAQ table
*********************************************************************/
function constructFaq() {
    const template = {
        q: 'Placeholder',
        a: ['Placeholder']
    };

    const dataParser = ({q, a}) => [{
        element: 'td',
        children: [{
            element: 'div',
            classes: ['table-faq-q'],
            attributes: INPUT_ATTRIBUTES.default,
            innerText: q
        }, {
            element: 'div',
            classes: ['table-faq-a'],
            attributes: INPUT_ATTRIBUTES.multiline,
            innerHTML: a.join("<br>")
        }]
    }];

    const rowSyncer = (id, tds) => {
        API.FAQ.set(id, {
            q: tds[0].children[0].innerText,
            a: parseInnerHTML(tds[0].children[1].innerHTML)
        });
    }
    
    return constructTable('table-faq', API.FAQ, template, dataParser, rowSyncer);
};


/*********************************************************************
Data injection - Members table
*********************************************************************/
function constructMembers() {
    const instruments = API.INSTRUMENTS.getAll();
    const roles = API.ROLES.getAll();

    const now = new Date();
    const templateSeason = `${now.getMonth() > 5 ? 'Fall' : 'Winter'} ${now.getFullYear()}`;
    const template = {
        name: "John LMC",
        joined: templateSeason,
        left: '',
        instruments: [],
        roles: [],
        links: []
    };

    const dataParser = (x) => {
        const tags = [...x.instruments?.map(i => instruments[i]) ?? [], ...x.roles?.map(i => roles[i]) ?? []];
        const links = x.links?.map(y => capitalize(y[0])) ?? [];
        return [{
            element: 'td',
            attributes: INPUT_ATTRIBUTES.default,
            innerText: x.name
        }, {
            element: 'td',
            children: [createInputSeason(x.joined ?? '')]
        }, {
            element: 'td',
            children: [createInputSeason(x.left ?? '', true)]
        }, {
            element: 'td',
            children: [createInputModalOpener('openModalMemberTags(this)', tags)]
        }, {
            element: 'td',
            children: [createInputModalOpener('openModalMemberLinks(this)', links)]
        }]
    };

    const rowSyncer = (id, tds) => {
        const joinedContainer = tds[1].children[0];
        const joinedYear = joinedContainer.lastElementChild.children[0].children[0].value;
        const joinedSeason = joinedContainer.children[0].value;
        const leftContainer = tds[2].children[0];
        const leftSeason = leftContainer.children[0].value;
        const leftYear = leftContainer.lastElementChild.children[0].children[0].value;
        
        API.MEMBERS.set(id, {
            name: tds[0].innerText,
            joined: `${joinedSeason} ${joinedYear}`,
            left: leftSeason && leftYear ? `${leftSeason} ${leftYear}` : "",
        })
    }

    const deleteChecker = (ids) => {
        for (const [, , x, p] of API.MUSIC.iterateSubrows()) {
            const performers = new Set(Object.values(p.performers).flat());
            const arrangers = new Set(p.arrangers);
            for (const id of ids.map(Number)) {
                if (performers.has(id)) {
                    return `Cannot delete members who have performed (${API.MEMBERS.get(id).name} // ${x.name})`;
                } else if (arrangers.has(id)) {
                    return `Cannot delete members who have arranged (${API.MEMBERS.get(id).name} // ${x.name})`;
                }
            }
        }
    }

    return constructTable('table-members', API.MEMBERS, template, dataParser, rowSyncer, deleteChecker);
}


/*********************************************************************
Data injection - Music table
*********************************************************************/
function getPerformerNames(performers) {
    const uniquePerformers = new Set(Object.values(performers).flat());
    return Array.from(uniquePerformers).map(x => API.MEMBERS.get(x)?.name ?? x);
}

function constructMusicTable() {
    const mediaOrigins = ['', 'Anime', 'Video Game', 'Vocaloid'];
    const songTypes = ['Large Ensemble', 'Small Ensemble', 'External Group'];

    const template = {
        name: "Placeholder",
        composer: "Placeholder",
        performances: [{
            concerts: [],
            performers: {},
            songType: 'Small',
            id: 0
        }]
    };

    const dataParserSubrow = (p) => {
        const arrangers = p.arrangers?.map(a => {
            const name = API.MEMBERS.get(a)?.name;
            return name ? [a, name] : [undefined, a];
        }) ?? [];
        const concerts = p.concerts?.map(c => {
            const name = API.EVENTS.get(c)?.name;
            return name ? [c, name] : [undefined, c]; // temporarily accept arbitary strings until data is fixed
        }) ?? [];
        const performerNames = getPerformerNames(p.performers ?? {});
        const songType = p.songType === 'Large' ? 'Large Ensemble' : p.songType === 'Small' ? 'Small Ensemble' : 'External Group';
        return createDatalist([
            ['Concerts', {
                element: 'td',
                children: [createInputTags(concerts, 'Enter event...', 'event')]
            }],
            ['Online Recording', {
                element: 'td',
                attributes: INPUT_ATTRIBUTES.default,
                innerText: p.link
            }],
            ['Sheet Music', {
                element: 'td',
                attributes: INPUT_ATTRIBUTES.default,
                innerText: p.sheetMusic
            }],
            ['Song Type', {
                element: 'td',
                children: [createDropdown(songType, songTypes)]
            }],
            ['Arranger(s)', {
                element: 'td',
                children: [createInputTags(arrangers, 'Enter arranger...', 'arranger')]
            }],
            ['Group Name', {
                element: 'td',
                attributes: INPUT_ATTRIBUTES.default,
                innerText: p.group
            }],
            ['Performer(s)', {
                element: 'td',
                children: [createInputModalOpener('openModalPerformancePerformers(this)', performerNames)]
            }]
        ]);
    }

    const dataParser = (x) => {
        const performances = Array.from(x.performances.values());
        const performanceTimes = performances
            .map(p => p.concerts.map(c => API.EVENTS.get(c)?.start?.slice(0, 7) ?? c))
            .flat();
        const row = [{
            element: 'td',
            attributes: INPUT_ATTRIBUTES.default,
            innerText: x.name
        }, {
            element: 'td',
            attributes: INPUT_ATTRIBUTES.default,
            innerText: x.composer
        }, {
            element: 'td',
            attributes: INPUT_ATTRIBUTES.default,
            innerText: x.from
        }, {
            element: 'td',
            children: [createDropdown(x.mediaOrigin || '', mediaOrigins)]
        }, {
            element: 'td',
            children: [createInputSubrowOpener(performanceTimes)]
        }, {
            element: 'td',
            attributes: INPUT_ATTRIBUTES.links,
            innerHTML: x.references.join("<br>")
        }];

        const subrows = performances.map(dataParserSubrow);
        return [row, subrows];
    };

    const rowSyncer = (id, row, subIds, subrows) => {
        if (row) {
            API.MUSIC.set(id, {
                name: row[0].innerText,
                composer: row[1].innerText,
                from: row[2].innerText,
                mediaOrigin: row[3].children[0].value,
                references: row[5].innerHTML.split("<br>"),
            });
        } else {
            const prev = new Set(API.MUSIC.getAllSubrows(id).map(x => x.concerts).flat());
            
            const trs = subrows.children[0].children;
            const concertTags = trs[0].lastElementChild.children[0];
            const arrangerTags = trs[4].lastElementChild.children[0];
            const concerts = Array.from(concertTags.children).slice(0, -1).map(x => extractId(x.children[1].innerText));
            const arrangers = Array.from(arrangerTags.children).slice(0, -1).map(x => extractId(x.children[1].innerText));
            
            API.MUSIC.setSubrow(id, subIds, {
                id: subIds,
                concerts,
                songType: trs[3].lastElementChild.children[0].value,
                sheetMusic: trs[2].lastElementChild.innerText,
                arrangers,
                link: trs[1].lastElementChild.innerText,
                group: trs[5].lastElementChild.innerText,
            });

            const curr = new Set(concerts);
            for (const toAdd of curr.difference(prev)) {
                API.EVENTS.addToSetlist(toAdd, id);
            }
            for (const toRemove of prev.difference(curr)) {
                API.EVENTS.removeFromSetlist(toRemove, id);
            }
        }
    }

    return constructTableWithSubrows(
        'table-music',
        API.MUSIC,
        template,
        template.performances[0],
        dataParser,
        dataParserSubrow,
        rowSyncer
    );
}


/*********************************************************************
Data injection - Event table
*********************************************************************/
// Keep in sync with the function in index.js
function parseEventLink(link) {
    let linkType;
    if (link?.startsWith('https://drive.google.com/embeddedfolderview?id=')) {
        linkType = 'embed-drive';
    } else if (link?.includes('drive.google.com')) {
        linkType = 'link-drive';
    } else if (link?.startsWith('https://www.youtube.com/embed/')) {
        linkType = 'embed-youtube';
    } else if (link?.includes('youtube') || link?.includes('youtu.be')) {
        linkType = 'link-youtube';
    } else if (link) {
        linkType = 'link';
    }
    return linkType;
}

function constructEventTable() {
    const ymdhs = getTemplateDateString(true);
    const template = {
        type: "Concert",
        name: "Placeholder",
        start: ymdhs,
        end: ymdhs,
        setlist: []
    };

    const eventTypes = ['Concert', 'Workshop', 'Other', 'External'];

    const dataParser = (x) => {
        const linkType = parseEventLink(x.link);
        const noSetlist = !x.setlist || x.setlist.length === 0;
        const noSetlistMessage = `'${x.name}' has no setlist. Add songs to it first in the music tab.`;
        const row = [{
            element: 'td',
            children: [createDropdown(x.type, eventTypes)]
        }, {
            element: 'td',
            attributes: INPUT_ATTRIBUTES.default,
            innerText: x.name
        }, {
            element: 'td',
            attributes: INPUT_ATTRIBUTES.default,
            innerText: x.location
        }, {
            element: 'td',
            children: createInputsStartEnd(x, 'datetime-local', 'start', 'end')
        }, {
            element: 'td',
            children: [createInputModalOpener('openModalConcertSetlist(this)', undefined, noSetlist, noSetlistMessage)]
        }, {
            element: 'td',
            children: [createInputSubrowOpener()]
        }, {
            element: 'td',
            attributes: INPUT_ATTRIBUTES.default,
            innerText: x.poster
        }, {
            element: 'td',
            attributes: INPUT_ATTRIBUTES.eventLink,
            classes: linkType ? ['td-link', `td-link-${linkType}`] : [],
            innerText: x.link
        }];
        
        const subrows = [{
            element: 'div',
            attributes: INPUT_ATTRIBUTES.multiline,
            innerHTML: x.description.join("<br>")
        }];

        return [row, subrows];
    };

    const rowSyncer = (id, row, subIds, subrows) => {
        if (row) {
            API.EVENTS.set(id, {
                type: row[0].children[0].value,
                name: row[1].innerText,
                location: row[2].innerText,
                start: row[3].children[0].lastElementChild.value.replace('T', '|'),
                end: row[3].lastElementChild.lastElementChild.value.replace('T', '|'),
                poster: row[6].innerText,
                link: row[7].innerText,
            });
        } else {
            API.EVENTS.set(id, { description: parseInnerHTML(subrows.innerHTML) });
        }
    }

    const deleteChecker = (ids) => {
        for (const [, , , p] of API.MUSIC.iterateSubrows()) {
            const concerts = new Set(Object.values(p.concerts));
            for (const id of ids.map(Number)) {
                if (concerts.has(id)) {
                    return `Cannot delete events with performances (${API.EVENTS.get(id).name} // ${x.name})`;
                }
            }
        }
    }

    return constructTableWithSubrows(
        'table-events',
        API.EVENTS,
        template,
        undefined,
        dataParser,
        undefined,
        rowSyncer,
        deleteChecker
    );
}


/*********************************************************************
Data injection - Tags tab
*********************************************************************/
function getTagColourStyle(name) {
    name = parseRole(name);
    const rgbs = getTag(name);
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
function parseRole(role) {
    const i = role.lastIndexOf('(');
    if (i === -1) {
        return role.trim();
    }
    return role.slice(0, i).trim();
}
function constructTagTab() {
    const members = API.MEMBERS.getAll();
    const instruments = API.INSTRUMENTS.getAll();
    const roles = Array.from(new Set(API.ROLES.getAll().map(parseRole)));

    const tags = [...instruments, ...roles];
    const tagPreviewsInstruments = cssGetId('tag-previews-instruments');
    const tagPreviewsRoles = cssGetId('tag-previews-roles');
    const fragment = document.createDocumentFragment();
    for (const [data, container] of [[instruments, tagPreviewsInstruments], [roles, tagPreviewsRoles]]) {
        data.forEach((tag, i) => {
            fragment.appendChild(construct({
                element: 'li',
                innerText: tag,
                attributes: { onclick: "selectTag(this)" },
                style: getTagColourStyle(tag)
            }));
        })
        container.replaceChildren(fragment);
    }
    const firstTag = tagPreviewsInstruments.children[0];
    if (firstTag) {
        firstTag?.classList.add('tag-preview-active');
        selectTag(firstTag, true);
    }
}

const TABLE_OPERATIONS = {};


/*********************************************************************
Data injection - Modals
*********************************************************************/
let MODAL_INFO;
function getRowId(element) {
    let ids = (element.closest('.subtable-row') || element.closest('tr')).id.split('-');    
    ids = ids.slice(-2).map(x => parseInt(x, 10));
    if (!isNaN(ids[0]) && !isNaN(ids[1])) {
        MODAL_INFO = ids;
        return ids;
    }
    MODAL_INFO = ids[1];
    return ids[1];
}
function openModalMemberTags(element) {
    openModal('modal-member-tags');

    const id = getRowId(element);
    const member = API.MEMBERS.get(id);
    const instruments = API.INSTRUMENTS.getAll();
    const roles = API.ROLES.getAll();

    // Title
    cssGetFirst('#modal-member-tags h2 span').innerText = `for ${member.name}`;

    // Instruments
    let container = cssGetId('datalist-member-instruments');
    let fragment = document.createDocumentFragment();
    for (const id of member.instruments) {
        fragment.appendChild(construct(createInputTag(instruments[id], id, true)));
    }
    container.replaceChildren(fragment);

    // Roles
    container = cssGetId('datalist-member-roles');
    fragment = document.createDocumentFragment();
    for (const id of member.roles ?? []) {
        fragment.appendChild(construct(createInputTag(roles[id], id, true)))
    }
    container.replaceChildren(fragment);
}

function createEditableRowTd(text) {
    return {
        element: 'td',
        attributes: {
            ...INPUT_ATTRIBUTES.default,
            onkeydown: 'keyDownTd(event)',
            onblur: `${INPUT_ATTRIBUTES.default.onblur}; blurTd(this)`
        },
        innerText: text
    }
}

function openModalMemberLinks(element) {
    openModal('modal-member-links');

    const id = getRowId(element);
    const member = API.MEMBERS.get(id);
    const instruments = API.INSTRUMENTS.getAll();
    const socialMediaOptions = ['Bandcamp', 'Discord', 'Instagram', 'LinkedIn', 'Musescore', 'Spotify', 'Soundcloud', 'Youtube'];

    // Title
    cssGetFirst('#modal-member-links h2 span').innerText = `for ${member.name}`;

    // Links
    const datalist = cssGetFirst('#datalist-modal-member-links tbody');
    const fragment = document.createDocumentFragment();
    for (const [socialMedia, username, url] of member.links ?? []) {
        fragment.appendChild(construct({
            element: 'tr',
            children: [{
                element: 'td',
                children: [X_BUTTON]
            }, {
                element: 'td',
                children: [createDropdown(capitalize(socialMedia), socialMediaOptions)]
            }, createEditableRowTd(username), createEditableRowTd(url)]
        }));
    }

    // Placeholder new row
    fragment.appendChild(construct({
        element: 'tr',
        classes: ['modal-datalist-preview'],
        children: [{
            element: 'td',
            children: [X_BUTTON]
        }, {
            element: 'td',
            children: [createDropdown(undefined, socialMediaOptions)]
        }, createEditableRowTd(''), createEditableRowTd('')]
    }));
    datalist.replaceChildren(fragment);
}
function openModalPerformancePerformers(element) {
    openModal('modal-performance-performers');

    const instruments = API.INSTRUMENTS.getAll();
    const [id, subId] = getRowId(element);
    const { name } = API.MUSIC.get(id);
    const performers = API.MUSIC.getSubrow(id, subId).performers;
    
    // Title
    cssGetFirst('#modal-performance-performers h2 span').innerText = `for ${name}`;

    // Performer
    const table = cssGetFirst('#modal-performance-performers tbody');
    const fragment = document.createDocumentFragment();
    for (const [instrumentId, memberIds] of Object.entries(performers)) {
        const names = memberIds.map(id => {
            const name = API.MEMBERS.get(id)?.name;
            return name ? [id, name] : [undefined, id]
        });

        fragment.appendChild(construct({
            element: 'tr',
            children: [{
                element: 'td',
                children: [X_BUTTON]
            }, {
                element: 'td',
                children: [createInputText(
                    'assets/icons/music-note.svg',
                    'Enter instrument...',
                    instruments[instrumentId],
                    instrumentId,
                    'instrument'
                )]
            }, {
                element: 'td',
                children: [createInputTags(names, 'Enter performer...', 'performer')]
            }]
        }));
    }

    // Placeholder new row
    fragment.appendChild(construct({
        element: 'tr',
        classes: ['modal-datalist-preview'],
        children: [{
            element: 'td',
            children: [X_BUTTON]
        }, {
            element: 'td',
            children: [createInputText('assets/icons/music-note.svg', 'Enter instrument...', '', '', 'instrument')]
        }, {
            element: 'td',
            children: [createInputTags([], 'Enter performer...', 'member')]
        }]
    }));
    table.replaceChildren(fragment);
}
function openModalConcertSetlist(element) {
    openModal('modal-concert-setlist');

    const id = getRowId(element);
    const { name, setlist, video } = API.EVENTS.get(id);

    // Title
    cssGetFirst('#modal-concert-setlist h2 span').innerText = `for ${name}`;

    // Setlist
    const table = cssGetFirst('#concert-setlist tbody');
    const fragment = document.createDocumentFragment();
    let songType = video ? 'timestamps' : undefined;
    setlist?.forEach((info, i) => {
        let songId = info;
        let songInfo;
        if (Array.isArray(info)) {
            [songId, songInfo] = info;
            if (typeof songInfo === 'string') {
                songType = 'videos';
            } else {
                songType = 'timestamps';
                songInfo = secondsToTimestamp(songInfo);
            }
        }
        const n = Math.max(2, String(setlist.length).length);
        const index = String(i + 1).padStart(n, '0');

        fragment.appendChild(construct({
            element: 'tr',
            children: [{
                element: 'td',
                attributes: {
                    draggable: 'true',
                    ondragstart: 'onDragStart(this)',
                    ondragend: 'onDragEnd(this)',
                    ondragenter: 'onDragEnter(this)',
                    ondragleave: 'onDragLeave(this)',
                    ondragover: 'onDragOver(event)',
                    ondrop: 'onDrop(this)'
                },
                children: [{
                    element: 'img',
                    attributes: { src: 'assets/icons/draggable.svg' }
                }]
            }, {
                element: 'td',
                children: [{
                    element: 'span',
                    innerText: index
                }, {
                    element: 'span',
                    classes: ['setlist-id'],
                    innerText: songId
                }]
            }, {
                element: 'td',
                innerText: API.MUSIC.get(songId).name
            }, {
                element: 'td',
                classes: ['concert-setlist-timestamp'],
                attributes: INPUT_ATTRIBUTES.timestamp,
                innerText: songType === 'timestamps' ? songInfo : ''
            }, {
                element: 'td',
                classes: ['concert-setlist-song-video'],
                attributes: INPUT_ATTRIBUTES.default,
                innerText: songType === 'videos' ? songInfo : ''
            }]
        }))
    });
    table.replaceChildren(fragment);

    // Video
    if (songType === 'timestamps') {
        cssGetId(`concert-setlist-type-one-video`).onclick();
    } else if (songType === 'videos') {
        cssGetId(`concert-setlist-type-videos`).onclick();
    } else {
        cssGetId(`concert-setlist-type-no-video`).onclick();
    }
    cssGetFirst('#concert-setlist-video input').value = video || '';
}


/*********************************************************************
Sync modals
*********************************************************************/
function syncModalMemberTags() {
    // Roles
    const datalist = cssGetId('datalist-member-roles');
    const validation = datalist.nextElementSibling;
    const [roles, newRoles] = parseTaglist(datalist);
    for (const role of newRoles) {
        if (!/^[^\(\)]+( \(\d\d(\/\d\d)*\))?$/.test(role)) {
            validation.innerText = `Invalid role '${role}'. Brackets may only be used to indicate years, e.g. role (23) or role (24/25/26)`;
            cssSetElement(validation, { display: 'block' });
            return;
        }
    }
    cssSetElement(validation, { display: 'none' });
    for (const x of newRoles) {
        const i = API.ROLES.add(x);
        roles.push(i);
    };

    // Instruments
    const [instruments, newInstruments] = parseTaglist(cssGetId('datalist-member-instruments'));
    for (const x of newInstruments) {
        const i = API.INSTRUMENTS.add(x);
        instruments.push(i);
    };

    // Sync data
    API.MEMBERS.set(MODAL_INFO, { instruments, roles });

    // Update row cell
    const allInstruments = API.INSTRUMENTS.getAll();
    const allRoles = API.ROLES.getAll();
    const items = [...instruments.map(i => allInstruments[i]), ...roles.map(i => allRoles[i])];
    refreshInputModalOpener(cssGetId(`table-members-${MODAL_INFO}`).children[4], items);

    closeModals();
}
function syncModalMemberLinks() {
    // Extract links
    const links = [];
    const datalist = cssGetId('datalist-modal-member-links');
    const validation = datalist.parentElement.nextElementSibling;
    for (const tr of datalist.children[0].children) {
        if (tr.classList.contains('modal-datalist-preview')) {
            continue;
        }
        const socialMedia = tr.children[1].children[0].value.toLowerCase();
        const username = tr.children[2].innerText;
        const link = tr.children[3].innerText;
        if (!username) {
            validation.innerText = 'There is a row with no username specified.'
            cssSetElement(validation, { display: 'block' });
            return;
        }
        links.push([socialMedia, username, link]);
    }
    cssSetElement(validation, { display: 'none' });

    // Sync data
    API.MEMBERS.set(MODAL_INFO, { links });

    // Update row cell
    const items = links.map(x => capitalize(x[0]));
    refreshInputModalOpener(cssGetId(`table-members-${MODAL_INFO}`).children[5], items);

    closeModals();
}
function syncModalPerformancePerformers() {
    // Extract instruments & names
    const p = {};
    const newInstruments = new Set();
    const datalist = cssGetFirst('#modal-performance-performers .modal-datalist');
    const validation = datalist.parentElement.nextElementSibling;
    for (const tr of datalist.children[0].children) {
        if (tr.classList.contains('modal-datalist-preview')) {
            continue;
        }
        const div = tr.children[1].children[0].children[0];
        let instrument = parseInt(div.children[1].value, 10);
        if (isNaN(instrument)) {
            instrument = div.children[2].value;
            if (!instrument) {
                validation.innerText = 'There is a row with no instrument.';
                cssSetElement(validation, { display: 'block' });
                return;
            }
            newInstruments.add(instrument);
        }
        const [performers, newPerformers] = parseTaglist(tr.children[2].children[0]);
        if (performers.length === 0) {
            validation.innerText = 'There is a row with no performers.';
            cssSetElement(validation, { display: 'block' });
            return;
        }
        p[instrument] = performers;
        for (const x of newPerformers) {
            p[instrument].push(x);
        }
    }
    cssSetElement(validation, { display: '' });
    for (const x of newInstruments) {
        const i = API.INSTRUMENTS.add(x);
        p[i] = p[x];
        delete p[x];
    };

    // Sync data
    const [id, subId] = MODAL_INFO;
    API.MUSIC.setSubrow(id, subId, { performers: p });

    // Update new cell
    const items = getPerformerNames(p);
    const subtable = cssGetId(`table-music-${id}-${subId}`).lastElementChild.children[0];
    refreshInputModalOpener(subtable.lastElementChild.children[0].lastElementChild.lastElementChild, items);

    closeModals();
}
function syncModalConcertSetlist() {
    const mode = cssGetClass('concert-setlist-type-active')[0].id;
    const container = cssGetId('concert-setlist-video');
    const validation = container.parentElement.lastElementChild.previousElementSibling;

    // Extract video
    let video = mode === 'concert-setlist-type-one-video' ? container.lastElementChild.value : undefined;
    if (video) {
        const url = parseYoutubeVideo(video);
        if (url) {
            video = url;
        }
    }
    
    // Extract setlist
    const setlist = [];
    for (const tr of cssGetId('concert-setlist').children[0].children) {
        const id = Number(tr.children[1].children[1].innerText);

        let info;
        if (mode === 'concert-setlist-type-one-video') {
            const value = tr.children[3].innerText;
            if (value) {
                info = timestampToSeconds(value);
                if (!video) {
                    cssSetElement(validation, { display: 'block' });
                    validation.innerText = 'Video timestamps exist but no video link is given.';
                    return;
                }
            }
        } else if (mode === 'concert-setlist-type-videos') {
            info = tr.children[4].innerText;
            const url = parseYoutubeVideo(info);
            if (url) {
                info = url;
            }
        }
        setlist.push(info !== undefined && info !== '' ? [id, info] : id);
    }
    cssSetElement(validation, { display: '' });
    validation.innerText = '';

    // Sync data
    API.EVENTS.set(MODAL_INFO, { video, setlist });

    closeModals();
}