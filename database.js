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
function getPerformerNames(performance) {
    return Array.from(new Set(Object.values(performance.performers).flat())).map(x => MEMBERS[x]?.name ?? x);
}
function isSubstring(parent, child) {
    return parent.toLowerCase().includes(child.toLowerCase());
}



/*********************************************************************
Data
*********************************************************************/
function getMembers() {
    return MEMBERS;
}
function getMusic() {
    return MUSIC;
}
function getInstruments() {
    return INSTRUMENTS;
}
function getEvents() {
    return EVENTS;
}
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
function getCurrentEvent() {
    return CURRENT_EVENT;
}
function getAnnouncements() {
    return ANNOUNCEMENTS;
}
function getUpcomingEvents() {
    return UPCOMING_EVENTS;
}
function getFaq() {
    return FAQ;
}


/*********************************************************************
Toggleables
*********************************************************************/
function toggle(id, activeClass) {
    const active = cssGetClass(activeClass)[0];
    active.classList.remove(activeClass);
    cssGetId(id).classList.add(activeClass);
}
function toggleTab(event) {
    const id = `${event.srcElement.id.substring(4)}`;
    toggle(`tab-${id}`, 'tab-active');
    toggle(`nav-${id}`, 'nav-active');

    // Clear out page specific details
    TAG_COLOUR_CACHE = undefined;
}

// If event is given, it is being turned off; otherwise, turn on
function toggleModal(event) {
    if (event) {
        const modals = cssGetClass('modal');
        for (const element of modals) {
            if (element.contains(event.target)) {
                return;
            }
        }
        for (const element of modals) {
            element.style.setProperty('display', 'none');        
        }
    }
    const modalContainer = cssGetId('modal-container');
    const modalOn = modalContainer.style.display === 'flex';
    modalContainer.style.setProperty('display', modalOn ? 'none' : 'flex');
    return modalOn;
}
function openModalHelper(id) {
    toggleModal();
    cssGetId(id).style.setProperty('display', 'flex');
}

let TAG_COLOUR_CACHE;
let TAG_IS_GRADIENT_MODE;
function toggleColourWidgetMode(element, isSwitchingTags) {
    const active = 'colour-widget-mode-active';
    cssGetClass(active)[0].classList.remove(active);
    element.classList.add(active);

    const toGradientMode = element.id === 'colour-widget-mode-gradient';
    cssGetId('colour-widget-gradient-button').style.setProperty('display', toGradientMode ? 'flex' : 'none');
    cssGetId('colour-widget-text').style.setProperty('padding-bottom', toGradientMode ? '5px' : '15px');
    TAG_IS_GRADIENT_MODE = toGradientMode;

    if (isSwitchingTags) {
        TAG_COLOUR_CACHE = undefined;
    }

    const rgbs = getTag() ?? [[100, 100, 100]];
    if (toGradientMode) {
        syncInputsToTagColour({ gradient: (isSwitchingTags ? rgbs : (TAG_COLOUR_CACHE ?? [rgbs[0], rgbs[0]])) });
    } else {
        const colour = TAG_COLOUR_CACHE?.[0];
        const backupColour = isSwitchingTags || GRADIENT_LEFT_SELECTED ? rgbs[0] : rgbs[1];
        syncInputsToTagColour({ rgb: colour ?? backupColour });
    }
    if (!isSwitchingTags) {
        TAG_COLOUR_CACHE = rgbs;
    }
}

function toggleCellDetails(element) {
    const visible = element.src.endsWith('show.svg');
    element.src = `${element.src.slice(0, element.src.lastIndexOf('/'))}/${visible ? 'hide.svg' : 'show.svg'}`;

    let curr = element.closest('tr');
    curr = curr.nextElementSibling;
    while (curr?.classList.contains('subtable-row')) {
        curr.style.setProperty('display', visible ? 'none' : 'table-row');
        curr = curr.nextElementSibling;
    }
}

function toggleConcertSetlistType(element) {
    const active = 'concert-setlist-types-active';
    cssGetClass(active)[0].classList.remove(active);
    element.classList.add(active);
    
    const videoDisplay = element.id === 'concert-setlist-type-one-video' ? 'flex' : 'none';
    cssGetId('concert-setlist-one-video').style.setProperty('display', videoDisplay);

    const cellDisplay = element.id === 'concert-setlist-type-one-video' ? 'table-cell' : 'none';
    for (const element of cssGetClass('concert-setlist-timestamp')) {
        element.style.setProperty('display', cellDisplay);
    }
}

