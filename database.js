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
        return `${m.padStart(2, '0')}:${s.padStart(2, '0')}`;
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



/*********************************************************************
Data
*********************************************************************/
function getDataApi(list) {
    const map = Object.fromEntries(list.map(x => [x.id, x]));
    return {
        getAll: () => Object.values(map),
        get: (id) => map[id],
        set: (data) => {
            map[data.id] = data;
        },
        delete: (id) => {
            delete map[id];
        }
    } 
} 
const MEMBERS_API = getDataApi(MEMBERS);
const EVENTS_API = getDataApi(EVENTS);
const ANNOUNCEMENTS_API = getDataApi(ANNOUNCEMENTS);
const UPCOMING_EVENTS_API = getDataApi(UPCOMING_EVENTS);
const FAQ_API = getDataApi(FAQ);
const MUSIC_API = (() => {
    // TODO: internally store performances as a map of IDs to objects
    const map = Object.fromEntries(MUSIC.map(x => [x.id, x]));
    return {
        getAll: () => Object.values(map),
        get: (id) => map[id],
        indexSubrow: (id, subId) => map[id].performances.findIndex(x => x.id === subId),
        set: (data) => {
            map[data.id] = data;
        },
        /**
         * - `data` the API-returned data to extract subrow data from
         * - `rowId` ID number of row that we append to
         * - `subrowID` new ID of subrow to append
         * - `copiedSubrowId` id of subrow to copy, if we're copying it
         */
        insertSubrow: (data, rowId, subrowId, copiedSubrowId) => {
            data = structuredClone(data);
            if (typeof copiedSubrowId === 'number') {
                data.performances = [data.performances.find(x => x.id === copiedSubrowId)];
            }
            assert(data.performances.length === 1, data.performances);
            const performance = data.performances[0];
            performance.id = subrowId;
            map[rowId].performances.push(performance);
        },
        delete: (id) => {
            delete map[id];
        },
        deleteSubrow: (id, subId) => {
            // Bad runtime complexity but we'll realistically never have >5 performances of the same song
            map[id].performances = map[id].performances.filter(x => x.id !== subId);
        }
    } 
})();

function getCurrentEvent() {
    return CURRENT_EVENT;
}
function getInstruments() {
    return INSTRUMENTS;
}
const indexInstrument = (() => {
    const instruments = Object.fromEntries(INSTRUMENTS.map((x, i) => [x, i]));
    return (x) => instruments[x];
})();
function getRoles() {
    return ROLES;
}
const indexRole = (() => {
    const roles = Object.fromEntries(ROLES.map((x, i) => [x, i]))
    return (x) => roles[x];
})()
function getTag(name) {
    return TAGS[name ?? cssGetClass('tag-preview-active')[0].innerText];
}
function setTag(source) {
    function setTagColour(element, rgb) {
        const color = rgb.reduce((a, b) => a + b) / 3 > 128 ? 'black' : 'white';
        cssSetElement(element, {
            'background': '',
            'background-color': `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`,
            'color': color
        });
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
        setTagColour(element, source.colour);
    } else {
        throw new Error();
    }
}
function getPerformerNames(performance) {
    const uniquePerformers = new Set(Object.values(performance.performers).flat());
    return Array.from(uniquePerformers).map(x => MEMBERS_API.get(x)?.name ?? x);
}


/*********************************************************************
Toggleables
*********************************************************************/
function setActiveClass(element, className) {
    const active = cssGetClass(className)[0];
    active.classList.remove(className);
    element.classList.add(className);
}

function toggleTab(event) {
    const id = `${event.srcElement.id.substring(4)}`;
    setActiveClass(cssGetId(`tab-${id}`), 'tab-active');
    setActiveClass(cssGetId(`nav-${id}`), 'nav-active');

    // Clear out page specific details
    TAG_COLOUR_CACHE = undefined;
}

