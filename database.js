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


function parseCSV(csv) {
    const rows = [];
    let current = [];
    let field = "";
    let inQuotes = false;

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

    return rows;
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

function parseInstrument(instrument) {

    return instrument;
}

function parseRole(role) {

    return role;
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

const memberRows = new Set(['Discord', 'Public Name', 'Instruments', 'Roles', 'Season Start', 'Season End', 'Personal Links']);
async function uploadMembers(event) {
    const raw = await event.files[0].text();
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
    const indices = {};
    for (let i = 0; i < data[0].length; i++) {
        if (memberRows.has(data[0][i])) {
            indices[data[0][i]] = i;
        }
    }

    const members = data.filter((row, i) => (
        i > 0 && row[indices['Public Name']] && row[indices['Season Start']] && row[indices['Discord']]
    ));

    const now = new Date();
    let year = now.getMonth() >= 7 ? now.getFullYear() : now.getFullYear() - 1;
    while (!members.some(row => row[indices['Roles']].includes(String(year).slice(2)))) {
        year -= 1;
        if (year === 2022) {
            throw new Error("WTF");
        }
    }

    const parsed = members.map((row, i) => {
        const rawRoles = row[indices['Roles']];
        const isExec = rawRoles.includes(` (`) && rawRoles.includes(`${String(year).slice(2)}`);
        const discord = isExec ? row[indices['Discord']] : undefined;
        
        return {
            id: i,
            name: row[indices['Public Name']],
            joined: parseSeason(row[indices['Season Start']]),
            left: row[indices['Season End']],
            instruments: row[indices['Instruments']].split(',').map(x => parseInstrument(x.trim())).sort(),
            roles: row[indices['Roles']] ? row[indices['Roles']].split(',').map(x => parseRole(x.trim())).sort() : [],
            links: parseLinks(discord, row[indices['Personal Links']] ? row[indices['Personal Links']].split('\n') : [])
        }
    });
    
    console.log(JSON.stringify(parsed, null, 4))

    return parsed;
}