function toggleAnnouncementType(element) {
    if (element.src.endsWith("alert-triangle.svg")) {
        element.src = 'assets/icons/megaphone.svg';
    } else {
        element.src = 'assets/icons/alert-triangle.svg';
    }
}

function toggleRowSelect(event, element) {
    const button = element.children[0];
    if (button.disabled) {
        return;
    }

    const rowId = Number(element.parentElement.classList[0]);
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

    const id = element.parentElement.parentElement.parentElement.classList[0];
    const [rowId, subrowId] = id.split('-').map(Number);
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
}

let SUBROW_SELECTION = {};
function onSubrowSelect(checked, subrowId, rowId, tableId) {
    if (!ROW_SELECTION[tableId]) {
        ROW_SELECTION[tableId] = new Set();
    }
    const set = ROW_SELECTION[tableId];

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
let LAST_VALID_COLOUR = [100, 100, 100];
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
    const circle = cssGetId('colour-widget-hue-circle');
    circle.style.setProperty('left', `${hue * rect.width}px`);

    // Update gradient
    const [r, g, b] = COLOUR_PICKER_PRIMARY;
    const box = cssGetId('colour-widget-picker');
    box.style.setProperty(
        'background',
        `linear-gradient(transparent, black), linear-gradient(to right, white, transparent), rgb(${r}, ${g}, ${b})`
    );
}

// Move the colour picker based on the given position (0-1)
function moveColourPicker(x, y) {
    const container = cssGetId('colour-widget-picker');
    const rect = container.getBoundingClientRect();
    const circle = cssGetId('colour-widget-picker-circle');
    const size = rect.width || 275;
    circle.style.setProperty('left', `${x * size}px`);
    circle.style.setProperty('top', `${y * size}px`);
}

function syncInputsToTagColour(source) {
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
    
    syncInputsToTagColour({ hue });
}

// Update colour after moving colour picker
function updateColourFromPicker() {
    const container = cssGetId('colour-widget-picker');
    const rect = container.getBoundingClientRect();
    const x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    const y = clamp((event.clientY - rect.top) / rect.height, 0, 1);

    syncInputsToTagColour({ xy: [x, y] });
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
        syncInputsToTagColour({ rgb: [r, g, b] });
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
        syncInputsToTagColour({ hex: value });
    }
})();

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

let GRADIENT_LEFT_SELECTED = true;
function selectGradientColour(element) {
    const active = cssGetClass('colour-widget-gradient-button-active')[0];
    active.classList.remove('colour-widget-gradient-button-active');
    element.classList.add('colour-widget-gradient-button-active');
    GRADIENT_LEFT_SELECTED = element.id === 'colour-widget-gradient-left';
    
    syncInputsToTagColour({ gradient: getTag() });
}

function swapGradientColour() {
    const rgbs = getTag();
    syncInputsToTagColour({ gradient: [rgbs[1], rgbs[0]]});
}

