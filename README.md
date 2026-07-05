# UT-SAMA Light Music Club 

This is the website for Light Music Club (LMC), a branch of the University of Toronto Student Anime & Manga Association (UTSAMA) that performs music from anime, video games, and J-pop among other genres.

## Non-Technical Guide

To make changes to the website, in most cases you can:
1) Go to the [database page](utlmc.github.io/database)
2) Use the UI and make edits
3) Click the "Export Data" button and save the file as `data.js` in your computer (it must be that exact name)
4) Go back to this [Github repository](https://github.com/UTLMC/utlmc.github.io), log in, click `Add file -> Upload files`, upload `data.js`, and press `Commit changes`.
5) Wait 1-2 minutes for the [website](utlmc.github.io/database) to update, then check that your changes worked as intended.

To keep a clean version history, please batch your changes as much as possible instead of constantly making little changes.

It is recommended you download this repository if you want to preview your changes without uploading to Github every single time. To do this:
1) On this Github repository, click `Code -> Download ZIP` and unzip the file
2) Open `database.html` with your browser, make your changes, and export to `data.js`
3) Open `index.html` with your browser to check that your changes worked as intended

If there is something you want to change that is not in the database website, then contact a dev.


## Technical Guide

The website is implemented as a single `index.html` with accompanying CSS and JS files of the same name. Text from `data.js` is dynamically rendered into the base HTML with `index.js`. This is chosen for a few reasons:

- Manually editing the HTML file for changes every time is a bad idea
- The club cannot expect a steady stream of CS skill so it needs basic functionality like updating data to be accessible even without devs around. SEO may suffer if too much data injection is done, so we keep some rarely-changing data hard-coded.
- React, other frontend technologies, or a proper backend all require use of the command line, which is inaccessible for non-CS students and even early CS students.
- Having a simple deployment pipeline and development environment is critical
- Scalability isn't a big concern

There is also a separate setlist website for usage during concerts at `setlist.html`.

The recommended (but optional) development environment settings is using VS Code with the "Live Server" extension by Ritwick Dey which enables live reload whenever you save a file.