// If event is given, turn off. Otherwise, toggle normally
function toggleModal(event) {
    if (event) {
        const modals = cssGetClass('modal');
        for (const element of modals) {
            if (element.contains(event.target)) {
                return;
            }
        }
        for (const element of modals) {
            cssSetElement(element, { display: 'none' });        
        }
    }
    const modalContainer = cssGetId('modal-container');
    const modalOn = modalContainer.style.display === 'flex';
    cssSetElement(modalContainer, { display: modalOn ? 'none' : 'flex' });
    return modalOn;
}
function openModalHelper(id) {
    toggleModal();
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
    setActiveClass(element, 'concert-setlist-types-active');
    
    const videoDisplay = element.id === 'concert-setlist-type-one-video' ? 'flex' : 'none';
    cssSetId('concert-setlist-one-video', { display: videoDisplay });

    const cellDisplay = element.id === 'concert-setlist-type-one-video' ? 'table-cell' : 'none';
    for (const element of cssGetClass('concert-setlist-timestamp')) {
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

    if (checked) {
        if (set.size === 0) {
            toggleSubrowSelectionEnabled(false, tableId);
        }
        set.add(rowId);
    } else {
        set.delete(rowId);
        if (set.size === 0) {
            toggleSubrowSelectionEnabled(true, tableId);
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
    for (const row of cssGetAll(`#${tableId} > div > table > tbody > tr:not(.subtable-row) > td:first-child > input`)) {
        row.disabled = !on;
    }
}
function toggleSubrowSelectionEnabled(on, tableId) {
    for (const row of cssGetAll(`#${tableId} .subtable > li > input:first-child`)) {
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
    TABLE_OPERATIONS[tableId][isSubrow ? 'subrowDelete' : 'rowDelete'](ids);
    updateTableToolbar(isSubrow ? SUBROW_SELECTION : ROW_SELECTION, tableId);
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
Colour picker widget
*********************************************************************/
document.addEventListener('mousemove', onMouseMove);
document.addEventListener('mousedown', () => onMouseDown(true));
document.addEventListener('mouseup', () => onMouseDown(false));

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
}
function onMouseDown(down) {
    MOUSE_DOWN = down;
    if (!down) {
        PICKER_MODE = undefined;
    }
}

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
    active.classList.remove('tag-preview-active');
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

    // Refresh setlist numbers
    const n = Math.max(2, String(tbody.children.length).length);
    for (let i = 0; i < tbody.children.length; i++) {
        tbody.children[i].children[1].innerText = String(i + 1).padStart(n, '0');
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
    let nameGetter = x => x.name
    if (input.classList.contains('input-type-event')) {
        candidates = EVENTS_API.getAll().toSorted((a, b) => b.start.localeCompare(a.start));
        infoGetter = x => [x.id, x.start.slice(0, x.start.lastIndexOf('-'))];

    } else if (input.classList.contains('input-type-concert')) {
        candidates = EVENTS_API.getAll().filter(x => x.type === 'Concert').toSorted((a, b) => b.start.localeCompare(a.start));
        infoGetter = x => [x.id, x.start.slice(0, x.start.lastIndexOf('-'))];

    } else if (input.classList.contains('input-type-member')) {
        candidates = MEMBERS_API.getAll().toSorted(memberSorter);
        infoGetter = x => {
            const [season, year] = x.joined.split(' ');
            let info = `${season.slice(0, 1)}${year.slice(2)}`;
            if (x.left) {
                const [season, year] = x.left.split(' ');
                info = `${info}-${season.slice(0, 1)}${year.slice(2)}`;
            }
            return[x.id, info];
        }
    } else if (input.classList.contains('input-type-instrument')) {
        candidates = getInstruments();
        nameGetter = x => x;
        infoGetter = x => [indexInstrument(x)]
    } else if (input.classList.contains('input-type-music')) {
        candidates = MUSIC_API.getAll();
        infoGetter = x => [x.id, x.composer];
    } else if (input.classList.contains('input-type-role')) {
        candidates = getRoles();
        nameGetter = x => x;
        infoGetter = x => [indexRole(x)]
    } else {
        throw new Error(String(Array.from(input.classList)));
    }
    // TODO: add more input-... classes for arrangers and performers of an instrument?

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
            if (name.toLowerCase().startsWith(value.toLowerCase())) {
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
    if (input.classList.contains('input-type-member'))
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

let BLUR_AFTER_INPUT_EDIT = false;
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

    if (!INPUT_CHANGED) {
        INPUT_CHANGED = false;
        return;
    }

    syncData(input);

    if (BLUR_AFTER_INPUT_EDIT)
        return;

    const row = inputContainer.closest('tr');
    if (!row)
        return;

    const isPreviewRow = row.classList.contains('modal-datalist-preview');
    if (newValue) {
        if (isPreviewRow || (!isInputAndTaglist(inputContainer) && !isTaglistButton(inputContainer))) {  // e.g. modal performances
            const [id, canonicalValue] = getSuggestionIfExists(inputContainer, input, newValue);
            return editInput(input, inputContainer, newValue, id, canonicalValue);
        }
        input.value = '';
        return;
    }

    // e.g. performances modal
    const rowInputsEmpty = Array.from(row.querySelectorAll('input:not([type="hidden"])')).every(x => !x.value);
    const rowTagsEmpty = Array.from(row.querySelectorAll('.taglist')).every(x => x.children.length === 1);
    if (!isPreviewRow && rowInputsEmpty && rowTagsEmpty)
        setTimeout(() => { row.remove(); }, 0);
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

// Handles creating/deleting rows when a TD is edited (e.g. member links)
function editTd(element, value) {
    const tr = element.parentElement;
    const tds = Array.from(tr.querySelectorAll('td[contenteditable="plaintext-only"]'));

    if (tr.classList.contains('modal-datalist-preview')) { 
        // Add new row if TD content is edited
        if (element.innerText !== value)  {
            // Store and unset "default" TD values of preview row
            const oldValues = [];
            for (const td of tds) {
                if (td === element) {
                    oldValues.push(value);
                } else {
                    oldValues.push(td.innerText);
                    td.innerText = '';   
                }
            }
            // Copy preview row
            const newRow = tr.cloneNode(true);
            newRow.classList.remove('modal-datalist-preview');
            tr.before(newRow);
            // Restore "default" TD values
            tds.forEach((x, i) => x.innerText = oldValues[i]);
        }
    } else {
        // Delete row if all TDs empty
        if (tds.every(x => !x.innerText)) {
            tr.remove();
        }
    }
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
    return existingTags.has(typeof id === 'undefined' ? newValue : id);
}

function duplicateInstrumentExists(inputContainer, newValue) {
    const datalist = inputContainer.closest('.modal-datalist tbody')
    if (!datalist) {
        return false;
    }
    const instruments = getInstruments();
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
        input.previousElementSibling.value = id;
    }
}

function keyDownInput(event) {
    if (event.key !== 'Enter') {
        return;
    }
    const input = event.target;
    const inputContainer = input.parentElement.parentElement;
    const newValue = input.value;
    if (!newValue) {
        return;
    }

    const [id, canonicalValue] = getSuggestionIfExists(inputContainer, input, newValue);
    editInput(input, inputContainer, newValue, id, canonicalValue);
    setTimeout(() => {
        BLUR_AFTER_INPUT_EDIT = true;
        input.blur();
        expandNewTagButton(inputContainer);
        input.focus();

        // current/upcoming event, performances modal
        if (!isInputAndTaglist(inputContainer) && !isTaglistButton(inputContainer))
            input.blur();
        BLUR_AFTER_INPUT_EDIT = false;
    }, 0);
}
function clickSuggestion(element) {
    const inputContainer = element.parentElement.parentElement;
    const input = inputContainer.children[0].lastElementChild;
    const newValue = element.children[0].innerText;

    const id = extractSuggestionId(element);
    editInput(input, inputContainer, newValue, id, newValue);
    setTimeout(() => {
        BLUR_AFTER_INPUT_EDIT = true;
        input.blur();
        input.focus();
        
        // current/upcoming event, performances modal
        if (!isInputAndTaglist(inputContainer) && !isTaglistButton(inputContainer))
            input.blur();
        BLUR_AFTER_INPUT_EDIT = false;
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
    const offset = event.deltaY > 0 ? -1 : 1;
    const currYear = (new Date()).getFullYear();
    event.target.value = clamp(Number(event.target.value) + offset, 2023, currYear + 10);
}


/*********************************************************************
Input table filtering
*********************************************************************/
const filterInput = debounce(async (event) => {
    const id = event.target.closest('.table').id;
    let data;
    if (id === 'table-members') {
        data = MEMBERS_API.getAll();
    } else if (id === 'table-music') {
        data = MUSIC_API.getAll();
    } else if (id === 'table-events') {
        data = EVENTS_API.getAll();
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
function syncData(element) {
    if (element.closest('.modal')) {
        return;
    }
    if (element.closest('#datalist-current-event')) {
        console.log('current event');
        return;
    }
    if (element.closest('#current-event-description-container')) {
        console.log('container');
        return;
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

// todo: custom syncing for instruments (after editing member-tag/performance modal)
// todo: custom syncing for roles (after editing member-tag modal)
// todo: custom syncing for current-event


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
function validateInput(element) {
    let value = element.innerText;
    value = value.replace(/[\r\n]+/g, '').trim();
    element.innerText = value;
    syncData(element);
}
function validateMultilineInput(element) {
    let value = element.innerHTML;
    value = value.replace(/[\r\n]+/g, '').trim();
    value = parseMarkdown(value);
    element.innerHTML = value;
    syncData(element);
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
    if (value.includes('://')) {
        validation.innerText = `'${value}' is an external link. If this asset will be reused often in the future, please download it and use it as a local asset instead.`;
    } else if (!/^.+\.[a-zA-Z]+$/.test(value)) {
        validation.innerText = `'${value}' is not a proper path to a file.`;
    } else if (!value.endsWith('.webp')) {
        validation.innerText = `'${value}' is not a WEBP file. Please convert it to a WEBP to optimize for size and loading time.`;
    } else if (!value.startsWith('assets/images')) {
        validation.innerText = `'${value}' should be moved inside assets/images.`;
    } else {
        cssSetElement(validation, { display: 'none' });
    }
    syncData(element);
}
function validateInputTimestamp(element) {
    let value = element.innerText;
    value = value.replace(/[\r\n]+/g, '').trim();

    const timestampRegex = /^(?:\?\?:\?\?|\d+:[0-5]\d:[0-5]\d|(?:[0-5]?\d):[0-5]\d)$/;
    value = timestampRegex.test(value) ? value : '??:??';
    element.innerText = value;
    syncData(element);
}
function validateInputYear(element, optional) {
    if (!element.value && optional) {
        return;
    }
    const value = parseInt(element.value, 10);
    const currYear = (new Date()).getFullYear();
    element.value = isNaN(value) ? (optional ? '' : currYear) : clamp(value, 2023, currYear + 10);
    syncData(element);
}
function validateInputEvent(input, isConcert, newValue) {
    const name = newValue ?? input.value;
    const event = EVENTS_API.getAll().filter(x => (!isConcert || x.type === 'Concert') && isSubstring(x.name, name));
    if (event.length === 1) {
        input.value = event[0].name;
        return true;
    } else {
        input.value = '';
        return false;
    }
}


/*********************************************************************
Parsing CSV data
*********************************************************************/
function downloadData() {
    console.log("Download");
}
function uploadData() {
    console.log("Upload");
}


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
    const data = {};
    if (discord) {
        data.discord = discord;
    }

    for (const link of links) {
        const match = link.trim().match(/^(.*)\s*\(([^()]*)\)$/);
        if (!match) {
            throw new Error(`Expected format 'name (site, optional url)', got ${link}`);
        }
        const [, username, source] = match;
        if (source.includes(',')) {
            const [site, url] = source.split(',').map(x => x.trim());
            data[site.toLowerCase()] = [username.trim(), url];
        } else {
            data[source.toLowerCase()] = username.trim();
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
    a = a.toLowerCase();
    b = b.toLowerCase();
    if (a.includes(' (')) { a = a.slice(0, a.lastIndexOf(' (')); }
    if (b.includes(' (')) { b = b.slice(0, b.lastIndexOf(' (')); }

    const groupA = roleOrder[a];
    const groupB = roleOrder[b];
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

async function uploadMembers(element) {
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
    const now = new Date();
    let year = now.getMonth() >= 7 ? now.getFullYear() : now.getFullYear() - 1;
    while (!members.some(row => row[indices['Roles']].includes(String(year).slice(2)))) {
        year -= 1;
        if (year === 2022) {
            throw new Error("WTF");
        }
    }

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
    const rows = new Set(['Name', 'Artist', 'From', 'Media Origin', 'Reference']);
    const indices = {};
    for (let i = 0; i < data[0].length; i++) {
        if (rows.has(data[0][i])) {
            indices[data[0][i]] = i;
        }
    }

    const parsed = data.slice(1).map((row, i) => {
        const from = row[indices['From']];
        const mediaOrigin = row[indices['Media Origin']];
        const reference = row[indices['Reference']];
        const data = {
            id: i,
            name: row[indices['Name']],
            composer: row[indices['Artist']]
        }
        if (from) { data.from = from }
        if (mediaOrigin) { data.mediaOrigin = mediaOrigin }
        if (reference) { data.reference = reference }
        return data;
    });
    
    return parsed;
}

async function uploadPerformances(element, memberData, discords, musicData, eventData) {
    musicData = Object.fromEntries(musicData.map(x => [x.name, x]));

    const raw = await element.files[0].text();
    let [header, ...data] = parseCSV(raw);

    for (let i = 0; i < data.length; i++) {
        if (header.length !== data[i].length) {
            throw new Error(`Mismatch in number of rows. Column 1 = ${header.length} != ${data[i].length} = Column ${i + 1}`);
        }
    }

    // Map column to row index
    const rows = new Set(['Name', 'Arranger', 'Sheet Music', 'Concerts', 'Song Type', 'Group', 'Instrumentation', 'Performers']);
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

            // <name> [<setlist order>, <setlist timestamp>]
            // <name> [<setlist order>]
            // Recording [<link>]
            if (concert.includes('[') && concert.includes(']')) {
                concertName = concert.slice(0, concert.lastIndexOf('[')).trim();
                p1 = concert.slice(concert.lastIndexOf('[') + 1, concert.lastIndexOf(']'));
            
                if (p1.includes(',')) {
                    [p1, p2] = p1.split(',').map(x => x.trim());
                    p2 = timestampToSeconds(p2);
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
        const arranger = row[indices['Arranger']]
        const sheetMusic = row[indices['Sheet Music']];
        const group = row[indices['Group']];
        const songType = row[indices['Song Type']];
        if (arranger) { newData.arranger = arranger.split(',').map(x => discordToId(x.trim())); };
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
    const raw = await element.files[0].text();
    let [header, ...data] = parseCSV(raw);

    for (let i = 0; i < data.length; i++) {
        if (header.length !== data[i].length) {
            throw new Error(`Mismatch in number of rows. Column 1 = ${header.length} != ${data[i].length} = Column ${i + 1}`);
        }
    }

    // Map column to row index 
    const rows = new Set(['Name', 'Type', 'Start', 'End', 'Location', 'Description', 'Gallery', 'Video']);
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
            description: row[indices['Description']],
            start: row[indices['Start']].replace(', ', '|'),
            end: row[indices['End']].replace(', ', '|'),
        };
        const gallery = row[indices['Gallery']];
        if (gallery) result.gallery = gallery;
        const video = row[indices['Video']];
        if (video) result.video = video;
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
            console.warn(`Unknown concert ${name}, expected something from ${events.map(x => x.name)}`);
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
const ROW_CHECKBOX = {
    element: 'input',
    classes: ['checkbox'],
    attributes: {
        type: 'checkbox'
    }
}
const INPUT_ATTRIBUTES = {
    default: {
        contenteditable: 'plaintext-only',
        onblur: 'validateInput(this)',
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
function createInputModalOpener(onclick, items, disabled) {
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
                onclick: disabled ? '' : onclick
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
    return construct({
        element: 'tr',
        id: `${tableId}-${id}`,
        children: [{
            element: 'td',
            attributes: {
                onclick: 'toggleRowSelect(event, this)'
            },
            children: [ROW_CHECKBOX]
        }, ...row]
    });
}

// Helper function for constructTable. Construct a single table subrow
function constructTableSubrow(tableId, id, subrow, colspan, noSubtableCheckbox) {
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
                children: noSubtableCheckbox ? [subrow] : [ROW_CHECKBOX, subrow]
            }]
        }]
    });
}

let AUTOINCREMENT = {};

/**
 * Function for constructing a table and its contents. Auto-constructs a checkbox in the first column.
 * - `tableID (string)`: CSS id of the table
 * - `api`: Object with get/insert/delete methods to interact with internal data (e.g. MEMBERS_API)
 * - `templateData (T)`: A template data used as the placeholder when adding a new row
 * - `dataParser (T => <td>[])`: Function that takes in your list item and outputs `construct` syntax.
 * - `rowSyncer ((id, <td>[]) => void)`: Function that takes in constructed rows and updates the API data 
 * 
 * `dataParser` outputs a list where each item is a `<td>`, e.g. `[column1, column2, ...]`
 * 
 * `rowSyncer` takes in a list of `<td>` elements in the same order they were given.
 * 
 * Output is an object of table operations. 
 */
function constructTable(tableId, api, templateData, dataParser, rowSyncer) {
    const table = cssGetFirst(`#${tableId} tbody`);
    const fragment = document.createDocumentFragment();

    // Construct rows of table
    let maxId = -1;
    for (const data of api.getAll()) {
        // [col1, col2, ...] -> table row
        const row = dataParser(data);
        fragment.appendChild(constructTableRow(tableId, data.id, row));
        maxId = Math.max(data.id, maxId);
    }
    table.replaceChildren(fragment);
    AUTOINCREMENT[tableId] = maxId;

    function parseRowId(element) {
        return Number(element.id.split('-').at(-1));
    }

    return {
        rowAdd: (row, copyRow) => {
            AUTOINCREMENT[tableId] += 1;
            const id = AUTOINCREMENT[tableId];

            let tr;
            if (copyRow) {
                assert(row, `No row specified to copy`);
                const data = api.get(parseRowId(row));
                api.set({ ...data, id });
                tr = constructTableRow(tableId, id, dataParser(data));
            } else {
                api.set({ id, ...templateData });
                tr = constructTableRow(tableId, id, dataParser(templateData));
            }

            if (row) row.after(tr);
            else table.appendChild(tr);

            tr.scrollIntoView({ behavior: 'smooth', block: 'center' });
        },
        rowDelete: (ids) => {
            for (const id of ids) {
                cssGetId(`${tableId}-${id}`).remove();
                api.delete(id);
                ROW_SELECTION[tableId].delete(id);
                if (AUTOINCREMENT[tableId] === id) {
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
}

/**
 * Like `contructTable` but for tables containing subrows.
 * - `tableID (string)`: CSS id of the table
 * - `api`: Object with get/insert/delete methods to interact with internal data (e.g. MUSIC_API)
 * - `templateData (T)`: A template data used as the placeholder when adding a new row/subrow
 * - `dataParser (T => [<td>[], <?>[], ...])`: Function that takes in your list item and outputs `construct` syntax.
 * - `rowSyncer ((id, <td>[], subIds, <?>[]) => void)`: Function that takes in constructed rows and updates the API data 
 * 
 * `dataParser` outputs a list where index 0 is the row and index 1 is a list of subrows 
 *     e.g. `[row, [subrow1, subrow2, ...]]`
 * 
 * The rows and subrows are lists where each item is a `<td>`.
 * If no checkboxes are needed in the subrows, add an additional dummy row
 *     e.g. `[[column1, column2, ...], [subrow1, subrow2, ...], true]`
 * 
 * `rowSyncer` takes in the row `<td>` and a list of subrows (`<td>`).
 */
function constructTableWithSubrows(tableId, api, templateData, dataParser, rowSyncer) {
    const tree = {};
    function createRowAndSubrows(data) {
        const fragment = document.createDocumentFragment();

        // [[col1, col2, ...], [subrow1, subrow2, ...], ...] -> subtable rows
        const [row, subrows, ...extra] = dataParser(data);
        const noSubtableCheckbox = extra.length > 0;

        const newRow = constructTableRow(tableId, data.id, row);
        fragment.appendChild(newRow);
        tree[data.id] = { max: -1, children: new Set() };

        subrows.forEach((subrow, i) => {
            const id = `${data.id}-${i}`;
            fragment.appendChild(constructTableSubrow(tableId, id, subrow, row.length, noSubtableCheckbox));
            tree[data.id].max = Math.max(tree[data.id].max, i);
            tree[data.id].children.add(id);
        });
        return [fragment, newRow];
    }
    function createSubrow(data, rowId, copiedSubrowId) {
        const [row, subrows, ...extra] = dataParser(data);
        const noSubtableCheckbox = extra.length > 0;

        tree[rowId].max += 1;
        const newId = tree[rowId].max;

        const subrow = subrows[typeof copiedSubrowId === 'number' ? api.indexSubrow(rowId, copiedSubrowId) : 0];
        const tr = constructTableSubrow(tableId, `${rowId}-${newId}`, subrow, row.length, noSubtableCheckbox);
        tree[rowId].children.add(`${rowId}-${newId}`);
        return [tr, newId];
    }

    const table = cssGetFirst(`#${tableId} tbody`);
    const fragment = document.createDocumentFragment();

    // Construct rows of table
    let maxId = -1;
    for (const data of api.getAll()) {
        fragment.appendChild(createRowAndSubrows(data)[0]);
        maxId = Math.max(data.id, maxId);
    }
    table.replaceChildren(fragment);
    AUTOINCREMENT[tableId] = maxId;

    function parseRowId(row) {
        if (isSubrow(row)) {
            return Number(row.id.split('-').at(-2));
        }
        return Number(row.id.split('-').at(-1));
    }

    const operations = {
        rowAdd: (row, copyRow) => {
            AUTOINCREMENT[tableId] += 1;
            const id = AUTOINCREMENT[tableId];

            let fragment, tr, data;
            if (copyRow) {
                assert(row, `No row specified to copy`);
                data = { ...api.get(parseRowId(row)), id };
                [fragment, tr] = createRowAndSubrows(data);
            } else {
                data = { id, ...templateData };
                [fragment, tr] = createRowAndSubrows(data);
            }
            api.set(data);

            if (row) {
                const anchor = table.children[row.sectionRowIndex + tree[parseRowId(row)].children.size];
                anchor.after(fragment);
            } else {
                table.appendChild(fragment);
            }

            toggleCellDetails(tr.querySelector('.cell-details img[src="assets/icons/hide.svg"]'));
            tr.scrollIntoView({ behavior: 'smooth', block: 'center' });
        },
        rowDelete: (ids) => {
            for (const id of ids) {
                for (const childId of tree[id].children) {
                    cssGetId(`${tableId}-${childId}`).remove();
                }
                delete tree[id];

                cssGetId(`${tableId}-${id}`).remove();
                api.delete(id);
                ROW_SELECTION[tableId].delete(id);
                if (AUTOINCREMENT[tableId] === id) {
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
                    tree[parseRowId(x)].children.forEach(y => fragment.appendChild(cssGetId(`${tableId}-${y}`)));
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
                        tree[rowId].children.forEach(id => fragment.appendChild(cssGetId(`${tableId}-${id}`)));

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
                        tree[rowId].children.forEach(id => fragment.appendChild(cssGetId(`${tableId}-${id}`)));

                        next.after(fragment);
                        notMoved.delete(nextId);
                    }
                }
            }
            const middle = Math.floor(rows.length / 2);
            rows[middle].scrollIntoView({ behavior: 'smooth', block: 'center' });
        },
        subrowAdd: (subrow, copySubrow) => {
            let tr, subrowId;
            let [rowId, copiedSubrowId] = subrow.id.split('-').slice(-2).map(Number);
            if (copySubrow) {
                const data = api.get(rowId);
                [tr, subrowId] = createSubrow(data, rowId, copiedSubrowId);
                api.insertSubrow(data, rowId, subrowId, copiedSubrowId);
            } else {
                if (!rowId) {
                    // When deleting the last subrow, it is re-added, so a row is passed into `subrow`
                    // So `[rowId, copiedSubrowId] = [NaN, actualRowId]`
                    rowId = copiedSubrowId;
                }
                [tr, subrowId] = createSubrow(templateData, rowId);
                api.insertSubrow(templateData, rowId, subrowId);
            }

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
        attributes: INPUT_ATTRIBUTES.multiline,
        innerHTML: parseMarkdown(x.text)
    }];

    const rowSyncer = (id, tds) => {
        ANNOUNCEMENTS_API.set({
            id,
            type: tds[0].children[0].src.endsWith('alert-triangle.svg') ? 'alert' : 'announcement',
            text: tds[2].innerHTML,
            from: tds[1].children[0].children[0].value,
            until: tds[1].children[1].children[0].value
        })
    }
    
    return constructTable('table-announcements', ANNOUNCEMENTS_API, template, dataParser, rowSyncer);
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
            EVENTS_API.get(x.id)?.name ?? '',
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
        // TODO: store <input hidden> storing input IDs
        // UPCOMING_EVENTS_API.set({
        //     id,
        //     location,
        //     from,
        //     until,
        //     image
        // })
    }

    return constructTable('table-upcoming-events', UPCOMING_EVENTS_API, template, dataParser, rowSyncer);
}
function constructCurrentEvent() {
    const currentEvent = getCurrentEvent();

    const { name } = EVENTS_API.get(currentEvent.id);
    const { links: { poster, rvsp, setlist }, tickets, hideBefore, hideAfter, location, preConcertDescription, postConcertDescription } = currentEvent;

    const container = cssGetId('current-event-id');
    const input = container.children[0].children[1];
    input.value = name;

    if (hideBefore) { cssGetId('current-event-visible-from').value = hideBefore.replace('|', 'T'); }
    if (hideAfter) { cssGetId('current-event-visible-until').value = hideAfter.replace('|', 'T'); }
    cssGetId('current-event-location').innerText = location;
    cssGetId('current-event-tickets').innerText = tickets;
    cssGetId('current-event-poster').innerText = poster;
    cssGetId('current-event-rvsp').innerText = rvsp;
    cssGetId('current-event-setlist').innerText = setlist;
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
            innerHTML: parseMarkdown(a[0]),
            children: a.slice(1).map(x => ({
                element: 'div',
                innerHTML: parseMarkdown(x)
            }))
        }]
    }];

    const rowSyncer = (id, tds) => {
        FAQ_API.set({
            id,
            q: tds[0].children[0].innerText,
            a: tds[0].children[1].innerHTML.replaceAll('</div>', '').replaceAll('<br>', '').split('<div>')
        });
    }
    
    return constructTable('table-faq', FAQ_API, template, dataParser, rowSyncer);
};


/*********************************************************************
Data injection - Members table
*********************************************************************/
function constructMembers() {
    const instruments = getInstruments();
    const roles = getRoles();

    const now = new Date();
    const templateSeason = `${now.getMonth() > 5 ? 'Fall' : 'Winter'} ${now.getFullYear()}`;
    const template = {
        name: "John LMC",
        joined: templateSeason,
        left: '',
        instruments: [],
        roles: [],
        links: {}
    };

    const dataParser = (x) => {
        const tags = [...x.instruments.map(i => instruments[i]), ...x.roles.map(i => roles[i])];
        const links = Object.keys(x.links).map(capitalize);
        return [{
            element: 'td',
            attributes: INPUT_ATTRIBUTES.default,
            innerText: x.name
        }, {
            element: 'td',
            children: [createInputSeason(x.joined)]
        }, {
            element: 'td',
            children: [createInputSeason(x.left, true)]
        }, {
            element: 'td',
            children: [createInputModalOpener('openModalMemberTags(this)', tags)]
        }, {
            element: 'td',
            children: [createInputModalOpener('openModalMemberLinks(this)', links)]
        }]
    };

    const rowSyncer = (id, tds) => {
        console.log(tds)
        // MEMBERS_API.set({
        //     id,

        // })
        // TODO: sync tags & links
    }

    return constructTable('table-members', MEMBERS_API, template, dataParser, rowSyncer);
}


/*********************************************************************
Data injection - Music table
*********************************************************************/
function constructMusicTable() {
    const mediaOrigins = ['', 'Anime', 'Video Game', 'Vocaloid'];
    const songTypes = ['Large Ensemble', 'Small Ensemble', 'External Group'];

    const template = {
        name: "Placeholder",
        composer: "Placeholder",
        performances: [{
            concerts: [],
            performers: {},
            songType: 'Small'
        }]
    };

    const dataParser = (x) => {
        const performances = x.performances.map(p => p.concerts.map(c => EVENTS_API.get(c)?.start?.slice(0, 7) ?? c)).flat();
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
            children: [createInputSubrowOpener(performances)]
        }, {
            element: 'td',
            attributes: INPUT_ATTRIBUTES.default,
            innerText: x.reference
        }];

        const subrows = x.performances.map(p => {
            const arranger = p.arranger?.map(a => {
                const name = MEMBERS_API.get(a)?.name;
                return name ? [a, name] : [undefined, a];
            }) ?? [];
            const concerts = p.concerts.map(c => {
                const name = EVENTS_API.get(c)?.name;
                return name ? [c, name] : [undefined, c]; // temporarily accept arbitary strings until data is fixed
            })
            const performerNames = getPerformerNames(p);
            const songType = p.songType === 'Large' ? 'Large Ensemble' : p.songType === 'Small' ? 'Small Ensemble' : 'External Group';
            return createDatalist([
                ['Concerts', {
                    element: 'td',
                    children: [createInputTags(concerts, 'Enter event...', 'event')]
                }],
                ['Song Type', {
                    element: 'td',
                    children: [createDropdown(songType, songTypes)]
                }],
                ['Sheet Music', {
                    element: 'td',
                    attributes: INPUT_ATTRIBUTES.default,
                    innerText: p.sheetMusic
                }],
                ['Arranger(s)', {
                    element: 'td',
                    children: [createInputTags(arranger, 'Enter arranger...', 'member')]
                }],
                ['Group', {
                    element: 'td',
                    attributes: INPUT_ATTRIBUTES.default,
                    innerText: p.group
                }],
                ['Performer(s)', {
                    element: 'td',
                    children: [createInputModalOpener('openModalPerformancePerformers(this)', performerNames)]
                }]
            ]);
        });
        return [row, subrows];
    };

    const rowSyncer = (id, row, subIds, subrows) => {
        console.log(row);
        console.log(subrows)
    }

    return constructTableWithSubrows('table-music', MUSIC_API, template, dataParser, rowSyncer);
}


/*********************************************************************
Data injection - Event table
*********************************************************************/
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
            children: [createInputModalOpener('openModalConcertSetlist(this)', undefined, !x.setlist || x.setlist.length === 0)]
        }, {
            element: 'td',
            children: [createInputSubrowOpener()]
        }, {
            element: 'td',
            attributes: INPUT_ATTRIBUTES.default,
            innerText: x.gallery
        }];
        
        const subrows = [{
            element: 'div',
            attributes: INPUT_ATTRIBUTES.multiline,
            innerHTML: x.description ? parseMarkdown(x.description) : ''
        }];

        return [row, subrows, true];
    };

    const rowSyncer = (id, rows, subIds, subrows) => {
        console.log(rows)
        console.log(subrows);
    }

    return constructTableWithSubrows('table-events', EVENTS_API, template, dataParser, rowSyncer);
}


/*********************************************************************
Data injection - Tags tab
*********************************************************************/
function getTagColourStyle(name) {
    if (name.includes(' (')) {
        name = name.slice(0, name.indexOf(' ('));
    }
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
        return role;
    }
    return role.slice(0, i).trim();
}
function constructTagTab() {
    const members = MEMBERS_API.getAll();
    const instruments = getInstruments();
    const roles = getRoles();

    const tags = [...instruments, ...roles];
    const tagPreviews = cssGetId('tag-previews');
    const fragment = document.createDocumentFragment();
    tags.forEach((tag, i) => {
        fragment.appendChild(construct({
            element: 'li',
            classes: i === 0 ? ['tag-preview-active'] : undefined,
            innerText: tag,
            attributes: { onclick: "selectTag(this)" },
            style: getTagColourStyle(tag)
        }));
    })
    tagPreviews.replaceChildren(fragment);
    selectTag(cssGetClass('tag-preview-active')[0], true);
}

constructTagTab();
constructCurrentEvent();
const TABLE_OPERATIONS = {
    'table-announcements': constructAnnouncements(),
    'table-upcoming-events': constructUpcomingEvents(),
    'table-faq': constructFaq(),
    'table-members': constructMembers(),
    'table-music': constructMusicTable(),
    'table-events': constructEventTable()
};


/*********************************************************************
Data injection - Modals
*********************************************************************/
function getRowId(element) {
    let ids = (element.closest('.subtable-row') || element.closest('tr')).id.split('-');    
    ids = ids.slice(-2).map(x => parseInt(x, 10));
    if (!isNaN(ids[0]) && !isNaN(ids[1])) {
        return ids;
    }
    return ids[1];
}
function openModalMemberTags(element) {
    openModalHelper('modal-member-tags');

    const id = getRowId(element);
    const member = MEMBERS_API.get(id);
    const instruments = getInstruments();
    const roles = getRoles();

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
    for (const id of member.roles) {
        fragment.appendChild(construct(createInputTag(roles[id], id, true)))
    }
    container.replaceChildren(fragment);
}
function openModalMemberLinks(element) {
    openModalHelper('modal-member-links');

    const id = getRowId(element);
    const member = MEMBERS_API.get(id);
    const instruments = getInstruments();
    const socialMediaOptions = ['Bandcamp', 'Discord', 'Instagram', 'LinkedIn', 'Musescore', 'Spotify', 'Soundcloud', 'Youtube'];

    // Title
    cssGetFirst('#modal-member-links h2 span').innerText = `for ${member.name}`;

    // Links
    const datalist = cssGetFirst('#datalist-modal-member-links tbody');
    const fragment = document.createDocumentFragment();
    for (const [socialMedia, info] of Object.entries(member.links)) {
        let username = info;
        let link = '';
        if (Array.isArray(info)) {
            [username, link] = info;
        }

        fragment.appendChild(construct({
            element: 'tr',
            children: [{
                element: 'td',
                children: [X_BUTTON]
            }, {
                element: 'td',
                children: [createDropdown(capitalize(socialMedia), socialMediaOptions)]
            }, {
                element: 'td',
                attributes: INPUT_ATTRIBUTES.default,
                innerText: username
            }, {
                element: 'td',
                attributes: INPUT_ATTRIBUTES.default,
                innerText: link
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
            children: [createDropdown(undefined, socialMediaOptions)]
        }, {
            element: 'td',
            attributes: {
                ...INPUT_ATTRIBUTES.default,
                onblur: `${INPUT_ATTRIBUTES.default.onblur}; editTd(this, "Enter username...")`
            },
            innerText: 'Enter username...'
        }, {
            element: 'td',
            attributes: {
                ...INPUT_ATTRIBUTES.default,
                onblur: `${INPUT_ATTRIBUTES.default.onblur}; editTd(this, "Enter link...")`
            },
            innerText: 'Enter link...'
        }]
    }));
    datalist.replaceChildren(fragment);
}
function openModalPerformancePerformers(element) {
    openModalHelper('modal-performance-performers');

    const instruments = getInstruments();
    const [id, subId] = getRowId(element);
    const song = MUSIC_API.get(id);
    const performers = song.performances[subId].performers;
    
    // Title
    cssGetFirst('#modal-performance-performers h2 span').innerText = `for ${song.name}`;

    // Performer
    const table = cssGetFirst('#modal-performance-performers tbody');
    const fragment = document.createDocumentFragment();
    for (const [instrumentId, memberIds] of Object.entries(performers)) {
        const names = memberIds.map(id => {
            const name = MEMBERS_API.get(id)?.name;
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
                children: [createInputTags(names, 'Enter performer...', 'member')]
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
    openModalHelper('modal-concert-setlist');

    const id = getRowId(element);
    const { name, setlist, video } = EVENTS_API.get(id);

    // Title
    cssGetFirst('#modal-concert-setlist h2 span').innerText = `for ${name}`;

    // Setlist
    const table = cssGetFirst('#concert-setlist tbody');
    const fragment = document.createDocumentFragment();
    setlist?.forEach((info, i) => {
        let songId = info;
        let timestamp;
        if (Array.isArray(info)) {
            [songId, timestamp] = info;
        }
        const index = String(i + 1).padStart(String(setlist.length).length, '0');

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
                innerText: index
            }, {
                element: 'td',
                innerText: MUSIC_API.get(songId).name
            }, {
                element: 'td',
                classes: ['concert-setlist-timestamp'],
                attributes: INPUT_ATTRIBUTES.timestamp,
                innerText: typeof(timestamp) === 'number' ? secondsToTimestamp(timestamp) : '??:??'
            }]
        }))
    });
    table.replaceChildren(fragment);

    // Video
    cssGetId(`concert-setlist-type-${video ? 'one' : 'no'}-video`).onclick();
    cssGetFirst('#concert-setlist-one-video input').value = video || '';
}