// TODO: refactor syncInputsToTagColour to smoothify hue/colour picker 


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
Inputs
*********************************************************************/
function setFocusInput(element, focus) {
    element.parentElement.nextElementSibling.style.setProperty('display', focus ? 'flex' : 'none');
}
function focusInput(event) {
    // Clear suggestions before suggesting new ones
    event.target.closest('.input').children[1].replaceChildren();

    setFocusInput(event.target, true);
    updateInputSuggestion(event);
}
function blurInput(event) {
    const element = event.target;

    // If focusing into suggestions, do nothing
    if (event.relatedTarget === element.parentElement.nextElementSibling) {
        return;
    }
    setFocusInput(element, false);

    // For + buttons that expand into inputs, hide the inputs
    const parent = element.parentElement?.parentElement;
    const clicked = 'datalist-tag-add-clicked';
    if (parent?.classList.contains(clicked) && !element.value) {
        parent?.classList.remove(clicked);
    }
}
function clickSuggestion(element) {
    const input = element.parentElement.parentElement.children[0].lastElementChild;
    setFocusInput(input, false);

    // Modal -> filling a suggestion adds a tag
    let container = element.closest('.modal .datalist-tags');
    if (container) {
        // todo: add to datalist, edit members, sort tags
        input.value = '';
        return;
    }
    
    // Tag addition
    container = element.closest('.datalist-tag-add');
    if (container) {
        // add new tag
        console.log('add new tag to this datalist');
        input.value = '';
        return;
    }

    // Fill input value
    input.value = element.children[0].innerText;
}
function clickXButton(element) {
    // todo
}
function keyDownInput(event) {
    if (event.key !== 'Enter') {
        return;
    }
    
    console.log('enter!');
}
function getInputSuggestion(x, getSuggestionName, getSuggestionInfo) {
    return {
        element: 'li',
        children: [{
            element: 'span',
            innerText: getSuggestionName ? getSuggestionName(x) : x
        }, getSuggestionInfo ? {
            element: 'span',
            innerText: getSuggestionInfo(x)
        } : undefined]
    }
}
const updateInputSuggestion = debounce(async (event) => {
    /*
    TODO: optimize for speed.
    Store a cache of the most recent filter for each event.target
    If entering characters, filter from the existing filter list.
    */ 
    const input = event.target;

    let candidates, infoGetter;
    let nameGetter = x => x.name
    if (input.classList.contains('input-event')) {
        candidates = getEvents();
        infoGetter = x => x.start.slice(0, x.start.lastIndexOf('-'));
    } else if (input.classList.contains('input-concert')) {
        candidates = getEvents().filter(x => x.type === 'Concert');
        infoGetter = x => x.start.slice(0, x.start.lastIndexOf('-'));
    } else if (input.classList.contains('input-member')) {
        candidates = getMembers();
        infoGetter = x => x.joined;
    } else if (input.classList.contains('input-instrument')) {
        candidates = getInstruments();
        nameGetter = x => x;
    } else if (input.classList.contains('input-music')) {
        candidates = getMusic();
        infoGetter = x => x.composer;
    } else if (input.classList.contains('input-role')) {
        candidates = Array.from(new Set(getMembers().map(x => x.roles).flat()));
        nameGetter = x => x;
    } else {
        throw new Error(String(Array.from(input.classList)));
    }
    
    const container = input.closest('.input').children[1];
    const fragment = document.createDocumentFragment();
    
    const value = input.value;
    if (!value) {
        return container.replaceChildren();
    }
    
    let i = 0;
    for (const candidate of candidates) {
        const name = nameGetter(candidate);
        if (isSubstring(name, value)) {
            fragment.appendChild(construct({
                element: 'li',
                attributes: { onclick: `clickSuggestion(this)` },
                children: [{
                    element: 'span',
                    innerText: name
                }, infoGetter ? {
                    element: 'span',
                    innerText: infoGetter(candidate)
                } : undefined]
            }));
            i += 1;
            if (i >= 10) {
                break;
            }
        }
    }
    container.replaceChildren(fragment);
}, 200);

const filterInput = debounce(async (event) => {
    const id = event.target.closest('.table').id;
    let data;
    if (id === 'table-members') {
        data = getMembers();
    } else if (id === 'table-music') {
        data = getMusic();
    } else if (id === 'table-events') {
        data = getEvents();
    } else {
        throw new Error(id);
    }
    const filter = x => isSubstring(x.name, event.target.value)

    applyTableFilter(id, data, filter);
}, 200);

function scrollInputYear(event) {
    if (event.target.value !== '0' && !event.target.value) {
        return;
    }
    event.preventDefault();
    const offset = event.deltaY > 0 ? -1 : 1;
    event.target.value = Number(event.target.value) + offset;
}

