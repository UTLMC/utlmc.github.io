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
function rgbToHue(r, g, b) {
    // Normalize to 0–1
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;

    // Achromatic case (no color)
    if (diff === 0) return 0;

    let hue;
    if (max === r) {
        hue = ((g - b) / diff) % 6;
    } else if (max === g) {
        hue = (b - r) / diff + 2;
    } else {
        hue = (r - g) / diff + 4;
    }

    hue *= 60; // convert to degrees
    if (hue < 0) {
        hue += 360;
    }

    // Normalize to [0, 1]
    return hue / 360;
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
}

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
function toggleModalHelper(id) {
    const modalOn = toggleModal();
    cssGetId(id).style.setProperty('display', modalOn ? 'none' : 'flex');
}
function toggleModalMemberTags() { toggleModalHelper('modal-member-tags'); }
function toggleModalMemberLinks() { toggleModalHelper('modal-member-links'); }
function toggleModalPerformancePerformers() { toggleModalHelper('modal-performance-performers'); }
function toggleModalConcertSetlist() { toggleModalHelper('modal-concert-setlist'); }

function toggleColourWidgetMode(element) {
    const active = 'colour-widget-mode-active';
    cssGetClass(active)[0].classList.remove(active);
    element.classList.add(active);

    const gradientMode = element.id === 'colour-widget-mode-gradient';
    cssGetId('colour-widget-gradient-buttons').style.setProperty('display', gradientMode ? 'flex' : 'none');
    cssGetId('colour-widget-text').style.setProperty('padding-bottom', gradientMode ? '5px' : '15px');
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
    if (event.target.nodeName === 'INPUT') {
        return;
    }
    const button = element.children[0];
    button.checked = !button.checked;
    onRowSelect(element);
}
function toggleSubrowSelect(event, element) {
    if (event.target.closest('.datalist') || event.target.nodeName === 'INPUT') {
        return;
    }
    const button = element.children[0];
    button.checked = !button.checked;
    onRowSelect(element, button.checked);
}
function onRowSelect(element) {
    // TODO: subtable checkboxes being selected should disable regular checkboxes
    // TODO: regular checkboxes being selected should disable subtable checkboxes
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

    if (COLOUR_PICKER_ON) {
        updateColourFromPicker();
    }
    if (HUE_PICKER_ON) {
        updateHueFromPicker();
    }
}
function onMouseDown(down) {
    MOUSE_DOWN = down;
    if (!down) {
        COLOUR_PICKER_ON = down;
        HUE_PICKER_ON = down;
    }
}

let HUE_PICKER_ON = false;
let COLOUR_PICKER_ON = false;
let LAST_VALID_COLOUR = [255, 0, 0];
let COLOUR_PICKER_PRIMARY = {
    r: 255,
    g: 0,
    b: 0
}
function pickColourMouseDown(event) {
    event.preventDefault();
    COLOUR_PICKER_ON = true;
    updateColourFromPicker();
}
function pickHueMouseDown(event) {
    event.preventDefault();
    HUE_PICKER_ON = true;
    updateHueFromPicker();
}

// Convert colourpicker position (0-1) to RGB value (0-255)
function xyToRgb(x, y) {
    const r = Math.round((1 - y) * ((1 - x) * 255 + x * COLOUR_PICKER_PRIMARY.r));
    const g = Math.round((1 - y) * ((1 - x) * 255 + x * COLOUR_PICKER_PRIMARY.g));
    const b = Math.round((1 - y) * ((1 - x) * 255 + x * COLOUR_PICKER_PRIMARY.b));
    return [r, g, b];
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

    return [(left - rect.left) / rect.width, (top - rect.top) / rect.height];
}