function addNewTagToDatalist(element) {
    const name = 'datalist-tag-add-clicked';
    if (!element.classList.contains(name)) {
        element.classList.add(name);
        element.children[0].children[1].focus();
    }
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
function validateInput(element) {
    let value = element.innerText;
    value = value.replace(/[\r\n]+/g, '').trim();
    element.innerText = value;
}
function validateMultilineInput(element) {
    let value = element.innerHTML;
    value = value.replace(/[\r\n]+/g, '').trim();
    value = parseMarkdown(value);
    element.innerHTML = value;
}
function validateInputAsset(element) {
    let value = element.innerText;
    value = value.replace(/[\r\n]+/g, '').trim();
    element.innerText = value;

    const validation = (element.closest('.table') || element.closest('.datalist')).nextElementSibling;
    if (!value) {
        validation.style.setProperty('display', 'none');
        return;
    }
    validation.style.setProperty('display', 'block');
    if (value.includes('://')) {
        validation.innerText = `'${value}' is an external link. If this asset will be reused often in the future, please download it and use it as a local asset instead.`;
    } else if (!/^.+\.[a-zA-Z]+$/.test(value)) {
        validation.innerText = `'${value}' is not a proper path to a file.`;
    } else if (!value.endsWith('.webp')) {
        validation.innerText = `'${value}' is not a WEBP file. Please convert it to a WEBP to optimize for size and loading time.`;
    } else if (!value.startsWith('assets/images')) {
        validation.innerText = `'${value}' should be moved inside assets/images.`;
    } else {
        validation.style.setProperty('display', 'none');
    }
}
function validateInputTimestamp(element) {
    let value = element.innerText;
    value = value.replace(/[\r\n]+/g, '').trim();

    const timestampRegex = /^(?:\?\?:\?\?|\d+:[0-5]\d:[0-5]\d|(?:[0-5]?\d):[0-5]\d)$/;
    value = timestampRegex.test(value) ? value : '??:??';
    element.innerText = value;
}
function validateInputYear(element, optional) {
    if (!element.value && optional) {
        return;
    }
    const value = parseInt(element.value, 10);
    const currYear = (new Date()).getFullYear();
    element.value = isNaN(value) ? (optional ? '' : currYear) : clamp(value, 2023, currYear + 10);
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

function parseSeason(season) {
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
        const match = link.match(/^(.*)\s*\(([^()]*)\)$/);
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
    if (a.includes(' (')) { a = a.slice(0, ' ('); }
    if (b.includes(' (')) { b = b.slice(0, ' ('); }

    const groupA = roleOrder[a];
    const groupB = roleOrder[b];
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

    const parsed = members.map((row, i) => {
        // Only show Discord of current execs
        const rawRoles = row[indices['Roles']];
        const isExec = rawRoles.includes(` (`) && rawRoles.includes(`${String(year).slice(2)}`);
        const discord = isExec ? row[indices['Discord']] : undefined;
        
        return {
            id: i,
            name: row[indices['Public Name']],
            joined: parseSeason(row[indices['Season Start']]),
            left: row[indices['Season End']],
            instruments: row[indices['Instruments']].split(',').map(x => x.trim()).sort(instrumentSorter),
            roles: row[indices['Roles']] ? row[indices['Roles']].split(',').map(x => x.trim()).sort(roleSorter) : [],
            links: parseLinks(discord, row[indices['Personal Links']] ? row[indices['Personal Links']].split('\n') : [])
        }
    });

    const discords = members.map(row => row[indices['Discord']]);
    return [parsed, discords];
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
            performers: Object.fromEntries(instrumentation.map((x, i) => [x, performers[i] ?? ['']]))
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
    const [memberData, discords] = await uploadMembers(cssGetId('upload-members'));
    const musicData = await uploadMusic(cssGetId('upload-music'));
    const eventData = await uploadEvents(cssGetId('upload-events'));

    const [performancesData, setlists, instruments] = await uploadPerformances(cssGetId('upload-performances'), memberData, discords, musicData, eventData);
    const fullEventData = enrichEventData(eventData, setlists);
    enrichMemberData(memberData, instruments);

    console.log(instruments);
    console.log(memberData);
    console.log(fullEventData);
    console.log(performancesData);
}


/*********************************************************************
Table toolbar buttons
*********************************************************************/
function tableToolbarAdd(element) {

}
function tableToolbarRemove(element) {

}
function tableToolbarMoveUp(element) {

}
function tableToolbarMoveDown(element) {

}
function tableToolbarMoveTop(element) {

}
function tableToolbarMoveBottom(element) {

}
function tableToolbarCopy(element) {

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
    onclick: 'clickXButton(element)',
    attributes: { src: 'assets/icons/add.svg' }
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
function getInputsStartEnd(data, type, from, until) {
    let parser = x => x;
    if (type === 'datetime-local') {
        parser = x => x.replace('|', 'T')
    }
    return [{
        element: 'p',
        innerHTML: `From <input type="${type}" ${data[from] ? `value=${parser(data[from])}` : ''} />`
    }, {
        element: 'p',
        innerHTML: `Until <input type="${type}" ${data[until] ? `value=${parser(data[until])}` : ''} />`
    }]
}

function getInputText(iconPath, placeholder, value, suggestionType) {
    const icon = iconPath ? {
        element: 'img',
        attributes: { src: iconPath }
    } : undefined;

    const input = {
        element: 'input',
        classes: [`input-${suggestionType}`],
        attributes: {
            type: 'text',
            placeholder,
            onfocus: 'focusInput(event)',
            onblur: 'blurInput(event)',
            oninput: `updateInputSuggestion(event)`,
            onkeydown: `keyDownInput(event)`,
            value
        }
    };

    return {
        element: 'div',
        classes: ['input'],
        children: [{
            element: 'div',
            children: [icon, input]
        }, {
            element: 'ul',
            attributes: { tabIndex: 0 },
            classes: ['input-suggestions']
        }]
    }
}
function getInputTags(tags, placeholder, suggestionType, useOutline) {
    const tagList = tags.map((name, i) => ({
        element: 'li',
        classes: useOutline?.[i] ? ['tag-custom'] : [],
        children: [{
            element: 'span',
            innerText: name
        }, X_BUTTON]
    }));

    const addInput = {
        element: 'div',
        children: [{
            element: 'img',
            attributes: { src: 'assets/icons/add.svg' }
        }, {
            element: 'input',
            classes: [`input-${suggestionType}`],
            attributes: {
                type: 'text',
                placeholder,
                onfocus: 'focusInput(event)',
                onblur: 'blurInput(event)',
                oninput: `updateInputSuggestion(event)`,
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
        classes: ['datalist-tags'],
        children: [...tagList, {
            element: 'div',
            classes: ['input', 'datalist-tag-add'],
            attributes: { onclick: 'addNewTagToDatalist(this)' },
            children: [addInput, addInputSuggestions]
        }]
    }
}
function getInputModalOpener(onclick, items, disabled) {
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
function getInputSubrowOpener(items) {
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
function getDatalist(mappings) {
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
function getInputSeason(seasonYear, optional) {
    const [season, year] = seasonYear.split(' ');

    const options = optional ? ['', 'Fall', 'Winter'] : ['Fall', 'Winter'];
    const seasonInput = {
        element: 'select',
        value: season,
        children: options.map(x => ({
            element: 'option',
            innerText: x
        }))
    }

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

/**
 * Helper function for constructing a table row. Auto-constructs a checkbox in the first column.
 * - `tableID` (string): CSS id of the table
 * - `list (T[])`: Each row of data
 * - `rowConstructor` ((T) => ...): Function that takes in your list item and outputs `construct` syntax.
 * 
 *   If the table has no subrows, rowConstructor should output data for 1 row,
 *      e.g. [column1, column2, ...]
 * 
 *   If the table has subrows, rowConstructor should additionally output all subrows for the row,
 *      e.g. [[column1, column2, ...], [subrow1, subrow2, ...]]
 */
function constructTable(tableId, list, rowContructor) {
    const table = cssGetFirst(`#${tableId} tbody`);
    const fragment = document.createDocumentFragment();
    
    function constructRow(id, row) {
        fragment.appendChild(construct({
            element: 'tr',
            classes: [`${id}`],
            children: [{
                element: 'td',
                attributes: {
                    onclick: 'toggleRowSelect(event, this)'
                },
                children: [ROW_CHECKBOX]
            }, ...row]
        }));
    }
    function constructSubrow(id, subrow, colspan, noSubtableCheckbox) {
        fragment.appendChild(construct({
            element: 'tr',
            style: { display: 'none' },
            classes: [id, 'subtable-row'],  // this order is important (see toggleSubrowSelect)
            children: [{
                element: 'td'
            }, {
                element: 'td',
                classes: ['subtable-container'],
                attributes: { colspan },
                children: [{
                    element: 'ul',
                    classes: ['subtable'],
                    children: noSubtableCheckbox ? [subrow] : [{
                        element: 'li',
                        attributes: { onclick: 'toggleSubrowSelect(event, this)' },
                        children: [ROW_CHECKBOX, ...subrow]
                    }]
                }]
            }]
        }))
    }

    for (const data of list) {
        let subrows;
        let row = rowContructor(data);

        // [[col1, col2, ...], [subrow1, subrow2, ...]] -> subtable rows
        if (row.length >= 2 && Array.isArray(row[0]) && Array.isArray(row[1])) {
            [row, subrows, ...extra] = row;
            const noSubtableCheckbox = extra.length > 0;

            constructRow(data.id, row);
            subrows.forEach((subrow, i) => constructSubrow(`${data.id}-${i}`, subrow, row.length, noSubtableCheckbox));
        
        // [col1, col2, ...] -> table row
        } else {
            constructRow(data.id, row);
        }
    }
    table.replaceChildren(fragment);
}
function applyTableFilter(tableId, list, filter) {
    const table = cssGetFirst(`#${tableId} tbody`).children;
    let tableI = 0;
    for (let i = 0; i < list.length; i++) {
        const visible = filter(list[i]);
        const display = visible ? '' : 'none';

        // Set visibility of row
        table[tableI].style.setProperty('display', display);
        
        // Pass subrows, hiding them if row is hidden
        tableI += 1;
        while (table[tableI]?.classList.contains('subtable-row')) {
            if (!visible) {
                table[tableI].style.setProperty('display', display);
            }
            tableI += 1;
        }
    }
}


/*********************************************************************
Data injection - Bulletin
*********************************************************************/
function constructAnnouncements() {
    const announcements = getAnnouncements();
    
    return constructTable('table-announcements', announcements, (x) => [{
        element: 'td',
        children: [{
            element: 'img',
            attributes: {
                src: `assets/icons/${x.type === 'alert' ? 'alert-triangle.svg' : 'megaphone.svg'}`,
                onclick: 'toggleAnnouncementType(this)'
            },
            classes: ['table-announcements-icon'],
        }]
    }, {
        element: 'td',
        children: getInputsStartEnd(x, 'date', 'from', 'until')
    }, {
        element: 'td',
        attributes: INPUT_ATTRIBUTES.multiline,
        innerHTML: parseMarkdown(x.text)
    }]);
}
function constructUpcomingEvents() {
    const events = getEvents();
    const upcomingEvents = getUpcomingEvents();

    return constructTable('table-upcoming-events', upcomingEvents, (x) => [{
        element: 'td',
        children: [getInputText(
            'assets/icons/events-filled.svg',
            'Select by name...',
            events[x.id].name,
            'event'
        )]
    }, {
        element: 'td',
        children: getInputsStartEnd(x, 'date', 'from', 'to')
    }, {
        element: 'td',
        attributes: INPUT_ATTRIBUTES.asset,
        innerText: x.image
    }])
}
function constructCurrentEvent() {
    const events = getEvents();
    const currentEvent = getCurrentEvent();

    const { name } = events[currentEvent.id];
    const { links: { poster, rvsp, setlist }, tickets, hideBefore, hideAfter, location, preConcertDescription, postConcertDescription } = currentEvent;

    const container = cssGetId('current-event-id');
    const input = container.children[0].children[1];
    input.value = name;
    
    const suggestions = container.children[1];
    const fragment = document.createDocumentFragment();
    for (const event of events) {
        if (event.type !== 'Concert') {
            continue;
        }
        fragment.appendChild(construct(getInputSuggestion(event, x => x.name, x => `${x.start.split('|')[0]}`)));
    }
    suggestions.replaceChildren(fragment);

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
    const faq = getFaq();
    
    return constructTable('table-faq', faq, ({q, a}) => [{
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
    }]);
};


/*********************************************************************
Data injection - Members table
*********************************************************************/
function constructMembers() {
    const members = getMembers();
    const instruments = getInstruments();

    return constructTable('table-members', members, (x) => {
        const tags = [...x.instruments.map(i => instruments[i]), ...x.roles];
        const links = Object.keys(x.links).map(capitalize);
        return [{
            element: 'td',
            attributes: INPUT_ATTRIBUTES.default,
            innerText: x.name
        }, {
            element: 'td',
            children: [getInputSeason(x.joined)]
        }, {
            element: 'td',
            children: [getInputSeason(x.left, true)]
        }, {
            element: 'td',
            children: [getInputModalOpener('openModalMemberTags(this)', tags)]
        }, {
            element: 'td',
            children: [getInputModalOpener('openModalMemberLinks(this)', links)]
        }]
    })
}


/*********************************************************************
Data injection - Music table
*********************************************************************/
function constructMusicTable() {
    const music = getMusic();
    const events = getEvents();
    const members = getMembers();

    const mediaOrigins = ['', 'Anime', 'Video Game', 'Vocaloid'].map(x => ({
        element: 'option',
        innerText: x
    }));
    const songTypes = ['Large Ensemble', 'Small Ensemble', 'External Group'].map(x => ({
        element: 'option',
        innerText: x
    }))
    return constructTable('table-music', music, (x) => {
        const performances = x.performances.map(p => p.concerts.map(c => EVENTS[c]?.start.slice(0, 7) ?? c)).flat();
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
            children: [{
                element: 'select',
                value: x.mediaOrigin || '',
                children: mediaOrigins
            }]
        }, {
            element: 'td',
            children: [getInputSubrowOpener(performances)]
        }, {
            element: 'td',
            attributes: INPUT_ATTRIBUTES.default,
            innerText: x.reference
        }];

        const subrows = x.performances.map(p => {
            const arranger = p.arranger?.map(a => members[a]?.name ?? a) ?? [];
            const performerNames = getPerformerNames(p);
            return [getDatalist([
                ['Concerts', {
                    element: 'td',
                    children: [getInputTags(
                        p.concerts.map(c => EVENTS[c]?.name ?? c),  // temporary until data is fixed
                        'Enter event...',
                        'event'
                    )]
                }],
                ['Song Type', {
                    element: 'td',
                    children: [{
                        element: 'select',
                        value: p.songType === 'Large' ? 'Large Ensemble' : p.songType === 'Small' ? 'Small Ensemble' : 'External Group',
                        children: songTypes
                    }]
                }],
                ['Sheet Music', {
                    element: 'td',
                    attributes: INPUT_ATTRIBUTES.default,
                    innerText: p.sheetMusic
                }],
                ['Arranger(s)', {
                    element: 'td',
                    children: [getInputTags(
                        arranger,
                        'Enter arranger...',
                        'member'
                    )]
                }],
                ['Group', {
                    element: 'td',
                    attributes: INPUT_ATTRIBUTES.default,
                    innerText: p.group
                }],
                ['Performer(s)', {
                    element: 'td',
                    children: [getInputModalOpener('openModalPerformancePerformers(this)', performerNames)]
                }]
            ])];
        });
        return [row, subrows];
    })
}


/*********************************************************************
Data injection - Event table
*********************************************************************/
function constructEventTable() {
    const events = getEvents();

    return constructTable('table-events', events, (x) => {
        const eventTypes = ['Concert', 'Workshop', 'Other', 'External'].map(x => ({
            element: 'option',
            innerText: x
        }))

        const row = [{
            element: 'td',
            children: [{
                element: 'select',
                value: x.type,
                children: eventTypes
            }]
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
            children: getInputsStartEnd(x, 'datetime-local', 'start', 'end')
        }, {
            element: 'td',
            children: [getInputModalOpener('openModalConcertSetlist(this)', undefined, !x.setlist || x.setlist.length === 0)]
        }, {
            element: 'td',
            children: [getInputSubrowOpener()]
        }, {
            element: 'td',
            attributes: INPUT_ATTRIBUTES.default,
            innerText: x.gallery
        }];
        
        const subrows = [{
            element: 'li',
            children: [{
                element: 'div',
                attributes: INPUT_ATTRIBUTES.multiline,
                innerHTML: parseMarkdown(x.description)
            }]
        }];

        return [row, subrows, true];
    })
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
    const members = getMembers();
    const instruments = getInstruments();

    const tags = [
        ...instruments.sort(instrumentSorter),
        ...Array.from(new Set(members.map(x => x.roles.map(parseRole)).flat())).sort(roleSorter)
    ];
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

constructAnnouncements();
constructUpcomingEvents();
constructCurrentEvent();
constructFaq();
constructMembers();
constructMusicTable();
constructTagTab();
constructEventTable();


/*********************************************************************
Data injection - Modals
*********************************************************************/
function getRowId(element) {
    let id = element.closest('.subtable-row')?.classList[0];
    if (id) {
        const indices = id.split('-');
        return indices.slice(2).map(x => parseInt(x, 10));
    }

    id = element.closest('tr')?.classList[0];
    return parseInt(id, 10);
}
function openModalMemberTags(element) {
    openModalHelper('modal-member-tags');

    const id = getRowId(element);
    const member = getMembers()[id];
    const instruments = getInstruments();

    // Title
    cssGetFirst('#modal-member-tags h2 span').innerText = `for ${member.name}`;

    // Instruments
    let container = cssGetId('datalist-member-instruments');
    let fragment = document.createDocumentFragment();
    for (const instrument of member.instruments) {
        fragment.appendChild(construct({
            element: 'li',
            children: [{
                element: 'span',
                innerText: instruments[instrument]
            }, X_BUTTON]
        }));
    }
    container.replaceChildren(fragment);

    // Roles
    container = cssGetId('datalist-member-roles');
    fragment = document.createDocumentFragment();
    for (const role of member.roles) {
        fragment.appendChild(construct({
            element: 'li',
            children: [{
                element: 'span',
                innerText: role
            }, X_BUTTON]
        }))
    }
    container.replaceChildren(fragment);
}
function openModalMemberLinks(element) {
    openModalHelper('modal-member-links');

    const id = getRowId(element);
    const member = getMembers()[id];
    const instruments = getInstruments();
    const socialMediaOptions = ['Bandcamp', 'Discord', 'Instagram', 'LinkedIn', 'Musescore', 'Spotify', 'Soundcloud', 'Youtube'].map(x => ({
        element: 'option',
        innerText: x
    }))

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
                children: [{
                    element: 'select',
                    value: capitalize(socialMedia),
                    children: socialMediaOptions
                }]
            }, {
                element: 'td',
                attributes: INPUT_ATTRIBUTES.default,
                innerText: username
            }, {
                element: 'td',
                attributes: INPUT_ATTRIBUTES.default,
                innerText: link
            }]
        }))
    }

    // Placeholder new row
    fragment.appendChild(construct({
        element: 'tr',
        classes: ['modal-datalist-preview'],
        children: [{
            element: 'td',
        }, {
            element: 'td',
            children: [{
                element: 'select',
                children: socialMediaOptions
            }]
        }, {
            element: 'td',
            attributes: INPUT_ATTRIBUTES.default,
            innerText: 'Enter username...'
        }, {
            element: 'td',
            attributes: INPUT_ATTRIBUTES.default,
            innerText: 'Enter link...'
        }]
    }));
    datalist.replaceChildren(fragment);
}
function openModalPerformancePerformers(element) {
    openModalHelper('modal-performance-performers');

    const instruments = getInstruments();
    const members = getMembers();
    const [id, subId] = getRowId(element);
    const song = getMusic()[id];
    const performers = song.performances[subId].performers;
    const nameSuggestions = members.slice(0, 10).map(x => ({
        element: 'li',
        children: [{
            element: 'span',
            innerText: x.name
        }, {
            element: 'span',
            innerText: x.joined
        }]
    }))
    
    // Title
    cssGetFirst('#modal-performance-performers h2 span').innerText = `for ${song.name}`;

    // Performer
    const table = cssGetFirst('#modal-performance-performers tbody');
    const fragment = document.createDocumentFragment();
    for (const [instrumentId, names] of Object.entries(performers)) {
        fragment.appendChild(construct({
            element: 'tr',
            children: [{
                element: 'td',
                children: [X_BUTTON]
            }, {
                element: 'td',
                children: [getInputText(
                    'assets/icons/music-note.svg',
                    'Enter instrument...',
                    instruments[instrumentId],
                    'instrument'
                )]
            }, {
                element: 'td',
                children: [getInputTags(
                    names.map(x => members[x]?.name ?? x),
                    'Enter performer...',
                    'member',
                    names.map(x => !members[x])
                )]
            }]
        }));
    }

    // Placeholder new row
    fragment.appendChild(construct({
        element: 'tr',
        classes: ['modal-datalist-preview'],
        children: [{
            element: 'td',
        }, {
            element: 'td',
            children: [getInputText(
                'assets/icons/music-note.svg',
                'Enter instrument...',
                '',
                'instrument'
            )]
        }, {
            element: 'td',
            children: [getInputTags(
                [],
                'Enter performer...',
                'member',
                members.map(x => !members[x])
            )]
        }]
    }));
    table.replaceChildren(fragment);
}
function openModalConcertSetlist(element) {
    openModalHelper('modal-concert-setlist');

    const id = getRowId(element);
    const { name, setlist, video } = getEvents()[id];
    const music = getMusic();

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
                innerText: music[songId].name
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