// Move the hue picker based on the given hue (0-1)
function moveHuePicker(x) {
    // Update hue picker circle
    const container = cssGetId('colour-widget-hue');
    const rect = container.getBoundingClientRect();
    const circle = cssGetId('colour-widget-hue-circle');
    circle.style.setProperty('left', `${x * rect.width + rect.left}px`);

    // Update primary colour
    const [primaryR, primaryG, primaryB] = hsvToRgb(x, 1, 1);
    COLOUR_PICKER_PRIMARY.r = primaryR;
    COLOUR_PICKER_PRIMARY.g = primaryG;
    COLOUR_PICKER_PRIMARY.b = primaryB;

    // Update gradient
    const box = cssGetId('colour-widget-picker');
    box.style.setProperty(
        'background',
        `linear-gradient(transparent, black), linear-gradient(to right, white, transparent), rgb(${primaryR}, ${primaryG}, ${primaryB})`
    );
}

// Move the colour picker bsed on the given position (0-1)
function moveColourPicker(x, y) {
    const container = cssGetId('colour-widget-picker');
    const rect = container.getBoundingClientRect();
    const circle = cssGetId('colour-widget-picker-circle');
    circle.style.setProperty('left', `${x * rect.width + rect.left}px`);
    circle.style.setProperty('top', `${y * rect.height + rect.top}px`);
}

// Update colour after moving hue picker
function updateHueFromPicker() {
    const container = cssGetId('colour-widget-hue');
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    
    moveHuePicker(x);
    const [r, g, b] = xyToRgb(...getCurrentPickerXY());
    
    LAST_VALID_COLOUR = [r, g, b];
    cssGetId('colour-widget-rgb').value = `rgb(${r}, ${g}, ${b})`;
    cssGetId('colour-widget-hex').value = rgbToHex(r, g, b);
}

// Update colour after moving colour picker
function updateColourFromPicker() {
    const container = cssGetId('colour-widget-picker');
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));

    moveColourPicker(x, y);
    const [r, g, b] = xyToRgb(x, y);
    
    LAST_VALID_COLOUR = [r, g, b];
    cssGetId('colour-widget-rgb').value = `rgb(${r}, ${g}, ${b})`;
    cssGetId('colour-widget-hex').value = rgbToHex(r, g, b);
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

        let r = Number(match[1]);
        let g = Number(match[2]);
        let b = Number(match[3]);
        r = Math.min(255, Math.max(0, r));
        g = Math.min(255, Math.max(0, g));
        b = Math.min(255, Math.max(0, b));
        const normalized = `rgb(${r}, ${g}, ${b})`;
        input.value = normalized;
        LAST_VALID_COLOUR = [r, g, b];
        
        // Update other inputs
        moveHuePicker(rgbToHue(r, g, b));
        moveColourPicker(...rgbToXy(r, g, b));
        cssGetId('colour-widget-hex').value = rgbToHex(r, g, b);
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
        value = "#" + value.toUpperCase();
        input.value = value;

        // Update other inputs
        const [r, g, b] = hexToRgb(value);
        LAST_VALID_COLOUR = [r, g, b];
        
        moveHuePicker(rgbToHue(r, g, b));
        moveColourPicker(...rgbToXy(r, g, b));
        cssGetId('colour-widget-rgb').value = `rgb(${r}, ${g}, ${b})`;
    }
})();


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
function focusInput(element) {
    setFocusInput(element, true);
}
function blurInput(element) {
    setFocusInput(element, false);

    const parent = element.parentElement?.parentElement;
    const clicked = 'datalist-tag-add-clicked'
    if (parent?.classList.contains(clicked) && !element.value) {
        parent?.classList.remove(clicked);
    }
}
function keyDownInput(event) {
    if (event.key !== 'Enter') {
        return;
    }
    console.log('enter!');
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
function validateInput(element) {
    let value = element.innerText;
    value = value.replace(/[\r\n]+/g, '').trim();
    element.innerText = value;
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
        validation.innerText = `'${value}' is an external link. Please use a locally-downloaded asset instead.`;
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

    data.forEach(row => {
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
    });

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
